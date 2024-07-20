import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nest DTO Builder",
  description: "Convert JSON to NestJS DTO classes easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <head>
       <link rel="icon" href="/favicon.ico" />
       <title>Nest DTO Builder</title>
       </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
