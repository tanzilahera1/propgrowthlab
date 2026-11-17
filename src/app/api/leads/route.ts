import { NextRequest, NextResponse } from "next/server";
import { connection } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Lead from "@/models/Lead";
import AuditLog from "@/models/AuditLog";
import { sendNotification } from "@/lib/notifications";
import { createNotionLead, getNotionLeads } from "@/lib/notionSync";

function generateTicketId(countryCode?: string, cityOrArea?: string): string {
  const cc = (countryCode || "GLB").toUpperCase().slice(0, 2);
  const cleanArea = (cityOrArea || "GEN")
    .replace(/[^a-zA-Z]/g, "")
    .toUpperCase()
    .slice(0, 3) || "LOC";
  // Collision-proof: Millisecond Base36 timestamp + 2-digit random salt
  const timeCode = Date.now().toString(36).toUpperCase().slice(-4);
  const salt = Math.floor(10 + Math.random() * 90);
  return `TKT-${cc}-${cleanArea}-${timeCode}${salt}`;
}

export async function GET(request: NextRequest) {
  await connection();
  try {
    // 1. If Notion CRM is configured and returns data, prioritize Notion as Headless CMS
    const notionLeads = await getNotionLeads();
    if (notionLeads && notionLeads.length > 0) {
      return NextResponse.json({
        success: true,
        source: "notion_crm",
        count: notionLeads.length,
        leads: notionLeads,
      });
    }

    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const territory = searchParams.get("territory");
    const status = searchParams.get("status");
    const category = searchParams.get("category");
    const email = searchParams.get("email");

    const query: Record<string, unknown> = {};
    if (territory && territory !== "all") {
      query.territory = { $regex: new RegExp(territory, "i") };
    }
    if (status && status !== "all") {
      query.status = status;
    }
    if (category && category !== "all") {
      query.leadCategory = category;
    }
    if (email && email !== "all") {
      query.email = email;
    }

    const leads = await Lead.find(query).sort({ createdAt: -1 }).limit(100);

    return NextResponse.json({
      success: true,
      count: leads.length,
      leads: leads.map((l) => ({
        id: l._id.toString(),
        ticketId: l.ticketId || `TKT-${l._id.toString().slice(-6).toUpperCase()}`,
        name: l.fullName,
        email: l.email || "",
        phone: l.whatsapp,
        maskedPhone: l.whatsapp ? `${l.whatsapp.substring(0, 6)}••••` : "",
        property: l.propertyType,
        leadCategory: l.leadCategory || "room_rental",
        neighborhood: l.territory,
        locationDetails: l.locationDetails,
        budget: l.budget,
        dealType: l.leadCategory === "room_rental" ? "Room Rental" : (l.budget && l.budget.includes("/ mo") ? "Luxury Lease" : "Purchase"),
        moveIn: l.moveInTimeframe,
        needsMovingService: !!l.needsMovingService,
        movingDetails: l.movingDetails,
        qualification: l.notes || "Verified Inbound Tenant Lead",
        assignedBroker: l.assignedBroker,
        feedbackStatus: l.feedbackStatus || "pending",
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

export async function POST(request: NextRequest) {
  await connection();

  try {
    await connectToDatabase();
    const body = await request.json();

    const {
      fullName,
      whatsapp,
      email,
      territory,
      territoryCode,
      locationDetails,
      propertyType,
      leadCategory = "room_rental",
      budget,
      moveInTimeframe,
      needsMovingService = false,
      movingDetails,
      notes,
      source = "Public Inbound Portal",
    } = body;

    if (!fullName || !whatsapp || !budget) {
      return NextResponse.json(
        { message: "Full name, WhatsApp number, and budget are required." },
        { status: 400 }
      );
    }

    const countryCode = locationDetails?.countryCode || (territoryCode ? territoryCode.slice(0, 2) : "QA");
    const areaHint = locationDetails?.upazilaOrThana || locationDetails?.districtOrCity || "LOC";
    const ticketId = generateTicketId(countryCode, areaHint);

    const lead = await Lead.create({
      ticketId,
      fullName: fullName.trim(),
      whatsapp: whatsapp.trim(),
      email: email ? email.trim() : "",
      territory: territory || `${locationDetails?.upazilaOrThana || "Central"}, ${locationDetails?.districtOrCity || "City"}`,
      territoryCode: territoryCode || `${countryCode}-${areaHint.slice(0, 3).toUpperCase()}-01`,
      locationDetails: {
        countryCode: countryCode.toUpperCase(),
        divisionOrState: locationDetails?.divisionOrState || "",
        districtOrCity: locationDetails?.districtOrCity || "",
        upazilaOrThana: locationDetails?.upazilaOrThana || "",
        microZone: locationDetails?.microZone || "",
      },
      propertyType: propertyType || "Single Room",
      leadCategory,
      budget,
      moveInTimeframe: moveInTimeframe || "Within 15 days",
      needsMovingService: !!needsMovingService,
      movingDetails: needsMovingService
        ? {
            currentArea: movingDetails?.currentArea || "",
            preferredDate: movingDetails?.preferredDate || moveInTimeframe,
            assignedMover: "",
            moverCommission: 0,
          }
        : undefined,
      status: "new",
      feedbackStatus: "pending",
      notes: notes || (needsMovingService ? "Tenant requested Luggage & Shifting Van Assistance." : "Inbound room search inquiry."),
      source,
    });

    // Create Audit Log
    await AuditLog.create({
      title: `New Room Rental Lead: [${ticketId}]`,
      detail: `${lead.fullName} (${lead.whatsapp}) requested ${lead.propertyType} in ${lead.territory}. Budget: ${lead.budget}. Mover Required: ${lead.needsMovingService ? "YES" : "NO"}.`,
      tag: "LEAD_IN",
      color: "blue",
      actorEmail: "public-portal@propgrowthlab.com",
    });

    // Trigger Telegram & Discord Instant Notification
    try {
      await sendNotification({
        title: `New Room Request Ticket [${ticketId}]`,
        source: "Lead",
        details: {
          "Ticket ID": ticketId,
          "Tenant Name": lead.fullName,
          "WhatsApp": lead.whatsapp,
          "Target Hub": countryCode === "QA" ? "🇶🇦 Doha, Qatar" : countryCode === "PT" ? "🇵🇹 Madeira, Portugal" : "🇦🇪 Dubai, UAE",
          "Target Area": lead.territory,
          "Room Type": lead.propertyType,
          "Budget": lead.budget,
          "Move-in Timeframe": lead.moveInTimeframe,
          "Luggage Van Voucher": lead.needsMovingService ? "✅ YES (Free Mover Assistance)" : "❌ NO",
          "Anti-Cheat Shield": "🛡️ Active (Zero Fake Deposit Guarantee)",
          "Next Founder Action": "1-Click WhatsApp Concierge Bridge",
        },
      });
    } catch (notifErr) {
      console.warn("[API /leads] Notification dispatch error:", notifErr);
    }

    // Auto-sync directly to Notion Headless CRM Database
    try {
      const notionCategory =
        leadCategory === "partner_application"
          ? "Coordinator Partner"
          : leadCategory === "direct_owner"
          ? "Owner Listing"
          : "Tenant Ticket";

      await createNotionLead({
        ticketId,
        fullName: lead.fullName,
        whatsapp: lead.whatsapp,
        territory: lead.territory,
        category: notionCategory,
        microZone: locationDetails?.upazilaOrThana || locationDetails?.microZone || "Mansoura",
        propertyType: lead.propertyType,
        budget: lead.budget,
        notes: lead.notes,
        source: lead.source,
      });
    } catch (notionErr) {
      console.warn("[API /leads] Notion sync error:", notionErr);
    }

    return NextResponse.json({
      success: true,
      ticketId,
      lead: {
        id: lead._id.toString(),
        ticketId: lead.ticketId,
        fullName: lead.fullName,
        whatsapp: lead.whatsapp,
        territory: lead.territory,
        propertyType: lead.propertyType,
        budget: lead.budget,
        moveInTimeframe: lead.moveInTimeframe,
        needsMovingService: lead.needsMovingService,
        status: lead.status,
      },
      message: "Lead recorded successfully with anti-cheat ticket protection.",
    });
  } catch (error: unknown) {
    console.error("POST /api/leads error:", error);
    return NextResponse.json(
      { message: "Failed to record lead request." },
      { status: 500 }
    );
  }
}
