import type { Metadata } from "next";
import { IBM_Plex_Sans_Thai, Instrument_Serif } from "next/font/google";
import "./globals.css";

const plexThai = IBM_Plex_Sans_Thai({
  variable: "--font-sans",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "จุดยืน — แบบสำรวจทัศนคติทางการเมือง",
  description:
    "ค้นหาจุดยืนและอุดมการณ์ทางการเมืองของคุณผ่าน 4 แกนหลัก พร้อมโมดูลเสริมตามบริบทการเมืองไทย",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${plexThai.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
