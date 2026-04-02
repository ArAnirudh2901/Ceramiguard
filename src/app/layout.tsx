import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "./providers/LenisProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ceramiguard — Precision Automotive Detailing",
  description:
    "The pinnacle of automotive protection. Flawless paint correction, nano-ceramic coatings, and bespoke detailing for discerning BMW enthusiasts.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/ceramiguard-icon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/ceramiguard-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-white selection:bg-[#81C4FF]/30">
        {/* Lenis must wrap everything so GSAP ScrollTrigger is synced */}
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
