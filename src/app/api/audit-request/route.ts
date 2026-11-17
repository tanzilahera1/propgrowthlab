import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Lead from "@/models/Lead";
import { sendNotification } from "@/lib/notifications";
import { createNotionLead } from "@/lib/notionSync";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { propertyUrl, contactName, whatsapp, territory, preferredTier, monthlyRevenue } = body;

    if (!propertyUrl || !whatsapp) {
      return NextResponse.json(
        { error: "Property URL and WhatsApp are required" },
        { status: 400 }
      );
    }

    const ticketId = `AUDIT-${Math.floor(1000 + Math.random() * 9000)}`;

    // Connect to database and store inquiry
    try {
      await connectToDatabase();
      await Lead.create({
        ticketId,
        fullName: contactName || "Direct Booking Audit Prospect",
        whatsapp: whatsapp,
        territory: territory || "Global / Worldwide",
        propertyType: `Audit Request: ${propertyUrl}`,
        budget: monthlyRevenue ? `$${monthlyRevenue}/mo gross` : "N/A",
        moveInTimeframe: "Direct Booking Funnel Audit",
        source: "Agency Audit Form",
        notes: `Property URL: ${propertyUrl} | Preferred Tier: ${preferredTier || "Unspecified"}`,
      });
    } catch (dbError) {
      console.warn("[API] MongoDB save fallback:", dbError);
    }

    // Trigger Telegram & Discord Instant Alert
    try {
      await sendNotification({
        title: `New 15-Minute Direct Booking Audit [${ticketId}]`,
        source: "Audit",
        details: {
          "Ticket ID": ticketId,
          "Property URL": propertyUrl,
          "Contact Name": contactName || "Anonymous Owner",
          "WhatsApp": whatsapp,
          "Territory": territory || "Global / Worldwide",
          "Monthly Gross Revenue": monthlyRevenue ? `$${monthlyRevenue}` : "Not declared",
          "Target Track": preferredTier || "Standard Audit",
          "Next Action": "Review OTA leakage & dispatch audit brief on WhatsApp",
        },
      });
    } catch (notifErr) {
      console.warn("[API] Notification dispatch warning:", notifErr);
    }

    // Auto-sync to Notion CRM Database
    try {
      await createNotionLead({
        ticketId,
        fullName: contactName || "Direct Booking Owner",
        whatsapp: whatsapp,
        territory: territory || "Global / Worldwide",
        category: "Agency Audit",
        source: "Agency Audit",
        propertyType: "Master Bedroom",
        budget: monthlyRevenue || 0,
        notes: `Property URL: ${propertyUrl} | Tier: ${preferredTier || "Full Growth"}`,
      });
    } catch (notionErr) {
      console.warn("[API] Notion sync warning:", notionErr);
    }

    return NextResponse.json({
      success: true,
      ticketId,
      message: "Audit request registered, synced to Notion CRM, and growth team alerted",
    });
  } catch (error) {
    console.error("[API] Audit request error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
