/**
 * Multi-Channel Notification Dispatcher
 * Sends instant, ultra-detailed mission-critical alerts to Telegram & Discord
 */

interface NotificationPayload {
  title: string;
  source: "Lead" | "Order" | "Subscription" | "Partner" | "Coordinator" | "Audit";
  details: Record<string, string | number | undefined | boolean>;
}

export async function sendNotification({
  title,
  source,
  details,
}: NotificationPayload): Promise<{ telegram: boolean; discord: boolean }> {
  let telegramSuccess = false;
  let discordSuccess = false;

  const NOTION_CRM_URL = "https://app.notion.com/p/41b4bcfc2b9181da8e68eacd4ba39e8e";

  // Clean and format entries
  const entries = Object.entries(details).filter(
    ([_, value]) => value !== undefined && value !== "" && value !== null
  );

  const phoneValue = details["WhatsApp"] || details["phone"] || details["Contact"];
  const cleanPhone = phoneValue ? String(phoneValue).replace(/[^0-9]/g, "") : "";
  const waDirectLink = cleanPhone ? `https://wa.me/${cleanPhone}` : "";

  // 1. Telegram Dispatch (Rich HTML with structured blocks & action links)
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (botToken && chatId) {
    try {
      const formattedLines = entries
        .map(([key, value]) => {
          if (key.toLowerCase().includes("whatsapp") && cleanPhone) {
            return `💬 <b>${key}:</b> <a href="${waDirectLink}">+${cleanPhone} (Click to Chat)</a>`;
          }
          if (key.toLowerCase().includes("budget")) {
            return `💰 <b>${key}:</b> <code>${value}</code>`;
          }
          if (key.toLowerCase().includes("area") || key.toLowerCase().includes("location")) {
            return `📍 <b>${key}:</b> <b>${value}</b>`;
          }
          if (key.toLowerCase().includes("ticket")) {
            return `📋 <b>${key}:</b> <code>${value}</code>`;
          }
          return `• <b>${key}:</b> ${value}`;
        })
        .join("\n");

      const tgText = `🏢 <b>[PropGrowth Lab Instant Dispatch]</b>\n🔥 <b>${title}</b>\n<i>Source: ${source}</i>\n\n${formattedLines}\n\n⚡ <b>Instant Founder Actions:</b>\n${
        waDirectLink ? `👉 <a href="${waDirectLink}"><b>Chat with Client on WhatsApp</b></a>\n` : ""
      }👉 <a href="${NOTION_CRM_URL}"><b>⚡ Open in Notion Deals CRM</b></a>\n\n⏱ <i>${new Date().toLocaleTimeString(
        "en-US",
        { hour: "2-digit", minute: "2-digit" }
      )} | PropGrowth Engine</i>`;

      const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: tgText,
          parse_mode: "HTML",
          disable_web_page_preview: false,
        }),
      });
      telegramSuccess = res.ok;
    } catch (err) {
      console.error("[Notification] Telegram dispatch error:", err);
    }
  }

  // 2. Discord Webhook Dispatch (Rich Embed with Grid Fields & Action Links)
  const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (discordWebhookUrl) {
    try {
      const discordFields = entries.map(([key, value]) => ({
        name: key,
        value:
          key.toLowerCase().includes("whatsapp") && cleanPhone
            ? `[+${cleanPhone}](${waDirectLink})`
            : String(value),
        inline: true,
      }));

      const discordEmbed = {
        title: `🏢 PropGrowth Lab: ${title}`,
        color:
          source === "Lead"
            ? 0x10b981 // Emerald Green
            : source === "Order"
            ? 0xf59e0b // Gold
            : source === "Coordinator" || source === "Partner"
            ? 0x8b5cf6 // Purple
            : 0x3b82f6, // Blue
        description: `**Source:** ${source}\n${
          waDirectLink ? `💬 **[1-Click WhatsApp Chat](${waDirectLink})**\n` : ""
        }📋 **[Open Live Record in Notion CRM](${NOTION_CRM_URL})**`,
        fields: discordFields,
        footer: {
          text: "PropGrowth Lab Auto-Dispatcher • Anti-Cheat Engine",
        },
        timestamp: new Date().toISOString(),
      };

      const res = await fetch(discordWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "PropGrowth Lab HQ",
          embeds: [discordEmbed],
        }),
      });
      discordSuccess = res.ok;
    } catch (err) {
      console.error("[Notification] Discord dispatch error:", err);
    }
  }

  return { telegram: telegramSuccess, discord: discordSuccess };
}
