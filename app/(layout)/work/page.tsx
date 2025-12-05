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
  BarChart3,
  Code,
  ExternalLink,
  Layers,
  Layout,
  Lightbulb,
  Linkedin,
  MapPin,
  Megaphone,
  PenTool,
  Rocket,
  ShieldCheck,
  Smartphone,
  Star,
  TrendingUp,
  Video,X,Play,
} from "lucide-react";
import Image from "next/image";
import React, { useMemo, useRef, useState } from "react";

// --- GLOBAL UTILITIES & ANIMATION COMPONENTS ---


type NavLinkProps = {
  to: string;
  children: React.ReactNode;
  className?: string;
  setView: (view: string) => void;
  active?: boolean;
};

const NavLink = ({
  to,
  children,
  className = "",
  setView,
  active = false,
}: NavLinkProps) => (
  <button
    onClick={() => setView(to)}
    className={`${className} ${active ? "text-purple-500" : ""}`}
  >
    {children}
  </button>
);

const FadeIn = ({
  children,
  delay = 0,
  className,
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}) => {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

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
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
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

const TiltCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  return (
    <motion.div
      style={{ x, y, rotateX, rotateY, z: 100 }}
      drag
      dragElastic={0.16}
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      whileHover={{ cursor: "grabbing" }}
      className={`relative transform-style-3d ${className}`}
    >
      {children}
    </motion.div>
  );
};

