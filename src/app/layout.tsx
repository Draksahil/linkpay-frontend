import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", weight: ["500", "600", "700"] });
const body = Inter({ subsets: ["latin"], variable: "--font-body" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["500", "600"] });

export const metadata: Metadata = {
  title: "LinkPay — One Link. Endless Possibilities. Get Paid.",
  description: "Share your content, products and premium links from one beautiful page — and let your audience pay to unlock what matters.",
  openGraph: {
    title: "LinkPay — One Link. Endless Possibilities. Get Paid.",
    description: "The link-in-bio page that pays you back.",
    type: "website"
  },
  twitter: { card: "summary_large_image", title: "LinkPay" },
  icons: { icon: "/favicon.ico" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${display.variable} ${body.variable} ${mono.variable} font-body`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
