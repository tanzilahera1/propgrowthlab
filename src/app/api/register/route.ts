import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/mongodb";
import UserModel from "@/models/User";
import { UserRole, AccountType } from "@/types/auth";
import { generateUserId } from "@/lib/generateUserId";

export async function POST(request: NextRequest) {
  try {
    try {
      await connectToDatabase();
    } catch (dbErr: unknown) {
      console.error("Database connection failure in register API:", dbErr);
      return NextResponse.json(
        {
          message:
            "Could not connect to MongoDB Atlas. Please ensure your current IP address is whitelisted in Atlas Network Access.",
        },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { fullname, email, password } = body;

    // 1. Full name validation
    if (!fullname || fullname.trim().length < 2) {
      return NextResponse.json(
        { message: "Please provide a valid full name (at least 2 characters)." },
        { status: 400 }
      );
    }

    // 2. Email format validation
    const cleanEmail = (email || "").toLowerCase().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      return NextResponse.json(
        { message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // 3. Password strength validation (8+ chars, 1 uppercase, 1 lowercase, 1 number)
    if (
      !password ||
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/\d/.test(password)
    ) {
      return NextResponse.json(
        {
          message:
            "Password must be at least 8 characters and contain at least one uppercase letter (A-Z), one lowercase letter (a-z), and one number (0-9).",
        },
        { status: 400 }
      );
    }

    // 4. Check existing account
    const existingUser = await UserModel.findOne({ email: cleanEmail });

    if (existingUser) {
      if (!existingUser.password) {
        return NextResponse.json(
          {
            errorType: "google_account",
            message:
              "This email is registered via Google. Click 'Continue with Google' to sign in directly.",
          },
          { status: 409, headers: { "X-Error-Type": "google_account" } }
        );
      }

      return NextResponse.json(
        {
          errorType: "email",
          message: "An account with this email already exists. Please sign in with your password.",
        },
        { status: 409, headers: { "X-Error-Type": "email" } }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const userId = await generateUserId();

    await UserModel.create({
      userId,
      fullname: fullname.trim(),
      email: cleanEmail,
      password: hashedPassword,
      role: UserRole.USER,
      accountType: AccountType.FREE,
      status: "Active",
      territories: ["Global"],
      isSubscribed: false,
      lastLogin: new Date(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Account created successfully! Signing you in...",
        userId,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Registration API unexpected error:", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong during registration. Please try again.",
      },
      { status: 500 }
    );
  }
}
