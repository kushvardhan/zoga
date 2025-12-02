import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Work & Portfolio - Web Development, App & Design Projects",
  description:
    "Explore Zoga's portfolio of successful projects. From stunning websites to powerful mobile apps, SEO campaigns to brand transformations - see our work across diverse industries. Trusted by businesses from Ranchi to Mumbai, Delhi to Bangalore.",
  keywords: [
    // Portfolio & Work
    "web development portfolio India",
    "mobile app portfolio",
    "UI UX design portfolio",
    "digital marketing case studies",
    "SEO success stories India",
    "website design examples",
    "app development projects",
    // Industries Served
    "e-commerce website projects",
    "healthcare website portfolio",
    "real estate website design",
    "restaurant website portfolio",
    "hotel website development",
    "education website projects",
    "startup website portfolio",
    "corporate website examples",
    "NGO website portfolio",
    // Project Types
    "custom web application projects",
    "mobile app success stories",
    "React Next.js projects",
    "WordPress website portfolio",
    "Shopify store portfolio",
    "branding project examples",
    "video production portfolio",
    "motion graphics examples",
    // Results & Success
    "successful digital transformations",
    "business growth case studies",
    "SEO ranking improvements",
    "conversion rate optimization results",
    "social media marketing results",
    "ROI digital marketing",
  ].join(", "),
  openGraph: {
    title: "Our Work - Zoga Digital Agency Portfolio",
    description:
      "Browse our portfolio of successful projects: websites, apps, SEO campaigns, and brand transformations across India. See the results we deliver.",
    url: "https://zoga.agency/work",
    type: "website",
    images: [
      {
        url: "/og-work.png",
        width: 1200,
        height: 630,
        alt: "Zoga Digital Agency Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Work & Portfolio - Zoga Digital Agency",
    description:
      "Explore our portfolio of successful web development, app development, and digital marketing projects across India.",
  },
  alternates: {
    canonical: "https://zoga.agency/work",
  },
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

