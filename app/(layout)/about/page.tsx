"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  Award,
  ChevronDown,
  Cpu,
  Database,
  Gem,
  Globe,
  Layers,
  Layout,
  MapPin,
  Monitor,
  MousePointer2,
  PenTool,
  RefreshCcw,
  Rocket,
  Search,
  ShieldCheck,
  Smartphone,
  TrendingUp,
  Video,
  Zap,Paperclip,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";

// --- ANIMATION COMPONENTS ---

const FadeIn = ({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const SpotlightCard = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`group relative border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(168, 85, 247, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

const ParallaxText = ({
  children,
  baseVelocity = 100,
}: {
  children: string;
  baseVelocity?: number;
}) => {
  return (
    <div className="overflow-hidden flex flex-nowrap whitespace-nowrap select-none pointer-events-none absolute top-1/2 -translate-y-1/2 w-full opacity-[0.07] dark:opacity-[0.05]">
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        className="text-[15vw] font-black uppercase text-zinc-900 dark:text-white"
      >
        {children} {children} {children} {children}
      </motion.div>
    </div>
  );
};

// --- DATA SETS ---

const faqs = [
  {
    q: "How do you guarantee SEO results?",
    a: "We don't guess — we engineer. Our process involves deep semantic analysis, core web vitals optimization (95+ scores), and high-authority backlinking strategies. We've helped clients achieve 10x organic traffic in 12 months. That's not luck, that's science.",
  },
  {
    q: "Can you handle enterprise-scale traffic?",
    a: "Absolutely. We build on Next.js and Vercel/AWS Edge networks. Our architectures handle millions of requests with auto-scaling databases and global CDNs. Your site will stay up even if you go viral. (And we'll help you go viral.)",
  },
  {
    q: "Do you do video & motion graphics?",
    a: "Yes! Our in-house motion team creates cinema-grade assets that integrate seamlessly into web experiences without killing load times. From reels to brand films, we make content that people actually watch.",
  },
  {
    q: "What is the typical timeline?",
    a: "For a premium custom build, typically 6-10 weeks. We sprint in 2-week cycles with full transparency — you see progress every Friday. No surprises, no 'it's almost done' for 3 months.",
  },
  {
    q: "Why should we choose Avioni over bigger agencies?",
    a: "Bigger agencies have layers of account managers between you and the people doing the work. With us, you talk directly to the experts. Plus, we're hungry. We treat every project like our reputation depends on it — because it does.",
  },
  {
    q: "Do you work with clients outside Ranchi?",
    a: "Absolutely! We work with clients across India — Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Pune, and beyond. We've even worked with international clients. Distance is just a Zoom call away.",
  },
];

const team = [
  {
    name: "Kush V.",
    roles: ["SDE", "SEO", "Growth", "Brand"],
    portfolio: "https://kush-personal-portfolio-my-portfolio.vercel.app/",
    img: "/team/Kush.jpeg",
  },
  {
    name: "Rahul K.",
    roles: ["UI/UX", "Editor", "Content", "MKTG"],
    portfolio: "https://rahulkumarci.framer.ai/",
    img: "/team/Rahul.jpeg",
  },
  {
    name: "Rohit K.",
    roles: ["SDE", "Sales"],
    portfolio: null,
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&fit=crop",
  },
  {
    name: "Tausif A.",
    roles: ["SDE"],
    portfolio:"https://tausif-ansari.netlify.app/",
    img: "/team/Tausif.jpeg",
  },
  {
    name: "Aditya S.",
    roles: ["Full Stack"],
    portfolio: null,
    img: "/team/Aditya.PNG",
  },
];

const servicesList = [
  {
    icon: Layout,
    title: "Website Development",
    desc: "Templates are for people who've given up. We handcraft blazing-fast websites that load before your competitors finish their morning chai.",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    desc: "iOS & Android apps so buttery smooth, Apple and Google will ask for our secrets. (We won't tell them. Client confidentiality and all that.)",
  },
  {
    icon: PenTool,
    title: "UI/UX Design",
    desc: "We design interfaces that make users fall in love AND click 'Buy Now'. Pretty that converts — that's the Avioni way.",
  },
  {
    icon: Database,
    title: "Full-Stack Development",
    desc: "From database architecture to pixel-perfect frontend — we build the whole thing. No finger-pointing, just results that speak for themselves.",
  },
  {
    icon: TrendingUp,
    title: "SEO & Digital Growth",
    desc: "Page 2 of Google is where websites go to die. We resurrect yours to Page 1 — where the customers, money, and glory live.",
  },
  {
    icon: RefreshCcw,
    title: "Maintenance & Support",
    desc: "We don't ghost after launch. 24/7 support with real humans who actually pick up calls. Revolutionary concept, we know!",
  },
  {
    icon: Video,
    title: "Video & Creative Media",
    desc: "In a world of 3-second attention spans, we create videos people actually finish watching. Reels, ads, brand films — all scroll-stopping content.",
  },
  {
    icon: MapPin,
    title: "Google My Business",
    desc: "When someone searches 'best [your service] near me', you should be first. We make you the local legend from Ranchi to Mumbai.",
  },
];

const detailedServices = [
  {
    title: "Website Development",
    content:
      "We don't just build websites — we craft digital experiences that make your competitors nervous. Using Next.js and Vercel, your site loads faster than your morning alarm. And yes, Google notices. (So do your customers.)",
    bullets: [
      "Headless CMS integration (Contentful, Sanity, Strapi)",
      "Serverless deployment that scales automatically",
      "Custom animations that make users go 'ooh'",
      "E-commerce solutions (Shopify, WooCommerce, Custom)",
    ],
  },
  {
    title: "UI/UX Design Systems",
    content:
      "Pretty is nice. Pretty that converts? That's art. We design interfaces based on how humans actually think (spoiler: it's not always logical). Every pixel has a purpose, every interaction tells a story.",
    bullets: [
      "User journey mapping (we stalk your users, ethically)",
      "High-fidelity prototypes you can actually click",
      "Accessibility compliance (because everyone deserves good UX)",
      "Brand identity & visual systems",
    ],
  },
  {
    title: "SEO & Digital Growth",
    content:
      "Ranking on page 2 of Google is like opening a shop in a ghost town. We make sure you're on page 1, where the action is. Technical SEO, content strategy, and continuous optimization — the whole package.",
    bullets: [
      "Technical SEO audits (we find what's broken)",
      "Core Web Vitals optimization (speed matters)",
      "Conversion Rate Optimization (more clicks, more customers)",
      "Local SEO & Google My Business domination",
    ],
  },
  {
    title: "Video & Creative Media",
    content:
      "In a world where attention spans are shorter than a TikTok video, we create content that stops the scroll. From brand films to social media reels, our videos don't just get views — they get results.",
    bullets: [
      "Brand films & corporate videos",
      "Social media reels & shorts",
      "Motion graphics & animations",
      "Product demos & explainer videos",
    ],
  },
  {
    title: "Digital Marketing & Ads",
    content:
      "We don't burn your ad budget on 'brand awareness'. Every rupee comes back with friends. Google Ads, Meta Ads, LinkedIn — we speak their language fluently. Your CFO will finally understand what marketing does.",
    bullets: [
      "Google Ads & PPC campaigns",
      "Facebook & Instagram advertising",
      "LinkedIn B2B campaigns",
      "Retargeting & remarketing strategies",
    ],
  },
];

const portfolioCategories = [
  {
    id: "all",
    label: "All Work",
    icon: Layers,
    desc: "A curated selection of our finest digital engineering.",
  },
  {
    id: "web-dev",
    label: "Web Development",
    icon: Monitor,
    desc: "High-performance Next.js websites tailored for SEO and speed.",
  },
  {
    id: "app-dev",
    label: "App Development",
    icon: Smartphone,
    desc: "Native iOS & Android applications built with React Native.",
  },
  {
    id: "video",
    label: "Video Editing",
    icon: Video,
    desc: "Cinematic storytelling, motion graphics, and post-production.",
  },
  {
    id: "seo",
    label: "SEO & Growth",
    icon: Search,
    desc: "Data-driven strategies to rank #1 on Google.",
  },
  {
    id: "design",
    label: "Designing",
    icon: PenTool,
    desc: "UI/UX, Branding, and Visual Identity systems.",
  },
  {
    id: "gmb",
    label: "GMB & Marketing",
    icon: MapPin,
    desc: "Google My Business optimization and local domination.",
  },
];

const projects = [
  {
    id: 1,
    title: "Nebula Finance",
    cat: "web-dev",
    size: "large",
    img: "https://images.unsplash.com/photo-1642427749670-f20e2e76ed8c?q=80&w=2000&auto=format&fit=crop",
    tags: ["Next.js", "FinTech"],
  },
  {
    id: 2,
    title: "Apex Fitness App",
    cat: "app-dev",
    size: "small",
    img: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=1000&auto=format&fit=crop",
    tags: ["iOS", "Health"],
  },
  {
    id: 3,
    title: "Luxe Real Estate",
    cat: "seo",
    size: "tall",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop",
    tags: ["SEO", "Growth"],
  },
  {
    id: 4,
    title: "Neon Cyberpunk Ad",
    cat: "video",
    size: "wide",
    img: "https://images.unsplash.com/photo-1535016120720-40c6874c3b1c?q=80&w=1000&auto=format&fit=crop",
    tags: ["VFX", "Editing"],
  },
  {
    id: 5,
    title: "Zenith Branding",
    cat: "design",
    size: "small",
    img: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1000&auto=format&fit=crop",
    tags: ["Identity", "UI/UX"],
  },
  {
    id: 6,
    title: "Local Bakery GMB",
    cat: "gmb",
    size: "small",
    img: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?q=80&w=1000&auto=format&fit=crop",
    tags: ["GMB", "Maps"],
  },
  {
    id: 7,
    title: "Crypto Dashboard",
    cat: "web-dev",
    size: "tall",
    img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1000&auto=format&fit=crop",
    tags: ["Web3", "React"],
  },
  {
    id: 8,
    title: "Fashion Promo",
    cat: "video",
    size: "small",
    img: "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?q=80&w=1000&auto=format&fit=crop",
    tags: ["4K", "Color Grade"],
  },
];

const whyChooseUs = [
  {
    icon: Rocket,
    title: "Velocity Engineering",
    desc: "We deploy production-grade code 2x faster using our proprietary component library.",
  },
  {
    icon: MousePointer2,
    title: "Psychological UX",
    desc: "Interfaces designed using behavioral science to maximize conversion rates.",
  },
  {
    icon: ShieldCheck,
    title: "Bulletproof Security",
    desc: "Enterprise-grade security protocols woven into every line of code.",
  },
  {
    icon: Gem,
    title: "Premium Aesthetics",
    desc: "Visuals that don't just look good—they feel expensive and authoritative.",
  },
];

// --- PAGE COMPONENTS ---

// 1. ABOUT PAGE COMPONENT (REMASTERED)
const AboutPage = ({ setView }: { setView: (view: string) => void }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yOrb = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const rotateOrb = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const [activeFAQ, setActiveFAQ] = useState<number | null>(0);

  return (
    <div
      ref={containerRef}
      className="pb-24 overflow-hidden bg-zinc-50 dark:bg-black transition-colors duration-700"
    >
      {/* Background Noise Texture */}
      <div
        className="fixed inset-0 pointer-events-none opacity-20 z-0 mix-blend-overlay"
        style={{
          backgroundImage:
            "url('https://grainy-gradients.vercel.app/noise.svg')",
        }}
      />

      {/* --- HERO SECTION: PARALLAX & ALIVE --- */}
      <section className="relative h-screen flex flex-col justify-center items-center px-6 overflow-hidden">
        {/* Animated Orbs */}
        <motion.div
          style={{ y: yOrb, rotate: rotateOrb }}
          className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-gradient-to-br from-purple-600/30 to-blue-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-multiply dark:mix-blend-screen"
        />
        <motion.div
          style={{
            y: useTransform(scrollYProgress, [0, 1], ["0%", "20%"]),
            x: "-50%",
          }}
          className="absolute bottom-[-20%] left-0 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 rounded-full blur-[100px] pointer-events-none"
        />

        <motion.div
          style={{ y: yHero }}
          className="relative z-10 max-w-6xl mx-auto text-center"
        >
          <FadeIn>
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-zinc-300 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl mb-12 shadow-lg">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <span className="text-xs font-bold text-zinc-600 dark:text-zinc-300 uppercase tracking-widest">
                System Online // Global Reach
              </span>
            </div>
          </FadeIn>

          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter text-zinc-900 dark:text-white mb-8 leading-[0.85]">
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                BEYOND
              </motion.span>
            </span>
            <span className="block overflow-hidden text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-500">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="block"
              >
                THE CODE
              </motion.span>
            </span>
          </h1>

          <FadeIn delay={0.3}>
            <p className="max-w-3xl mx-auto text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
              We are the architects of the new internet. Merging
              <span className="font-bold text-zinc-900 dark:text-white">
                {" "}
                chaotic art{" "}
              </span>
              with
              <span className="font-bold text-zinc-900 dark:text-white">
                {" "}
                disciplined engineering{" "}
              </span>
              to build brands that dominate.
            </p>
          </FadeIn>
        </motion.div>
      </section>

      {/* --- PHILOSOPHY: SCROLL ANIMATED --- */}
      <section className="relative py-32 px-6 border-y border-zinc-200 dark:border-zinc-900/50 bg-white/50 dark:bg-zinc-900/20 backdrop-blur-sm">
        <ParallaxText baseVelocity={-2}>PHILOSOPHY</ParallaxText>
        <div className="max-w-6xl mx-auto relative z-10 grid gap-32">
          {[
            {
              title: "Obsessive Precision.",
              text: "Average is a disease. We cure it with pixel-perfect engineering and SEO strategies that don't just rank, they rule.",
            },
            {
              title: "Cinematic Motion.",
              text: "Static is dead. We breathe life into UI with physics-based animations that feel liquid, responsive, and alive.",
            },
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center border-l-4 border-purple-500 pl-8 md:pl-12 hover:pl-16 transition-all duration-500 cursor-none">
                <h3 className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-white w-full md:w-1/2 leading-[0.9] tracking-tight">
                  {item.title}
                </h3>
                <p className="text-lg md:text-2xl text-zinc-600 dark:text-zinc-400 w-full md:w-1/2 leading-relaxed font-light">
                  {item.text}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* --- NEW SECTION: WHY CHOOSE US (HOLOGRAPHIC GRID) --- */}
      <section className="py-32 px-6 bg-zinc-100 dark:bg-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <FadeIn>
            <div className="text-center mb-24">
              <h2 className="text-5xl md:text-6xl font-black text-zinc-900 dark:text-white mb-6 tracking-tighter">
                The Avioni{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                  Advantage
                </span>
              </h2>
              <p className="text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
                Why industry leaders trust us with their digital soul.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyChooseUs.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <SpotlightCard className="rounded-3xl p-10 h-full flex flex-col justify-between hover:shadow-2xl hover:shadow-purple-500/10 transition-shadow duration-500">
                  <div className="mb-6 w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-purple-600">
                    <item.icon size={32} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">
                      {item.title}
                    </h3>
                    <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- IMPACT SECTION --- */}
      <section className="py-32 px-6 bg-zinc-50 dark:bg-[#050505] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 text-zinc-900 dark:text-white">
              The <span className="text-purple-500 italic">Ripple Effect</span>
            </h2>
          </FadeIn>

          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  icon: Globe,
                  val: "45+",
                  label: "Countries Reached",
                  sub: "Global digital footprint",
                },
                {
                  icon: Award,
                  val: "15+",
                  label: "Awards Won",
                  sub: "Design excellence recognized",
                },
                {
                  icon: Cpu,
                  val: "99.9%",
                  label: "Uptime Guaranteed",
                  sub: "Enterprise reliability",
                },
                {
                  icon: Zap,
                  val: "500%",
                  label: "Avg. ROI",
                  sub: "Client growth focus",
                },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -20, scale: 1.05 }}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    delay: i * 0.1,
                  }}
                  className="relative bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl z-10 group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                  <h3 className="text-6xl font-black text-zinc-900 dark:text-white mb-2">
                    {stat.val}
                  </h3>
                  <p className="text-lg font-bold text-zinc-700 dark:text-zinc-300">
                    {stat.label}
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-2">
                    {stat.sub}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- TEAM SECTION --- */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-zinc-200 dark:border-zinc-800 pb-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white">
                  The Architects
                </h2>
                <p className="text-zinc-500 mt-2">
                  A multidisciplinary collective.
                </p>
              </div>
              <button
                onClick={() => setView("work")}
                className="text-purple-500 font-bold flex items-center gap-2 hover:gap-4 transition-all mt-4 md:mt-0"
              >
                View Our Portfolio <ArrowRight size={20} />
              </button>
            </div>
          </FadeIn>

          {/* Responsive grid: 2 cols mobile, 3 on md, and auto-fit on lg+ to fill space evenly */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
            {team.map((member, i) => (
<motion.div
  key={i}
  initial={{ opacity: 0, scale: 0.9 }}
  whileInView={{ opacity: 1, scale: 1 }}
  whileHover={{ y: -5 }}
  viewport={{ once: true }}
  transition={{ duration: 0.4, delay: i * 0.05 }}
  className="group relative bg-zinc-100 dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200 dark:border-zinc-800 hover:border-purple-500/50 transition-colors flex-1"
>
  {/* PORTFOLIO ICON */}
  {member.portfolio && (
    <Link
  href={member.portfolio}
  target="_blank"
  title={`Visit ${member.name.split(" ")[0]}'s portfolio`}
  className="
    absolute top-4 right-4 z-20
    w-8 h-8 flex items-center justify-center
    rounded-full
    text-orange-600 dark:text-orange-400
    border border-zinc-300 dark:border-zinc-700
    hover:border-orange-600 dark:hover:border-orange-400
    hover:shadow-md hover:shadow-orange-500/20
    transition-all duration-300
    bg-white/70 dark:bg-zinc-800/70
  "
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.44 11.05l-9.19 9.19a5 5 0 01-7.07-7.07l9.19-9.19a3 3 0 014.24 4.24l-9.2 9.2a1 1 0 11-1.41-1.42l8.48-8.48"
    />
  </svg>
</Link>

  )}

  {/* IMAGE */}
  <div className="h-[60%] aspect-square rounded-2xl overflow-hidden mb-4 relative">
    <Image
      src={member.img}
      width={500}
      height={500}
      alt={member.name}
      className="w-full h-full object-cover rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-500"
    />
  </div>

  {/* NAME */}
  <h3 className="font-semibold text-zinc-900 dark:text-white text-sm md:text-base">
    {member.name}
  </h3>

  {/* ROLES */}
  <div className="flex flex-wrap gap-1 mt-1">
    {member.roles.map((r) => (
      <span
        key={r}
        className="text-[10px] md:text-[11px] uppercase font-medium px-1.5 py-0.5 bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-md"
      >
        {r}
      </span>
    ))}
  </div>
