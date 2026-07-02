import type { Metadata } from "next";
import { Barlow_Semi_Condensed, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const barlow = Barlow_Semi_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-barlow",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  title: "Boyle Heights Recovery Hub",
  description:
    "Independent, community-built air quality and resource information for Boyle Heights residents.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${barlow.variable} ${inter.variable} ${plexMono.variable} font-body`}
      >
        {children}
      </body>
    </html>
  );
}
