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
  Camera,
  Code2,
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
const EMAIL = "hello@zoga.agency";
const ADDRESS = "Ranchi, Jharkhand, India";

const stats = [
  { label: "Years Experience", value: "10+" },
  { label: "Projects Shipped", value: "150+" },
  { label: "Client Satisfaction", value: "99%" },
];

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
    desc: "We build websites that actually work — fast, secure, and Google-friendly. No templates. Just pure craftsmanship that makes your competitors wonder 'how?'",
    icon: Code2,
    color: "from-blue-600 to-cyan-500",
    span: "md:col-span-2",
  },
  {
    id: "app",
    title: "Mobile Apps",
    desc: "iOS & Android apps so smooth, users will think it's magic. (Spoiler: It's just really good code and a lot of coffee.)",
    icon: Smartphone,
    color: "from-purple-600 to-pink-500",
    span: "md:col-span-1",
  },
  {
    id: "design",
    title: "UI/UX Design",
    desc: "Designs that look gorgeous AND convert. Because pretty doesn't pay bills — but pretty that sells? Now that's art.",
    icon: Palette,
    color: "from-orange-500 to-red-500",
    span: "md:col-span-1",
  },
  {
    id: "growth",
    title: "SEO & Growth",
    desc: "Get found on Google before your chai gets cold. Organic traffic that brings real customers, not just bots pretending to be interested.",
    icon: LineChart,
    color: "from-green-500 to-emerald-500",
    span: "md:col-span-2",
  },
  {
    id: "video",
    title: "Video Production",
    desc: "From scroll-stopping reels to cinematic brand films. We turn your vision into content that people actually watch (and share).",
    icon: Video,
    color: "from-rose-500 to-fuchsia-500",
    span: "md:col-span-1",
  },
  {
    id: "marketing",
    title: "Digital Marketing",
    desc: "Ads that convert, not just impressions that look good in reports. Real ROI, real growth, real talk.",
    icon: Megaphone,
    color: "from-indigo-600 to-blue-500",
    span: "md:col-span-1",
  },
];

const BRANDS = [
  "Google Cloud",
  "AWS",
  "Vercel",
  "Shopify Plus",
  "React",
  "Next.js",
];

const PROJECTS = [
  {
    title: "Fintech Dashboard",
    cat: "SaaS Platform",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000",
    gradient: "from-blue-900/80 to-slate-900/80",
  },
  {
    title: "Neon Commerce",
    cat: "E-Commerce",
    image:
      "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=2000",
    gradient: "from-purple-900/80 to-slate-900/80",
  },
  {
    title: "HealthAI",
    cat: "Medical App",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2000",
    gradient: "from-teal-900/80 to-slate-900/80",
  },
];

const WHY_US = [
  {
    title: "Ranchi Born, Globally Trusted",
    desc: "From the heart of Jharkhand to clients worldwide. We deliver Silicon Valley quality without the Silicon Valley invoice. 💪",
    icon: Globe,
  },
  {
    title: "We Actually Answer Calls",
    desc: "24/7 support that doesn't involve 'press 1 for...'. Real humans, real solutions, real fast. Ghost mode? Not our thing.",
    icon: Phone,
  },
  {
    title: "Your Growth = Our Obsession",
    desc: "Every rupee you invest should multiply. We build digital assets that generate revenue, not just 'brand awareness'.",
    icon: TrendingUp,
  },
];

const DASHBOARD_COLORS = {
  neon: "from-[#39FF14] to-[#0affd2]",
  pink: "from-[#FF00C8] to-[#FF6AD5]",
  cyan: "from-[#00F0FF] to-[#00A2FF]",
  amber: "from-[#FFB300] to-[#FF7800]",
};
const themes: Record<string, Theme> = {
  neon: { from: "#08f7fe", to: "#09fbd3", text: "#08f7fe" },
  pink: { from: "#ff1b8d", to: "#ff6ac1", text: "#ff1b8d" },
  purple: { from: "#6a00ff", to: "#b44cff", text: "#b44cff" },
  cyan: { from: "#00eaff", to: "#00b7ff", text: "#00eaff" },
  amber: { from: "#ffb300", to: "#ff7300", text: "#ffb300" },
  green: { from: "#00ff8f", to: "#00c471", text: "#00ff8f" },
};

