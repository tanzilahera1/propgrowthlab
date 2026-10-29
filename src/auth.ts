import NextAuth, { CredentialsSignin } from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { connectToDatabase } from "@/lib/mongodb";
import UserModel from "@/models/User";
import { UserRole, AccountType } from "@/types/auth";
import { generateUserId } from "@/lib/generateUserId";

// Custom typed error codes
export class GoogleOnlyAccountError extends CredentialsSignin {
  code = "google_only_account";
}

export class UserNotFoundError extends CredentialsSignin {
  code = "user_not_found";
}

export class InvalidPasswordError extends CredentialsSignin {
  code = "invalid_password";
}

export class AccountSuspendedError extends CredentialsSignin {
  code = "account_suspended";
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret:
    process.env.AUTH_SECRET?.trim() ||
    process.env.NEXTAUTH_SECRET?.trim() ||
    process.env.BETTER_AUTH_SECRET?.trim(),
  trustHost: true,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID || process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET || process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          const email = (credentials.email as string).toLowerCase().trim();
          const password = credentials.password as string;

          await connectToDatabase();
          const user = await UserModel.findOne({ email });

          if (!user) {
            throw new UserNotFoundError();
          }

          if (!user.password) {
            throw new GoogleOnlyAccountError();
          }

          if (user.status === "Suspended") {
            throw new AccountSuspendedError();
          }

          const isMatch = await bcrypt.compare(password, user.password);

          if (!isMatch) {
            throw new InvalidPasswordError();
          }

          // Update last login timestamp in background
          user.lastLogin = new Date();
          await user.save();

          // Ensure territories is a pure JavaScript array (prevent DataCloneError from Mongoose CoreMongooseArray)
          const pureTerritories = Array.isArray(user.territories)
            ? Array.from(user.territories).map(String)
            : ["Global"];

          return {
            id: String(user._id),
            email: String(user.email),
            name: String(user.fullname || ""),
            role: String(user.role || UserRole.USER),
            hasPassword: true,
            status: String(user.status || "Active"),
            territories: pureTerritories,
            isSubscribed: Boolean(user.isSubscribed),
          };
        } catch (error) {
          if (error instanceof CredentialsSignin) {
            throw error;
          }
          if (error instanceof Error) {
            throw new Error(error.message);
          }
          throw new Error("Authentication failed");
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        if (!user.email) return false;

        try {
          await connectToDatabase();
          const email = user.email.toLowerCase().trim();
          let dbUser = await UserModel.findOne({ email });

          if (!dbUser) {
            const userId = await generateUserId();
            dbUser = await UserModel.create({
              userId,
              fullname: user.name || "Google User",
              email,
              profilePicture: user.image || "",
              role: UserRole.USER,
              accountType: AccountType.FREE,
              status: "Active",
              territories: ["Global"],
              isSubscribed: false,
              lastLogin: new Date(),
            });
          } else {
            if (dbUser.status === "Suspended") {
              return false;
            }
            if (!dbUser.profilePicture && user.image) {
              dbUser.profilePicture = user.image;
            }
            dbUser.lastLogin = new Date();
            await dbUser.save();
          }

          const pureTerritories = Array.isArray(dbUser.territories)
            ? Array.from(dbUser.territories).map(String)
            : ["Global"];

          // Attach serialized data to NextAuth user object
          user.id = String(dbUser._id);
          user.role = String(dbUser.role);
          user.name = String(dbUser.fullname || "");
          user.hasPassword = Boolean(dbUser.password);
          user.status = String(dbUser.status || "Active");
          user.territories = pureTerritories;
          user.isSubscribed = Boolean(dbUser.isSubscribed);
          return true;
        } catch (error) {
          console.error("Error in Google signIn callback:", error);
          return false;
        }
      }

      return true;
    },

    async jwt({ token, user, trigger, session }) {
      // 1. Initial sign-in
      if (user) {
        if (user.id) token.id = String(user.id);
        if (user.role) token.role = String(user.role);
        if (user.name) token.name = String(user.name);
        if (user.email) token.email = String(user.email);
        token.hasPassword = Boolean(user.hasPassword);
        token.status = String(user.status || "Active");
        token.territories = Array.isArray(user.territories)
          ? Array.from(user.territories).map(String)
          : ["Global"];
        token.isSubscribed = Boolean(user.isSubscribed);
        token.lastChecked = Date.now();
      }

      // 2. Manual update trigger (e.g. session.update() called from client)
      if (trigger === "update") {
        if (session?.name) token.name = String(session.name);
        if (session?.role) token.role = String(session.role);
        if (typeof session?.hasPassword === "boolean") {
          token.hasPassword = session.hasPassword;
        }
        if (typeof session?.isSubscribed === "boolean") {
          token.isSubscribed = session.isSubscribed;
        }
        token.lastChecked = 0; // Force immediate refresh on next check
      }

      // 3. Smart Low-Cost Periodic Background Sync (60 seconds throttle)
      // Allows instant reflection of admin panel updates without re-login or heavy DB load
      const now = Date.now();
      const SYNC_INTERVAL = 60 * 1000; // 1 minute
      const lastChecked = typeof token.lastChecked === "number" ? token.lastChecked : 0;

      if (token.email && (!lastChecked || now - lastChecked > SYNC_INTERVAL)) {
        try {
          await connectToDatabase();
          const dbUser = await UserModel.findOne({ email: token.email }).select(
            "role status fullname profilePicture password territories isSubscribed"
          );
          if (dbUser) {
            token.role = String(dbUser.role);
            token.name = String(dbUser.fullname || "");
            token.status = String(dbUser.status || "Active");
            token.hasPassword = Boolean(dbUser.password);
            token.territories = Array.isArray(dbUser.territories)
              ? Array.from(dbUser.territories).map(String)
              : ["Global"];
            token.isSubscribed = Boolean(dbUser.isSubscribed);
            token.lastChecked = now;
          }
        } catch (err) {
          console.error("Background token sync error:", err);
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        if (token.id) session.user.id = String(token.id);
        if (token.role) session.user.role = String(token.role);
        if (token.name) session.user.name = String(token.name);
        if (token.status) session.user.status = String(token.status);
        if (token.territories) {
          session.user.territories = Array.isArray(token.territories)
            ? Array.from(token.territories).map(String)
            : ["Global"];
        }
        session.user.hasPassword = Boolean(token.hasPassword);
        session.user.isSubscribed = Boolean(token.isSubscribed);
      }
      return session;
    },
  },
});
