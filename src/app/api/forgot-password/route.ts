import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { connectToDatabase } from "@/lib/mongodb";
import UserModel from "@/models/User";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email address is required." },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();
    const user = await UserModel.findOne({ email: cleanEmail });

    if (user && !user.password) {
      return NextResponse.json(
        {
          message:
            "This account was created with Google. You can sign in instantly using 'Continue with Google'.",
          isGoogleOnly: true,
        },
        { status: 200 }
      );
    }

    if (user) {
      const resetToken = crypto.randomBytes(32).toString("hex");
      user.resetToken = resetToken;
      user.resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
      await user.save();
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "If an account with this email exists, a password reset link has been dispatched.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Forgot password API error:", error);
    return NextResponse.json(
      { message: "Unable to process password reset. Please try again." },
      { status: 500 }
    );
  }
}

