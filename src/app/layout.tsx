import type { Metadata } from "next";
import Script from "next/script";
import { DM_Sans, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_NAME, SITE_URL } from "@/lib/metadata";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-plus-jakarta-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Protecting brands from counterfeiting, trademark infringement, and copyright theft.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${plusJakartaSans.variable} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <Script
          src="https://confident-mastiff-102.convex.site/chat/widget.js?v=3"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
