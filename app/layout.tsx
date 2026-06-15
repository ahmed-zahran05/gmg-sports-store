import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { Providers } from "./providers";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: {
    default: "GMG Sports — Premium Athletic Gear",
    template: "%s | GMG Sports",
  },
  description:
    "Shop premium sportswear, footwear and accessories at GMG Sports. 100% authentic products from Nike, Adidas, Puma, Under Armour and more.",
  metadataBase: new URL("https://gmgsports.com"),
  keywords: ["sports", "athletic", "sportswear", "running", "training", "Nike", "Adidas"],
  icons: { icon: "/gmg-logo.png", apple: "/gmg-logo.png" },
  openGraph: {
    title: "GMG Sports — Premium Athletic Gear",
    description: "Shop premium sportswear, footwear and accessories for champions.",
    url: "https://gmgsports.com",
    siteName: "GMG Sports",
    type: "website",
    images: [{ url: "/gmg-logo.png", width: 512, height: 512, alt: "GMG Sports" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GMG Sports — Premium Athletic Gear",
    description: "Shop premium sportswear, footwear and accessories for champions.",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body className="bg-white text-gray-900 antialiased">
        <Providers>
          <SiteHeader />
          {children}
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
