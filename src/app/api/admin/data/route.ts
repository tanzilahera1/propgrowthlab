import { NextRequest, NextResponse } from "next/server";
import { connection } from "next/server";
import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { isStaffRole, formatUserRole } from "@/types/enums";
import UserModel from "@/models/User";
import Lead from "@/models/Lead";
import Subscription from "@/models/Subscription";
import Order from "@/models/Order";
import EscrowDeal from "@/models/EscrowDeal";
import AgencyProperty from "@/models/AgencyProperty";
import AuditLog from "@/models/AuditLog";
import Territory from "@/models/Territory";
import { createNotionLead, getNotionLeads } from "@/lib/notionSync";

export async function GET() {
  await connection();

  try {
    const session = await auth();
    if (!session?.user?.email || !isStaffRole(session.user.role)) {
      return NextResponse.json(
        { message: "Access restricted to authenticated staff personnel." },
        { status: 403 }
      );
    }

    await connectToDatabase();

    const [
      dbLeads,
      dbSubs,
      dbOrders,
      dbAgency,
      dbEscrow,
      dbUsers,
      dbAuditLogs,
      dbTerritories,
      notionLeads,
    ] = await Promise.all([
      Lead.find({}).sort({ createdAt: -1 }).limit(100),
      Subscription.find({}).sort({ createdAt: -1 }).limit(50),
      Order.find({}).sort({ createdAt: -1 }).limit(50),
      AgencyProperty.find({}).sort({ createdAt: -1 }).limit(50),
      EscrowDeal.find({}).sort({ createdAt: -1 }).limit(50),
      UserModel.find({})
        .select("-password -resetToken -resetTokenExpiry")
        .sort({ createdAt: -1 })
        .limit(100),
      AuditLog.find({}).sort({ createdAt: -1 }).limit(50),
      Territory.find({ status: "active" })
        .sort({ countryName: 1, upazilaOrThana: 1 })
        .limit(100),
      getNotionLeads(),
    ]);

    const leads = dbLeads.map((l) => ({
      id: l._id.toString(),
      ticketId: l.ticketId || `TKT-${l._id.toString().slice(-6).toUpperCase()}`,
      fullName: l.fullName,
      whatsapp: l.whatsapp,
      territory: l.territory,
      propertyType: l.propertyType,
      leadCategory: l.leadCategory || "room_rental",
      budget: l.budget,
      moveIn: l.moveInTimeframe || "Immediate",
      needsMovingService: !!l.needsMovingService,
      movingDetails: l.movingDetails,
      locationDetails: l.locationDetails,
      feedbackStatus: l.feedbackStatus || "pending",
      status: (l.status === "viewing_scheduled" || l.status === "archived"
        ? "closed"
        : l.status) as "new" | "dispatched" | "closed",
      assignedBroker: l.assignedBroker,
      date: new Date(l.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    }));

    // Merge Notion leads into staff admin view
    const mappedNotionLeads = (notionLeads || []).map((nl: any) => ({
      id: nl.id,
      ticketId: nl.ticketId,
      fullName: nl.name,
      whatsapp: nl.phone,
      territory: nl.neighborhood,
      propertyType: nl.property,
      leadCategory: nl.category.toLowerCase().replace(/\s+/g, "_"),
      budget: nl.budget,
      moveIn: "Immediate",
      needsMovingService: false,
      movingDetails: undefined,
      locationDetails: undefined,
      feedbackStatus: "pending",
      status: (nl.status === "deal_closed" || nl.status === "lost"
        ? "closed"
        : nl.status === "viewing_scheduled" || nl.status === "3-way_bridge_active"
        ? "dispatched"
        : "new") as "new" | "dispatched" | "closed",
      assignedBroker: "Notion CRM Pipeline",
      date: nl.createdTime
        ? new Date(nl.createdTime).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
        : "Recent",
    }));

    const existingTicketIds = new Set(mappedNotionLeads.map((nl: any) => nl.ticketId));
    const mergedLeads = [
      ...mappedNotionLeads,
      ...leads.filter((l) => !existingTicketIds.has(l.ticketId)),
    ];

    const subscriptions = dbSubs.map((s) => ({
      id: s._id.toString(),
      brokerName: s.brokerName,
      whatsapp: s.whatsapp,
      territory: s.territory,
      tier: (s.planTier.charAt(0).toUpperCase() + s.planTier.slice(1)) as
        | "Silver"
        | "Gold"
        | "Platinum",
      quotaDaily: s.dailyQuota,
      deliveredToday: s.leadsDeliveredToday,
      monthlyQuota: s.monthlyQuota,
      status: (s.status === "active" ? "Active" : "Paused") as
        | "Active"
        | "Paused",
      nextBilling: new Date(s.nextRenewalDate).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    }));

    const templates = dbOrders.map((o) => ({
      id: o._id.toString(),
      orderId: "ORD-" + o._id.toString().slice(-4).toUpperCase(),
      clientName: o.clientName,
      email: o.clientEmail,
      templateName: o.templateName,
      tier: (o.orderType === "code"
        ? "Source Code ($19)"
        : "Turnkey 48h ($199)") as
        | "Source Code ($19)"
        | "Turnkey 48h ($199)",
      amount: `$${o.amount}`,
      licenseKey: `PGL-${(o.templateId || "LIC").toUpperCase()}-${o._id
        .toString()
        .slice(-4)
        .toUpperCase()}-PRO`,
      githubInvite: (o.status === "delivered"
        ? "Granted"
        : o.status === "pending"
        ? "Pending"
        : "Active") as "Active" | "Pending" | "Granted",
      status: (o.status === "refunded" ? "Revoked" : "Active") as
        | "Active"
        | "Revoked",
      date: new Date(o.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    }));

    const agencyProperties = dbAgency.map((a) => ({
      id: a._id.toString(),
      propertyId: a.propertyId,
      name: a.name,
      ownerName: a.ownerName,
      territory: a.territory,
      engineDomain: a.engineDomain,
      directGmv: `$${a.directGmv.toLocaleString()}`,
      otaSavings: `$${a.otaSavings.toLocaleString()}`,
      directShare: `${a.directShare}%`,
      stripeStatus: a.stripeStatus,
      icalStatus: a.icalStatus,
      status: a.status,
    }));

    const escrowDeals = dbEscrow.map((e) => ({
      id: e._id.toString(),
      dealRef: e.dealRef,
      propertyTitle: e.dealTitle,
      buyerName: e.clientName || e.brokerName,
      buyerEmail: e.clientEmail || "client@gmail.com",
      ownerName: e.ownerName || "Property Host / Owner",
      brokerFirm: e.brokerName,
      territory: e.territory,
      territoryCode: e.territoryCode || "GLOBAL-01",
      dealValue: `$${e.dealValue.toLocaleString()}`,
      depositAmount: `$${(e.depositAmount || 0).toLocaleString()}`,
      directPaymentLink:
        e.directPaymentLink ||
        `https://propgrowthlab.com/escrow/checkout?dealRef=${e.dealRef}`,
      escrowCustodyStatus: e.escrowCustodyStatus || "HELD_IN_ESCROW",
      ownerDisbursement: `$${(e.ownerDisbursement || 0).toLocaleString()}`,
      platformFee: `$${(e.platformFee || 0).toLocaleString()}`,
      escrowSplit: `${e.splitRatio || "70/30"} Split ($${(
        e.brokerCommission || 0
      ).toLocaleString()} Broker)`,
      status: (e.status === "Paid"
        ? "Settled"
        : e.status === "Under Contract"
        ? "Under Contract"
        : "In Escrow") as "Under Contract" | "In Escrow" | "Settled",
      updatedAt: new Date(e.updatedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    }));

    const territories = dbTerritories.map((t) => ({
      id: t._id.toString(),
      code: t.code,
      countryCode: t.countryCode,
      countryName: t.countryName,
      divisionOrState: t.divisionOrState,
      districtOrCity: t.districtOrCity,
      upazilaOrThana: t.upazilaOrThana,
      microZone: t.microZone,
      postalCode: t.postalCode || "",
      tier: t.tier,
      activeBrokersCount: t.activeBrokersCount,
      monthlyQuotaAllocation: t.monthlyQuotaAllocation,
      exclusiveBroker: t.exclusiveBrokerName || "Open Pool",
      status: t.status,
    }));

    const adminUsers = dbUsers.map((u) => ({
      id: u._id.toString(),
      name: u.fullname,
      email: u.email,
      role: formatUserRole(u.role) as any,
      territories:
        Array.isArray(u.territories) && u.territories.length > 0
          ? u.territories
          : ["Global"],
      status: (u.status === "Suspended" ? "Suspended" : "Active") as
        | "Active"
        | "Suspended",
      lastLogin: u.lastLogin
        ? new Date(u.lastLogin).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
          })
        : "Active Now",
    }));

    const auditLogs = dbAuditLogs.map((log) => ({
      id: log._id.toString(),
      title: log.title,
      detail: log.detail,
      time: new Date(log.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      tag: log.tag,
      color: log.color,
    }));

    return NextResponse.json({
      success: true,
      data: {
        leads: mergedLeads,
        subscriptions,
        templates,
        agencyProperties,
        escrowDeals,
        adminUsers,
        auditLogs,
        territories,
      },
    });
  } catch (error: unknown) {
    console.error("GET /api/admin/data error:", error);
    return NextResponse.json(
      { message: "Internal server error fetching admin data." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  await connection();

  try {
    const session = await auth();
    if (!session?.user?.email || !isStaffRole(session.user.role)) {
      return NextResponse.json(
        { message: "Access restricted to authenticated staff personnel." },
        { status: 403 }
      );
    }

    await connectToDatabase();
    const body = await request.json();
    const { action, payload } = body;

    switch (action) {
      case "create_lead": {
        const ticketId = payload.ticketId || `TKT-ADM-${Math.floor(1000 + Math.random() * 9000)}`;
        const newLead = await Lead.create({
          ticketId,
          fullName: payload.fullName,
          whatsapp: payload.whatsapp,
          email: payload.email || "",
          territory: payload.territory || "Global",
          propertyType: payload.propertyType || "Luxury Property",
          budget: payload.budget || "$1,000,000",
          moveInTimeframe: payload.moveIn || "Within 30 Days",
          status: "new",
          source: "Manual Staff Entry",
        });

        await AuditLog.create({
          title: "Lead Manually Logged",
          detail: `${newLead.fullName} (${newLead.territory}) registered with budget ${newLead.budget}.`,
          tag: "LEAD_IN",
          color: "blue",
          actorEmail: session.user.email,
        });

        // Auto-sync to Notion CRM Database
        try {
          await createNotionLead({
            ticketId,
            fullName: newLead.fullName,
            whatsapp: newLead.whatsapp,
            territory: newLead.territory,
            propertyType: newLead.propertyType,
            budget: newLead.budget,
            category: "Tenant Ticket",
            source: "Staff Entry",
            notes: `Staff Entry logged by ${session.user.email}`,
          });
        } catch (notionErr) {
          console.warn("[Admin API] Notion sync warning:", notionErr);
        }

        return NextResponse.json({ success: true, lead: newLead });
      }

      case "dispatch_lead": {
        const updated = await Lead.findByIdAndUpdate(
          payload.leadId,
          {
            status: "dispatched",
            assignedBroker: payload.brokerName,
            feedbackStatus: "viewing_arranged",
          },
          { new: true }
        );

        await AuditLog.create({
          title: "Lead Dispatched to Broker",
          detail: `Lead ${updated?.ticketId || updated?.fullName} routed to ${payload.brokerName}.`,
          tag: "DISPATCH",
          color: "blue",
          actorEmail: session.user.email,
        });

        return NextResponse.json({ success: true, lead: updated });
      }

      case "dispatch_mover": {
        const updated = await Lead.findByIdAndUpdate(
          payload.leadId,
          {
            "movingDetails.assignedMover": payload.moverName,
            "movingDetails.moverCommission": payload.moverCommission || 0,
          },
          { new: true }
        );

        await AuditLog.create({
          title: "Mover Assigned to Lead",
          detail: `Luggage & Shifting partner ${payload.moverName} assigned to Lead ${updated?.ticketId || updated?.fullName}. Commission: ${payload.moverCommission || 0}`,
          tag: "MOVER_DISPATCH",
          color: "green",
          actorEmail: session.user.email,
        });

        return NextResponse.json({ success: true, lead: updated });
      }

      case "update_lead_feedback": {
        const isClosed = payload.feedbackStatus === "deal_closed";
        const updated = await Lead.findByIdAndUpdate(
          payload.leadId,
          {
            feedbackStatus: payload.feedbackStatus,
            status: isClosed ? "closed" : payload.status || "dispatched",
            brokerCommissionShare: payload.brokerCommissionShare || 0,
          },
          { new: true }
        );

        await AuditLog.create({
          title: "Lead Feedback / Audit Updated",
          detail: `Lead ${updated?.ticketId || updated?.fullName} status set to: ${payload.feedbackStatus}. Deal Closed: ${isClosed ? "YES" : "NO"}.`,
          tag: "FEEDBACK",
          color: isClosed ? "green" : "blue",
          actorEmail: session.user.email,
        });

        return NextResponse.json({ success: true, lead: updated });
      }

      case "delete_lead": {
        await Lead.findByIdAndDelete(payload.leadId);
        return NextResponse.json({ success: true });
      }

      case "toggle_subscription": {
        const sub = await Subscription.findById(payload.subscriptionId);
        if (sub) {
          sub.status = sub.status === "active" ? "paused" : "active";
          await sub.save();
        }
        return NextResponse.json({ success: true, subscription: sub });
      }

      case "revoke_license": {
        await Order.findByIdAndUpdate(payload.orderId, { status: "refunded" });
        return NextResponse.json({ success: true });
      }

      case "broadcast_alert": {
        const log = await AuditLog.create({
          title: "CEO Broadcast Sent to All Brokers",
          detail: payload.message,
          tag: "BROADCAST",
          color: "red",
          actorEmail: session.user.email,
        });
        return NextResponse.json({ success: true, log });
      }

      case "disburse_escrow": {
        const updated = await EscrowDeal.findByIdAndUpdate(
          payload.dealId,
          {
            status: "Paid",
            escrowCustodyStatus: "DISBURSED",
            disbursedAt: new Date(),
          },
          { new: true }
        );
        await AuditLog.create({
          title: "Escrow Disbursed Automatically (Plan-1)",
          detail: `Deal ${updated?.dealRef} ($${(updated?.dealValue || 0).toLocaleString()}) disbursed: 70% to Owner, Broker commission paid.`,
          tag: "ESCROW",
          color: "green",
          actorEmail: session.user.email,
        });
        return NextResponse.json({ success: true, deal: updated });
      }

      default:
        return NextResponse.json(
          { message: "Unrecognized action." },
          { status: 400 }
        );
    }
  } catch (error: unknown) {
    console.error("POST /api/admin/data error:", error);
    return NextResponse.json(
      { message: "Internal server error processing admin command." },
      { status: 500 }
    );
  }
}

