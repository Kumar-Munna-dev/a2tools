import type { Metadata } from "next";
import React from "react";
import RoundCorners from "./RoundCorners";
import SeoMeta from "@/app/components/SeoMeta";

export const metadata: Metadata = {
  title: "Round Corners on Image – Free Online Tool | A2Tool",
  description:
    "Add beautiful rounded corners to your photos instantly. Adjust the corner radius and export with a transparent background for UI designs, avatars, and modern visuals.",
  keywords: [
    "round corners on image",
    "image border radius generator",
    "round image corners online",
    "rounded corners transparent png",
    "curved edges photo editor",
  ],
  alternates: {
    canonical: "https://a2tool.com/tools/imageTools/round-corners/",
  },
  openGraph: {
    title: "Round Corners on Image – Fast & Free",
    description:
      "Quickly soften your images by rounding the edges. Adjust the border radius dynamically and save with perfect transparency.",
    url: "https://a2tool.com/tools/imageTools/round-corners/",
    siteName: "A2Tool",
    images: ["/og-image.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Round Image Corners Online",
    description:
      "Instantly add smooth, customizable rounded corners to any picture with a transparent background.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return (
    <>
      <SeoMeta
        title="Round Corners on Image"
        description="Soften the look of your images by adding sleek rounded corners. Use the live preview to adjust the corner radius to your exact liking, then download a perfect transparent PNG."
        url="https://a2tool.com/tools/imageTools/round-corners/"
        toolType="WebApplication"
        breadcrumbs={[
          { name: "Home", item: "https://a2tool.com/" },
          { name: "Image Tools", item: "https://a2tool.com/tools/imageTools/" },
          { name: "Round Corners", item: "https://a2tool.com/tools/imageTools/round-corners/" }
        ]}
        faqs={[
          { question: "Is the background outside the rounded corners transparent?", answer: "Yes! As long as you choose PNG or WebP as your export format, the corners will be perfectly transparent." },
          { question: "How round can I make the corners?", answer: "You can adjust the corner radius dynamically from 0% (square) all the way to 50% (fully pill-shaped or a perfect circle if the image is square)." },
          { question: "Are my images safe?", answer: "Absolutely. We do not upload your images to any servers. All the processing happens securely within your browser." }
        ]}
      />
      <RoundCorners />
    </>
  );
}
