import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MOMMY'S KITCHEN",
  description: "A cozy pixel kitchen where crypto degens hang out with MOMMY",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
