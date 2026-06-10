import type { Metadata } from "next";
import React from "react";
import NextImageConverter from "./NextImageConverter";

export const metadata: Metadata = {
  title: {
    default: "Image Format Converter – Convert JPG, PNG, WEBP, AVIF & More Online",
    template: "%s | A2Tool",
  },
  description:
    "Free Image Format Converter to convert images between JPG, PNG, WEBP, AVIF, BMP, GIF, ICO, and more. Adjust quality, resize, rotate, and flip images instantly without losing quality.",
  keywords: [
    "image format converter",
    "jpg to png",
    "png to jpg",
    "webp converter",
    "image converter online",
    "photo format converter",
    "avif converter",
    "gif converter",
    "batch image converter",
    "image quality adjuster",
    "image resizer",
    "free online image converter",
    "convert image formats",
    "image file format",
  ],
  alternates: {
    canonical: "https://a2tool.com/tools/imageTools/format-converter/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Image Format Converter – Convert Image Formats Online",
    description:
      "Convert images between multiple formats (JPG, PNG, WEBP, AVIF) instantly with quality control and batch processing using A2Tool Image Format Converter.",
    url: "https://a2tool.com/tools/imageTools/format-converter/",
    siteName: "A2Tool",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Image Format Converter Tool",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Format Converter – Convert Image Formats Online",
    description:
      "Free tool to convert images between JPG, PNG, WEBP, AVIF, and more with quality control and batch processing.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return <NextImageConverter />;
}
