import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://guna.design"),
  title: "GUNA / VISUAL DESIGNER — Social & Visual Design",
  description:
    "Guna is a visual designer based in Coimbatore creating social media, graphic and visual communication work.",
  openGraph: {
    title: "GUNA / VISUAL DESIGNER — Social & Visual Design",
    description:
      "Guna is a visual designer based in Coimbatore creating social media, graphic and visual communication work.",
    images: [{ url: "/og/og-default.webp", width: 1200, height: 630 }],
    type: "website",
  },
  icons: {
    icon: "/favicon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#F7F5F0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${cormorant.variable}`}>
      <body
        style={
          {
            "--font-ui": "var(--font-manrope), system-ui, sans-serif",
            "--font-display":
              "var(--font-cormorant), Georgia, 'Times New Roman', serif",
          } as React.CSSProperties
        }
      >
        <div className="ambient" aria-hidden="true">
          <div className="ambient__layer" />
          <div className="ambient__layer ambient__layer--soft" />
        </div>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
