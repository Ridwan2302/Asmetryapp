import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "asmetry.io — Facial Analysis & Looksmaxing",
  description: "Scan your face, get a facial-harmony score, and follow a daily protocol built around your results.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#f4f2ed",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorantGaramond.variable} ${montserrat.variable}`}>
      <body className="min-h-dvh bg-[#26221d]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
