import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MOMMY AI — Your Crypto Mom on Solana",
  description:
    "MOMMY AI is the warmest, most caring AI on Solana. $MOMMY token powers the motherly AI that watches over your crypto journey.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
