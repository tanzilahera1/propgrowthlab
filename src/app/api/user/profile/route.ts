import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/mongodb";
import UserModel from "@/models/User";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const user = await UserModel.findOne({ email: session.user.email.toLowerCase() }).select(
      "-password -resetToken -resetTokenExpiry"
    );

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      user: {
        userId: user.userId,
        fullname: user.fullname,
        email: user.email,
        mobile: user.mobile || "",
        role: user.role,
        accountType: user.accountType,
        territories: Array.isArray(user.territories) ? user.territories : [],
        isSubscribed: user.isSubscribed,
        status: user.status,
        hasPassword: Boolean(user.password),
        createdAt: user.createdAt,
      },
    });
  } catch (error: unknown) {
    console.error("GET /api/user/profile error:", error);
    return NextResponse.json(
      { message: "Internal server error retrieving profile." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { fullname, mobile, territories } = body;

    await connectToDatabase();
    const user = await UserModel.findOne({ email: session.user.email.toLowerCase() });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (fullname && typeof fullname === "string" && fullname.trim().length >= 2) {
      user.fullname = fullname.trim();
    }

    if (typeof mobile === "string") {
      user.mobile = mobile.trim();
    }

    if (Array.isArray(territories)) {
      user.territories = territories.map(String);
    }

    await user.save();

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully.",
      user: {
        userId: user.userId,
        fullname: user.fullname,
        email: user.email,
        mobile: user.mobile || "",
        role: user.role,
        territories: user.territories,
      },
    });
  } catch (error: unknown) {
    console.error("PATCH /api/user/profile error:", error);
    return NextResponse.json(
      { message: "Failed to update profile." },
      { status: 500 }
    );
  }
}

