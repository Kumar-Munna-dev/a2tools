import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import Header from "./components/Header";
import Footer from "./components/Footer";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "A2Tools – Free Online Utility Pdf Image Text Calculator Tools for Everyday Use",
  description:
    "Access 50+ free online tools including unit converters, JSON formatter, text encryptor, QR code generator, file compressor, and more. Simple, fast, and privacy-friendly all-in-one toolkit.",

  keywords: [
    "A2Tools",
    "online tools",
    "free tools",
    "unit converter",
    "JSON formatter",
    "text encryptor",
    "QR code generator",
    "file compressor",
    "color converter",
    "developer tools",
    "web utilities",
    "AI tools",
    "base64 encoder",
    "timestamp converter",
    "currency converter",
  ],

  openGraph: {
    title: "A2Tools – Free Online Tools for Everyone",
    description:
      "Convert, format, encode, compress, and create instantly. 100% free, no login, no data tracking. Try A2Tools – your ultimate productivity toolkit.",
    url: "https://a2tool.com",
    siteName: "A2Tools",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://a2tool.com/og-image.png", // 🧠 Replace with your OG image URL
        width: 1200,
        height: 630,
        alt: "A2Tools – Free Online Tools for Everyone",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "A2Tools – Free Online Pdf Image Text Calculator Tools for Everyone",
    description:
      "Fast, secure, and private online tools — convert, compress, format, and generate instantly with A2Tools.",
    images: ["https://a2tool.com/og-image.png"], // 🧠 Replace with your OG image URL
    creator: "@a2tools", // optional if you have a handle
  },

  alternates: {
    canonical: "https://a2tool.com",
  },

  metadataBase: new URL("https://a2tool.com"),

  category: "Web Tools",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
