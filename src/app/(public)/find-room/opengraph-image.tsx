import { ImageResponse } from "next/og";

export const alt = "Find Verified Rooms & Co-Living | PropGrowth Lab";
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
          backgroundColor: "#09090b",
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.22) 0%, transparent 65%), radial-gradient(circle at 10% 20%, rgba(5, 150, 105, 0.12) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(16, 185, 129, 0.12) 0%, transparent 40%)",
          fontFamily: "sans-serif",
          color: "#ffffff",
          position: "relative",
        }}
      >
        {/* Ambient Side Accent Brackets */}
        <div
          style={{
            position: "absolute",
            left: "60px",
            top: "60px",
            bottom: "60px",
            width: "4px",
            borderRadius: "2px",
            background: "linear-gradient(to bottom, transparent, rgba(16, 185, 129, 0.45), transparent)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "60px",
            top: "60px",
            bottom: "60px",
            width: "4px",
            borderRadius: "2px",
            background: "linear-gradient(to bottom, transparent, rgba(16, 185, 129, 0.45), transparent)",
            display: "flex",
          }}
        />

        {/* 630x630 HIGH-IMPACT THUMBNAIL SAFE ZONE */}
        <div
          style={{
            width: "630px",
            height: "630px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            textAlign: "center",
            padding: "44px 28px",
          }}
        >
          {/* Top: Brand & Pill */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div style={{ display: "flex", fontSize: "34px", fontWeight: 900, letterSpacing: "-0.5px" }}>
              <span>PropGrowth</span>
              <span style={{ color: "#10b981", marginLeft: "7px" }}>Lab</span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "6px 18px",
                borderRadius: "9999px",
                backgroundColor: "rgba(16, 185, 129, 0.2)",
                border: "1.5px solid rgba(16, 185, 129, 0.5)",
                color: "#34d399",
                fontSize: "14px",
                fontWeight: 800,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
              }}
            >
              VERIFIED ROOM & CO-LIVING
            </div>
          </div>

          {/* Center: GIANT BOLD HEADLINES */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: "52px",
                fontWeight: 900,
                lineHeight: 1.05,
                color: "#ffffff",
                letterSpacing: "-1.5px",
              }}
            >
              VERIFIED ROOMS
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "58px",
                fontWeight: 900,
                lineHeight: 1.05,
                color: "#10b981",
                letterSpacing: "-1.5px",
              }}
            >
              ZERO FRAUD
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "26px",
                fontWeight: 800,
                lineHeight: 1.2,
                color: "#e5e7eb",
                letterSpacing: "-0.5px",
                marginTop: "6px",
              }}
            >
              ANTI-CHEAT TICKET SYSTEM
            </div>
          </div>

          {/* Bottom: 2 LARGE PROMINENT STAT BADGES */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "14px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "12px 22px",
                borderRadius: "14px",
                backgroundColor: "#18181b",
                border: "1.5px solid rgba(16, 185, 129, 0.4)",
                color: "#34d399",
                fontSize: "18px",
                fontWeight: 800,
              }}
            >
              ZERO FAKE DEPOSITS
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "12px 22px",
                borderRadius: "14px",
                backgroundColor: "#18181b",
                border: "1.5px solid #27272a",
                color: "#ffffff",
                fontSize: "18px",
                fontWeight: 800,
              }}
            >
              MOVER VOUCHERS
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
