export const COMPANY_CONTACT = {
  name: "PropGrowth Lab",
  whatsappNumber: "+8801330807372",
  whatsappDigits: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8801330807372",
  whatsappDisplay: "+880 1330-807372",
  email: "support@propgrowthlab.com",
};

export function getCompanyWhatsAppUrl(message?: string): string {
  const digits = COMPANY_CONTACT.whatsappDigits.replace(/[^0-9]/g, "");
  if (!message) {
    return `https://wa.me/${digits}`;
  }
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
