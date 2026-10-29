import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, App } from "antd";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AntdRegistry>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#d97706", // Amber 600
            colorInfo: "#0284c7", // Sky 600
            colorSuccess: "#059669", // Emerald 600
            colorWarning: "#d97706", // Amber 600
            colorError: "#dc2626", // Red 600
            colorTextBase: "#0f172a", // Slate 900
            colorBgBase: "#ffffff",
            borderRadius: 10,
            wireframe: false,
            fontFamily:
              "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          },
          components: {
            Layout: {
              bodyBg: "#f8fafc",
              headerBg: "#ffffff",
              siderBg: "#ffffff",
            },
            Table: {
              headerBg: "#f8fafc",
              headerColor: "#334155",
              borderColor: "#e2e8f0",
              rowHoverBg: "#f8fafc",
              borderRadius: 10,
            },
            Card: {
              headerBg: "transparent",
              colorBorderSecondary: "#e2e8f0",
              borderRadiusLG: 12,
            },
            Menu: {
              itemSelectedBg: "#fffbeb",
              itemSelectedColor: "#b45309",
              itemHoverBg: "#f8fafc",
              itemBorderRadius: 8,
              itemMarginInline: 8,
            },
            Button: {
              borderRadius: 8,
              controlHeight: 38,
            },
            Input: {
              controlHeight: 38,
              borderRadius: 8,
            },
            Select: {
              controlHeight: 38,
              borderRadius: 8,
            },
          },
        }}
      >
        <App>
          <div className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-amber-100 selection:text-amber-900">
            {children}
          </div>
        </App>
      </ConfigProvider>
    </AntdRegistry>
  );
}
