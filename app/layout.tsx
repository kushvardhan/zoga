import FloatingButtons from "@/components/FloatingButtons";
import { ThemeProvider } from "@/lib/theme-provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Comprehensive India-focused SEO keywords
const indiaKeywords = [
  // Major Cities
  "web development Mumbai",
  "app development Delhi",
  "SEO services Bangalore",
  "digital marketing Chennai",
  "UI UX design Hyderabad",
  "web design Pune",
  "mobile app development Kolkata",
  "website development Ahmedabad",
  "digital agency Jaipur",
  "software development Lucknow",
  // Tier 2 Cities
  "web development Ranchi",
  "digital marketing Patna",
  "SEO Bhopal",
  "app development Indore",
  "web design Nagpur",
  "website Chandigarh",
  "digital agency Coimbatore",
  "software Kochi",
  "web services Vadodara",
  // States
  "best web development company Jharkhand",
  "top digital agency Maharashtra",
  "SEO company Karnataka",
  "app development Tamil Nadu",
  "web design Gujarat",
  "digital marketing Rajasthan",
  "software development Uttar Pradesh",
  "website development West Bengal",
  "IT services Madhya Pradesh",
  // Services
  "website development India",
  "mobile app development India",
  "SEO services India",
  "digital marketing agency India",
  "UI UX design company India",
  "video editing services India",
  "content writing India",
  "Google My Business optimization India",
  "ecommerce website development",
  "React Next.js development",
  "custom web application development",
  "startup website design",
  "corporate website development",
  "landing page design",
  "social media marketing",
  "Google Ads management",
  "Facebook Ads India",
].join(", ");

export const metadata: Metadata = {
  metadataBase: new URL("https://zoga.agency"),
  title: {
    default:
      "Zoga - Best Web Development & Digital Marketing Agency in India | Ranchi, Jharkhand",
    template: "%s | Zoga Digital Agency",
  },
  description:
    "Zoga is India's trusted digital agency offering web development, mobile app development, UI/UX design, SEO, video editing, and digital marketing services. Based in Ranchi, Jharkhand, serving clients across Mumbai, Delhi, Bangalore, Chennai, Hyderabad, and all of India. Get world-class quality at competitive rates.",
  keywords: indiaKeywords,
  authors: [{ name: "Zoga Digital Agency", url: "https://zoga.agency" }],
  creator: "Zoga Digital Agency",
  publisher: "Zoga Digital Agency",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://zoga.agency",
    siteName: "Zoga Digital Agency",
    title: "Zoga - Best Web Development & Digital Marketing Agency in India",
    description:
      "Transform your business with India's most trusted digital agency. Web development, app development, SEO, UI/UX design, video editing & digital marketing. Serving all major cities across India.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Zoga Digital Agency - Web Development & Digital Marketing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zoga - Best Digital Agency in India",
    description:
      "Web development, app development, SEO, UI/UX design & digital marketing services across India. Based in Ranchi, serving Mumbai, Delhi, Bangalore & more.",
    images: ["/og-image.png"],
    creator: "@zoga_agency",
  },
  alternates: {
    canonical: "https://zoga.agency",
    languages: {
      "en-IN": "https://zoga.agency",
    },
  },
  category: "technology",
  verification: {
    google: "your-google-verification-code",
  },
  other: {
    "geo.region": "IN-JH",
    "geo.placename": "Ranchi, Jharkhand, India",
    "geo.position": "23.3441;85.3096",
    ICBM: "23.3441, 85.3096",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-[#030014] text-slate-900 dark:text-slate-100 transition-colors duration-500`}
      >
        <ThemeProvider defaultTheme="dark">
          {children}
          <FloatingButtons />
        </ThemeProvider>
      </body>
    </html>
  );
}
