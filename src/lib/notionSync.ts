/**
 * Notion Headless CRM & Sync Engine
 * Synchronizes incoming tickets from web forms directly into Notion Database
 * and allows /admin and /dashboard to query Notion in real-time.
 */

export const NOTION_RENTAL_DATABASE_ID =
  process.env.NOTION_RENTAL_DATABASE_ID || "41b4bcfc-2b91-81da-8e68-eacd4ba39e8e";

interface CreateNotionLeadParams {
  ticketId: string;
  fullName: string;
  whatsapp: string;
  territory: string;
  category?: "Tenant Ticket" | "Owner Listing" | "Mover Partner" | "Agency Audit" | "Coordinator Partner";
  microZone?: string;
  hub?: "Doha Qatar" | "Madeira Portugal" | "Dubai UAE";
  propertyType?: string;
  budget?: string | number;
  notes?: string;
  source?: string;
  amenities?: string[];
}

/**
 * Creates a new lead/ticket record in Notion
 */
export async function createNotionLead(params: CreateNotionLeadParams): Promise<boolean> {
  const apiKey = process.env.NOTION_API_KEY;
  if (!apiKey) {
    // If Notion API Key is not set in environment, skip gracefully
    return false;
  }

  try {
    const cleanPhone = params.whatsapp.replace(/[^0-9]/g, "");
    const waLink = `https://wa.me/${cleanPhone}`;

    // Extract numeric budget if possible
    let numericBudget = 0;
    if (typeof params.budget === "number") {
      numericBudget = params.budget;
    } else if (typeof params.budget === "string") {
      const match = params.budget.replace(/,/g, "").match(/\d+/);
      if (match) {
        numericBudget = parseInt(match[0], 10);
      }
    }

    // Determine Hub
    let targetHub = params.hub || "Doha Qatar";
    const territoryLower = (params.territory || "").toLowerCase();
    if (territoryLower.includes("madeira") || territoryLower.includes("portugal")) {
      targetHub = "Madeira Portugal";
    } else if (territoryLower.includes("dubai") || territoryLower.includes("uae")) {
      targetHub = "Dubai UAE";
    }

    const payload = {
      parent: { database_id: NOTION_RENTAL_DATABASE_ID },
      properties: {
        "Listing / Ticket ID": {
          rich_text: [
            {
              text: { content: params.ticketId },
            },
          ],
        },
        "Ticket / Title": {
          title: [
            {
              text: {
                content: params.fullName,
              },
            },
          ],
        },
        Category: {
          select: { name: params.category || "Tenant Ticket" },
        },
        "Contact Name": {
          rich_text: [
            {
              text: { content: params.fullName },
            },
          ],
        },
        WhatsApp: {
          phone_number: params.whatsapp,
        },
        "WhatsApp Link": {
          url: waLink,
        },
        "Target Hub": {
          select: { name: targetHub },
        },
        "Micro-Zone": {
          select: { name: params.microZone || "Mansoura" },
        },
        "Room Type": {
          select: { name: params.propertyType || "Single Room" },
        },
        "Monthly Rent QAR": {
          number: numericBudget,
        },
        Status: {
          status: { name: "New Lead" },
        },
        Source: {
          select: { name: params.source || "Website Form" },
        },
        Notes: {
          rich_text: [
            {
              text: {
                content: params.notes || `Inbound inquiry for ${params.territory}`,
              },
            },
          ],
        },
        ...(params.amenities && params.amenities.length > 0
          ? {
              "Amenities & Inclusions": {
                multi_select: params.amenities.map((name) => ({ name })),
              },
            }
          : {}),
      },
    };

    const res = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errBody = await res.text();
      console.warn("[NotionSync] Failed to create page in Notion:", errBody);
      return false;
    }

    return true;
  } catch (err) {
    console.error("[NotionSync] Error syncing lead to Notion:", err);
    return false;
  }
}

/**
 * Fetches leads directly from Notion to serve /admin and /dashboard
 */
export async function getNotionLeads() {
  const apiKey = process.env.NOTION_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch(
      `https://api.notion.com/v1/databases/${NOTION_RENTAL_DATABASE_ID}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          page_size: 100,
          sorts: [{ timestamp: "created_time", direction: "descending" }],
        }),
        next: { revalidate: 10 }, // Cache for 10 seconds (Turbopack ISR)
      }
    );

    if (!res.ok) return null;

    const data = await res.json();
    return data.results.map((page: any) => {
      const props = page.properties;
      const titleProp = props["Ticket / Title"]?.title?.[0]?.plain_text || "Untitled";
      const autoId = props["ID"]?.unique_id ? `${props["ID"].unique_id.prefix || "PGL"}-${props["ID"].unique_id.number}` : "";
      const ticketIdProp = props["Listing / Ticket ID"]?.rich_text?.[0]?.plain_text || "";
      const cleanTicketId = ticketIdProp || autoId || (titleProp.includes("|") ? titleProp.split("|")[0]?.trim() : page.id.slice(0, 8));
      const cleanTitle = titleProp.includes("|") ? titleProp.split("|")[1]?.trim() : titleProp;
      const contactName = props["Contact Name"]?.rich_text?.[0]?.plain_text || cleanTitle;
      const whatsapp = props["WhatsApp"]?.phone_number || "";
      const waLink = props["WhatsApp Link"]?.url || "";
      const category = props["Category"]?.select?.name || "Tenant Ticket";
      const microZone = props["Micro-Zone"]?.select?.name || "";
      const hub = props["Target Hub"]?.select?.name || "Doha Qatar";
      const roomType = props["Room Type"]?.select?.name || "";
      const rent = props["Monthly Rent QAR"]?.number || 0;
      const status = props["Status"]?.status?.name || "New Lead";
      const commission = props["Commission QAR"]?.number || 0;
      const notes = props["Notes"]?.rich_text?.[0]?.plain_text || "";
      const amenities = props["Amenities & Inclusions"]?.multi_select?.map((m: any) => m.name) || [];

      return {
        id: page.id,
        ticketId: cleanTicketId,
        name: contactName || titleProp,
        phone: whatsapp,
        waLink,
        property: roomType,
        neighborhood: `${microZone}, ${hub}`,
        budget: rent ? `${rent} QAR` : "Negotiable",
        status: status.toLowerCase().replace(/\s+/g, "_"),
        rawStatus: status,
        category,
        commission,
        notes,
        amenities,
        createdTime: page.created_time,
      };
    });
  } catch (err) {
    console.error("[NotionSync] Query error:", err);
    return null;
  }
}
