"use client";
import {
  motion,
  useAnimation,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import React, { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { IconType } from "react-icons";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Popup from "@/components/Popup";
import { Button } from "@/components/ui/button";
import { useElementInView } from "@/lib/hooks/useElementInView";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Award,
  BarChart3,
  Camera,
  Code2,
  Crown,
  ExternalLink,
  Globe,
  Layers,
  LineChart,
  Mail,
  Megaphone,
  Palette,
  Phone,
  Shield,
  Smartphone,
  Sparkles,
  TrendingUp,
  Users,
  Video,
  WalletMinimal,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// --- Brand & Content Data ---

interface RevealProps {
  children: ReactNode;
  width?: string;
  delay?: number;
}

const PHONE_NUMBER = "+91 98355 04582";
const EMAIL = "hello@Avioni.agency";
const ADDRESS = "Ranchi, Jharkhand, India";

const MARQUEE_BRANDS = [
  { name: "Next.js", icon: Layers },
  { name: "React", icon: Code2 },
  { name: "Vercel", icon: Zap },
  { name: "AWS", icon: Globe },
  { name: "Shopify", icon: TrendingUp },
  { name: "Stripe", icon: Activity },
];

const SERVICES = [
  {
    id: "web",
    title: "Web Development",
    desc: "Templates are for people who've given up on life. We handcraft blazing-fast websites that load before you finish blinking. Your competitors will need therapy after seeing your site.",
    icon: Code2,
    color: "#faa200",
    span: "md:col-span-2",
  },
  {
    id: "app",
    title: "Mobile Apps",
    desc: "Apps so buttery smooth, Apple and Google will ask for our secrets. We won't tell them. Client confidentiality and all that jazz.",
    icon: Smartphone,
    color: "#f79f47",
    span: "md:col-span-1",
  },
  {
    id: "design",
    title: "UI/UX Design",
    desc: "We design interfaces that make users fall in love with your product, not us. Though that happens too. A lot, actually.",
    icon: Palette,
    color: "#fed382",
    span: "md:col-span-1",
  },
  {
    id: "growth",
    title: "SEO & Growth",
    desc: "Page 2 of Google is where websites go to die. We resurrect yours to Page 1 where the customers, money, and glory live. No black magic, just brilliant strategy.",
    icon: LineChart,
    color: "#faa200",
    span: "md:col-span-2",
  },
  {
    id: "video",
    title: "Video Production",
    desc: "In a world of 3-second attention spans, we create videos people actually finish watching. Reels, ads, brand films — all scroll-stopping, share-worthy content.",
    icon: Video,
    color: "#f79f47",
    span: "md:col-span-1",
  },
  {
    id: "marketing",
    title: "Digital Marketing",
    desc: "We don't burn your ad budget on 'brand awareness'. Every rupee comes back with friends. Meta, Google, YouTube — we speak their language fluently.",
    icon: Megaphone,
    color: "#fed382",
    span: "md:col-span-1",
  },
];

const PROJECTS = [
  {
    title: "Ayurakshak",
    cat: "Healthcare Platform",
    image: "/our-projects/Ayurakshak.png",
    gradient: "from-emerald-900/80 to-slate-900/80",
    description:
      "A digital bridge between ancient Ayurvedic wisdom and modern healthcare. Serving 10,000+ patients through 55+ hospitals across India.",
    technologies: ["Next.js", "React", "MongoDB", "Tailwind CSS"],
    link: "https://ayurakshak.vercel.app/",
  },
  {
    title: "Krishna Mehandi",
    cat: "Artist Portfolio",
    image: "/our-projects/KrishnaMehandi.png",
    gradient: "from-rose-900/80 to-slate-900/80",
    description:
      "Where tradition meets technology. A stunning digital showcase for 500+ intricate mehandi designs with seamless booking.",
    technologies: ["Next.js", "Framer Motion", "TypeScript"],
    link: "https://krishnamehandiartist.in/",
  },
  {
    title: "Cambridge Trust",
    cat: "NGO Platform",
    image: "/our-projects/CambrigeTrust.png",
    gradient: "from-blue-900/80 to-slate-900/80",
    description:
      "Empowering education for 500+ underprivileged children. A transparent donation platform for a 12G & 80G certified trust.",
    technologies: ["Next.js", "Razorpay", "Node.js"],
    link: "https://cambridgewelfaretrust.org/",
  },
];

const themes: Record<string, Theme> = {
  neon: { from: "#08f7fe", to: "#09fbd3", text: "#08f7fe" },
  pink: { from: "#ff1b8d", to: "#ff6ac1", text: "#ff1b8d" },
  purple: { from: "#6a00ff", to: "#b44cff", text: "#b44cff" },
  cyan: { from: "#00eaff", to: "#00b7ff", text: "#00eaff" },
  amber: { from: "#ffb300", to: "#ff7300", text: "#ffb300" },
  green: { from: "#00ff8f", to: "#00c471", text: "#00ff8f" },
};

// --- UI Components ---

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

const TiltCard = ({ children, className = "" }: TiltCardProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(x, [-0.5, 0.5], ["-10deg", "10deg"]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`transition-transform duration-200 ease-out ${className}`}
    >
      {children}
    </motion.div>
  );
};

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

const MagneticButton = ({
  children,
  className = "",
  onClick,
  variant = "primary",
  disabled = false,
}: MagneticButtonProps) => {
  const ref = useRef<HTMLButtonElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current || disabled) return;

    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();

    setPosition({
      x: (clientX - (left + width / 2)) * 0.2,
      y: (clientY - (top + height / 2)) * 0.2,
    });
  };

  const styles =
    variant === "primary"
      ? "bg-[#faa200] text-[#222222] shadow-lg"
      : "bg-transparent border border-[#fed382] dark:border-[#f79f47] text-[#222222] dark:text-[#fcf7ef] hover:bg-[#fde9c4] dark:hover:bg-[#222222]";

  return (
    <motion.button
      ref={ref}
      animate={position}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      onMouseMove={handleMouse}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      onClick={onClick}
      disabled={disabled}
      className={`relative overflow-hidden px-6 py-3 rounded-lg font-bold text-sm transition-transform active:scale-95 ${styles} ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {children}
    </motion.button>
  );
};

interface SectionHeadingProps {
  children: React.ReactNode;
  subtitle?: string;
  align?: "center" | "left";
}

const SectionHeading = ({
  children,
  subtitle,
  align = "center",
}: SectionHeadingProps) => (
  <div
    className={`mb-16 ${
      align === "center" ? "text-center" : "text-left"
    } max-w-4xl mx-auto px-4`}
  >
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#222222] dark:text-[#fcf7ef] mb-4"
    >
      {children}
    </motion.h2>

    {subtitle && (
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-lg text-[#222222]/80 dark:text-[#fcf7ef]/80"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

interface InputFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const InputField = ({
  label,
  type = "text",
  placeholder,
  name,
  value,
  onChange,
  required,
}: InputFieldProps) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-[#222222] dark:text-[#fcf7ef]">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full px-4 py-3 rounded-lg bg-[#fde9c4] dark:bg-[#222222] border border-[#fed382] dark:border-[#f79f47] focus:border-[#faa200] focus:ring-2 focus:ring-[#faa200]/20 outline-none transition-all text-[#222222] dark:text-[#fcf7ef] placeholder:text-[#222222]/60 dark:placeholder:text-[#fcf7ef]/60"
    />
  </div>
);

// --- Sections ---

interface GridBackgroundProps {
  mousePos: { x: number; y: number } | null;
}

const GridBackground: React.FC<GridBackgroundProps> = ({ mousePos }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Base Grid - Dense and Faint */}
    <div
      className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
      style={{
        backgroundImage: `linear-gradient(to right, #888 1px, transparent 1px), linear-gradient(to bottom, #888 1px, transparent 1px)`,
        backgroundSize: "32px 32px",
      }}
    />

    {/* Spotlight Reveal - Shows colored grid on hover */}
    <div
      className="absolute inset-0 transition-opacity duration-300"
      style={{
        backgroundImage: `
      linear-gradient(to right, #6366f1 1px, transparent 1px),
      linear-gradient(to bottom, #a855f7 1px, transparent 1px)
    `,
        backgroundSize: "32px 32px",
        maskImage: mousePos
          ? `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent)`
          : undefined,
        WebkitMaskImage: mousePos
          ? `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent)`
          : undefined,
        opacity: 0.6,
      }}
    />

    {/* Vignette to fade edges */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,1)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,1)_100%)] opacity-70" />
  </div>
);

