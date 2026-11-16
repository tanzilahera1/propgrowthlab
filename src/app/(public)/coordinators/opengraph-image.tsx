import { ImageResponse } from "next/og";

export const alt = "The Coordinator Network | PropGrowth Lab";
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
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 70px",
          backgroundColor: "#0c0a09",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(245, 158, 11, 0.22) 0%, transparent 55%), radial-gradient(circle at 10% 90%, rgba(217, 119, 6, 0.15) 0%, transparent 45%)",
          fontFamily: "sans-serif",
          color: "#ffffff",
          border: "2px solid rgba(245, 158, 11, 0.3)",
        }}
      >
        {/* Top Header Bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #f59e0b, #d97706)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: "22px",
                color: "#0c0a09",
                marginRight: "14px",
              }}
            >
              P
            </div>
            <div style={{ display: "flex", fontSize: "28px", fontWeight: 800, letterSpacing: "-0.5px" }}>
              <span>PropGrowth</span>
              <span style={{ color: "#f59e0b", marginLeft: "6px" }}>Lab</span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 18px",
              borderRadius: "9999px",
              backgroundColor: "rgba(245, 158, 11, 0.15)",
              border: "1px solid rgba(245, 158, 11, 0.4)",
              color: "#fbbf24",
              fontSize: "13px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            TERRITORY COORDINATOR NETWORK
          </div>
        </div>

        {/* Center Headline & Value Proposition */}
        <div style={{ display: "flex", flexDirection: "column", maxWidth: "980px" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: "56px",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-1.5px",
              color: "#ffffff",
              marginBottom: "18px",
            }}
          >
            <span>Close Inbound Deals & Keep</span>
            <span style={{ color: "#f59e0b", marginLeft: "14px" }}>70% Commission</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "22px",
              lineHeight: 1.45,
              color: "#a8a29e",
            }}
          >
            We supply verified high-budget buyers and room rental clients directly to your phone.
            You conduct local viewings with zero upfront desk fees.
          </div>
        </div>

        {/* Bottom Feature Badges */}
        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12px 22px",
              borderRadius: "14px",
              backgroundColor: "#1c1917",
              border: "1px solid #292524",
              color: "#fbbf24",
              fontSize: "16px",
              fontWeight: 700,
              marginRight: "16px",
            }}
          >
            70% DEAL COMMISSION
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12px 22px",
              borderRadius: "14px",
              backgroundColor: "#1c1917",
              border: "1px solid #292524",
              color: "#ffffff",
              fontSize: "16px",
              fontWeight: 700,
              marginRight: "16px",
            }}
          >
            ZERO DESK FEES
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12px 22px",
              borderRadius: "14px",
              backgroundColor: "#1c1917",
              border: "1px solid #292524",
              color: "#ffffff",
              fontSize: "16px",
              fontWeight: 700,
              marginRight: "16px",
            }}
          >
            NEUTRAL TITLE ESCROW SLA
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12px 22px",
              borderRadius: "14px",
              backgroundColor: "#1c1917",
              border: "1px solid #292524",
              color: "#10b981",
              fontSize: "16px",
              fontWeight: 700,
            }}
          >
            MAX 2 AGENTS / CITY
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
