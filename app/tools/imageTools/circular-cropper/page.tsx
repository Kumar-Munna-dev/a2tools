import type { Metadata } from "next";
import React from "react";
import CircularCropper from "./CircularCropper";
import SeoMeta from "@/app/components/SeoMeta";

export const metadata: Metadata = {
  title: "Circular Image Cropper – Crop Images into Perfect Circles | A2Tool",
  description:
    "Free online tool to crop your photos into perfect circles with transparent backgrounds. Ideal for profile pictures, avatars, and logos. No sign-up required.",
  keywords: [
    "circular image cropper",
    "crop image to circle",
    "round image cropper",
    "avatar maker",
    "profile picture cropper",
    "circle crop online",
  ],
  alternates: {
    canonical: "https://a2tool.com/tools/imageTools/circular-cropper/",
  },
  openGraph: {
    title: "Circular Image Cropper – Make Round Profile Pics Free",
    description:
      "Crop photos into perfect circles with transparent backgrounds. Create flawless avatars instantly in your browser.",
    url: "https://a2tool.com/tools/imageTools/circular-cropper/",
    siteName: "A2Tool",
    images: ["/og-image.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Circular Image Cropper – Free Round Cropper",
    description:
      "Instantly crop your images into perfect circles. 100% free and client-side.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return (
    <>
      <SeoMeta
        title="Circular Image Cropper"
        description="Free browser-based tool to instantly crop images into perfect circles with transparent backgrounds."
        url="https://a2tool.com/tools/imageTools/circular-cropper/"
        toolType="WebApplication"
        breadcrumbs={[
          { name: "Home", item: "https://a2tool.com/" },
          { name: "Image Tools", item: "https://a2tool.com/tools/imageTools/" },
          { name: "Circular Image Cropper", item: "https://a2tool.com/tools/imageTools/circular-cropper/" }
        ]}
        faqs={[
          { question: "Is the background transparent?", answer: "Yes, if you select PNG or WebP as the output format, the area outside the circle will be completely transparent." },
          { question: "Can I add a border to my circular image?", answer: "Yes! There is a built-in option to add a customizable colored border to your circle." },
          { question: "Are my images uploaded to the cloud?", answer: "No, all cropping happens securely on your device using your browser. We never upload or store your images." }
        ]}
      />
      <CircularCropper />
    </>
  );
}
