import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Avioni - India's Trusted Digital Agency | Our Story & Mission",
  description:
    "Learn about Avioni Digital Agency - Ranchi's premier web development and digital marketing company. Discover our mission to deliver world-class digital solutions at competitive rates. Trusted by businesses across Mumbai, Delhi, Bangalore, Chennai, and all of India.",
  keywords: [
    // About & Company
    "about Avioni digital agency",
    "digital agency Ranchi",
    "web development company Jharkhand",
    "IT company Ranchi",
    "software company India",
    "creative agency India",
    "design agency Ranchi",
    "marketing agency Jharkhand",
    // Trust & Quality
    "trusted web development company",
    "reliable digital agency India",
    "professional IT services",
    "quality web development",
    "affordable digital services India",
    "best web agency Ranchi",
    "top digital marketing company",
    // Team & Expertise
    "expert web developers India",
    "professional designers Ranchi",
    "SEO experts India",
    "digital marketing specialists",
    "full stack developers Jharkhand",
    // Location Focused
    "digital agency serving India",
    "web company Mumbai Delhi Bangalore",
    "IT services all India",
    "nationwide digital services",
    "pan India web development",
  ].join(", "),
  openGraph: {
    title: "About Us - Avioni Digital Agency | Our Story & Values",
    description:
      "Discover Avioni - Ranchi's leading digital agency delivering world-class web development, design, and marketing solutions across India. Quality meets affordability.",
    url: "https://Avioni.agency/about",
    type: "website",
    images: [
      {
        url: "/og-about.png",
        width: 1200,
        height: 630,
        alt: "About Avioni Digital Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Avioni - India's Trusted Digital Agency",
    description:
      "Learn about Avioni - Our mission, values, and commitment to delivering exceptional digital solutions across India.",
  },
  alternates: {
    canonical: "https://Avioni.agency/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
