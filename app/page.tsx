"use client"
import React, { useState, useEffect, useRef,PropsWithChildren, ReactNode, useMemo } from 'react';
import { IconType } from "react-icons";
import { 
  motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate, 
  AnimatePresence, useInView,useReducedMotion, 
  useAnimation
} from 'framer-motion';
import { 
  Menu, X, Moon, Sun, ArrowRight, 
  Code2, Smartphone, Palette, LineChart, 
  Video, MapPin, Zap, Sparkles, 
  TrendingUp, Activity, Globe, CheckCircle2, 
  ArrowUpRight, Quote, ShieldCheck, Rocket, Users, Layers, Mail, Phone,
  Cpu, Server, Database, Layout, Send, Star, MousePointer2,
  Megaphone,
  Clapperboard,
  Play,
  Shield,
  Award
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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
  { label: 'Years Experience', value: '10+' },
  { label: 'Projects Shipped', value: '150+' },
  { label: 'Client Satisfaction', value: '99%' },
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
    title: "Web Engineering", 
    desc: "Next.js architectures that scale to millions. Fast, secure, SEO-ready.", 
    icon: Code2, 
    color: "from-blue-600 to-cyan-500",
    span: "md:col-span-2"
  },
  { 
    id: "app",
    title: "Native Mobile", 
    desc: "iOS & Android apps with 60fps performance using React Native.", 
    icon: Smartphone, 
    color: "from-purple-600 to-pink-500",
    span: "md:col-span-1"
  },
  { 
    id: "design",
    title: "UX/UI Design", 
    desc: "Interfaces that convert. Award-winning aesthetics meet psychology.", 
    icon: Palette, 
    color: "from-orange-500 to-red-500",
    span: "md:col-span-1"
  },
  { 
    id: "growth",
    title: "Growth & SEO", 
    desc: "Dominate Google rankings. Data-driven strategies for Indian & Global markets.", 
    icon: LineChart, 
    color: "from-green-500 to-emerald-500",
    span: "md:col-span-2"
  },

  // ⭐ Added Services Below
  { 
    id: "video",
    title: "Video Editing", 
    desc: "Cinematic edits, reels, ads & brand stories built for high engagement.", 
    icon: Video, 
    color: "from-rose-500 to-fuchsia-500",
    span: "md:col-span-1"
  },
  { 
    id: "marketing",
    title: "Digital Marketing", 
    desc: "ROI-focused campaigns across Google, Meta, Instagram & YouTube.", 
    icon: Megaphone, 
    color: "from-indigo-600 to-blue-500",
    span: "md:col-span-1"
  },
];


const BRANDS = [
  "Google Cloud", "AWS", "Vercel", "Shopify Plus", "React", "Next.js"
];

const PROJECTS = [
  { 
    title: "Fintech Dashboard", 
    cat: "SaaS Platform", 
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000",
    gradient: "from-blue-900/80 to-slate-900/80"
  },
  { 
    title: "Neon Commerce", 
    cat: "E-Commerce", 
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=2000",
    gradient: "from-purple-900/80 to-slate-900/80"
  },
  { 
    title: "HealthAI", 
    cat: "Medical App", 
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2000",
    gradient: "from-teal-900/80 to-slate-900/80"
  },
];

const WHY_US = [
  {
    title: "Ranchi Roots, Global Reach",
    desc: "Born in Jharkhand, serving Silicon Valley. We bring world-class tech standards at competitive rates.",
    icon: Globe
  },
  {
    title: "24/7 Rapid Support",
    desc: "We don't just ship and ghost. We are your long-term tech partners.",
    icon: Phone
  },
  {
    title: "ROI-Focused Development",
    desc: "We don't just write code. We build assets that generate revenue for your business.",
    icon: TrendingUp
  }
];