const ParallaxText = ({
  children,
}: {
  children: string;
  baseVelocity?: number;
}) => {
  return (
    <div className="overflow-hidden flex flex-nowrap whitespace-nowrap select-none pointer-events-none absolute top-1/2 -translate-y-1/2 w-full opacity-[0.03] dark:opacity-[0.05]">
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

const REVIEWS = [
  {
    name: "Elena Roderick",
    title: "CMO, FutureScale",
    quote:
      "The ROI we saw from the SEO campaign was instant. Avioni literally put us on the map.",
  },
  {
    name: "Marcus Chen",
    title: "Founder, TechFlow",
    quote:
      "Their video editing team turned our boring corporate footage into a Netflix-style documentary.",
  },
  {
    name: "Sarah Jenkins",
    title: "Product Lead, Apex",
    quote:
      "The app is flawless. Smooth animations, zero bugs, and 5-star reviews on the App Store.",
  },
  {
    name: "David O'Connell",
    title: "Owner, Bean&Brew",
    quote:
      "We doubled our local foot traffic in 3 months thanks to their GMB wizardry.",
  },
  {
    name: "Priya Patel",
    title: "Director, LuxeEstates",
    quote:
      "A design language that speaks luxury. They understood our brand better than we did.",
  },
  {
    name: "James Thorne",
    title: "CEO, Nebula",
    quote:
      "Engineering at the speed of light. The Next.js build is incredibly fast.",
  },
];

const portfolioCategories = [
  {
    id: "all",
    label: "All",
    icon: Layers,
    desc: "Our finest digital engineering.",
  },
  {
    id: "web-app-dev",
    label: "Web & App Dev",
    icon: Code,
    desc: "High-performance Next.js & Native architectures.",
    serviceLink: "services",
  },
  {
    id: "web-design",
    label: "Web Design",
    icon: Layout,
    desc: "Award-winning UI/UX and visual storytelling.",
    serviceLink: "services",
  },
  {
    id: "video-editing",
    label: "Video Editing",
    icon: Video,
    desc: "Cinematic post-production and motion graphics.",
    serviceLink: "services",
  },
  {
    id: "seo",
    label: "SEO",
    icon: TrendingUp,
    desc: "Data-driven dominance of search results.",
    serviceLink: "services",
  },
  {
    id: "designing",
    label: "Designing",
    icon: PenTool,
    desc: "Brand identity, logos, and design systems.",
    serviceLink: "services",
  },
  {
    id: "digital-marketing",
    label: "Digital Marketing",
    icon: Megaphone,
    desc: "Growth campaigns that convert.",
    serviceLink: "services",
  },
  {
    id: "gmb",
    label: "GMB",
    icon: MapPin,
    desc: "Local SEO and Google Maps optimization.",
    serviceLink: "services",
  },
];

// Real client website projects
const webProjects = [
  {
    id: 1,
    title: "Cambridge Trust",
    cat: "web-app-dev",
    size: "wide",
    img: "/our-projects/CambrigeTrust.png",
    tags: ["Next.js", "NGO", "Razorpay"],
    link: "https://cambridgewelfaretrust.org/",
    description: "Educational charity supporting 500+ children",
  },
  {
    id: 2,
    title: "JankiInfotech",
    cat: "web-app-dev",
    size: "wide",
    img: "/our-projects/JankiInfotech.png",
    tags: ["React", "IT Services", "Node.js"],
    link: "https://jankiinfotech.com/",
    description: "Full-service IT firm with 50+ startup clients",
  },
  {
    id: 3,
    title: "Krishna Mehandi",
    cat: "web-app-dev",
    size: "tall",
    img: "/our-projects/KrishnaMehandi.png",
    tags: ["Next.js", "Portfolio", "Framer Motion"],
    link: "https://krishnamehandiartist.in/",
    description: "Professional mehandi artist with 500+ designs",
  },
  {
    id: 4,
    title: "Ayurakshak",
    cat: "web-app-dev",
    size: "large",
    img: "/our-projects/Ayurakshak.png",
    tags: ["Next.js", "Healthcare", "MongoDB"],
    link: "https://ayurakshak.vercel.app/",
    description: "Naturopathy & Ayurvedic platform serving 10,000+ patients",
  },
  {
    id: 5,
    title: "Ravi Mehandi",
    cat: "web-app-dev",
    size: "small",
    img: "/our-projects/RaviMehandi.png",
    tags: ["Next.js", "Portfolio", "TypeScript"],
    link: "https://ravi-mehandi.vercel.app/",
    description: "Traditional mehandi artist with 2000+ clients",
  },
  {
    id: 6,
    title: "Shine It Cleaning",
    cat: "web-app-dev",
    size: "small",
    img: "/our-projects/ShineItCleaning.png",
    tags: ["HTML/CSS", "Business", "Local SEO"],
    link: "https://shineitcleaning.com",
    description: "Professional cleaning services platform",
  },
  {
    id: 7,
    title: "DPS Thalwara",
    cat: "web-app-dev",
    size: "small",
    img: "/our-projects/DPS.png",
    tags: ["Static Site", "Education", "CBSE"],
    link: "https://dpsthalwara.com",
    description: "CBSE-affiliated school serving Darbhanga region",
  },
  {
    id: 8,
    title: "Mission Education",
    cat: "web-app-dev",
    size: "small",
    img: "/our-projects/MissionEducation.png",
    tags: ["React", "Education", "Consulting"],
    link: "https://missioneducation.info",
    description: "Education consultancy & admission counselling",
  },
  {
  id: 9,
  title: "Shiva Enviro Lab",
  cat: "web-app-dev",
  size: "wide",
  img: "/our-projects/ShivaEnviroLab.png",
  tags: ["Environmental Lab", "Testing Services", "Ranchi", "Contact Form"],
  link: "https://shivaenvirolab.com/",
  description: "Environmental testing & research lab in Ranchi — water, air, noise analysis, EIA support; ISO-accredited and JSPCB-approved."
},
{
  id: 10,
  title: "Model School Kanke",
  cat: "web-app-dev",
  size: "wide",
  img: "/our-projects/ModelSchoolKanke.png",
  tags: ["School", "Education", "Kanke Meshra", "Admissions", "Fee Structure"],
  link: "https://modelschoolkanke.com/",
  description: "CM School of Excellence (Model School Kanke) — K-12 school in Meshra, Kanke, Ranchi. Info on curriculum, fees, faculty, contacts and admission."
}
  
];

// YouTube documentary videos
const videoProjects = [
  {
    id: "v1",
    title: "Brand Documentary",
    cat: "video-editing",
    size: "large",
    videoId: "ieSo-WK4DhY",
    tags: ["Documentary", "Storytelling"],
  },
  {
    id: "v2",
    title: "Social Impact Film",
    cat: "video-editing",
    size: "tall",
    videoId: "VpnhhuBUs54",
    tags: ["Social", "Impact"],
  },
  {
    id: "v3",
    title: "Cultural Journey",
    cat: "video-editing",
    size: "wide",
    videoId: "Aje2oek3UqY",
    tags: ["Culture", "Travel"],
  },
  {
    id: "v4",
    title: "Creative Showcase",
    cat: "video-editing",
    size: "small",
    videoId: "kOd_kwb9n-Q",
    tags: ["Creative", "Showcase"],
  },
  {
    id: "v5",
    title: "Visual Story",
    cat: "video-editing",
    size: "small",
    videoId: "ifz87YbZx1k",
    tags: ["Visual", "Narrative"],
  },
];

// Design/SEO/GMB/Marketing showcase projects (placeholder with real aesthetic)
const otherProjects = [
  {
    id: "d1",
    title: "Luxe Brand Identity",
    cat: "designing",
    size: "tall",
    img: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1000&auto=format&fit=crop",
    tags: ["Branding", "Identity"],
  },
  {
    id: "d2",
    title: "Tech Startup SEO",
    cat: "seo",
    size: "small",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
    tags: ["SEO", "Growth"],
  },
  {
    id: "d3",
    title: "Local Cafe GMB",
    cat: "gmb",
    size: "small",
    img: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?q=80&w=1000&auto=format&fit=crop",
    tags: ["GMB", "Local"],
  },
  {
    id: "d4",
    title: "E-Commerce Campaign",
    cat: "digital-marketing",
    size: "wide",
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop",
    tags: ["Ads", "Conversion"],
  },
  {
    id: "d5",
    title: "SaaS Dashboard UI",
    cat: "web-design",
    size: "large",
    img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1000&auto=format&fit=crop",
    tags: ["UI/UX", "SaaS"],
  },
];

// Combine all projects for "All" category
const allProjects = [...webProjects, ...videoProjects, ...otherProjects];

const team = [
  {
    name: "Alex V.",
    roles: ["Creative Dir", "UI/UX"],
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&fit=crop",
  },
  {
    name: "Sarah J.",
    roles: ["Lead Dev", "System Arch"],
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&fit=crop",
  },
  {
    name: "Davide R.",
    roles: ["3D Motion", "VFX"],
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&fit=crop",
  },
  {
    name: "Emily W.",
    roles: ["SEO Strat", "Growth"],
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&fit=crop",
  },
  {
    name: "Marcus L.",
    roles: ["Full Stack", "Security"],
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&fit=crop",
  },
  {
    name: "Priya K.",
    roles: ["Copywriter", "Brand"],
    img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=400&fit=crop",
  },
];

// --- NEW COMPONENTS ---

const ReviewsSection = () => {
  // Triple duplicate for smooth seamless loop
  const reviewLoop = useMemo(() => [...REVIEWS, ...REVIEWS, ...REVIEWS], []);

  return (
    <section className="relative py-32 bg-zinc-50 dark:bg-black overflow-hidden">
      {/* Gradient Fade Overlays for smooth edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-linear-to-r from-zinc-50 dark:from-black to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-linear-to-l from-zinc-50 dark:from-black to-transparent z-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 mb-20 text-center">
        <FadeIn>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-zinc-900 dark:text-white mb-6">
            Voices of{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-pink-500">
              Impact.
            </span>
          </h2>
          <p className="text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
            Real words from real partners. We don&apos;t just deliver files; we
            deliver outcomes that reshape businesses.
          </p>
        </FadeIn>
      </div>

      {/* Scroller */}
      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex gap-6 w-max"
          animate={{ x: ["0%", "-33.33%"] }} // Move exactly one set length
          transition={{ ease: "linear", duration: 50, repeat: Infinity }}
          whileHover={{ animationPlayState: "paused" }} // Optional: pause on hover if using CSS, framer needs manual control or hover layout
        >
          {reviewLoop.map((review, index) => (
            <div key={index} className="w-[300px] md:w-[400px] flex-shrink-0">
              <SpotlightCard className="rounded-3xl p-8 h-full bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800/50">
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <div className="mb-6">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          fill="currentColor"
                          className="inline-block text-yellow-500 w-4 h-4 mr-1"
                        />
                      ))}
                    </div>
                    <p className="text-lg font-medium text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                      &quot;{review.quote}&quot;
                    </p>
                  </div>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-zinc-900 dark:text-white text-sm">
                        {review.name}
                      </h4>
                      <p className="text-xs text-purple-500 dark:text-purple-400 uppercase tracking-wide font-bold">
                        {review.title}
                      </p>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const BrandMarquee = () => {
  const brands = [
    "GOOGLE",
    "AMAZON",
    "NIKE",
    "SPOTIFY",
    "UBER",
    "AIRBNB",
    "NETFLIX",
    "TESLA",
    "STRIPE",
    "APPLE",
    "FIGMA",
    "SHOPIFY",
  ];

  const brandLoop = useMemo(() => [...brands, ...brands], []);

  const colorPalettes = ["sky", "emerald", "amber", "rose", "indigo"];

  const customStyles = `
    .font-inter {
      font-family: 'Inter', sans-serif;
    }

    /* Smooth premium glow */
    .marquee-pill {
      transition: all 350ms cubic-bezier(0.4, 0.13, 0.23, 0.96);
    }

    /* Glow per color */
    .hover-sky:hover .marquee-pill {
      border-color: rgb(56, 189, 248);
      box-shadow: 0 0 18px rgba(56, 189, 248, 0.25);
    }
    .hover-emerald:hover .marquee-pill {
      border-color: rgb(16, 185, 129);
      box-shadow: 0 0 18px rgba(16, 185, 129, 0.25);
    }
    .hover-amber:hover .marquee-pill {
      border-color: rgb(251, 191, 36);
      box-shadow: 0 0 18px rgba(251, 191, 36, 0.25);
    }
    .hover-rose:hover .marquee-pill {
      border-color: rgb(244, 63, 94);
      box-shadow: 0 0 18px rgba(244, 63, 94, 0.25);
    }
    .hover-indigo:hover .marquee-pill {
      border-color: rgb(99, 102, 241);
      box-shadow: 0 0 18px rgba(99, 102, 241, 0.25);
    }

    /* Fade edges */
    .mask-image-gradient {
      -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
      mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
    }
  `;

  return (
    <section className="py-16 bg-[#fafafa] dark:bg-gradient-to-b dark:from-black dark:to-[#050505] overflow-hidden relative font-inter">
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <FadeIn>
          <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 flex items-center justify-center gap-2">
            <ShieldCheck size={16} className="text-sky-500" />
            Trusted by Global Innovators
          </h4>
        </FadeIn>
      </div>

      {/* Marquee */}
      <div className="relative flex overflow-x-hidden mask-image-gradient">
        <motion.div
          className="flex gap-12 items-center whitespace-nowrap pl-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        >
          {brandLoop.map((logo, idx) => {
            const color = colorPalettes[idx % colorPalettes.length];

            return (
              <div key={idx} className={`group relative hover-${color}`}>
                <div
                  className="
                  marquee-pill 
                  px-8 py-3 
                  rounded-full 
                  bg-white dark:bg-zinc-900 
                  border border-transparent
                  cursor-default
                "
                >
                  <span
                    title={logo}
                    className="cursor-pointer text-xl md:text-2xl font-black text-zinc-600 dark:text-zinc-400"
                  >
                    {logo}
                  </span>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

const ProcessSection = () => {
  const steps = [
    {
      icon: Lightbulb,
      title: "Discovery",
      desc: "We dig deep into your brand DNA to find the unique angle.",
    },
    {
      icon: PenTool,
      title: "Craft",
      desc: "Pixel-perfect design meets robust engineering.",
    },
    {
      icon: Rocket,
      title: "Launch",
      desc: "Deployment strategies that ensure 100% uptime and speed.",
    },
    {
      icon: BarChart3,
      title: "Scale",
      desc: "Continuous optimization based on real user data.",
    },
  ];

  return (
    <section className="py-32 px-6 bg-white dark:bg-black border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="mb-20 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white mb-6">
            How We <span className="text-purple-500">Win.</span>
          </h2>
          <p className="text-zinc-500 max-w-2xl mx-auto">
            Our battle-tested methodology for digital dominance.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <FadeIn key={i} delay={i * 0.1} className="relative">
              {i !== steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-1/2 w-full h-[2px] bg-gradient-to-r from-purple-500/50 to-transparent -z-10" />
              )}
              <div className="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center mb-6 mx-auto text-purple-600 shadow-lg z-10 relative">
                <step.icon size={32} />
              </div>
              <h3 className="text-xl font-bold text-center text-zinc-900 dark:text-white mb-3">
                {step.title}
              </h3>
              <p className="text-center text-sm text-zinc-500">{step.desc}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- PAGES ---

const AboutPage = ({ setView }: { setView: (view: string) => void }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yOrb = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const rotateOrb = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <div
      ref={containerRef}
      className="overflow-hidden bg-zinc-50 dark:bg-black transition-colors duration-700"
    >
      <div
        className="fixed inset-0 pointer-events-none opacity-20 z-0 mix-blend-overlay"
        style={{
          backgroundImage:
            "url('https://grainy-gradients.vercel.app/noise.svg')",
        }}
      />

      <section className="relative h-screen flex flex-col justify-center items-center px-6 overflow-hidden">
        <motion.div
          style={{ y: yOrb, rotate: rotateOrb }}
          className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-gradient-to-br from-purple-600/30 to-blue-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-multiply dark:mix-blend-screen"
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
                transition={{ duration: 0.8 }}
                className="block"
              >
                BEYOND
              </motion.span>
            </span>
            <span className="block overflow-hidden text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-500">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="block"
              >
                THE CODE
              </motion.span>
            </span>
          </h1>
          <FadeIn delay={0.3}>
            <p className="max-w-3xl mx-auto text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
              We are the architects of the new internet. Merging{" "}
              <span className="font-bold text-zinc-900 dark:text-white">
                chaotic art
              </span>{" "}
              with{" "}
              <span className="font-bold text-zinc-900 dark:text-white">
                disciplined engineering
              </span>
              .
            </p>
          </FadeIn>
        </motion.div>
      </section>

      {/* Philosophy Section */}
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
              <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center border-l-4 border-purple-500 pl-8 md:pl-12 hover:pl-16 transition-all duration-500">
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

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5 }}
                viewport={{ once: false }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative bg-zinc-100 dark:bg-zinc-900 rounded-2xl p-4 border border-zinc-200 dark:border-zinc-800 hover:border-purple-500/50 transition-colors"
              >
                <div className="aspect-square rounded-xl overflow-hidden mb-4 relative">
                  <Image
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    width={800}
                    height={600}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Linkedin className="text-white hover:text-blue-400 cursor-pointer w-4 h-4" />
                    <ExternalLink className="text-white hover:text-purple-400 cursor-pointer w-4 h-4" />
                  </div>
                </div>
                <h3 className="font-bold text-zinc-900 dark:text-white text-sm">
                  {member.name}
                </h3>
                <div className="flex flex-wrap gap-1 mt-2">
                  {member.roles.map((r) => (
                    <span
                      key={r}
                      className="text-[10px] uppercase font-bold px-1.5 py-0.5 bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-md"
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

      <Footer />
    </div>
  );
};

// Custom Video Card with play functionality
const VideoCard = ({
  video,
  onPlay,
}: {
  video: (typeof videoProjects)[0];
  onPlay: (videoId: string) => void;
}) => {
  const thumbnailUrl = `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`;

  return (
    <div
      className="relative w-full h-full group cursor-pointer"
      onClick={() => onPlay(video.videoId)}
    >
      <Image
        src={thumbnailUrl}
        alt={video.title}
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        width={800}
        height={600}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

      {/* Custom Play Button - subtle glowing circle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)] group-hover:shadow-[0_0_50px_rgba(255,255,255,0.4)]">
          <Play className="w-8 h-8 text-white fill-white ml-1" />
        </div>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
        <div className="flex gap-2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          {video.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] uppercase font-bold px-2 py-1 bg-white/20 backdrop-blur-md rounded text-white"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-2xl font-bold text-white mb-2 leading-none">
          {video.title}
        </h3>
        <div className="h-1 w-0 bg-purple-500 group-hover:w-16 transition-all duration-500 delay-200" />
      </div>
    </div>
  );
};

// Website Card with hover link
const WebsiteCard = ({ project }: { project: (typeof webProjects)[0] }) => {
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="relative w-full h-full group cursor-pointer block"
    >
      <Image
        src={project.img}
        alt={project.title}
        className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
        width={800}
        height={600}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

      {/* Hover Link Button */}
      <div className="absolute top-6 right-6 scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
        <div
          className="px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white text-sm font-medium flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:bg-white/30 transition-all"
          title={`Visit ${project.title}`}
        >
          Visit Site
          <ExternalLink className="w-4 h-4" />
        </div>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
        <div className="flex gap-2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] uppercase font-bold px-2 py-1 bg-white/20 backdrop-blur-md rounded text-white"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-2xl font-bold text-white mb-1 leading-none">
          {project.title}
        </h3>
        <p className="text-sm text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150">
          {project.description}
        </p>
        <div className="h-1 w-0 bg-purple-500 group-hover:w-16 transition-all duration-500 delay-200 mt-2" />
      </div>
    </a>
  );
};

// Generic Image Card for other categories
const ImageCard = ({ project }: { project: (typeof otherProjects)[0] }) => {
  return (
    <div className="relative w-full h-full group cursor-pointer">
      <Image
        src={project.img}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        width={800}
        height={600}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out">
        <div className="flex gap-2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] uppercase font-bold px-2 py-1 bg-white/20 backdrop-blur-md rounded text-white"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-3xl font-bold text-white mb-2 leading-none">
          {project.title}
        </h3>
        <div className="h-1 w-0 bg-purple-500 group-hover:w-16 transition-all duration-500 delay-200" />
      </div>

      {/* Action Icon */}
      <div className="absolute top-6 right-6 scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-purple-500 hover:text-white transition-colors">
          <ArrowRight className="w-5 h-5 -rotate-45" />
        </div>
      </div>
    </div>
  );
};

// Video Modal Component
const VideoModal = ({
  videoId,
  onClose,
}: {
  videoId: string | null;
  onClose: () => void;
}) => {
  if (!videoId) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="relative w-full max-w-5xl aspect-video"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          className="w-full h-full rounded-2xl"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </motion.div>
    </motion.div>
  );
};

// Type definitions for projects
type WebProject = (typeof webProjects)[0];
type VideoProject = (typeof videoProjects)[0];
type OtherProject = (typeof otherProjects)[0];
type AnyProject = WebProject | VideoProject | OtherProject;

// 2. PORTFOLIO PAGE
const PortfolioPage = ({ setView }: { setView: (view: string) => void }) => {
  const [filter, setFilter] = useState("all");
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  // Helper to check if project is a video
  const isVideoProject = (project: AnyProject): project is VideoProject => {
    return 'videoId' in project;
  };

  // Helper to check if project is a web project
  const isWebProject = (project: AnyProject): project is WebProject => {
    return 'link' in project && 'description' in project;
  };

  // Get filtered projects based on category - memoized for stability
  const filteredProjects = useMemo(() => {
    if (filter === "all") {
      // Mix of 4 web projects + 3 videos = 7 total for All category
      const selectedWeb = webProjects.slice(0, 4);
      const selectedVideos = videoProjects.slice(0, 3);
      const mixed = [...selectedWeb, ...selectedVideos];
      // Shuffle for jumbled effect
      return mixed.sort((a, b) => {
        const order = [0, 4, 1, 5, 2, 6, 3]; // Interleave pattern
        return order.indexOf(mixed.indexOf(a)) - order.indexOf(mixed.indexOf(b));
      });
    }
    if (filter === "web-app-dev") {
      return webProjects;
    }
    if (filter === "video-editing") {
      return videoProjects;
    }
    // For other categories, filter from otherProjects
    return otherProjects.filter((p) => p.cat === filter);
  }, [filter]);

  const activeCatData = portfolioCategories.find((c) => c.id === filter);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen pt-24 bg-[#fcf7ef] dark:bg-[#1a1a1a] transition-colors duration-700"
    >
      <div
        className="fixed inset-0 pointer-events-none opacity-30 z-0 mix-blend-overlay"
        style={{
          backgroundImage:
            "url('https://grainy-gradients.vercel.app/noise.svg')",
        }}
      />

      {/* Cinematic Hero */}
      <section className="relative px-6 text-center mb-16 overflow-hidden pt-20">
        <motion.div style={{ y: yHero }} className="relative z-10">
          <FadeIn>
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-[#faa200]/30 bg-[#faa200]/10 text-[#faa200] text-xs font-bold tracking-widest uppercase">
              <Award size={14} />
              <span>Award Winning Works</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-7xl md:text-[10rem] font-black text-[#222222] dark:text-[#fcf7ef] tracking-tighter mb-6 leading-none">
              OUR{" "}
              <span className="text-[#faa200]">
                WORK
              </span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-xl md:text-2xl text-[#222222]/80 dark:text-[#fcf7ef]/80 max-w-3xl mx-auto mb-12 font-light">
              Browse our galaxy of digital products. From high-conversion SEO
              campaigns to immersive 3D web experiences.
            </p>
          </FadeIn>
        </motion.div>

        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[500px] bg-[#faa200]/20 blur-[120px] rounded-full pointer-events-none" />
      </section>

      <BrandMarquee />

      {/* Category Command Center */}
      <section className="px-6 my-20 relative z-20">
        <div className="max-w-7xl mx-auto">
          <FadeIn direction="up">
            <div className="flex flex-wrap justify-center gap-3">
              {portfolioCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  className={`group relative flex items-center gap-2 px-5 py-3 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 border
                     ${
                       filter === cat.id
                         ? "bg-[#faa200] text-[#222222] border-transparent scale-105 shadow-2xl shadow-[#faa200]/20"
                         : "bg-[#fcf7ef] dark:bg-[#222222] text-[#222222]/80 dark:text-[#fcf7ef]/80 border-[#fed382] dark:border-[#f79f47] hover:border-[#faa200] hover:text-[#faa200]"
                     }`}
                >
                  <cat.icon
                    className={`w-4 h-4 ${
                      filter === cat.id
                        ? "text-[#222222]"
                        : "text-[#222222]/60 dark:text-[#fcf7ef]/60 group-hover:text-[#faa200]"
                    }`}
                  />
                  {cat.label}
                </button>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Dynamic Service Highlight Banner */}
      <AnimatePresence mode="wait">
        {filter !== "all" && activeCatData && (
          <motion.section
            key="service-banner"
            initial={{ height: 0, opacity: 0, y: 20 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="px-6 mb-16 overflow-hidden relative z-10"
          >
            <div className="max-w-7xl mx-auto bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-black border border-purple-500/30 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-purple-500/10">
              <div className="text-left">
                <div className="flex items-center gap-3 mb-4 text-purple-500 font-bold uppercase tracking-widest text-xs">
                  <activeCatData.icon size={16} />
                  <span>Featured Service Category</span>
                </div>
                <h3 className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white mb-4 tracking-tight">
                  Mastering{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                    {activeCatData.label}
                  </span>
                  .
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 max-w-xl text-lg font-medium">
                  {activeCatData.desc} We combine data-driven insights with
                  award-winning aesthetics.
                </p>
              </div>
              <button
                onClick={() => setView("services")}
                className="group relative px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-xl font-bold transition-all hover:scale-105 flex items-center gap-3 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-10 transition-opacity" />
                <span>Explore {activeCatData.label} Services</span>
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <VideoModal videoId={activeVideo} onClose={() => setActiveVideo(null)} />
        )}
      </AnimatePresence>

      {/* The "Alive" Grid */}
      <div className="max-w-7xl mx-auto px-6 mb-32 relative z-10">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => {
              const hasVideo = 'videoId' in project;
              const hasLink = 'link' in project;
              const imgSrc = hasVideo
                ? `https://img.youtube.com/vi/${(project as VideoProject).videoId}/maxresdefault.jpg`
                : (project as WebProject | OtherProject).img;

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.3 } }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`${
                    project.size === "large" ? "md:col-span-2 md:row-span-2" : ""
                  } ${project.size === "wide" ? "md:col-span-2" : ""} ${
                    project.size === "tall" ? "md:row-span-2" : ""
                  }`}
                >
                  <TiltCard className="h-full w-full">
                    <SpotlightCard className="rounded-3xl h-full w-full border-zinc-200 dark:border-zinc-800 overflow-hidden">
                      {hasVideo ? (
                        // Video Card
                        <div
                          className="relative w-full h-full group cursor-pointer"
                          onClick={() => setActiveVideo((project as VideoProject).videoId)}
                        >
                          <Image
                            src={imgSrc}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            width={800}
                            height={600}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

                          {/* Custom Play Button */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)] group-hover:shadow-[0_0_50px_rgba(255,255,255,0.4)]">
                              <Play className="w-8 h-8 text-white fill-white ml-1" />
                            </div>
                          </div>

                          {/* Content */}
                          <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                            <div className="flex flex-wrap gap-2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                              {project.tags.map((tag) => (
                                <span key={tag} className="text-[10px] uppercase font-bold px-2 py-1 bg-white/20 backdrop-blur-md rounded text-white">
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2 leading-none">{project.title}</h3>
                            <div className="h-1 w-0 bg-purple-500 group-hover:w-16 transition-all duration-500 delay-200" />
                          </div>
                        </div>
                      ) : hasLink ? (
                        // Website Card with external link
                        <a
                          href={(project as WebProject).link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative w-full h-full group cursor-pointer block"
                        >
                          <Image
                            src={imgSrc}
                            alt={project.title}
                            className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
                            width={800}
                            height={600}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

                          {/* Visit Button */}
                          <div className="absolute top-6 right-6 scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
                            <div className="px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white text-sm font-medium flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:bg-white/30 transition-all">
                              Visit Site
                              <ExternalLink className="w-4 h-4" />
                            </div>
                          </div>

                          {/* Content */}
                          <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                            <div className="flex flex-wrap gap-2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                              {project.tags.map((tag) => (
                                <span key={tag} className="text-[10px] uppercase font-bold px-2 py-1 bg-white/20 backdrop-blur-md rounded text-white">
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-1 leading-none">{project.title}</h3>
                            {'description' in project && (
                              <p className="text-sm text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150 line-clamp-2">
                                {(project as WebProject).description}
                              </p>
                            )}
                            <div className="h-1 w-0 bg-purple-500 group-hover:w-16 transition-all duration-500 delay-200 mt-2" />
                          </div>
                        </a>
                      ) : (
                        // Generic Image Card (for other categories)
                        <div className="relative w-full h-full group cursor-pointer">
                          <Image
                            src={imgSrc}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            width={800}
                            height={600}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

                          {/* Content */}
                          <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                            <div className="flex flex-wrap gap-2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                              {project.tags.map((tag) => (
                                <span key={tag} className="text-[10px] uppercase font-bold px-2 py-1 bg-white/20 backdrop-blur-md rounded text-white">
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2 leading-none">{project.title}</h3>
                            <div className="h-1 w-0 bg-purple-500 group-hover:w-16 transition-all duration-500 delay-200" />
                          </div>

                          {/* Action Icon */}
                          <div className="absolute top-6 right-6 scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-purple-500 hover:text-white transition-colors">
                              <ArrowRight className="w-5 h-5 -rotate-45" />
                            </div>
                          </div>
                        </div>
                      )}
                    </SpotlightCard>
                  </TiltCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      <ProcessSection />
      <ReviewsSection />

      {/* Final Cinematic CTA */}
      <section className="py-32 px-6 bg-zinc-900 dark:bg-black text-white relative overflow-hidden z-10">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <FadeIn>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-8">
              Ready to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                Scale?
              </span>
            </h2>
            <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
              Stop playing small. Join the roster of elite brands dominating
              their industry with Avioni.
            </p>
            <button
              onClick={() => setView("contact")}
              className="px-12 py-6 bg-white text-black rounded-full text-xl font-bold hover:scale-105 hover:shadow-[0_0_50px_rgba(255,255,255,0.3)] transition-all flex items-center gap-3 mx-auto"
            >
              <Rocket className="text-purple-600" /> Start Your Project
            </button>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// 3. SERVICES PAGE (PRESERVED)
const ServicesPage = ({ setView }: { setView: (view: string) => void }) => {
  return (
    <div className="pt-24 min-h-screen bg-zinc-50 dark:bg-black transition-colors duration-700">
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <FadeIn className="text-center mb-20">
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-zinc-900 dark:text-white mb-6">
            <span className="block">Services Engineered</span> for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-500">
              Growth
            </span>
          </h1>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {[
            { icon: Layout, title: "Web Development", desc: "Next.js & React" },
            {
              icon: Smartphone,
              title: "App Development",
              desc: "iOS & Android",
            },
            {
              icon: TrendingUp,
              title: "SEO Strategy",
              desc: "Rank #1 on Google",
            },
            { icon: Video, title: "Video Editing", desc: "Cinema Grade VFX" },
            { icon: PenTool, title: "Brand Design", desc: "Identity & UI/UX" },
            { icon: MapPin, title: "GMB Growth", desc: "Local Domination" },
          ].map((service, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <SpotlightCard className="p-8 rounded-3xl h-full">
                <service.icon className="w-10 h-10 text-indigo-500 mb-6" />
                <h3 className="text-2xl font-bold mb-3 text-zinc-900 dark:text-white">
                  {service.title}
                </h3>
                <p className="text-md text-zinc-600 dark:text-zinc-400 mb-6">
                  {service.desc}
                </p>
                <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                  <ArrowRight size={18} />
                </div>
              </SpotlightCard>
            </FadeIn>
          ))}
        </div>
      </div>
      <Footer />
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
    <div className="min-h-screen transition-colors duration-700 bg-[#fcf7ef] dark:bg-[#1a1a1a] text-[#222222] dark:text-[#fcf7ef]">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#faa200] origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* Shared Navbar */}
      <Navbar />

      <main className="min-h-screen">
        <PortfolioPage setView={setView} />
      </main>
    </div>
  );
}
