import { ImageResponse } from "next/og";
import { getTerritoryById } from "@/data/territories";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

interface Props {
  params: Promise<{ territory: string }>;
}

export default async function Image({ params }: Props) {
  const { territory } = await params;
  const data = getTerritoryById(territory);

  const territoryName = data?.name || "Global Market";
  const shortName = data?.shortName || "Territory";
  const avgCommission = data?.avgSaleCommission || "$20,000";
  const slotsRemaining = data?.slotsRemaining ?? 2;

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
            "radial-gradient(circle at 85% 15%, rgba(245, 158, 11, 0.25) 0%, transparent 55%), radial-gradient(circle at 10% 90%, rgba(217, 119, 6, 0.18) 0%, transparent 45%)",
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
            {slotsRemaining} SLOTS OPEN - {shortName.toUpperCase()}
          </div>
        </div>

        {/* Center Headline */}
        <div style={{ display: "flex", flexDirection: "column", maxWidth: "1000px" }}>
          <div
            style={{
              display: "flex",
              fontSize: "20px",
              color: "#f59e0b",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "2px",
              marginBottom: "12px",
            }}
          >
            EXCLUSIVE TERRITORY ALLOCATION
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "52px",
              fontWeight: 900,
              lineHeight: 1.12,
              letterSpacing: "-1.5px",
              color: "#ffffff",
              marginBottom: "16px",
            }}
          >
            {territoryName} Coordinator Portal
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "20px",
              lineHeight: 1.45,
              color: "#a8a29e",
            }}
          >
            Represent pre-screened luxury buyers and high-ticket tenants. Guaranteed 70% commission
            split with zero upfront desk fees.
          </div>
        </div>

        {/* Bottom Highlights */}
        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12px 20px",
              borderRadius: "14px",
              backgroundColor: "#1c1917",
              border: "1px solid #292524",
              color: "#fbbf24",
              fontSize: "15px",
              fontWeight: 700,
              marginRight: "16px",
            }}
          >
            AVG COMMISSION: {avgCommission}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12px 20px",
              borderRadius: "14px",
              backgroundColor: "#1c1917",
              border: "1px solid #292524",
              color: "#10b981",
              fontSize: "15px",
              fontWeight: 700,
              marginRight: "16px",
            }}
          >
            70% PAYOUT TO YOU
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12px 20px",
              borderRadius: "14px",
              backgroundColor: "#1c1917",
              border: "1px solid #292524",
              color: "#ffffff",
              fontSize: "15px",
              fontWeight: 700,
              marginRight: "16px",
            }}
          >
            DIRECT TITLE ESCROW SLA
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12px 20px",
              borderRadius: "14px",
              backgroundColor: "#1c1917",
              border: "1px solid #292524",
              color: "#f59e0b",
              fontSize: "15px",
              fontWeight: 700,
            }}
          >
            MAX 2 COORDINATORS
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
