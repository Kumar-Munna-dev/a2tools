import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import Header from "./components/Header";
import Footer from "./components/Footer";


import "./globals.css";
import Providers from "./components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "A2Tools – Free Online Utility Pdf Image Text Calculator Tools for Everyday Use",
  description:
    "Access 50+ free online tools including unit converters, JSON formatter, text encryptor, QR code generator, file compressor, and more.",
  metadataBase: new URL("https://a2tool.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Header />
          {children}
          <Footer  />
        </Providers>
      </body>
    </html>
  );
}
