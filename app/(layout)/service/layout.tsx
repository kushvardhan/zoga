import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Our Services - Web Development, App Development, SEO & Digital Marketing",
  description:
    "Explore Avioni's comprehensive digital services: Web Development (Next.js, React), Mobile App Development (iOS, Android), UI/UX Design, SEO, Video Production, Digital Marketing, Content Writing, E-commerce Solutions, and more. Serving clients across India from Ranchi, Jharkhand.",
  keywords: [
    // Core Services
    "web development services India",
    "mobile app development services",
    "UI UX design services India",
    "SEO services India",
    "digital marketing services",
    "video production services",
    "content writing services India",
    "e-commerce development",
    "branding services India",
    "Google My Business optimization",
    // Technology Stack
    "Next.js development India",
    "React development company",
    "React Native app development",
    "Node.js development",
    "WordPress development India",
    "Shopify development India",
    "WooCommerce development",
    // Specific Services
    "logo design India",
    "brand identity design",
    "packaging design services",
    "motion graphics India",
    "promotional video production",
    "social media marketing",
    "Google Ads management",
    "Facebook Instagram Ads",
    "email marketing services",
    "marketing automation",
    "chatbot development",
    "API integration services",
    // Location-based
    "web services Ranchi",
    "digital agency Jharkhand",
    "IT company Mumbai",
    "software development Delhi",
    "app development Bangalore",
    "web design Chennai",
    "SEO services Hyderabad",
    "digital marketing Pune",
    "website development Kolkata",
    "mobile app Ahmedabad",
  ].join(", "),
  openGraph: {
    title: "Services - Avioni Digital Agency | Web, App, SEO & Marketing",
    description:
      "Full-spectrum digital services: Web & App Development, UI/UX Design, SEO, Video Production, Content Writing, Digital Marketing. Transform your business with India's trusted agency.",
    url: "https://Avioni.agency/service",
    type: "website",
    images: [
      {
        url: "/og-services.png",
        width: 1200,
        height: 630,
        alt: "Avioni Digital Agency Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Services - Avioni Digital Agency",
    description:
      "Web Development, App Development, SEO, UI/UX Design, Video Production & Digital Marketing services across India.",
  },
  alternates: {
    canonical: "https://Avioni.agency/service",
  },
};

export default function ServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