const VIDEOS = [
  { id: "ieSo-WK4DhY", title: "Showreel" },
  { id: "VpnhhuBUs54", title: "Social Reel" },
  { id: "Aje2oek3UqY", title: "Documentary" },
];

export interface Review {
  quote: string;
  name: string;
  title?: string;
}

interface Props {
  review: Review;
}

const HomeAbout = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-[#020617]">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left Content: Text & Story */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-3 py-1 mb-6 border border-purple-500/30 rounded-full bg-purple-500/10">
            <span className="text-xs font-bold tracking-wider text-purple-400 uppercase">
              Who We Are
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            We don’t just build websites. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              We build digital legacies.
            </span>
          </h2>

          <p className="text-slate-400 text-lg mb-6 leading-relaxed">
            Zoga is a new-age digital engineering lab. We bridge the gap between
            aesthetic perfection and technical robustness. While others use
            templates, we forge custom digital environments tailored to your
            brand&apos;s DNA.
          </p>

          <p className="text-slate-400 text-lg mb-8 leading-relaxed">
            From complex SaaS dashboards to immersive 3D marketing sites, our
            output is consistently world-class, secure, and built for scale.
          </p>

          {/* Stats Row */}
          <div className="flex gap-8 md:gap-12 border-t border-white/10 pt-8 mb-8">
            {stats.map((stat, index) => (
              <div key={index}>
                <h4 className="text-3xl font-bold text-white mb-1">
                  {stat.value}
                </h4>
                <p className="text-sm text-slate-500 font-medium uppercase tracking-wide">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <Link href="/about">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center gap-2 text-white font-semibold border-b border-purple-500 pb-1 hover:text-purple-400 transition-colors"
            >
              Read Our Full Story
              <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </motion.button>
          </Link>
        </motion.div>

        {/* Right Content: Visual Grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Grid Container */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4 mt-12">
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors duration-300">
                <Layers className="w-8 h-8 text-blue-400 mb-4" />
                <h3 className="text-white font-bold mb-2">Scalable Arch</h3>
                <p className="text-xs text-slate-400">
                  Built on Next.js for maximum performance.
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/20 p-6 rounded-2xl">
                <Award className="w-8 h-8 text-purple-400 mb-4" />
                <h3 className="text-white font-bold mb-2">Award Winning</h3>
                <p className="text-xs text-slate-400">
                  Recognized for design excellence globally.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors duration-300">
                <Users className="w-8 h-8 text-pink-400 mb-4" />
                <h3 className="text-white font-bold mb-2">User Centric</h3>
                <p className="text-xs text-slate-400">
                  UX that converts visitors into loyalists.
                </p>
              </div>

              {/* Image Card */}
              <div className="relative h-48 rounded-2xl overflow-hidden border border-white/10 group">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10" />
                {/* Replace with actual office/team pic */}
                <div className="absolute inset-0 bg-slate-800 animate-pulse" />
                <div className="absolute bottom-4 left-4 z-20">
                  <span className="text-xs font-mono text-green-400">
                    ● System Online
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ReviewCard: React.FC<Props> = ({ review }) => {
  return (
    <article className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 h-full flex flex-col justify-between">
      <div>
        <div className="mb-3 inline-flex items-center gap-2">
          <svg
            className="w-5 h-5 text-yellow-400"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
          >
            <path d="M12 .587l3.668 7.431L23.6 9.75l-5.8 5.653 1.368 7.967L12 18.896 5.832 23.37 7.2 15.403.4 9.75l7.932-1.732z" />
          </svg>
        </div>

        <p className="text-lg md:text-xl italic text-slate-700 dark:text-slate-300 mb-6 leading-relaxed break-words whitespace-pre-wrap">
          “{review.quote}”
        </p>
      </div>

      <footer className="mt-4">
        <p className="font-semibold text-slate-900 dark:text-white truncate">
          {review.name}
        </p>
        {review.title && (
          <p className="text-sm text-blue-500 truncate">{review.title}</p>
        )}
      </footer>
    </article>
  );
};

// --- UI Components ---

// 3D Tilt Card for Value Proposition
const ValueCard3D = ({ item }: ValueCard3DProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();

    const xVal = ((clientX - (left + width / 2)) / width) * 30;
    const yVal = ((clientY - (top + height / 2)) / height) * 30;

    x.set(xVal);
    y.set(yVal);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const rotateX = useTransform(y, (value) => `${-value}deg`);
  const rotateY = useTransform(x, (value) => `${value}deg`);

  const Icon = item.icon;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        boxShadow: isHovered
          ? "0 30px 60px rgba(0, 0, 0, 0.15)"
          : "0 10px 20px rgba(0, 0, 0, 0.05)",
      }}
      className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 transition-shadow duration-500 will-change-transform"
    >
      <motion.div
        className="p-3 rounded-full inline-block mb-4"
        style={{ transform: "translateZ(50px)" }}
        whileHover={{ scale: 1.1, backgroundColor: "rgba(59,130,246,0.1)" }}
      >
        <Icon className="w-8 h-8 text-blue-500" />
      </motion.div>

      <motion.h3
        className="text-2xl font-bold text-slate-900 dark:text-white mb-3"
        style={{ transform: "translateZ(30px)" }}
      >
        {item.title}
      </motion.h3>

      <motion.p
        className="text-slate-600 dark:text-slate-400 leading-relaxed"
        style={{ transform: "translateZ(10px)" }}
      >
        {item.description}
      </motion.p>
    </motion.div>
  );
};

const REASONS = [
  {
    icon: Sparkles,
    title: "Creative Velocity",
    description:
      "We don't just iterate; we accelerate innovation. Expect unique designs and code tailored to outperform the market, not just match it.",
  },
  {
    icon: Shield,
    title: "Engineering Rigor",
    description:
      "Our commitment to performance means zero jitter, absolute responsiveness, and code that is both elegant and obsessively optimized for scale and security.",
  },
  {
    icon: Users,
    title: "Authentic Partnership",
    description:
      "We embed ourselves in your vision. Our collaboration model is transparent, proactive, and focused on delivering measurable, long-term business value.",
  },
];

const REVIEWS = [
  {
    id: 1,
    name: "Arvind Singh",
    title: "CEO, TechNova Solutions",
    rating: 5,
    quote:
      "Honestly? I was skeptical at first. Another agency, another promise. But Zoga delivered something remarkable. Our site loads faster than my coffee machine now, and conversions jumped 340%. These folks care.",
  },
  {
    id: 2,
    name: "Priya Sharma",
    title: "Head of Product, FinEdge",
    rating: 5,
    quote:
      "We needed complex fintech dashboards that didn't look like a 2005 spreadsheet. Zoga made data beautiful AND functional. Our users actually enjoy looking at charts now. That's witchcraft!",
  },
  {
    id: 3,
    name: "Kiran Rao",
    title: "Founder, UrbanFlow",
    rating: 5,
    quote:
      "Worked with 7 agencies before. SEVEN. Zoga is the first one where I didn't have to explain things twice. They understood our vision, improved it, and delivered ahead of schedule. Rare breed.",
  },
  {
    id: 4,
    name: "Mohan Lal",
    title: "Director, Global Enterprise",
    rating: 5,
    quote:
      "From Mumbai to Ranchi felt like a risk. Turned out to be the best decision. World-class quality, genuine communication, and they actually pick up calls on weekends. Where else do you get that?",
  },
  {
    id: 5,
    name: "Suresh Nair",
    title: "Partner, AlphaVC",
    rating: 5,
    quote:
      "We've funded 50+ startups. The ones using Zoga consistently outperform on digital metrics. Not a coincidence. These guys understand what makes products tick.",
  },
];

const Reveal = ({ children, width = "100%", delay = 0.25 }: RevealProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-75px" });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5, delay: delay }}
      >
        {children}
      </motion.div>
    </div>
  );
};

interface ValueItem {
  icon: IconType;
  title: string;
  description: string;
}

interface ValueCard3DProps {
  item: ValueItem;
}

/**
 * Simple TiltCard wrapper
 * - pointer-based tilt on desktop
 * - reduces intensity when user prefers reduced motion
 */

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
      ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg shadow-indigo-500/20"
      : "bg-transparent border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-white/5";

  return (
    <motion.button
      ref={ref}
      animate={position}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      onMouseMove={handleMouse}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      onClick={onClick}
      disabled={disabled}
      className={`relative overflow-hidden px-6 py-3 rounded-full font-bold text-sm transition-transform active:scale-95 ${styles} ${className} ${
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
      className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-4"
    >
      {children}
    </motion.h2>

    {subtitle && (
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-lg text-slate-600 dark:text-slate-400"
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
    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
    />
  </div>
);

// --- Sections ---

// 3. Interactive Spotlight Grid Background
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

// 4. Subtle Grid Particles (Fixed, non-mouse-interactive, moving along grid lines)
const GridParticles = () => {
  // Increased count to 6, all size 2, new cool colors, new right-side positions
  const particles = [
    {
      id: 1,
      color: "bg-cyan-400",
      size: 2,
      startX: "20%",
      startY: "30%",
      duration: 24,
      animation: "grid-slide-1",
    }, // Left/Center
    {
      id: 2,
      color: "bg-purple-400",
      size: 2,
      startX: "70%",
      startY: "60%",
      duration: 28,
      animation: "grid-slide-2",
    }, // Right/Center
    {
      id: 3,
      color: "bg-pink-400",
      size: 2,
      startX: "45%",
      startY: "85%",
      duration: 22,
      animation: "grid-slide-3",
    }, // Bottom/Center
    {
      id: 4,
      color: "bg-blue-400",
      size: 2,
      startX: "10%",
      startY: "15%",
      duration: 26,
      animation: "grid-slide-4",
    }, // Top/Left
    {
      id: 5,
      color: "bg-emerald-400",
      size: 2,
      startX: "85%",
      startY: "40%",
      duration: 20,
      animation: "grid-slide-5",
    }, // Right Side (New)
    {
      id: 6,
      color: "bg-indigo-400",
      size: 2,
      startX: "65%",
      startY: "10%",
      duration: 27,
      animation: "grid-slide-6",
    }, // Top/Right (New)
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

// 5. Intersection Observer Hook

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
      <div className="absolute inset-0 pointer-events-none bg-zinc-50 dark:bg-black transition-colors duration-500" />

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
              {/* CinematicText component with staggered word swap */}
              <span className="text-transparent text-5xl md:text-7xl lg:text-[5.5rem] bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600">
                DOMINANCE.
              </span>
            </h1>
          </FadeIn>

          {/* Description - Enhanced Visibility */}
          <FadeIn delay={200}>
            <div className="relative mb-12 max-w-lg mx-auto lg:mx-0">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full opacity-0 lg:opacity-100 shadow-lg" />
              <p className="text-lg md:text-xl text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium lg:pl-4">
                We engineer bespoke digital systems that convert traffic into
                territory. Precision infrastructure for brands that demand{" "}
                <span className="text-zinc-900 dark:text-white font-bold">
                  absolute authority
                </span>
                .
              </p>
            </div>
          </FadeIn>

          {/* Buttons - Compact & Punchy */}
          <FadeIn delay={300}>
            <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start">
              {/* Start Project */}
              <button
                onClick={() => console.log("Audit")}
                className="
        group relative px-6 py-3 rounded-xl
        text-sm font-medium
        bg-gradient-to-br from-blue-600 to-purple-600
        text-white shadow-md shadow-blue-500/30
        hover:shadow-purple-500/40
        transition-all duration-300
        overflow-hidden
        dark:from-blue-500 dark:to-purple-500
      "
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Project
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>

                {/* Glow Effect */}
                <span
                  className="
          absolute inset-0 bg-white/10 opacity-0 
          group-hover:opacity-100 blur-md transition-all duration-500
        "
                />
              </button>

              {/* View Live Systems */}
              <button
                onClick={() => console.log("Work")}
                className="
        group relative px-6 py-3 rounded-xl
        text-sm font-medium
        border border-black/10 dark:border-white/15
        bg-white text-black
        dark:bg-neutral-900 dark:text-white
        shadow-sm
        hover:bg-black/5 dark:hover:bg-white/10
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
                <span className="block text-2xl text-zinc-900 dark:text-white mb-1 group-hover:text-blue-500 transition-colors">
                  50+
                </span>
                Active Systems
              </div>
              <div className="group cursor-default">
                <span className="block text-2xl text-zinc-900 dark:text-white mb-1 group-hover:text-purple-500 transition-colors">
                  98%
                </span>
                Retention Rate
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Right Side: Visual Data Orb (Refined) */}
        <div className="relative h-[600px] hidden lg:flex items-center justify-center perspective-1000">
          {/* The Orb Container */}
          <div className="relative w-[550px] h-[550px] flex items-center justify-center select-none">
            {/* Rotating Rings */}
            <div className="absolute w-full h-full rounded-full border border-zinc-100 dark:border-white/5 animate-spin-ultra-slow" />
            <div className="absolute w-[80%] h-[80%] rounded-full border border-zinc-200 dark:border-white/10 border-dashed animate-spin-reverse-slow" />
            <div className="absolute w-[60%] h-[60%] rounded-full border border-blue-300/10 animate-spin-slow" />

            {/* Floating Tech Nodes */}

            {/* Central Core Gradient */}
          </div>

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
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full blur-xl opacity-50 animate-pulse" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center shadow-2xl z-10">
                <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
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

const InteractiveDashboard = () => {
  const [theme, setTheme] = useState<Theme>(themes.pink);

  return (
    <section className="w-full py-10 flex flex-col items-center gap-6">
      {/* Color Buttons */}
      <div className="flex flex-wrap justify-center gap-3">
        {Object.keys(themes).map((key) => (
          <button
            key={key}
            onClick={() => setTheme(themes[key])}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold border border-white/10 hover:scale-105 active:scale-95 transition"
            style={{ color: themes[key].text }}
          >
            {key.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Dashboard Container */}
      <div className="perspective-1000 h-[400px] md:h-[500px] flex items-center justify-center w-full px-4">
        <TiltCard className="w-full max-w-lg aspect-[4/3] relative group">
          {/* Outer Glow */}
          <div
            className="absolute inset-0 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-all"
            style={{
              background: `linear-gradient(to bottom right, ${theme.from}, ${theme.to})`,
            }}
          />

          {/* Main Card */}
          <div className="relative h-full bg-white dark:bg-[#0a0a12] border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
            {/* Browser Header */}
            <div className="h-12 border-b border-slate-100 dark:border-white/5 flex items-center px-4 gap-2 bg-slate-50/50 dark:bg-white/5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="ml-4 px-3 py-1 rounded-md bg-white dark:bg-white/5 text-[10px] font-mono opacity-50 w-full max-w-[200px]">
                zoga.agency/dashboard
              </div>
            </div>

            {/* Content */}
            <div className="p-4 md:p-6 flex-1 relative">
              {/* Live Badge */}
              <div className="absolute top-0 right-0 p-4 z-10">
                <div
                  className="px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"
                  style={{ background: `${theme.text}20`, color: theme.text }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ background: theme.text }}
                  />
                  Live
                </div>
              </div>

              <div className="space-y-5">
                {/* Revenue */}
                <div className="flex items-end gap-4">
                  <div>
                    <p className="text-sm text-slate-500">Total Revenue</p>
                    <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                      $124,500
                    </h3>
                  </div>
                  <span
                    className="text-sm font-bold pb-1"
                    style={{ color: theme.text }}
                  >
                    +24.5%
                  </span>
                </div>

                {/* Graph */}
                <div className="h-28 md:h-32 flex items-end gap-2">
                  {[40, 70, 45, 90, 65, 85, 50].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{
                        delay: 0.4 + i * 0.1,
                        duration: 0.8,
                        type: "spring",
                      }}
                      whileHover={{
                        scale: 1.1,
                        opacity: 1,
                      }}
                      className="flex-1 rounded-t-md opacity-80 cursor-pointer transition"
                      style={{
                        background: `linear-gradient(to top, ${theme.from}, ${theme.to})`,
                      }}
                    />
                  ))}
                </div>

                {/* Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                    <Activity style={{ color: theme.text }} className="mb-2" />
                    <div className="text-lg font-bold">Active Users</div>
                    <div className="text-sm opacity-50">1,234 online</div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                    <Globe style={{ color: theme.text }} className="mb-2" />
                    <div className="text-lg font-bold">Global Reach</div>
                    <div className="text-sm opacity-50">12 Countries</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TiltCard>
      </div>
    </section>
  );
};

const MarqueeSection = () => {
  return (
    <div className="py-12 border-y border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-[#050509] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-slate-400">
          Trusted by Startups
        </p>
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
                className="flex items-center gap-3 px-6 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 hover:border-blue-500/50 transition-colors min-w-[160px] justify-center"
              >
                <brand.icon className="w-5 h-5 text-slate-400" />
                <span className="font-bold text-slate-700 dark:text-slate-200">
                  {brand.name}
                </span>
              </div>
            )
          )}
        </motion.div>
        {/* Fade Edges */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-slate-50 dark:from-[#050509] to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-slate-50 dark:from-[#050509] to-transparent z-10" />
      </div>
    </div>
  );
};

const Services = () => (
  <section id="services" className="py-32 bg-white dark:bg-[#030014]">
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
          className={`${service.span} group relative overflow-hidden rounded-[2rem] bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-8 md:p-10 transition-all hover:shadow-2xl hover:shadow-blue-500/10`}
        >
          <div
            className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 blur-[80px] transition-opacity duration-500`}
          />

          <div
            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white shadow-lg mb-8 group-hover:scale-110 transition-transform duration-300`}
          >
            <service.icon size={32} />
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
            {service.title}
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            {service.desc}
          </p>
          <Link href="/service">
            <div className="flex items-center gap-2 font-bold text-blue-600 dark:text-blue-400 group-hover:gap-4 transition-all">
              Explore Service <ArrowRight size={20} />
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  </section>
);

const VideoProduction = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  return (
    <section className="py-24 transition-colors bg-white dark:bg-black text-black dark:text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Featured{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-400 dark:to-pink-300">
              Showreel
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mt-4 text-lg">
            A cinematic experience featuring brand films, motion graphics and
            scroll-stopping visual storytelling.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          {/* Main Reel */}
          <motion.div
            className="lg:col-span-3 rounded-3xl overflow-hidden shadow-xl relative group"
            whileHover={{ scale: 1.015 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <div className="relative aspect-video rounded-3xl overflow-hidden">
              <iframe
                className="absolute inset-0 w-full h-full rounded-3xl"
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
                  🎬 Main Showreel
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
                className="rounded-3xl shadow-lg overflow-hidden relative group"
              >
                <div className="relative aspect-video rounded-3xl">
                  <iframe
                    className="absolute inset-0 w-full h-full rounded-3xl"
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
          inline-flex items-center gap-2 px-7 py-3 rounded-full text-base font-semibold
          bg-gradient-to-r from-purple-600 to-pink-500 
          dark:from-purple-500 dark:to-pink-400
          text-white shadow-lg shadow-purple-500/30 hover:shadow-pink-500/40
          transition-all hover:scale-[1.05]"
          >
            Visit Channel →
          </a>
        </div>
      </div>
    </section>
  );
};

const WhyChooseUs = () => (
  <section
    id="why-us"
    className="py-32 bg-slate-50 dark:bg-[#050509] relative overflow-hidden"
  >
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <SectionHeading subtitle="Why businesses in Ranchi & beyond trust Zoga.">
        The Zoga Advantage
      </SectionHeading>

      <div className="grid lg:grid-cols-3 gap-8">
        {WHY_US.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-[#0a0a12] p-8 rounded-3xl border border-slate-200 dark:border-white/5 shadow-xl shadow-slate-200/50 dark:shadow-none"
          >
            <item.icon size={40} className="text-blue-600 mb-6" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              {item.title}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Trust Badge */}
      <div className="mt-20 p-8 rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="text-left">
            <p className="text-blue-200 font-bold uppercase tracking-wide text-xs mb-1">
              Local Support
            </p>
            <p className="text-2xl font-bold flex items-center gap-2">
              <Phone size={20} /> {PHONE_NUMBER}
            </p>
          </div>
          <div className="h-12 w-px bg-white/20 hidden md:block" />
          <div className="text-left">
            <p className="text-blue-200 font-bold uppercase tracking-wide text-xs mb-1">
              Location
            </p>
            <p className="text-xl font-bold">{ADDRESS}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Portfolio = () => (
  <section id="work" className="py-32 bg-white dark:bg-[#030014]">
    <SectionHeading subtitle="A glimpse into our engineering standards.">
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
          <div
            className={`relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl ${
              i % 2 === 1 ? "lg:order-2" : ""
            }`}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${project.gradient} z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500`}
            />
            <Image
              src={project.image}
              alt={project.title}
              width={300}
              height={200}
              className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />

            <div className="absolute bottom-8 left-8 z-20">
              <div className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-sm font-bold inline-block mb-2">
                {project.cat}
              </div>
            </div>
          </div>

          {/* Text Side */}
          <div className={`${i % 2 === 1 ? "lg:order-1 lg:text-right" : ""}`}>
            <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              {project.title}
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              A complete digital overhaul focusing on speed, conversion, and
              user retention. Resulted in a 40% increase in monthly active
              users.
            </p>

            <div
              className={`flex flex-wrap gap-3 mb-8 ${
                i % 2 === 1 ? "lg:justify-end" : ""
              }`}
            >
              {["React", "Next.js", "Node.js"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-md bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            <Button className="group">
              View Case Study{" "}
              <ArrowRight
                className="inline ml-2 group-hover:translate-x-1 transition-transform"
                size={16}
              />
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

const ReasonsSection = () => {
  return (
    <section
      id="why-us"
      className="py-24 md:py-32 bg-white dark:bg-slate-800 transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-extrabold leading-tight text-slate-900 dark:text-white">
            Why Trust{" "}
            <span className="text-blue-500">The Zoga Difference?</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 mt-4 max-w-3xl mx-auto">
            Our value proposition is built on three non-negotiable pillars:
            Creativity, Rigor, and Partnership. We are not a vendor; we are your
            growth engine.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REASONS.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ValueCard3D item={item} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Client Reviews Section (The Continuous Flow) ---
const ReviewsSection = () => {
  // Duplicate reviews to create continuous loop effect
  const reviewLoop = useMemo(() => [...REVIEWS, ...REVIEWS, ...REVIEWS], []);

  return (
    <section
      id="reviews"
      className="
    relative
    py-28 md:py-36
    bg-slate-100 
    dark:bg-[#050509]
    transition-colors duration-500
  "
    >
      {/* TOP GRADIENT FADE */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white dark:from-[#030014] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2
            className="
          text-5xl md:text-6xl font-extrabold leading-tight
          text-slate-900 dark:text-white
        "
          >
            Voices of <span className="text-purple-500">Impact</span>.
          </h2>

          <p
            className="
          text-lg md:text-xl 
          text-slate-600 dark:text-slate-400 
          mt-4 max-w-3xl mx-auto leading-relaxed
        "
          >
            Real words from real clients — reflecting the clarity, precision,
            and performance we deliver consistently.
          </p>
        </motion.div>
      </div>

      {/* SCROLLER */}
      <div
        className="
      relative w-full overflow-hidden whitespace-nowrap 
      [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]
      dark:[mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]
      z-10
    "
      >
        <motion.div
          className="inline-flex w-fit"
          animate={{ x: ["0%", "-33.33%"] }}
          transition={{ ease: "linear", duration: 40, repeat: Infinity }}
        >
          {reviewLoop.map((review, index) => (
            <div
              key={index}
              className="
            w-[250px] sm:w-[280px] md:w-[320px]
            inline-block p-3 flex-shrink-0
          "
            >
              <div
                className="
              relative rounded-2xl p-6 h-full flex flex-col justify-between
              bg-white dark:bg-[#0a0a12]/95
              border border-slate-200 dark:border-white/10

              shadow-[0_4px_18px_-4px_rgba(0,0,0,0.12)]
              dark:shadow-[0_8px_32px_-6px_rgba(0,0,0,0.55)]

              transition-all duration-300
              hover:-translate-y-1
              hover:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.15)]
              dark:hover:shadow-[0_14px_40px_-6px_rgba(0,0,0,0.75)]
              hover:border-purple-400/40
              overflow-hidden
            "
              >
                <div className="mb-4 opacity-70">
                  <svg
                    width="26"
                    height="26"
                    fill="currentColor"
                    className="text-purple-500 dark:text-purple-400"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7 5C4.24 5 2 7.24 2 10v6c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-4h2V9c0-2.21-1.79-4-4-4zm10 0c-2.76 0-5 2.24-5 5v6c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-4h2V9c0-2.21-1.79-4-4-4z" />
                  </svg>
                </div>

                <p
                  className="
                text-[15px] leading-relaxed 
                text-slate-700 dark:text-zinc-300
                mb-6 break-words whitespace-pre-wrap
              "
                >
                  “{review.quote}”
                </p>

                <div className="pt-2 mt-auto">
                  <p className="font-semibold text-slate-900 dark:text-white break-words">
                    {review.name}
                  </p>

                  {review.title && (
                    <p className="text-xs text-purple-600 dark:text-purple-400 mt-1 break-words">
                      {review.title}
                    </p>
                  )}
                </div>

                <div
                  className="
                absolute inset-0 rounded-2xl pointer-events-none opacity-0
                bg-gradient-to-tr from-purple-500/10 to-blue-500/10
                dark:from-purple-600/10 dark:to-blue-600/10
                transition-opacity duration-500 hover:opacity-100
              "
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* BOTTOM GRADIENT FADE */}
      <div
        className="
      pointer-events-none
      absolute bottom-0 left-0 w-full h-20
      bg-gradient-to-t from-slate-50 dark:from-[#0f0f14] to-transparent
    "
      />
    </section>
  );
};

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
    <section id="contact" className="py-32 bg-slate-50 dark:bg-[#050509]">
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
          <h2 className="text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Ready to Scale? <br />
            <span className="text-blue-600">Let&apos;s Talk.</span>
          </h2>

          <p className="text-xl text-slate-600 dark:text-slate-400 mb-12">
            Whether you need a new website, a mobile app, or a digital marketing
            strategy, we are here to help.
          </p>

          <div className="space-y-6 mb-12">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                <Phone />
              </div>
              <div>
                <p className="text-sm text-slate-500">Call Us (Ranchi HQ)</p>
                <p className="text-lg font-bold text-slate-900 dark:text-white">
                  +91 98765 43210
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5">
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600">
                <Mail />
              </div>
              <div>
                <p className="text-sm text-slate-500">Email Us</p>
                <p className="text-lg font-bold text-slate-900 dark:text-white">
                  hello@agency.com
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="bg-white dark:bg-[#0a0a12] p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-white/10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name Inputs */}
            <div className="grid md:grid-cols-2 gap-6">
              <InputField
                label="First Name"
                name="firstName"
                placeholder="John"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
              <InputField
                label="Last Name"
                name="lastName"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>

            <InputField
              label="Email Address"
              name="email"
              type="email"
              placeholder="john@company.com"
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
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Services You Need
              </label>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setOpen(!open)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-left text-sm flex justify-between items-center"
                >
                  <span className="text-slate-700 dark:text-slate-300">
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
                  <div className="absolute z-20 mt-2 w-full bg-white dark:bg-[#0a0a12] border border-slate-200 dark:border-white/10 rounded-xl shadow-lg p-3 space-y-2">
                    {servicesList.map((service) => (
                      <label
                        key={service}
                        className="flex items-center gap-3 cursor-pointer px-2 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10"
                      >
                        <input
                          type="checkbox"
                          value={service}
                          checked={selected.includes(service)}
                          onChange={() => handleSelect(service)}
                          className="h-4 w-4"
                        />
                        <span className="text-sm text-slate-700 dark:text-slate-300">
                          {service}
                        </span>
                      </label>
                    ))}

                    {selected.includes("Other") && (
                      <input
                        type="text"
                        placeholder="Specify your service..."
                        className="w-full px-3 py-2 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm text-slate-700 dark:text-slate-300 outline-none"
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
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 resize-none outline-none"
            />

            <MagneticButton
              className="w-full py-4 text-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </MagneticButton>
          </form>
        </div>
      </div>
    </section>
  );
};

const App = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#030014] text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-500/30 transition-colors duration-500 overflow-x-hidden">
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
        {/* <InteractiveDashboard /> */}
        <MarqueeSection />
        <HomeAbout />
        <WhyChooseUs />
        <Services />
        <ReasonsSection />
        <VideoProduction />
        <Portfolio />
        <ReviewsSection />
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

export default App;
