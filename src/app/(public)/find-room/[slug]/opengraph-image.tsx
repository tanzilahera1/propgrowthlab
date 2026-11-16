import { ImageResponse } from "next/og";
import { getRentalCityConfig } from "@/data/rentalCities";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const config = getRentalCityConfig(slug);

  const cityName = config?.name || "Doha";
  const countryName = config?.countryName || "Qatar";
  const currency = config?.currency || "QAR";
  const subheadline =
    config?.heroSubheadline ||
    "Anti-cheat verified executive room rental matching across micro-zones with mover vouchers.";

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
            "radial-gradient(circle at 85% 15%, rgba(16, 185, 129, 0.2) 0%, transparent 55%), radial-gradient(circle at 10% 90%, rgba(245, 158, 11, 0.18) 0%, transparent 45%)",
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
              backgroundColor: "rgba(16, 185, 129, 0.15)",
              border: "1px solid rgba(16, 185, 129, 0.4)",
              color: "#34d399",
              fontSize: "13px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            LIVE RENTAL NETWORK
          </div>
        </div>

        {/* Center Headline & Location */}
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
            {cityName.toUpperCase()} - {countryName.toUpperCase()}
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: "52px",
              fontWeight: 900,
              lineHeight: 1.12,
              letterSpacing: "-1.5px",
              color: "#ffffff",
              marginBottom: "16px",
            }}
          >
            <span>Find Verified Rooms & Co-Living in</span>
            <span style={{ color: "#f59e0b", marginLeft: "14px" }}>{cityName}</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "20px",
              lineHeight: 1.45,
              color: "#a8a29e",
            }}
          >
            {subheadline}
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
            ANTI-CHEAT TICKETS
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12px 20px",
              borderRadius: "14px",
              backgroundColor: "#1c1917",
              border: "1px solid #292524",
              color: "#34d399",
              fontSize: "15px",
              fontWeight: 700,
              marginRight: "16px",
            }}
          >
            MOVER VOUCHER
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
            ZERO FAKE DEPOSITS
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
            RATES IN {currency}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
