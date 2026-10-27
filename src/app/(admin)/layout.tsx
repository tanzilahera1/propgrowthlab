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
            colorPrimary: "#F59E0B", // PropGrowth Amber
            colorInfo: "#F59E0B",
            colorSuccess: "#10B981",
            colorWarning: "#F59E0B",
            colorError: "#EF4444",
            borderRadius: 8,
            fontFamily:
              "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          },
          components: {
            Table: {
              headerBg: "#F8FAFC",
              headerColor: "#1E293B",
              borderColor: "#E2E8F0",
              rowHoverBg: "#F1F5F9",
            },
            Card: {
              headerBg: "transparent",
            },
          },
        }}
      >
        <App>
          <div className="min-h-screen bg-slate-50 text-slate-900">
            {children}
          </div>
        </App>
      </ConfigProvider>
    </AntdRegistry>
  );
}