</motion.div>

            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ --- */}
      <section className="py-24 px-6 bg-zinc-50 dark:bg-black border-t border-zinc-200 dark:border-zinc-900">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-12 text-center text-zinc-900 dark:text-white">
              Common Questions
            </h2>
          </FadeIn>

          <div className="space-y-4">
            {faqs.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden bg-white dark:bg-zinc-900/40"
              >
                <button
                  onClick={() => setActiveFAQ(activeFAQ === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-lg font-bold text-zinc-800 dark:text-zinc-200">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${
                      activeFAQ === i
                        ? "rotate-180 text-purple-500"
                        : "text-zinc-400"
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {activeFAQ === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="py-20 px-6 bg-zinc-900 dark:bg-white text-white dark:text-black mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2 text-left">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
              Enough Talk. <br /> Let&apos;s Build.
            </h2>
            <p className="text-lg text-zinc-400 dark:text-zinc-600 max-w-md">
              Our schedule fills up fast. Secure your spot in our production
              pipeline today.
            </p>
          </div>

          <div className="md:w-1/2 flex flex-col items-start md:items-end gap-6">
            <div className="w-full md:w-auto">
              <button
                onClick={() => setView("contact")}
                className="w-full md:w-auto px-10 py-5 bg-white dark:bg-black text-black dark:text-white rounded-full text-xl font-bold flex items-center justify-center gap-4 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-shadow hover:scale-105 transform duration-300"
              >
                Start Project <Zap fill="currentColor" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// 2. PORTFOLIO PAGE COMPONENT
const PortfolioPage = ({ setView }: { setView: (view: string) => void }) => {
  const [filter, setFilter] = useState("all");
  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.cat === filter);

  return (
    <div className="pt-24 pb-24 min-h-screen">
      <section className="px-6 text-center mb-16">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-6xl md:text-9xl font-black text-zinc-900 dark:text-white tracking-tighter mb-6"
        >
          OUR{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            WORK
          </span>
        </motion.h1>
        <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto relative z-20">
          {portfolioCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 border
                  ${
                    filter === cat.id
                      ? "bg-zinc-900 dark:bg-white text-white dark:text-black border-transparent scale-105 shadow-xl shadow-purple-500/20"
                      : "bg-transparent text-zinc-500 border-zinc-300 dark:border-zinc-800 hover:border-zinc-500 dark:hover:border-zinc-600 hover:text-zinc-800 dark:hover:text-zinc-200"
                  }`}
            >
              <cat.icon className="w-4 h-4" />
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 mb-32">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-[300px]"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className={`${
                  project.size === "large" ? "md:col-span-2 md:row-span-2" : ""
                } ${project.size === "wide" ? "md:col-span-2" : ""} ${
                  project.size === "tall" ? "md:row-span-2" : ""
                }`}
              >
                <motion.div
                  whileHover={{ scale: 1.02, zIndex: 10 }}
                  className="relative rounded-3xl overflow-hidden group cursor-pointer w-full h-full bg-zinc-800 border border-zinc-700"
                >
                  <Image
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    width={800}
                    height={600}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex gap-2 mb-3">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-bold px-2 py-1 bg-white/20 backdrop-blur-md rounded text-white"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-2">
                      {project.title}
                    </h3>
                    <div className="h-1 w-12 bg-purple-500 group-hover:w-full transition-all duration-500" />
                  </div>
                  <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <ArrowRight className="w-6 h-6 text-black -rotate-45" />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

// 3. SERVICES PAGE COMPONENT
const ServicesPage = ({ setView }: { setView: (view: string) => void }) => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="pt-24 pb-24 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-zinc-900 dark:text-white mb-6">
            <span className="block">Services Engineered</span> for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-500">
              Growth
            </span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {servicesList.map((service, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="group p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/20"
            >
              <service.icon className="w-8 h-8 text-indigo-500 mb-4 group-hover:text-blue-500 transition-colors" />
              <h3 className="text-2xl font-bold mb-3 text-zinc-900 dark:text-white">
                {service.title}
              </h3>
              <p className="text-md text-zinc-600 dark:text-zinc-400">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mb-24">
          <h2 className="text-5xl font-bold tracking-tighter mb-12 text-center text-zinc-900 dark:text-white">
            The Full{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-500">
              Breakdown
            </span>
          </h2>
          <div className="max-w-5xl mx-auto space-y-4">
            {detailedServices.map((service, index) => (
              <div
                key={index}
                className="border-b border-zinc-200 dark:border-zinc-800"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                  className="flex justify-between items-center w-full py-6 text-left"
                >
                  <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white">
                    {service.title}
                  </h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                  >
                    <ChevronDown className="w-6 h-6 text-indigo-500" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6">
                        <p className="text-lg mb-4 text-zinc-600 dark:text-zinc-400">
                          {service.content}
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                          {service.bullets.map((bullet, i) => (
                            <li
                              key={i}
                              className="text-md text-zinc-600 dark:text-zinc-400"
                            >
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Dummy setView function for components that still expect it
  const setView = () => {};

  return (
    <div className="min-h-screen transition-colors duration-700 bg-zinc-50 dark:bg-[#050505] text-zinc-900 dark:text-white">
      {/* Global Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* Shared Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="min-h-screen">
        <AboutPage setView={setView} />
      </main>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}
