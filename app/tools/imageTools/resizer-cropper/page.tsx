import type { Metadata } from "next";
import React from "react";
import ImageResizerCropper from "./ImageResizerCropper";

export const metadata: Metadata = {
  title: {
    default: "Image Resizer & Cropper – Resize and Crop Images Online",
    template: "%s | A2Tool",
  },
  description:
    "Free Image Resizer and Cropper tool to resize images, crop photos, change dimensions, and maintain quality online.",
  keywords: [
    "image resizer",
    "image cropper",
    "resize image online",
    "crop image online",
    "photo resizer",
    "image size reducer",
    "image dimension changer",
    "rotate image",
    "online image editor",
  ],
  alternates: {
    canonical: "https://a2tool.com/tools/imageTools/resizer-cropper/",
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
    title: "Image Resizer & Cropper – Resize and Crop Images Online",
    description:
      "Resize and crop images instantly while maintaining quality using A2Tool Image Resizer & Cropper.",
    url: "https://a2tool.com/tools/imageTools/resizer-cropper/",
    siteName: "A2Tool",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Image Resizer and Cropper tool",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Resizer & Cropper – Resize and Crop Images Online",
    description:
      "Crop, rotate, and export sharp images instantly with A2Tool's responsive online editor.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return <ImageResizerCropper />;
}
