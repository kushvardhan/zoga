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

// Comprehensive India-focused SEO keywords - ALL major cities, states, and services
const indiaKeywords = [
  // Metro Cities
  "web development Mumbai",
  "app development Delhi NCR",
  "SEO services Bangalore Bengaluru",
  "digital marketing Chennai",
  "UI UX design Hyderabad",
  "web design Pune",
  "mobile app Kolkata",
  // Tier 1 Cities
  "website development Ahmedabad",
  "digital agency Jaipur",
  "software development Lucknow",
  "web services Surat",
  "IT company Kanpur",
  "app development Nagpur",
  "SEO Visakhapatnam",
  // Tier 2 Cities - North India
  "web development Ranchi",
  "digital marketing Patna",
  "SEO Bhopal",
  "app development Indore",
  "web design Chandigarh",
  "website Ludhiana",
  "digital agency Agra",
  "software Varanasi",
  "web services Allahabad Prayagraj",
  "IT Meerut",
  "app Ghaziabad",
  "SEO Noida",
  "web Gurgaon Gurugram",
  "digital Faridabad",
  "website Dehradun",
  "app Amritsar",
  "SEO Jalandhar",
  "web Jodhpur",
  "digital Udaipur",
  "website Kota",
  "app Ajmer",
  "SEO Bikaner",
  "web Jamshedpur",
  "digital Dhanbad",
  "website Bokaro",
  "app Hazaribagh",
  "SEO Deoghar",
  "web Muzaffarpur",
  "digital Gaya",
  "website Bhagalpur",
  "app Darbhanga",
  "SEO Gorakhpur",
  "web Bareilly",
  // Tier 2 Cities - South India
  "web development Coimbatore",
  "digital marketing Kochi Cochin",
  "SEO Thiruvananthapuram Trivandrum",
  "app development Madurai",
  "web design Tiruchirappalli Trichy",
  "website Salem",
  "digital Mysore Mysuru",
  "software Mangalore Mangaluru",
  "web Hubli Dharwad",
  "IT Belgaum Belagavi",
  "app Vijayawada",
  "SEO Guntur",
  "web Nellore",
  "digital Warangal",
  "website Tirupati",
  "app Rajahmundry",
  // Tier 2 Cities - West India
  "web development Vadodara",
  "digital marketing Rajkot",
  "SEO Bhavnagar",
  "app development Jamnagar",
  "web design Nashik",
  "website Aurangabad Sambhajinagar",
  "digital Solapur",
  "software Kolhapur",
  "web Sangli",
  "IT Satara",
  "app Thane",
  "SEO Navi Mumbai",
  "web Kalyan Dombivli",
  // Tier 2 Cities - East India
  "web development Bhubaneswar",
  "digital marketing Cuttack",
  "SEO Rourkela",
  "app development Guwahati",
  "web design Silchar",
  "website Dibrugarh",
  "digital Jorhat",
  "software Imphal",
  "web Shillong",
  "IT Agartala",
  "app Aizawl",
  "SEO Itanagar",
  "web Gangtok",
  "digital Siliguri",
  // All 28 States + 8 Union Territories
  "best web development company Jharkhand",
  "top digital agency Maharashtra",
  "SEO company Karnataka",
  "app development Tamil Nadu",
  "web design Gujarat",
  "digital marketing Rajasthan",
  "software development Uttar Pradesh",
  "website development West Bengal",
  "IT services Madhya Pradesh",
  "web company Bihar",
  "digital agency Odisha",
  "SEO Kerala",
  "app Andhra Pradesh",
  "web Telangana",
  "digital Punjab",
  "website Haryana",
  "app Uttarakhand",
  "SEO Chhattisgarh",
  "web Assam",
  "digital Himachal Pradesh",
  "website Jammu Kashmir",
  "app Tripura",
  "SEO Meghalaya",
  "web Manipur",
  "digital Nagaland",
  "website Mizoram",
  "app Arunachal Pradesh",
  "SEO Sikkim",
  "web Goa",
  "digital Delhi",
  "website Chandigarh UT",
  "app Puducherry",
  "SEO Ladakh",
  "web Andaman Nicobar",
  "digital Lakshadweep",
  "website Dadra Nagar Haveli Daman Diu",
  // Core Services
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
  "social media marketing India",
  "Google Ads management India",
  "Facebook Instagram Ads India",
  "LinkedIn marketing India",
  "YouTube video marketing",
  "WhatsApp Business API",
  "CRM development India",
  "Shopify development India",
  "WooCommerce development",
  "WordPress development India",
  "branding agency India",
  "logo design India",
  "packaging design India",
  "print design India",
  "motion graphics India",
  "explainer video India",
  "corporate video production India",
  "email marketing India",
  "newsletter design India",
  "marketing automation India",
  "chatbot development India",
  "API integration India",
  "cloud hosting India AWS GCP",
  // Long-tail Keywords
  "best web development company in Ranchi Jharkhand",
  "affordable website design India",
  "top rated digital marketing agency Mumbai",
  "professional SEO services Bangalore",
  "custom mobile app development Delhi",
  "ecommerce website development Chennai",
  "startup website design Hyderabad",
  "corporate website development Pune",
  "small business website India",
  "restaurant website design India",
  "hotel website development",
  "real estate website India",
  "healthcare website development",
  "education website design",
  "NGO website development India",
  "portfolio website design",
  "personal branding website",
].join(", ");

export const metadata: Metadata = {
  metadataBase: new URL("https://Avioni.agency"),
  title: {
    default:
      "Avioni - Best Web Development & Digital Marketing Agency in India | Ranchi, Jharkhand",
    template: "%s | Avioni Digital Agency",
  },
  description:
    "Avioni is India's trusted digital agency offering web development, mobile app development, UI/UX design, SEO, video editing, and digital marketing services. Based in Ranchi, Jharkhand, serving clients across Mumbai, Delhi, Bangalore, Chennai, Hyderabad, and all of India. Get world-class quality at competitive rates.",
  keywords: indiaKeywords,
  authors: [{ name: "Avioni Digital Agency", url: "https://Avioni.agency" }],
  creator: "Avioni Digital Agency",
  publisher: "Avioni Digital Agency",
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
    url: "https://Avioni.agency",
    siteName: "Avioni Digital Agency",
    title: "Avioni - Best Web Development & Digital Marketing Agency in India",
    description:
      "Transform your business with India's most trusted digital agency. Web development, app development, SEO, UI/UX design, video editing & digital marketing. Serving all major cities across India.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Avioni Digital Agency - Web Development & Digital Marketing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Avioni - Best Digital Agency in India",
    description:
      "Web development, app development, SEO, UI/UX design & digital marketing services across India. Based in Ranchi, serving Mumbai, Delhi, Bangalore & more.",
    images: ["/og-image.png"],
    creator: "@Avioni_agency",
  },
  alternates: {
    canonical: "https://Avioni.agency",
    languages: {
      "en-IN": "https://Avioni.agency",
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
