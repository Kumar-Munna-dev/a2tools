import type { Metadata } from "next";
import React from "react";
import ImageResizerCropper from "./ImageResizerCropper";
import SeoMeta from "@/app/components/SeoMeta";

export const metadata: Metadata = {
  title: "Image Resizer & Cropper – Crop, Resize & Compress Images Free | A2Tool",
  description:
    "Free online image resizer and cropper. Crop photos, resize to exact dimensions, compress to a target KB, rotate, and download in JPEG, PNG, or WebP.",
  keywords: [
    "image resizer",
    "image cropper",
    "resize image online",
    "crop image online",
    "compress image to 100kb",
  ],
  alternates: {
    canonical: "https://a2tool.com/tools/imageTools/resizer-cropper/",
  },
  openGraph: {
    title: "Image Resizer & Cropper – Crop, Resize & Compress Images Free",
    description:
      "Crop, resize to exact dimensions, compress to a target KB, and convert to JPEG/PNG/WebP — all free, in your browser.",
    url: "https://a2tool.com/tools/imageTools/resizer-cropper/",
    siteName: "A2Tool",
    images: ["/og-image.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Resizer & Cropper – Free, No Sign-up",
    description:
      "Crop, resize, compress and convert images right in your browser.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return (
    <>
      <SeoMeta
        title="Image Resizer & Cropper"
        description="Free browser-based tool to crop, resize, rotate and compress images. Supports JPEG, PNG, WebP and exact print dimensions."
        url="https://a2tool.com/tools/imageTools/resizer-cropper/"
        toolType="WebApplication"
        breadcrumbs={[
          { name: "Home", item: "https://a2tool.com/" },
          { name: "Image Tools", item: "https://a2tool.com/tools/imageTools/" },
          { name: "Image Resizer & Cropper", item: "https://a2tool.com/tools/imageTools/resizer-cropper/" }
        ]}
        faqs={[
          { question: "How do I resize an image to exact dimensions?", answer: "Enable the 'Resize Output' toggle, enter your exact width and height in pixels." },
          { question: "Can I compress an image to under 100 KB?", answer: "Yes! Check the 'Target File Size' option and enter 100. The tool automatically adjusts quality." },
          { question: "Is my image uploaded to a server?", answer: "No. All cropping, resizing, and compression runs entirely in your browser using local processing." }
        ]}
      />
      <ImageResizerCropper />
    </>
  );
}