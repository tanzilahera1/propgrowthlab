/**
 * Multi-Channel Notification Dispatcher
 * Sends instant mission-critical alerts to Telegram & Discord
 */

interface NotificationPayload {
  title: string;
  source: "Lead" | "Order" | "Subscription" | "Partner" | "Audit";
  details: Record<string, string | number | undefined>;
}

export async function sendNotification({
  title,
  source,
  details,
}: NotificationPayload): Promise<{ telegram: boolean; discord: boolean }> {
  let telegramSuccess = false;
  let discordSuccess = false;

  const formattedDetails = Object.entries(details)
    .filter(([_, value]) => value !== undefined && value !== "")
    .map(([key, value]) => `• <b>${key}:</b> ${value}`)
    .join("\n");

  // 1. Telegram Dispatch
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (botToken && chatId) {
    try {
      const tgText = `🚀 <b>[PropGrowth Lab Alert]</b>\n<b>${title}</b>\n<i>Source: ${source}</i>\n\n${formattedDetails}\n\n⏱ <i>${new Date().toISOString()}</i>`;
      const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: tgText,
          parse_mode: "HTML",
        }),
      });
      telegramSuccess = res.ok;
    } catch (err) {
      console.error("[Notification] Telegram dispatch error:", err);
    }
  }

  // 2. Discord Webhook Dispatch
  const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (discordWebhookUrl) {
    try {
      const discordEmbed = {
        title: `PropGrowth Lab: ${title}`,
        color: source === "Lead" ? 0x10b981 : source === "Order" ? 0x3b82f6 : 0x8b5cf6,
        description: Object.entries(details)
          .filter(([_, value]) => value !== undefined && value !== "")
          .map(([k, v]) => `**${k}:** ${v}`)
          .join("\n"),
        footer: {
          text: `PropGrowth Lab Engine • ${source}`,
        },
        timestamp: new Date().toISOString(),
      };

      const res = await fetch(discordWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "PropGrowth Lab Alert",
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
