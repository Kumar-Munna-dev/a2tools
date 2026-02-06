import type { Metadata } from "next";
import React from "react";
import PhoneNumber from "./phone-numbers";

export const metadata: Metadata = {
  title: {
    default: "Phone Number Location Tracker Online",
    template: "%s | A2Tool",
  },
  description:
    "Track phone number location online for free. Find country, state, telecom operator, and number details instantly using A2Tool phone number location tracker.",
  keywords: [
    "phone number location",
    "phone number tracker online",
    "mobile number location finder",
    "phone number details",
    "phone number location free",
    "mobile number tracker",
    "telecom operator finder",
    "A2Tool phone number tool",
  ],
  alternates: {
    canonical: "https://a2tool.com/tools/utilityTools/phone-number/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Phone Number Location Tracker – Free Online Tool",
    description:
      "Free phone number location tracker online. Check mobile number location, country, state, and operator instantly.",
    url: "https://a2tool.com/tools/utilityTools/phone-number/",
    siteName: "A2Tool",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Phone number location tracker online",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Phone Number Location Tracker – A2Tool",
    description:
      "Find phone number location, country, state, and operator details online for free.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return <PhoneNumber />;
}
