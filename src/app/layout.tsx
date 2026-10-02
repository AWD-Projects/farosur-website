import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SITE, SITE_URL } from "@/lib/site";
import { buildJsonLd } from "@/lib/seo";
import { SmoothScroll } from "@/components/smooth-scroll";

const sans = localFont({
  src: "../fonts/Inter.woff2",
  variable: "--font-sans",
  weight: "100 900",
  display: "swap",
});

const display = localFont({
  src: [
    { path: "../fonts/LibreBaskerville.woff2", style: "normal", weight: "400 700" },
    { path: "../fonts/LibreBaskerville-Italic.woff2", style: "italic", weight: "400 700" },
  ],
  variable: "--font-display",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

const indexable = !process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE.title, template: "%s | Faro Sur" },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "trajes de baño Yucatán",
    "confección de trajes de baño",
    "fabricante de trajes de baño México",
    "desarrollo de producto swimwear",
    "Faro Sur",
  ],
  alternates: { canonical: "/", languages: { "es-MX": "/" } },
  robots: indexable
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      }
    : { index: false, follow: false },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE.name,
    locale: "es_MX",
    title: SITE.title,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
  },
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
    : undefined,
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#F8F7F5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX" className={`${sans.variable} ${display.variable}`}>
      <body className="font-sans antialiased">
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
        <SmoothScroll />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()) }}
        />
      </body>
    </html>
  );
}
