import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";
import "./aether.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Japan, Slowly — Winter Trip for Two",
    template: "%s · Japan, Slowly",
  },
  description: "A mobile-first winter itinerary for Tokyo, Hakone, and Sapporo, built around snow, onsen, private time, and a calm New Year.",
  applicationName: "Japan, Slowly",
  keywords: ["Japan winter itinerary", "Tokyo winter", "Hakone onsen", "Sapporo New Year", "Japan couple trip"],
  authors: [{ name: "Japan, Slowly" }],
  creator: "Japan, Slowly",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteUrl,
    siteName: "Japan, Slowly",
    title: "Japan, Slowly — A Winter Trip for Two",
    description: "Tokyo, four nights in Hakone, nine snowy nights in Sapporo, and a calm New Year.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Japan, Slowly winter trip planner" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Japan, Slowly — A Winter Trip for Two",
    description: "Tokyo, Hakone, and Sapporo without the hotel race.",
    images: ["/opengraph-image"],
  },
  alternates: { canonical: siteUrl },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3eadf" },
    { media: "(prefers-color-scheme: dark)", color: "#4c202d" },
  ],
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
