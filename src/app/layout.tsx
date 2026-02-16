import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MOMMY AI — Talk to Your Crypto Mom",
  description:
    "MOMMY AI is the warmest AI mom on Solana. Chat with her about your crypto journey.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
