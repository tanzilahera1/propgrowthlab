import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Lead } from "@/models/Lead";
import { sendNotification } from "@/lib/notifications";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { propertyUrl, contactName, whatsapp, territory, monthlyRevenue } = body;

    if (!propertyUrl || !whatsapp) {
      return NextResponse.json(
        { error: "Property URL and WhatsApp are required" },
        { status: 400 }
      );
    }

    // Connect to database and store inquiry
    try {
      await connectToDatabase();
      await Lead.create({
        fullName: contactName || "Direct Booking Audit Prospect",
        whatsapp: whatsapp,
        territory: territory || "Global / Worldwide",
        propertyType: `Audit Request: ${propertyUrl}`,
        budget: monthlyRevenue ? `$${monthlyRevenue}/mo gross` : "N/A",
        moveInTimeframe: "Direct Booking Funnel Audit",
        source: "Agency Audit Form",
        notes: `Property URL: ${propertyUrl}`,
      });
    } catch (dbError) {
      console.warn("[API] MongoDB save fallback:", dbError);
    }

    // Trigger Telegram & Discord Instant Alert
    await sendNotification({
      title: "New 15-Minute Direct Booking Audit Requested",
      source: "Audit",
      details: {
        "Property URL": propertyUrl,
        "Contact Name": contactName || "Anonymous Owner",
        "WhatsApp": whatsapp,
        "Territory": territory || "Global / Worldwide",
        "Monthly Gross Revenue": monthlyRevenue ? `$${monthlyRevenue}` : "Not declared",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Audit request registered and growth team alerted",
    });
  } catch (error) {
    console.error("[API] Audit request error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
