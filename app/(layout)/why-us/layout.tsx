import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Why Choose Avioni - Benefits of Working With India's Best Digital Agency",
  description:
    "Discover why businesses across India choose Avioni for their digital needs. 24/7 support, Silicon Valley quality at Indian prices, guaranteed results, and a proven track record. From Ranchi to Mumbai, Delhi to Bangalore - we deliver excellence.",
  keywords: [
    // Why Choose Us
    "why choose Avioni",
    "best digital agency India",
    "reliable web development company",
    "trusted IT partner India",
    "affordable digital services",
    "quality web development India",
    // Benefits
    "24/7 client support",
    "guaranteed results digital marketing",
    "transparent pricing web development",
    "fast delivery web projects",
    "dedicated project manager",
    "free website consultation India",
    // Competitive Advantages
    "Silicon Valley quality Indian prices",
    "world class web development affordable",
    "best value digital agency",
    "competitive pricing IT services",
    "cost effective web solutions",
    // Trust Signals
    "proven track record digital agency",
    "client testimonials web development",
    "successful projects India",
    "5 star rated agency",
    "top reviewed digital company",
    // Service Excellence
    "professional IT services India",
    "expert digital solutions",
    "custom web development",
    "tailored digital marketing",
    "personalized client service",
  ].join(", "),
  openGraph: {
    title: "Why Choose Avioni - Your Trusted Digital Partner",
    description:
      "World-class quality at competitive prices. 24/7 support, guaranteed results, and a proven track record across India. Discover the Avioni advantage.",
    url: "https://Avioni.agency/why-us",
    type: "website",
    images: [
      {
        url: "/og-why-us.png",
        width: 1200,
        height: 630,
        alt: "Why Choose Avioni Digital Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Why Choose Avioni - India's Trusted Digital Agency",
    description:
      "24/7 support, Silicon Valley quality at Indian prices, and guaranteed results. Discover why businesses choose Avioni.",
  },
  alternates: {
    canonical: "https://Avioni.agency/why-us",
  },
};

export default function WhyUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
