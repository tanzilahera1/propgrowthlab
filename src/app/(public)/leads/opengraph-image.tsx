import { ImageResponse } from "next/og";

export const alt = "Broker Daily Lead Quotas | PropGrowth Lab";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0c0a09",
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.16) 0%, transparent 65%), radial-gradient(circle at 15% 15%, rgba(245, 158, 11, 0.08) 0%, transparent 45%), radial-gradient(circle at 85% 85%, rgba(16, 185, 129, 0.08) 0%, transparent 45%)",
          fontFamily: "sans-serif",
          color: "#ffffff",
          position: "relative",
        }}
      >
        {/* Left Wing Ambient Decorator */}
        <div
          style={{
            position: "absolute",
            left: "50px",
            top: "50px",
            bottom: "50px",
            width: "3px",
            borderRadius: "2px",
            background: "linear-gradient(to bottom, transparent, rgba(16, 185, 129, 0.35), transparent)",
            display: "flex",
          }}
        />
        {/* Right Wing Ambient Decorator */}
        <div
          style={{
            position: "absolute",
            right: "50px",
            top: "50px",
            bottom: "50px",
            width: "3px",
            borderRadius: "2px",
            background: "linear-gradient(to bottom, transparent, rgba(16, 185, 129, 0.35), transparent)",
            display: "flex",
          }}
        />

        {/* 630x630 SAFE ZONE CONTAINER (Perfect 1:1 WhatsApp crop & 16:9 Landscape) */}
        <div
          style={{
            width: "600px",
            height: "540px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            textAlign: "center",
            padding: "36px 30px",
            borderRadius: "28px",
            backgroundColor: "rgba(18, 16, 15, 0.92)",
            border: "1.5px solid rgba(16, 185, 129, 0.38)",
          }}
        >
          {/* 1. Header */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", fontSize: "26px", fontWeight: 800, letterSpacing: "-0.5px" }}>
                <span>PropGrowth</span>
                <span style={{ color: "#10b981", marginLeft: "6px" }}>Lab</span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "6px 14px",
                borderRadius: "9999px",
                backgroundColor: "rgba(16, 185, 129, 0.14)",
                border: "1px solid rgba(16, 185, 129, 0.35)",
                color: "#34d399",
                fontSize: "11px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "1.2px",
              }}
            >
              BROKER DAILY LEAD QUOTAS
            </div>
          </div>

          {/* 2. Headline & Value Prop */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                fontSize: "36px",
                fontWeight: 900,
                lineHeight: 1.15,
                letterSpacing: "-1px",
                color: "#ffffff",
                marginBottom: "14px",
              }}
            >
              <span>Stop Buying Cold Lists.</span>
              <span style={{ color: "#10b981", marginLeft: "8px" }}>Get Verified Leads.</span>
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "16px",
                lineHeight: 1.45,
                color: "#a8a29e",
                maxWidth: "500px",
                textAlign: "center",
              }}
            >
              Pre-screened, high-budget tenant and buyer inquiries dispatched directly to your WhatsApp across USA, UK, EU & UAE.
            </div>
          </div>

          {/* 3. Safe-Zone Highlights Footer */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "8px 14px",
                borderRadius: "10px",
                backgroundColor: "#1c1917",
                border: "1px solid #292524",
                color: "#34d399",
                fontSize: "12px",
                fontWeight: 700,
              }}
            >
              DAILY WHATSAPP QUOTAS
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "8px 14px",
                borderRadius: "10px",
                backgroundColor: "#1c1917",
                border: "1px solid #292524",
                color: "#ffffff",
                fontSize: "12px",
                fontWeight: 700,
              }}
            >
              VERIFIED INQUIRIES
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "8px 14px",
                borderRadius: "10px",
                backgroundColor: "#1c1917",
                border: "1px solid #292524",
                color: "#fbbf24",
                fontSize: "12px",
                fontWeight: 700,
              }}
            >
              EXCLUSIVE TERRITORY LOCK
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
