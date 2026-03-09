import "./globals.css";
import type { Metadata, Viewport } from "next";
import SwRegister from "./sw-register";

export const metadata: Metadata = {
  title: "Tobiira",
  description: "Tobiira identity service",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Tobiira",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SwRegister />
        {children}
      </body>
    </html>
  );
}