const GridParticles = () => {
  const particles = [
    {
      id: 1,
      color: "bg-cyan-400",
      size: 2,
      startX: "20%",
      startY: "30%",
      duration: 24,
      animation: "grid-slide-1",
    },
    {
      id: 2,
      color: "bg-purple-400",
      size: 2,
      startX: "70%",
      startY: "60%",
      duration: 28,
      animation: "grid-slide-2",
    },
    {
      id: 3,
      color: "bg-pink-400",
      size: 2,
      startX: "45%",
      startY: "85%",
      duration: 22,
      animation: "grid-slide-3",
    },
    {
      id: 4,
      color: "bg-blue-400",
      size: 2,
      startX: "10%",
      startY: "15%",
      duration: 26,
      animation: "grid-slide-4",
    },
    {
      id: 5,
      color: "bg-emerald-400",
      size: 2,
      startX: "85%",
      startY: "40%",
      duration: 20,
      animation: "grid-slide-5",
    },
    {
      id: 6,
      color: "bg-indigo-400",
      size: 2,
      startX: "65%",
      startY: "10%",
      duration: 27,
      animation: "grid-slide-6",
    },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none opacity-80">
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute w-${p.size} h-${p.size} rounded-full ${p.color} shadow-lg blur-[1px]`}
          style={{
            top: p.startY,
            left: p.startX,
            animation: `${p.animation} ${p.duration}s linear infinite alternate`,
          }}
        />
      ))}
    </div>
  );
};

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  className = "",
}) => {
  const [ref, isInView] = useElementInView(0.1);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`
        transition-all duration-700 ease-out transform
        ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-[100vh] pt-32 pb-20 flex flex-col justify-center overflow-hidden"
    >
      {/* Background Layer */}
      <div className="absolute inset-0 pointer-events-none bg-[#fcf7ef] dark:bg-[#1a1a1a] transition-colors duration-500" />

      {/* Interactive Grid & Ambience */}
      <GridBackground mousePos={mousePos} />

      {/* Grid Particles (The tiny colorful dots moving along the grid) */}
      <GridParticles />

      {/* Ambient Blobs (Subtler) */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse animation-delay-2000" />

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-6 relative z-20 w-full grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <div className="text-center lg:text-left">
          {/* Badge */}
          <FadeIn
            delay={0}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md text-[10px] font-bold tracking-widest uppercase mb-8 shadow-sm hover:scale-105 transition-transform cursor-default select-none"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-zinc-500 text-md dark:text-zinc-400 hover:text-emerald-300/50">
              #1 Digital Agency
            </span>
          </FadeIn>

          {/* Headline - Typography Overhaul */}
          <FadeIn delay={100}>
            <h1 className="text-4xl md:text-6xl lg:text-[5.2rem] font-black tracking-tighter text-zinc-900 dark:text-white mb-8 leading-[0.9] selection:bg-purple-500 selection:text-white">
              WE Forge <br />
              <span className="text-[#faa200] text-5xl md:text-7xl lg:text-[5.5rem]">
                DOMINANCE.
              </span>
            </h1>
          </FadeIn>

          {/* Description - Enhanced Visibility */}
          <FadeIn delay={200}>
            <div className="relative mb-12 max-w-lg mx-auto lg:mx-0">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-[#faa200] rounded opacity-0 lg:opacity-100 shadow-lg" />
              <p className="text-lg md:text-xl text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium lg:pl-4">
                We craft digital experiences that turn visitors into customers,
                and customers into raving fans. From Mumbai to Mangalore, Delhi
                to Dhanbad — brands trust us for{" "}
                <span className="text-zinc-900 dark:text-white font-bold">
                  results that actually matter
                </span>
                .
              </p>
            </div>
          </FadeIn>

          {/* Buttons - Compact & Punchy */}
          <FadeIn delay={300}>
            <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start">
              {/* Start Project */}
              <a
                href="#contact"
                className="
        group relative px-6 py-3 rounded-lg
        text-sm font-medium
        bg-[#faa200]
        text-[#222222] shadow-md
        hover:bg-[#f79f47]
        transition-all duration-300
        overflow-hidden
        inline-block
      "
              >
                <span className="relative z-10 flex items-center gap-2">
                  Request a Call
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>

                {/* Glow Effect */}
                <span
                  className="
          absolute inset-0 bg-white/10 opacity-0 
          group-hover:opacity-100 blur-md transition-all duration-500
        "
                />
              </a>

              {/* View Live Systems */}
              <button
                onClick={() => console.log("Work")}
                className="
        group relative px-6 py-3 rounded-lg
        text-sm font-medium
        border border-[#222222]/20 dark:border-[#fcf7ef]/20
        bg-transparent text-[#222222]
        dark:bg-transparent dark:text-[#fcf7ef]
        shadow-sm
        hover:bg-[#fde9c4] dark:hover:bg-[#222222]
        transition-all duration-300
      "
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Live Systems
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
                </span>

                {/* Subtle hover highlight */}
                <span
                  className="
          absolute inset-0 opacity-0 group-hover:opacity-100
          bg-gradient-to-br from-white/20 to-transparent
          dark:from-white/5
          transition-all duration-500
        "
                />
              </button>
            </div>
          </FadeIn>

          {/* Trust Indicators */}
          <FadeIn delay={400}>
            <div className="mt-12 pt-5 border-zinc-200 dark:border-zinc-800 flex items-center justify-center lg:justify-start gap-12 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
              <div className="group cursor-default">
                <span className="block text-2xl text-[#222222] dark:text-[#fcf7ef] mb-1 group-hover:text-[#faa200] transition-colors">
                  50+
                </span>
                Active Systems
              </div>
              <div className="group cursor-default">
                <span className="block text-2xl text-[#222222] dark:text-[#fcf7ef] mb-1 group-hover:text-[#faa200] transition-colors">
                  98%
                </span>
                Retention Rate
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Right Side: Visual Data Orb (Refined) */}
        <div className="relative h-[600px] hidden lg:flex items-center justify-center perspective-1000">
          <div className="relative h-[500px] hidden lg:flex items-center justify-center perspective-1000">
            {/* Simulated 3D Network */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              className="relative w-[400px] h-[400px]"
            >
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 rounded-full border border-slate-200 dark:border-white/10 ${
                    i === 0 ? "border-dashed" : ""
                  }`}
                  style={{
                    transform: `rotate(${i * 30}deg) scale(${1 - i * 0.2})`,
                  }}
                />
              ))}

              {/* Floating Icons */}
              <motion.div
                animate={{ y: [-20, 20, -20] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-0 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-white/10"
              >
                <Globe className="text-blue-500 w-8 h-8" />
              </motion.div>
              <motion.div
                animate={{ x: [-20, 20, -20] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-1/2 right-0 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-white/10"
              >
                <Camera className="text-purple-500 w-8 h-8" />
              </motion.div>
              <motion.div
                animate={{ y: [20, -20, 20] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-white/10"
              >
                <Code2 className="text-green-500 w-8 h-8" />
              </motion.div>

              {/* Central Core */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#faa200] rounded-full blur-xl opacity-30 animate-pulse" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-[#fcf7ef] dark:bg-[#222222] rounded-full flex items-center justify-center shadow-2xl z-10">
                <span className="text-2xl font-black text-[#faa200]">
                  Z
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

type Theme = {
  from: string;
  to: string;
  text: string;
};

const MarqueeSection = () => {
  return (
    <div className="py-12 border-y border-[#fde9c4] dark:border-[#222222] bg-[#fde9c4]/50 dark:bg-[#222222] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        {/* <p className="text-sm font-bold uppercase tracking-widest text-slate-400">
          Trusted by Startups
        </p> */}
      </div>
      <div className="relative flex overflow-x-hidden group">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex gap-8 py-4 whitespace-nowrap px-4"
        >
          {[...MARQUEE_BRANDS, ...MARQUEE_BRANDS, ...MARQUEE_BRANDS].map(
            (brand, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-6 py-3 rounded-lg border border-[#fed382] dark:border-[#f79f47] bg-[#fcf7ef] dark:bg-[#1a1a1a] hover:border-[#faa200] transition-colors min-w-[160px] justify-center"
              >
                <brand.icon className="w-5 h-5 text-[#f79f47]" />
                <span className="font-bold text-[#222222] dark:text-[#fcf7ef]">
                  {brand.name}
                </span>
              </div>
            )
          )}
        </motion.div>
        {/* Fade Edges */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#fde9c4] dark:from-[#222222] to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#fde9c4] dark:from-[#222222] to-transparent z-10" />
      </div>
    </div>
  );
};

const Services = () => (
  <section id="services" className="py-32 bg-[#fcf7ef] dark:bg-[#1a1a1a]">
    <SectionHeading subtitle="We don't just build websites. We build revenue engines.">
      Our Expertise
    </SectionHeading>

    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {SERVICES.map((service) => (
        <motion.div
          key={service.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`${service.span} group relative overflow-hidden rounded-lg bg-[#fde9c4] dark:bg-[#222222] border border-[#fed382] dark:border-[#f79f47] p-8 md:p-10 transition-all hover:shadow-xl`}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-[#222222] dark:text-[#fcf7ef] mb-4">
            {service.title}
          </h3>
          <p className="text-lg text-[#222222]/80 dark:text-[#fcf7ef]/80 mb-8 leading-relaxed">
            {service.desc}
          </p>
          <Link href="/service">
            <div className="flex items-center gap-2 font-bold text-[#faa200] group-hover:gap-4 transition-all">
              Explore Service <ArrowRight size={20} />
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  </section>
);

const VideoProduction = () => {
  return (
    <section className="py-24 transition-colors bg-[#fcf7ef] dark:bg-[#1a1a1a] text-[#222222] dark:text-[#fcf7ef]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Featured{" "}
            <span className="text-[#faa200]">
              Showreel
            </span>
          </h2>
          <p className="text-[#222222]/80 dark:text-[#fcf7ef]/80 max-w-2xl mx-auto mt-4 text-lg">
            A cinematic experience featuring brand films, motion graphics and
            scroll-stopping visual storytelling.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          {/* Main Reel */}
          <motion.div
            className="lg:col-span-3 rounded-lg overflow-hidden shadow-xl relative group"
            whileHover={{ scale: 1.015 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <iframe
                className="absolute inset-0 w-full h-full rounded-lg"
                src="https://www.youtube.com/embed/ieSo-WK4DhY?rel=0&modestbranding=1"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              />

              {/* Cinematic Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent pointer-events-none" />

              {/* Tag */}
              <div className="absolute left-6 bottom-6">
                <div
                  className="px-4 py-2 rounded-xl text-sm font-semibold 
              bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-lg"
                >
                  Main Showreel
                </div>
              </div>
            </div>
          </motion.div>

          {/* Side Reels */}
          <div className="lg:col-span-2 grid grid-cols-1 gap-8">
            {[
              "https://www.youtube.com/embed/VpnhhuBUs54?rel=0&modestbranding=1",
              "https://www.youtube.com/embed/Aje2oek3UqY?rel=0&modestbranding=1",
            ].map((link, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", damping: 18 }}
                className="rounded-lg shadow-lg overflow-hidden relative group"
              >
                <div className="relative aspect-video rounded-lg">
                  <iframe
                    className="absolute inset-0 w-full h-full rounded-lg"
                    src={link}
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  />

                  {/* Glow Overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-50 transition-all bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-14 text-center">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.youtube.com/channel/UCsSPdeATMbLkPXeN2Jah8nQ"
            className="
          inline-flex items-center gap-2 px-7 py-3 rounded-lg text-base font-semibold
          bg-[#faa200]
          text-[#222222] shadow-lg
          hover:bg-[#f79f47]
          transition-all hover:scale-[1.05]"
          >
            Visit Channel →
          </a>
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => (
  <section id="work" className="py-32 bg-[#fcf7ef] dark:bg-[#1a1a1a]">
    <SectionHeading subtitle="Real projects. Real impact. Real results.">
      Selected Works
    </SectionHeading>

    <div className="max-w-7xl mx-auto px-6 space-y-20">
      {PROJECTS.map((project, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-12 items-center group"
        >
          {/* Image Side */}
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`relative aspect-[4/3] rounded-lg overflow-hidden shadow-2xl cursor-pointer ${
              i % 2 === 1 ? "lg:order-2" : ""
            }`}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${project.gradient} z-10 opacity-50 group-hover:opacity-30 transition-opacity duration-500`}
            />
            <Image
              src={project.image}
              alt={project.title}
              width={800}
              height={600}
              className="absolute inset-0 w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700"
            />

            <div className="absolute bottom-8 left-8 z-20">
              <div className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-sm font-bold inline-block mb-2">
                {project.cat}
              </div>
            </div>
          </a>

          {/* Text Side */}
          <div className={`${i % 2 === 1 ? "lg:order-1 lg:text-right" : ""}`}>
            <h3 className="text-4xl font-bold text-[#222222] dark:text-[#fcf7ef] mb-4">
              {project.title}
            </h3>
            <p className="text-lg text-[#222222]/80 dark:text-[#fcf7ef]/80 mb-8 leading-relaxed">
              {project.description}
            </p>

            <div
              className={`flex flex-wrap gap-3 mb-8 ${
                i % 2 === 1 ? "lg:justify-end" : ""
              }`}
            >
              {project.technologies.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded bg-[#fed382] dark:bg-[#f79f47] text-[#222222] dark:text-[#222222] text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            <Button className="group">
              <Link href="/work">
                View All Projects{" "}
                <ArrowRight
                  className="inline ml-2 group-hover:translate-x-1 transition-transform"
                  size={16}
                />
              </Link>
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

const servicesList = [
  "Website Development",
  "App Development",
  "UI/UX Design",
  "Digital Marketing",
  "Branding",
  "SEO",
  "Other",
];

const Contact = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [otherService, setOtherService] = useState("");

  const [popup, setPopup] = useState({
    show: false,
    type: "success" as "success" | "error",
    title: "",
    message: "",
  });

  const handleSelect = (service: string) => {
    setSelected((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const services = selected.includes("Other")
        ? [...selected.filter((s) => s !== "Other"), otherService].join(", ")
        : selected.join(", ");

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          service: services,
          source: "homepage",
        }),
      });

      if (response.ok) {
        setPopup({
          show: true,
          type: "success",
          title: "Message Sent!",
          message: "We will connect with you soon. Thank you for reaching out!",
        });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });
        setSelected([]);
        setOtherService("");
      } else {
        const data = await response.json();
        setPopup({
          show: true,
          type: "error",
          title: "Error",
          message: data.error || "Something went wrong. Please try again.",
        });
      }
    } catch {
      setPopup({
        show: true,
        type: "error",
        title: "Error",
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 bg-[#fde9c4] dark:bg-[#222222]">
      {popup.show && (
        <Popup
          title={popup.title}
          type={popup.type}
          message={popup.message}
          onClose={() => setPopup({ ...popup, show: false })}
        />
      )}

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
        {/* LEFT SIDE */}
        <div>
          <h2 className="text-5xl font-bold text-[#222222] dark:text-[#fcf7ef] mb-6">
            Ready to Scale? <br />
            <span className="text-[#faa200]">Request a Call Back.</span>
          </h2>

          <p className="text-xl text-[#222222]/80 dark:text-[#fcf7ef]/80 mb-12">
            Whether you need a new website, a mobile app, or a digital marketing
            strategy, we are here to help.
          </p>

          <div className="space-y-6 mb-12">
            <div className="flex items-center gap-4 p-4 rounded-lg bg-[#fcf7ef] dark:bg-[#1a1a1a] border border-[#fed382] dark:border-[#f79f47]">
              <div className="w-12 h-12 rounded-full bg-[#faa200] flex items-center justify-center text-[#222222]">
                <Phone />
              </div>
              <div>
                <p className="text-sm text-[#222222]/60 dark:text-[#fcf7ef]/60">Call Us (Ranchi HQ)</p>
                <p className="text-lg font-bold text-[#222222] dark:text-[#fcf7ef]">
                  +91 98765 43210
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-lg bg-[#fcf7ef] dark:bg-[#1a1a1a] border border-[#fed382] dark:border-[#f79f47]">
              <div className="w-12 h-12 rounded-full bg-[#f79f47] flex items-center justify-center text-[#222222]">
                <Mail />
              </div>
              <div>
                <p className="text-sm text-[#222222]/60 dark:text-[#fcf7ef]/60">Email Us</p>
                <p className="text-lg font-bold text-[#222222] dark:text-[#fcf7ef]">
                  hello@agency.com
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="bg-[#fcf7ef] dark:bg-[#1a1a1a] p-8 md:p-10 rounded-lg shadow-2xl border border-[#fed382] dark:border-[#f79f47]">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name Inputs */}
            <InputField
              label="Name"
              name="firstName"
              placeholder="Rohit"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />

            <InputField
              label="Email Address"
              name="email"
              type="email"
              placeholder="rohit@company.com"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <InputField
              label="Phone Number"
              name="phone"
              type="tel"
              placeholder="+91 99999 99999"
              value={formData.phone}
              onChange={handleInputChange}
            />

            {/* SERVICES DROPDOWN — FULL, UNTOUCHED */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#222222] dark:text-[#fcf7ef]">
                Services You Need
              </label>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setOpen(!open)}
                  className="w-full px-4 py-3 rounded-lg bg-[#fde9c4] dark:bg-[#222222] border border-[#fed382] dark:border-[#f79f47] text-left text-sm flex justify-between items-center"
                >
                  <span className="text-[#222222] dark:text-[#fcf7ef]">
                    {selected.length > 0
                      ? selected.join(", ")
                      : "Select services..."}
                  </span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 transition-transform ${
                      open ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {open && (
                  <div className="absolute z-20 mt-2 w-full bg-[#fcf7ef] dark:bg-[#1a1a1a] border border-[#fed382] dark:border-[#f79f47] rounded-lg shadow-lg p-3 space-y-2">
                    {servicesList.map((service) => (
                      <label
                        key={service}
                        className="flex items-center gap-3 cursor-pointer px-2 py-2 rounded hover:bg-[#fde9c4] dark:hover:bg-[#222222]"
                      >
                        <input
                          type="checkbox"
                          value={service}
                          checked={selected.includes(service)}
                          onChange={() => handleSelect(service)}
                          className="h-4 w-4"
                        />
                        <span className="text-sm text-[#222222] dark:text-[#fcf7ef]">
                          {service}
                        </span>
                      </label>
                    ))}

                    {selected.includes("Other") && (
                      <input
                        type="text"
                        placeholder="Specify your service..."
                        className="w-full px-3 py-2 rounded bg-[#fde9c4] dark:bg-[#222222] border border-[#fed382] dark:border-[#f79f47] text-sm text-[#222222] dark:text-[#fcf7ef] outline-none"
                        value={otherService}
                        onChange={(e) => setOtherService(e.target.value)}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* MESSAGE */}
            <textarea
              name="message"
              rows={4}
              placeholder="Tell us about your project..."
              value={formData.message}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-[#fde9c4] dark:bg-[#222222] border border-[#fed382] dark:border-[#f79f47] text-[#222222] dark:text-[#fcf7ef] placeholder:text-[#222222]/60 dark:placeholder:text-[#fcf7ef]/60 resize-none outline-none"
            />

            <MagneticButton
              className="w-full py-4 text-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Request Call Back"}
            </MagneticButton>
          </form>
        </div>
      </div>
    </section>
  );
};

const App = () => {
  return (
    <div className="min-h-screen bg-[#fcf7ef] dark:bg-[#1a1a1a] text-[#222222] dark:text-[#fcf7ef] font-sans selection:bg-[#faa200]/30 transition-colors duration-500 overflow-x-hidden">
      <style>{`
          /* Rotational Animations for the Orb */
          @keyframes spin-ultra-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-spin-ultra-slow {
            animation: spin-ultra-slow 60s linear infinite;
          }
          @keyframes spin-reverse-slow {
             from { transform: rotate(360deg); }
             to { transform: rotate(0deg); }
          }
          .animate-spin-reverse-slow {
             animation: spin-reverse-slow 40s linear infinite;
          }
           @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 20s linear infinite;
          }
          @keyframes float {
            0%, 100% { transform: translateY(-10px); }
            50% { transform: translateY(10px); }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          .animation-delay-1000 { animation-delay: 1s; }
          .animation-delay-2000 { animation-delay: 2s; }

          @keyframes pulse-slow {
             0%, 100% { transform: scale(1); opacity: 1; }
             50% { transform: scale(1.05); opacity: 0.9; }
          }
          .animate-pulse-slow {
             animation: pulse-slow 4s ease-in-out infinite;
          }

          /* Grid Particles Movement (aligned to 32px grid size) */
          @keyframes grid-slide-1 {
            0% { transform: translate(0, 0); }
            25% { transform: translate(64px, 32px); }
            50% { transform: translate(0, 64px); }
            75% { transform: translate(-32px, 32px); }
            100% { transform: translate(0, 0); }
          }
          @keyframes grid-slide-2 {
            0% { transform: translate(0, 0); }
            25% { transform: translate(-96px, 0); }
            50% { transform: translate(-96px, -64px); }
            75% { transform: translate(0, -64px); }
            100% { transform: translate(0, 0); }
          }
          @keyframes grid-slide-3 {
            0% { transform: translate(0, 0); }
            33% { transform: translate(128px, 0); }
            66% { transform: translate(128px, -32px); }
            100% { transform: translate(0, -32px); }
          }
          @keyframes grid-slide-4 {
            0% { transform: translate(0, 0); }
            50% { transform: translate(32px, 96px); }
            100% { transform: translate(0, 0); }
          }
          /* NEW ANIMATIONS FOR NEW DOTS */
          @keyframes grid-slide-5 {
            0% { transform: translate(0, 0); }
            33% { transform: translate(-32px, 64px); }
            66% { transform: translate(-64px, 32px); }
            100% { transform: translate(0, 0); }
          }
          @keyframes grid-slide-6 {
            0% { transform: translate(0, 0); }
            50% { transform: translate(-96px, 32px); }
            100% { transform: translate(0, 0); }
          }
        `}</style>
      <Navbar />

      <main>
        <Hero />
        <MarqueeSection />
        <Services />
        <VideoProduction />
        <Portfolio />
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

export default App;