const DASHBOARD_COLORS = {
  neon: "from-[#39FF14] to-[#0affd2]",
  pink: "from-[#FF00C8] to-[#FF6AD5]",
  cyan: "from-[#00F0FF] to-[#00A2FF]",
  amber: "from-[#FFB300] to-[#FF7800]",
};
  const themes = {
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
 
const HomeAbout=()=> {
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
            <span className="text-xs font-bold tracking-wider text-purple-400 uppercase">Who We Are</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            We don’t just build websites. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              We build digital legacies.
            </span>
          </h2>
          
          <p className="text-slate-400 text-lg mb-6 leading-relaxed">
            Zoga is a new-age digital engineering lab. We bridge the gap between aesthetic perfection and technical robustness. While others use templates, we forge custom digital environments tailored to your brand's DNA.
          </p>
          
          <p className="text-slate-400 text-lg mb-8 leading-relaxed">
            From complex SaaS dashboards to immersive 3D marketing sites, our output is consistently world-class, secure, and built for scale.
          </p>

          {/* Stats Row */}
          <div className="flex gap-8 md:gap-12 border-t border-white/10 pt-8 mb-8">
            {stats.map((stat, index) => (
              <div key={index}>
                <h4 className="text-3xl font-bold text-white mb-1">{stat.value}</h4>
                <p className="text-sm text-slate-500 font-medium uppercase tracking-wide">{stat.label}</p>
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
                 <p className="text-xs text-slate-400">Built on Next.js for maximum performance.</p>
              </div>
              <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/20 p-6 rounded-2xl">
                 <Award className="w-8 h-8 text-purple-400 mb-4" />
                 <h3 className="text-white font-bold mb-2">Award Winning</h3>
                 <p className="text-xs text-slate-400">Recognized for design excellence globally.</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors duration-300">
                 <Users className="w-8 h-8 text-pink-400 mb-4" />
                 <h3 className="text-white font-bold mb-2">User Centric</h3>
                 <p className="text-xs text-slate-400">UX that converts visitors into loyalists.</p>
              </div>
              
              {/* Image Card */}
              <div className="relative h-48 rounded-2xl overflow-hidden border border-white/10 group">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10" />
                {/* Replace with actual office/team pic */}
                <div className="absolute inset-0 bg-slate-800 animate-pulse" /> 
                <div className="absolute bottom-4 left-4 z-20">
                    <span className="text-xs font-mono text-green-400">● System Online</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const ReviewCard: React.FC<Props> = ({ review }) => {
  return (
    <article className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 h-full flex flex-col justify-between">
      <div>
        <div className="mb-3 inline-flex items-center gap-2">
          <svg className="w-5 h-5 text-yellow-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 .587l3.668 7.431L23.6 9.75l-5.8 5.653 1.368 7.967L12 18.896 5.832 23.37 7.2 15.403.4 9.75l7.932-1.732z" />
          </svg>
        </div>

        <p className="text-lg md:text-xl italic text-slate-700 dark:text-slate-300 mb-6 leading-relaxed break-words whitespace-pre-wrap">
          “{review.quote}”
        </p>
      </div>

      <footer className="mt-4">
        <p className="font-semibold text-slate-900 dark:text-white truncate">{review.name}</p>
        {review.title && <p className="text-sm text-blue-500 truncate">{review.title}</p>}
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
    { icon: Sparkles, title: "Creative Velocity", description: "We don't just iterate; we accelerate innovation. Expect unique designs and code tailored to outperform the market, not just match it." },
    { icon: Shield, title: "Engineering Rigor", description: "Our commitment to performance means zero jitter, absolute responsiveness, and code that is both elegant and obsessively optimized for scale and security." },
    { icon: Users, title: "Authentic Partnership", description: "We embed ourselves in your vision. Our collaboration model is transparent, proactive, and focused on delivering measurable, long-term business value." },
];

const REVIEWS = [
    { id: 1, name: "Arvind Singh", title: "CEO, TechNova", rating: 5, quote: "Zoga’s work is simply dominant. The subtle animations and performance gains they introduced set a new standard for our industry." },
    { id: 2, name: "Priya Sharma", title: "Head of Product, FinEdge", rating: 5, quote: "They took our complex data and rendered it beautifully. The scroll fluidity and zero lag are a testament to their engineering prowess." },
    { id: 3, name: "Kiran Rao", title: "Founder, UrbanFlow", rating: 5, quote: "The most creative team we’ve ever worked with. The UI is dynamic and interactive—it’s not just a website, it’s an experience." },
    { id: 4, name: "Mohan Lal", title: "Director, Global Corp", rating: 5, quote: "From responsiveness to content writing, Zoga encapsulated our brand perfectly. They truly engineered digital dominance for us." },
    { id: 5, name: "Suresh N.", title: "Venture Partner, AlphaVC", rating: 5, quote: "Their portfolio showcased creativity; their delivery proved rigor. A reliable partner for any serious digital transformation." },
];

const Reveal = ({ children, width = "100%", delay = 0.25 }: RevealProps) => {
  const ref = useRef(null);
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

type TiltCardProps = PropsWithChildren<{
  className?: string;
}>;

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
 const TiltCard = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(x, [-0.5, 0.5], ["-10deg", "10deg"]);

  const onMove = (e) => {
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


const MagneticButton = ({ children, className = "", onClick, variant = "primary" }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    setPosition({ x: (clientX - (left + width / 2)) * 0.2, y: (clientY - (top + height / 2)) * 0.2 });
  };

  const styles = variant === "primary" 
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
      className={`relative overflow-hidden px-6 py-3 rounded-full font-bold text-sm transition-transform active:scale-95 ${styles} ${className}`}
    >
      {children}
    </motion.button>
  );
};

const SectionHeading = ({ children, subtitle, align = "center" }) => (
  <div className={`mb-16 ${align === "center" ? "text-center" : "text-left"} max-w-4xl mx-auto px-4`}>
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

const InputField = ({ label, type = "text", placeholder }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>
    <input 
      type={type} 
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
    />
  </div>
);

// --- Sections ---
const Navbar = ({ isDark, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  
  const { scrollY } = useScroll();
  useEffect(() => scrollY.onChange((latest) => setIsScrolled(latest > 50)), [scrollY]);

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          isScrolled 
            ? 'h-20 bg-white/80 dark:bg-[#030014]/80 backdrop-blur-md border-slate-200/50 dark:border-white/5' 
            : 'h-24 bg-transparent border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between relative">
          {/* Logo */}
<a href="#" className="flex items-center gap-3 group">
  <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 
                  flex items-center justify-center shadow-lg shadow-blue-500/20 
                  group-hover:shadow-purple-500/40 transition-all overflow-hidden">

    <Image
      src="/logowithBGREMOVE.png"
      alt="Zoga Logo"
      fill
      className="object-contain p-1 invert text-black text-fill-black bg-white"
    />
  </div>

  <span className="font-bold text-2xl tracking-tight text-slate-900 dark:text-white">
    Zoga
  </span>
</a>



          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {/* Services Dropdown Trigger */}
            <div 
              className="relative h-full flex items-center"
              onMouseEnter={() => setActiveDropdown('services')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1 py-8">
                Services
              </button>
              
              {/* Mega Menu */}
              <AnimatePresence>
                {activeDropdown === 'services' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-[80%] left-1/2 -translate-x-1/2 w-[600px] p-6 bg-white dark:bg-[#0a0a12] rounded-2xl border border-slate-200 dark:border-white/10 shadow-2xl grid grid-cols-2 gap-4 z-50"
                  >
                    {SERVICES.map((s) => (
                      <a key={s.id} href="#services" className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${s.color} flex items-center justify-center text-white shrink-0`}>
                          <s.icon size={20} />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">{s.title}</h4>
                          <p className="text-xs text-slate-500 leading-relaxed mt-1">{s.desc}</p>
                        </div>
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {["About", "Work", "Why Us"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(" ", "-")}`} 
                className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <MagneticButton className="hidden md:block px-6 py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold shadow-lg hover:shadow-blue-500/25 transition-shadow">
              Start Project
            </MagneticButton>
            <button className="md:hidden p-2" onClick={() => setIsMobileOpen(true)}>
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-white dark:bg-[#030014] p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-xl font-bold">Menu</span>
              <button onClick={() => setIsMobileOpen(false)} className="p-2 bg-slate-100 dark:bg-white/10 rounded-full">
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col gap-6 text-3xl font-bold text-slate-900 dark:text-white">
              {["Services", "Work", "About Us", "Contact"].map((link, i) => (
                <motion.a 
                  key={link} 
                  href={`#${link.toLowerCase().replace(" ", "-")}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setIsMobileOpen(false)}
                  className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-6"
                >
                  {link} <ArrowRight className="-rotate-45 text-slate-300" />
                </motion.a>
              ))}
            </div>
            <div className="mt-auto">
              <MagneticButton className="w-full py-4 rounded-xl bg-blue-600 text-white font-bold text-lg">
                Let's Talk
              </MagneticButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen pt-32 pb-20 flex flex-col justify-center overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-blue-600/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-blob" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-purple-600/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-2000" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-700 dark:text-blue-400 text-xs font-bold tracking-wide uppercase mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Jharkhand's #1 Digital Agency
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-8 leading-[1.1]">
            We Engineer <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 animate-gradient-x">
              Digital Dominance
            </span>
          </h1>

          <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            From <span className="text-slate-900 dark:text-white font-semibold">Ranchi</span> to the world. We build authentic, high-performance websites & apps that drive real business growth.
          </p>

          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <MagneticButton className="px-8 py-4 text-lg">Get a Free Audit</MagneticButton>
            <MagneticButton variant="outline" className="px-8 py-4 text-lg">View Case Studies</MagneticButton>
          </div>
          
          <div className="mt-12 flex items-center justify-center lg:justify-start gap-6 text-sm font-medium text-slate-500">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-green-500" /> 50+ Ranchi Clients
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-green-500" /> 98% Retention
            </div>
          </div>
        </div>

        {/* Right Side: Abstract Tech Visualization (Replacing the Tilt Card which moved down) */}
        <div className="relative h-[500px] hidden lg:flex items-center justify-center perspective-1000">
           {/* Simulated 3D Network */}
           <motion.div 
             animate={{ rotate: 360 }}
             transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
             className="relative w-[400px] h-[400px]"
           >
             {[...Array(3)].map((_, i) => (
               <div key={i} className={`absolute inset-0 rounded-full border border-slate-200 dark:border-white/10 ${i === 0 ? 'border-dashed' : ''}`} style={{ transform: `rotate(${i * 30}deg) scale(${1 - i * 0.2})` }} />
             ))}
             
             {/* Floating Icons */}
             <motion.div animate={{ y: [-20, 20, -20] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-0 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-white/10">
               <Globe className="text-blue-500 w-8 h-8" />
             </motion.div>
             <motion.div animate={{ x: [-20, 20, -20] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/2 right-0 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-white/10">
               <Cpu className="text-purple-500 w-8 h-8" />
             </motion.div>
             <motion.div animate={{ y: [20, -20, 20] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-white/10">
               <Server className="text-green-500 w-8 h-8" />
             </motion.div>

             {/* Central Core */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full blur-xl opacity-50 animate-pulse" />
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center shadow-2xl z-10">
                <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Z</span>
             </div>
           </motion.div>
        </div>
      </div>
    </section>
  );
};

const InteractiveDashboard = () => {
 const [theme, setTheme] = useState(themes.purple);

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
        <p className="text-sm font-bold uppercase tracking-widest text-slate-400">Trusted by Industry Leaders</p>
      </div>
      <div className="relative flex overflow-x-hidden group">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex gap-8 py-4 whitespace-nowrap px-4"
        >
          {[...MARQUEE_BRANDS, ...MARQUEE_BRANDS, ...MARQUEE_BRANDS].map((brand, i) => (
            <div 
              key={i} 
              className="flex items-center gap-3 px-6 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 hover:border-blue-500/50 transition-colors min-w-[160px] justify-center"
            >
              <brand.icon className="w-5 h-5 text-slate-400" />
              <span className="font-bold text-slate-700 dark:text-slate-200">{brand.name}</span>
            </div>
          ))}
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
          <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 blur-[80px] transition-opacity duration-500`} />
          
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white shadow-lg mb-8 group-hover:scale-110 transition-transform duration-300`}>
            <service.icon size={32} />
          </div>
          
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">{service.title}</h3>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">{service.desc}</p>
          
          <div className="flex items-center gap-2 font-bold text-blue-600 dark:text-blue-400 group-hover:gap-4 transition-all">
            Explore Service <ArrowRight size={20} />
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

const VideoProduction=()=> {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  return (
     <section className="py-24 transition-colors bg-white dark:bg-black text-black dark:text-white">
  <div className="max-w-7xl mx-auto px-6">

    {/* Heading */}
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
        Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-400 dark:to-pink-300">Showreel</span>
      </h2>
      <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mt-4 text-lg">
        A cinematic experience featuring brand films, motion graphics and scroll-stopping visual storytelling.
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
            <div className="px-4 py-2 rounded-xl text-sm font-semibold 
              bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-lg">
              🎬 Main Showreel
            </div>
          </div>
        </div>
      </motion.div>

      {/* Side Reels */}
      <div className="lg:col-span-2 grid grid-cols-1 gap-8">

        {[ 
          "https://www.youtube.com/embed/VpnhhuBUs54?rel=0&modestbranding=1",
          "https://www.youtube.com/embed/Aje2oek3UqY?rel=0&modestbranding=1"
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
}

const WhyChooseUs = () => (
  <section id="why-us" className="py-32 bg-slate-50 dark:bg-[#050509] relative overflow-hidden">
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
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{item.title}</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Trust Badge */}
      <div className="mt-20 p-8 rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="text-left">
            <p className="text-blue-200 font-bold uppercase tracking-wide text-xs mb-1">Local Support</p>
            <p className="text-2xl font-bold flex items-center gap-2"><Phone size={20}/> {PHONE_NUMBER}</p>
          </div>
          <div className="h-12 w-px bg-white/20 hidden md:block" />
          <div className="text-left">
             <p className="text-blue-200 font-bold uppercase tracking-wide text-xs mb-1">Location</p>
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
          <div className={`relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
             <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500`} />
             <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
             
             <div className="absolute bottom-8 left-8 z-20">
               <div className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-sm font-bold inline-block mb-2">
                 {project.cat}
               </div>
             </div>
          </div>

          {/* Text Side */}
          <div className={`${i % 2 === 1 ? 'lg:order-1 lg:text-right' : ''}`}>
            <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">{project.title}</h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              A complete digital overhaul focusing on speed, conversion, and user retention. Resulted in a 40% increase in monthly active users.
            </p>
            
            <div className={`flex flex-wrap gap-3 mb-8 ${i % 2 === 1 ? 'lg:justify-end' : ''}`}>
              {["React", "Next.js", "Node.js"].map(tag => (
                <span key={tag} className="px-3 py-1 rounded-md bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 text-sm font-medium">
                  {tag}
                </span>
              ))}
            </div>

            <MagneticButton variant="outline" className="group">
              View Case Study <ArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" size={16} />
            </MagneticButton>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

const ReasonsSection = () => {
    return (
        <section id="why-us" className="py-24 md:py-32 bg-white dark:bg-slate-800 transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-6xl font-extrabold leading-tight text-slate-900 dark:text-white">
                        Why Trust <span className="text-blue-500">The Zoga Difference?</span>
                    </h2>
                    <p className="text-xl text-slate-600 dark:text-slate-400 mt-4 max-w-3xl mx-auto">
                        Our value proposition is built on three non-negotiable pillars: Creativity, Rigor, and Partnership. We are not a vendor; we are your growth engine.
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
        Real words from real clients — reflecting the clarity, precision, and
        performance we deliver consistently.
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
      animate={{ x: ['0%', '-33.33%'] }}
      transition={{ ease: 'linear', duration: 40, repeat: Infinity }}
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
                <path d="M7 5C4.24 5 2 7.24 2 10v6c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-4h2V9c0-2.21-1.79-4-4-4zm10 0c-2.76 0-5 2.24-5 5v6c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-4h2V9c0-2.21-1.79-4-4-4z"/>
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


const Contact = () => (
  <section id="contact" className="py-32 bg-slate-50 dark:bg-[#050509]">
    <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
      <div>
        <h2 className="text-5xl font-bold text-slate-900 dark:text-white mb-6">
          Ready to Scale? <br/>
          <span className="text-blue-600">Let's Talk.</span>
        </h2>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-12">
          Whether you need a new website, a mobile app, or a digital marketing strategy, we are here to help.
        </p>
        
        <div className="space-y-6 mb-12">
           <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5">
             <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
               <Phone />
             </div>
             <div>
               <p className="text-sm text-slate-500">Call Us (Ranchi HQ)</p>
               <p className="text-lg font-bold text-slate-900 dark:text-white">{PHONE_NUMBER}</p>
             </div>
           </div>
           <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5">
             <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600">
               <Mail />
             </div>
             <div>
               <p className="text-sm text-slate-500">Email Us</p>
               <p className="text-lg font-bold text-slate-900 dark:text-white">{EMAIL}</p>
             </div>
           </div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#0a0a12] p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-white/10">
        <form className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
             <InputField label="First Name" placeholder="John" />
             <InputField label="Last Name" placeholder="Doe" />
          </div>
          <InputField label="Email Address" type="email" placeholder="john@company.com" />
          <InputField label="Phone Number" type="tel" placeholder="+91 99999 99999" />
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Project Type</label>
            <div className="grid grid-cols-2 gap-3">
              {["Website", "App", "SEO", "Other"].map(type => (
                <label key={type} className="cursor-pointer">
                  <input type="radio" name="type" className="peer sr-only" />
                  <div className="px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-center text-sm font-medium peer-checked:bg-blue-600 peer-checked:text-white peer-checked:border-blue-600 transition-all">
                    {type}
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2">
             <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Message</label>
             <textarea rows={4} placeholder="Tell us about your project..." className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-slate-900 dark:text-white placeholder:text-slate-400 resize-none"></textarea>
          </div>

          <MagneticButton className="w-full py-4 text-lg">Send Message</MagneticButton>
        </form>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-[#020205] text-white pt-20 pb-10 border-t border-white/10">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-4 gap-12 mb-20">
        <div className="col-span-2">
           <div className="flex items-center gap-2 mb-6">
             <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold">Z</div>
             <span className="text-2xl font-bold">Zoga</span>
           </div>
           <p className="text-slate-400 max-w-sm leading-relaxed mb-8">
             Building the digital future of Jharkhand and beyond. We combine local insights with global tech standards.
           </p>
           <div className="flex gap-4">
             {["Twitter", "LinkedIn", "Instagram"].map(social => (
               <a key={social} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-colors">
                 <span className="sr-only">{social}</span>
                 <ArrowUpRight size={16} />
               </a>
             ))}
           </div>
        </div>
        
        <div>
          <h4 className="font-bold mb-6">Services</h4>
          <ul className="space-y-4 text-slate-400">
            <li><a href="#" className="hover:text-white transition-colors">Web Development</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Mobile Apps</a></li>
            <li><a href="#" className="hover:text-white transition-colors">UI/UX Design</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Digital Marketing</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6">Company</h4>
          <ul className="space-y-4 text-slate-400">
            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
      
      <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
        <p>© 2025 Zoga Digital Agency. All rights reserved.</p>
        <p>Made with ❤️ in Ranchi, India.</p>
      </div>
    </div>
  </footer>
);

const App = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#030014] text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-500/30 transition-colors duration-500 overflow-x-hidden">
      <Navbar isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />
      
      <main>
        <Hero />
        <InteractiveDashboard />
        <MarqueeSection />
        <HomeAbout/>
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