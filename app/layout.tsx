import type { Metadata, Viewport } from "next";
import { Fraunces, Outfit } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { SmoothScroll } from "@/lib/SmoothScroll";
import { SiteHeader } from "@/components/theme/SiteHeader";
import { SiteFooter } from "@/components/theme/SiteFooter";
import { CartDrawer } from "@/components/theme/CartDrawer";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rivulet.store"),
  title: "Rivulet — Cold-pressed botanical tonics",
  description:
    "Rivulet is a Shopify-inspired wellness theme for cold-pressed botanicals, tonics, and food brands. Immersive storefronts with quiet conversion.",
  openGraph: {
    title: "Rivulet — Cold-pressed botanical tonics",
    description:
      "A redesigned Shopify theme for wellness and food brands—immersive, botanical, conversion-minded.",
    type: "website",
  },
  icons: {
    icon: "/favicon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#1a4d3e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${fraunces.variable}`}>
      <body>
        <CartProvider>
          <SmoothScroll>
            <SiteHeader />
            <main>{children}</main>
            <SiteFooter />
            <CartDrawer />
          </SmoothScroll>
        </CartProvider>
      </body>
    </html>
  );
}
