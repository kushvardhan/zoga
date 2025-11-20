"use client"
import React, { useState, useEffect, useRef } from 'react';
import { 
  motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate, 
  AnimatePresence, useInView
} from 'framer-motion';
import { 
  Menu, X, Moon, Sun, ArrowRight, 
  Code2, Smartphone, Palette, LineChart, 
  Video, MapPin, Zap, Sparkles, 
  TrendingUp, Activity, Globe, CheckCircle2, 
  ArrowUpRight, Quote, ShieldCheck, Rocket, Users, Layers, Mail, Phone,
  Cpu, Server, Database, Layout, Send, Star, MousePointer2
} from 'lucide-react';
import Image from 'next/image';

// --- Brand & Content Data ---

const PHONE_NUMBER = "+91 98355 04582";
const EMAIL = "hello@zoga.agency";
const ADDRESS = "Ranchi, Jharkhand, India";

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

// --- UI Components ---

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
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:shadow-purple-500/40 transition-all">
               {/* Replaced Zap with Image per request, using placeholder since generic img */}
               <div className="font-black text-xl">Z</div>
            </div>
            <span className="font-bold text-2xl tracking-tight text-slate-900 dark:text-white">Zoga</span>
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
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-slate-900 dark:text-white mb-8 leading-[1.1]">
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
  const { scrollYProgress } = useScroll();
  const rotateX = useTransform(scrollYProgress, [0, 0.2], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0.5, 1]);

  return (
    <section className="py-20 px-4 relative perspective-1000">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          style={{ rotateX, scale, opacity, transformStyle: "preserve-3d" }}
          className="relative bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-800 overflow-hidden aspect-[16/10] md:aspect-[21/9]"
        >
          {/* Dashboard UI Simulation */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#0a0a12] to-slate-900 z-0" />
          
          {/* Top Bar */}
          <div className="absolute top-0 inset-x-0 h-16 border-b border-white/10 flex items-center px-6 gap-4 z-20 bg-slate-900/50 backdrop-blur-md">
             <div className="flex gap-2">
               <div className="w-3 h-3 rounded-full bg-red-500" />
               <div className="w-3 h-3 rounded-full bg-yellow-500" />
               <div className="w-3 h-3 rounded-full bg-green-500" />
             </div>
             <div className="px-4 py-1.5 rounded-lg bg-white/5 text-xs font-mono text-slate-400 border border-white/5 flex-1 max-w-xs flex items-center gap-2">
               <Sparkles size={12} className="text-yellow-500" /> admin.zoga.agency
             </div>
          </div>

          {/* Main Content Grid */}
          <div className="absolute inset-0 pt-24 px-8 pb-8 grid grid-cols-12 gap-6 z-10">
             
             {/* Sidebar */}
             <div className="col-span-2 hidden md:block space-y-4">
               {[1,2,3,4].map(i => (
                 <div key={i} className="h-10 w-full rounded-lg bg-white/5 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
               ))}
             </div>

             {/* Main Area */}
             <div className="col-span-12 md:col-span-10 grid grid-cols-3 gap-6">
                {/* Hero Card */}
                <div className="col-span-2 rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/20 p-6 relative overflow-hidden group">
                   <div className="absolute inset-0 bg-blue-600/10 blur-3xl group-hover:bg-blue-600/20 transition-all duration-500" />
                   <h3 className="text-sm text-blue-400 font-bold mb-2">Total Revenue (Ranchi HQ)</h3>
                   <p className="text-4xl font-bold text-white mb-8">₹ 84,50,000</p>
                   <div className="h-24 flex items-end gap-2">
                     {[40, 60, 45, 80, 55, 90, 70].map((h, i) => (
                       <motion.div 
                         key={i}
                         initial={{ height: 0 }}
                         whileInView={{ height: `${h}%` }}
                         transition={{ duration: 0.5, delay: i * 0.1 }}
                         className="flex-1 bg-blue-500 rounded-t-sm opacity-80" 
                       />
                     ))}
                   </div>
                </div>

                {/* Side Card */}
                <div className="col-span-1 rounded-2xl bg-white/5 border border-white/10 p-6 flex flex-col justify-between">
                   <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 mb-4">
                     <Users />
                   </div>
                   <div>
                     <p className="text-3xl font-bold text-white">12k+</p>
                     <p className="text-sm text-slate-400">Active Users</p>
                   </div>
                </div>

                {/* Bottom Row */}
                <div className="col-span-3 h-32 rounded-2xl bg-white/5 border border-white/10 p-6 flex items-center gap-4 overflow-hidden relative">
                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] animate-shimmer" />
                   {[1,2,3].map(i => (
                     <div key={i} className="flex-1 h-full bg-white/5 rounded-xl" />
                   ))}
                </div>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
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
        <WhyChooseUs />
        <Services />
        <Portfolio />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
};

export default App;