import { NextRequest, NextResponse } from "next/server";
import { connection } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Lead from "@/models/Lead";

export async function GET(request: NextRequest) {
  await connection();
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const territory = searchParams.get("territory");
    const status = searchParams.get("status");

    const query: Record<string, unknown> = {};
    if (territory && territory !== "all") {
      query.territory = { $regex: new RegExp(territory, "i") };
    }
    if (status && status !== "all") {
      query.status = status;
    }

    const leads = await Lead.find(query).sort({ createdAt: -1 }).limit(50);

    return NextResponse.json({
      success: true,
      count: leads.length,
      leads: leads.map((l) => ({
        id: l._id.toString(),
        name: l.fullName,
        phone: l.whatsapp,
        maskedPhone: l.whatsapp ? `${l.whatsapp.substring(0, 6)}••••` : "",
        property: l.propertyType,
        neighborhood: l.territory,
        budget: l.budget,
        dealType: l.budget && l.budget.includes("/ mo") ? "Luxury Lease" : "Purchase",
        moveIn: l.moveInTimeframe,
        qualification: l.notes || "Proof of funds on file",
        timestamp: new Date(l.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: l.status === "dispatched" ? "contacted" : l.status,
      })),
    });
  } catch (error: unknown) {
    console.error("GET /api/leads error:", error);
    return NextResponse.json(
      { message: "Failed to retrieve leads from database." },
      { status: 500 }
    );
  }
}
