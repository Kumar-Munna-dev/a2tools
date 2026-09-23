import type { Metadata } from "next";
import React from "react";
import InstagramResizer from "./InstagramResizer";
import SeoMeta from "@/app/components/SeoMeta";

export const metadata: Metadata = {
  title: "Resize Image for Instagram – Profile, Posts & Stories | A2Tool",
  description:
    "Free online tool to precisely resize and crop your images for Instagram. Perfect dimensions for Profile Pictures, Square Posts, Portraits, Landscapes, and Stories.",
  keywords: [
    "instagram image resizer",
    "resize image for instagram",
    "instagram post size",
    "instagram profile picture size",
    "crop for instagram",
    "instagram story size",
  ],
  alternates: {
    canonical: "https://a2tool.com/tools/imageTools/instagram-resizer/",
  },
  openGraph: {
    title: "Resize Image for Instagram – Perfect Post Sizes",
    description:
      "Crop and resize photos exactly to Instagram's required dimensions. Make your Profile Pics, Posts, and Stories fit perfectly.",
    url: "https://a2tool.com/tools/imageTools/instagram-resizer/",
    siteName: "A2Tool",
    images: ["/og-image.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Instagram Image Resizer – Free Tool",
    description:
      "Instantly crop and resize your images to the exact pixels required for Instagram posts and stories.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return (
    <>
      <SeoMeta
        title="Resize Image for Instagram"
        description="Easily format your photos for Instagram without losing quality. Choose between Square, Portrait, Landscape, Profile, and Story dimensions."
        url="https://a2tool.com/tools/imageTools/instagram-resizer/"
        toolType="WebApplication"
        breadcrumbs={[
          { name: "Home", item: "https://a2tool.com/" },
          { name: "Image Tools", item: "https://a2tool.com/tools/imageTools/" },
          { name: "Instagram Image Resizer", item: "https://a2tool.com/tools/imageTools/instagram-resizer/" }
        ]}
        faqs={[
          { question: "What is the best size for an Instagram post?", answer: "For a square post, the ideal size is 1080 x 1080 pixels. For a portrait post, use 1080 x 1350 pixels to take up the maximum screen space." },
          { question: "Does this tool compress the image?", answer: "This tool resizes the image to the exact dimensions and uses high-quality JPEG output (0.95 quality) to ensure your photo looks sharp on Instagram." },
          { question: "Are my images uploaded to the cloud?", answer: "No. All cropping and resizing is done locally in your browser. Your images remain private on your device." }
        ]}
      />
      <InstagramResizer />
    </>
  );
}
