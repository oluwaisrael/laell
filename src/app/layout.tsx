import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "@fontsource-variable/dm-sans";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/components/cart-provider";
import { site, siteUrl } from "@/lib/site";
export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "LĀEL — In pursuit of the considered",
    template: "%s — LĀEL",
  },
  description: site.description,
  openGraph: {
    title: "LĀEL — In pursuit of the considered",
    description: site.description,
    images: [{ url: "/images/campaign.webp", width: 1536, height: 1024 }],
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: siteUrl.hostname !== "localhost", follow: true },
};
export const viewport: Viewport = { themeColor: "#eee8de" };
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <CartProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
