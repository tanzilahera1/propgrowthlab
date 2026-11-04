import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/mongodb";
import UserModel from "@/models/User";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { currentPassword, newPassword } = body;

    if (
      !newPassword ||
      typeof newPassword !== "string" ||
      newPassword.length < 8 ||
      !/[A-Z]/.test(newPassword) ||
      !/[a-z]/.test(newPassword) ||
      !/\d/.test(newPassword)
    ) {
      return NextResponse.json(
        {
          message:
            "New password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.",
        },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const user = await UserModel.findOne({ email: session.user.email.toLowerCase() });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const hasExistingPassword = Boolean(user.password);

    // If user already has a password, verify current password
    if (hasExistingPassword) {
      if (!currentPassword) {
        return NextResponse.json(
          { message: "Please provide your current password." },
          { status: 400 }
        );
      }

      const isValid = await bcrypt.compare(currentPassword, user.password!);
      if (!isValid) {
        return NextResponse.json(
          { message: "The current password you entered is incorrect." },
          { status: 400 }
        );
      }
    }

    // Hash and store the new password
    const saltRounds = 12;
    user.password = await bcrypt.hash(newPassword, saltRounds);
    await user.save();

    return NextResponse.json({
      success: true,
      message: hasExistingPassword
        ? "Password changed successfully."
        : "Password successfully created. You can now sign in with both Google and email/password.",
    });
  } catch (error: unknown) {
    console.error("POST /api/user/password error:", error);
    return NextResponse.json(
      { message: "Failed to update password. Please try again." },
      { status: 500 }
    );
  }
}

