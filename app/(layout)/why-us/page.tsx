"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {
  Activity,
  ArrowRight,
  BarChart,
  Code2,
  Cpu,
  Fingerprint,
  Globe2,
  Heart,
  Hexagon,
  MapPin,
  MousePointer2,
  MoveRight,
  Search,
  Sparkles,
  Users,
  Video,
  Zap,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

// --- PERFORMANCE OPTIMIZED COMPONENTS ---

// 2. Intersection Observer Hook
const useInView = (threshold = 0.1) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isInView];
};

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  className = "",
}) => {
  const [ref, isInView] = useInView() as [
    React.RefObject<HTMLDivElement>,
    boolean
  ];

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out transform ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${className}`}
    >
      {children}
    </div>
  );
};

// 3. Updated "Service Row" with Snapshot & Colors

interface SnapshotData {
  label: string;
  value: string;
  sub: string;
  button: string;
}

interface ServiceRowProps {
  number: number;
  title: string;
  description: string;
  tags: string[];
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  softColor: string;
  snapshot?: SnapshotData;
}

const ServiceRow: React.FC<ServiceRowProps> = ({
  number,
  title,
  description,
  tags,
  icon: Icon,
  color,
  softColor,
  snapshot = { label: "", value: "", sub: "", button: "" },
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="border-b border-zinc-200 dark:border-zinc-800 group"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div
        className={`py-8 flex flex-col md:flex-row md:items-center justify-between gap-6 px-4 transition-all duration-300 cursor-pointer ${
          isOpen
            ? "bg-zinc-50 dark:bg-zinc-900/40"
            : "hover:bg-zinc-50 dark:hover:bg-zinc-900/20"
        }`}
      >
        {/* Left */}
        <div className="flex items-center gap-6 md:w-1/3">
          <span
            className={`font-mono text-sm transition-colors ${
              isOpen ? "text-black dark:text-white font-bold" : "text-zinc-400"
            }`}
          >
            0{number}
          </span>

          <h3
            className={`text-2xl md:text-3xl font-black uppercase tracking-tight transition-colors ${
              isOpen
                ? `text-transparent bg-clip-text bg-gradient-to-r ${color}`
                : "text-zinc-900 dark:text-white"
            }`}
          >
            {title}
          </h3>
        </div>

        {/* Middle */}
        <div className="flex items-center gap-4 md:w-1/3 justify-start md:justify-center">
          <div
            className={`transition-transform duration-500 text-zinc-400 ${
              isOpen ? "rotate-12 scale-110 text-white" : ""
            }`}
          >
            <Icon
              size={24}
              className={isOpen ? "text-black dark:text-white" : ""}
            />
          </div>

          <span
            className={`text-xs font-bold uppercase tracking-widest transition-opacity duration-300 ${
              isOpen ? "opacity-0" : "opacity-50"
            }`}
          >
            Click to Expand
          </span>
        </div>

        {/* Right */}
        <div className="md:w-1/3 flex justify-end">
          <div
            className={`w-10 h-10 rounded-full border border-zinc-300 dark:border-zinc-700 flex items-center justify-center transition-all duration-300 ${
              isOpen
                ? "bg-black text-white dark:bg-white dark:text-black rotate-90"
                : ""
            }`}
          >
            <ArrowRight size={18} />
          </div>
        </div>
      </div>

      {/* EXPANDED CONTENT */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="py-8 px-4 md:pl-20 grid md:grid-cols-12 gap-8 bg-zinc-50/50 dark:bg-zinc-900/20">
          {/* Description */}
          <div className="md:col-span-7 space-y-6">
            <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed font-medium">
              {description}
            </p>

            <div className="flex flex-wrap gap-2">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs font-bold uppercase border border-zinc-300 dark:border-zinc-700 rounded-full text-zinc-500 bg-white dark:bg-zinc-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Snapshot */}
          <div className="md:col-span-5 flex flex-col justify-between h-full min-h-[160px] p-6 rounded-2xl relative overflow-hidden group/card border border-zinc-200 dark:border-zinc-700 shadow-xl">
            {/* Glow Background */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${softColor} opacity-80 blur-xl pointer-events-none`}
            />

            {/* Foreground Content */}
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider opacity-70">
                <Sparkles size={12} /> {snapshot.label}
              </div>

              <div className="text-4xl font-black mb-1">{snapshot.value}</div>

              <div className="text-sm text-zinc-600 dark:text-zinc-300">
                {snapshot.sub}
              </div>
            </div>

            {/* Button */}
            <button
              className="relative z-10 mt-4 w-full py-3 rounded-xl 
                         border border-zinc-300 dark:border-zinc-600 
                         bg-white/40 dark:bg-white/10 backdrop-blur-sm
                         hover:bg-black hover:text-white 
                         dark:hover:bg-white dark:hover:text-black  
                         transition-all font-bold text-sm 
                         flex items-center justify-center gap-2 
                         group-hover/card:scale-[1.03]"
            >
              {snapshot.button} <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP ---

export default function App() {
  // Added colors to services to fix "monotony"
  const servicesList = [
    {
      title: "Web & App Dev",
      icon: Code2,
      color: "from-cyan-400 to-blue-600",
      softColor: "via-cyan-200/20 to-blue-200/20",
      snapshot: {
        label: "Deployment Speed",
        value: "4.8x",
        sub: "Faster than industry average",
        button: "Explore Development",
      },
      description:
        "Templates? Never heard of them. We build custom digital experiences from scratch using React, Next.js, and Node. Your competitors use templates. You'll use us.",
      tags: ["React", "Next.js", "Native", "Cloud"],
    },
    {
      title: "UI/UX Design",
      icon: MousePointer2,
      color: "from-pink-500 to-rose-500",
      softColor: "via-pink-200/20 to-rose-200/20",
      snapshot: {
        label: "User Engagement",
        value: "92%",
        sub: "Increase in retention",
        button: "See Design Work",
      },
      description:
        "We design interfaces that make users fall in love (with your product, not us — though that happens too). Psychology meets pixels.",
      tags: ["Figma", "Motion", "User Research"],
    },
    {
      title: "Video Editing",
      icon: Video,
      color: "from-purple-500 to-indigo-600",
      softColor: "via-purple-200/20 to-indigo-200/20",
      snapshot: {
        label: "Watch Time",
        value: "3.2x",
        sub: "Longer viewer retention",
        button: "View Editing Samples",
      },
      description:
        "In a world of 3-second attention spans, we create videos people actually finish watching. Reels, ads, brand films — we make them all scroll-stopping.",
      tags: ["Premiere", "After Effects", "Shorts"],
    },
    {
      title: "SEO Dominance",
      icon: Search,
      color: "from-green-400 to-emerald-600",
      softColor: "via-green-200/20 to-emerald-200/20",
      snapshot: {
        label: "Ranking Lift",
        value: "87%",
        sub: "Top-page results",
        button: "Boost My SEO",
      },
      description:
        "Page 2 of Google is where websites go to die. We make sure you're on page 1, where the customers are. No black-hat tricks, just solid strategy.",
      tags: ["Technical SEO", "Backlinking", "Audit"],
    },
    {
      title: "Growth Marketing",
      icon: Activity,
      color: "from-orange-400 to-red-600",
      softColor: "via-orange-200/20 to-red-200/20",
      snapshot: {
        label: "ROAS",
        value: "6.4x",
        sub: "Return on ad spend",
        button: "Scale My Ads",
      },
      description:
        "We don't burn your ad budget on 'brand awareness'. Every rupee you spend comes back with friends. Meta, Google, YouTube — we know them all.",
      tags: ["PPC", "Social Ads", "Retargeting"],
    },
    {
      title: "GMB Optimization",
      icon: MapPin,
      color: "from-yellow-400 to-amber-600",
      softColor: "via-yellow-200/20 to-amber-200/20",
      snapshot: {
        label: "Local Reach",
        value: "3.9x",
        sub: "More customer calls",
        button: "Optimize My GMB",
      },
      description:
        "When someone searches 'best [your service] near me', you should be the first name they see. We make that happen. Local domination, guaranteed.",
      tags: ["Local SEO", "Reviews", "Maps"],
    },
  ];

  return (
    <div className="min-h-screen transition-colors duration-500 selection:bg-[#faa200] selection:text-[#222222] bg-[#fcf7ef] dark:bg-[#1a1a1a]">
      <div className="text-[#222222] dark:text-[#fcf7ef] font-sans overflow-x-hidden">
        {/* Shared Navbar */}
        <Navbar />

        <main className="pt-32 pb-20">
          {/* --- SECTION 1: HERO (Vibrant & Clean) --- */}
          <section className="px-6 mb-32 max-w-7xl mx-auto min-h-[70vh] flex flex-col justify-center relative">
            {/* Ambient Background Glow - CSS Only, No heavy SVG filters */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#faa200]/20 rounded-full blur-[120px] -z-10" />

            <FadeIn>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#faa200]/30 bg-[#faa200]/10 text-[#faa200] text-xs font-bold uppercase tracking-widest mb-6">
                <span className="w-2 h-2 rounded-full bg-[#faa200] animate-ping" />
                System Online
              </div>
            </FadeIn>

            <FadeIn delay={100}>
              <h1 className="text-5xl md:text-7xl lg:text-[9rem] font-black tracking-tighter leading-[0.85] mb-8">
                DIGITAL <br />
                <span className="text-[#faa200]">
                  ALCHEMY.
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="flex flex-col md:flex-row gap-8 md:items-end max-w-4xl">
                <p className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed md:border-l-4 md:border-zinc-800 md:pl-6">
                  We transmute code into revenue. Zora is the agency that
                  bridges the gap between{" "}
                  <span className="text-[#faa200] font-bold">
                    obsessive engineering
                  </span>{" "}
                  and{" "}
                  <span className="text-[#f79f47] font-bold">human emotion</span>
                  .
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={300} className="mt-12 flex flex-wrap gap-6">
              <button className="px-8 py-4 bg-[#faa200] text-[#222222] rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center gap-2">
                Inititate Project <ArrowRight size={20} />
              </button>
              <div className="flex items-center gap-4 px-6 py-4 rounded-full border border-zinc-200 dark:border-zinc-800 backdrop-blur-sm">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-[#fed382] dark:bg-[#f79f47] border-2 border-[#fcf7ef] dark:border-[#1a1a1a]"
                    />
                  ))}
                </div>
                <span className="text-sm font-bold">
                  Trusted by 500+ clients
                </span>
              </div>
            </FadeIn>
          </section>

          {/* --- SECTION 2: THE PROBLEM (Stark Contrast) --- */}
          <section className="bg-[#fde9c4] dark:bg-[#222222] py-24 px-6 border-y border-[#fed382] dark:border-[#f79f47] overflow-hidden">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative">
              {/* Decorative Elements */}
              <div className="absolute -right-20 top-0 text-[20rem] font-black text-[#fed382] dark:text-[#f79f47] opacity-20 pointer-events-none select-none">
                ?
              </div>

              <FadeIn>
                <h2 className="text-4xl md:text-6xl font-black uppercase leading-[0.9]">
                  Most Websites <br />
                  <span className="text-[#222222]/60 dark:text-[#fcf7ef]/60">
                    Feel Like
                  </span>{" "}
                  <br />
                  Empty Rooms.
                </h2>
              </FadeIn>
              <FadeIn delay={200} className="space-y-8 z-10">
                <div className="group p-6 rounded-2xl bg-[#fcf7ef] dark:bg-[#1a1a1a] border border-[#fed382] dark:border-[#f79f47] hover:border-[#faa200] transition-colors shadow-lg">
                  <div className="flex gap-4 mb-4">
                    <div className="p-3 bg-[#faa200]/10 text-[#faa200] rounded-xl">
                      <Fingerprint />
                    </div>
                    <h4 className="text-xl font-bold">
                      The &quot;Zombie&quot; Template
                    </h4>
                  </div>
                  <p className="text-[#222222]/80 dark:text-[#fcf7ef]/80 pl-14">
                    Your competitors are using the same $50 themes. It&apos;s
                    lifeless. We build custom identities that have a pulse.
                  </p>
                </div>
                <div className="group p-6 rounded-2xl bg-[#fcf7ef] dark:bg-[#1a1a1a] border border-[#fed382] dark:border-[#f79f47] hover:border-[#f79f47] transition-colors shadow-lg">
                  <div className="flex gap-4 mb-4">
                    <div className="p-3 bg-[#f79f47]/10 text-[#f79f47] rounded-xl">
                      <Activity />
                    </div>
                    <h4 className="text-xl font-bold">Lag Kills Sales</h4>
                  </div>
                  <p className="text-[#222222]/80 dark:text-[#fcf7ef]/80 pl-14">
                    A pretty site that loads in 3 seconds is a failed site. We
                    engineer for sub-second loads and 100/100 scores.
                  </p>
                </div>
              </FadeIn>
            </div>
          </section>

          {/* --- SECTION 3: THE ARSENAL (Colorful & Interactive) --- */}
          <section id="services" className="py-32 px-6 max-w-7xl mx-auto">
            <FadeIn className="mb-20">
              <span className="px-4 py-1 rounded-full border border-[#faa200]/30 text-[#faa200] text-xs font-bold uppercase tracking-widest bg-[#faa200]/5">
                Our Capabilities
              </span>
              <h2 className="text-5xl md:text-8xl font-black mt-6 mb-6">
                THE ARSENAL
              </h2>
              <div className="h-1 w-24 bg-[#faa200] rounded-full"></div>
            </FadeIn>

            <div className="flex flex-col border-t border-zinc-200 dark:border-zinc-800">
              {servicesList.map((s, i) => (
                <FadeIn key={i} delay={i * 50}>
                  <ServiceRow number={i + 1} {...s} />
                </FadeIn>
              ))}
            </div>
          </section>

          {/* --- SECTION 4: THE BLUEPRINT (Grid Layout) --- */}
          <section className="py-24 bg-[#222222] text-[#fcf7ef] relative overflow-hidden">
            {/* Vibrant Grid Background */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)",
                backgroundSize: "40px 40px",
                maskImage:
                  "radial-gradient(circle at center, black, transparent 80%)",
              }}
            ></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <FadeIn className="text-center mb-16">
                <h2 className="text-4xl md:text-6xl font-black mb-4">
                  THE BLUEPRINT
                </h2>
                <p className="text-[#fcf7ef]/80">How we turn chaos into order.</p>
              </FadeIn>

              <div className="grid md:grid-cols-4 gap-6">
                {[
                  {
                    title: "Audit",
                    desc: "We tear down your current presence to find the leaks.",
                    icon: Search,
                    color: "text-cyan-400",
                  },
                  {
                    title: "Architect",
                    desc: "Strategy first. We build the roadmap before writing code.",
                    icon: Hexagon,
                    color: "text-purple-400",
                  },
                  {
                    title: "Execute",
                    desc: "Rapid deployment. High-velocity sprints. Zero lag.",
                    icon: Zap,
                    color: "text-pink-400",
                  },
                  {
                    title: "Dominate",
                    desc: "Launch is just day one. We optimize for scale.",
                    icon: Trophy,
                    color: "text-yellow-400",
                  },
                ].map((step, i) => (
                  <FadeIn
                    key={i}
                    delay={i * 100}
                    className="relative p-8 border border-[#f79f47] bg-[#1a1a1a]/80 backdrop-blur-xl rounded-3xl hover:-translate-y-2 transition-transform duration-300 group overflow-hidden"
                  >
                    <div
                      className={`absolute top-0 right-0 p-32 bg-gradient-to-br from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full blur-2xl translate-x-10 -translate-y-10`}
                    />

                    <div className="flex justify-between items-start mb-6">
                      <step.icon
                        size={32}
                        className={`${step.color} group-hover:scale-110 transition-transform`}
                      />
                      <span className="font-mono text-zinc-600 font-bold">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                    <p className="text-[#fcf7ef]/80 text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          {/* --- NEW SECTION 5: THE DNA (Heartwarming & Authentic) --- */}
          <section className="py-32 px-6 max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-12">
              <div className="lg:col-span-5">
                <FadeIn>
                  <div className="inline-flex items-center gap-2 mb-6">
                    <Heart
                      className="text-[#faa200] fill-[#faa200] animate-pulse"
                      size={20}
                    />
                    <span className="font-bold tracking-widest text-xs uppercase text-[#222222]/60 dark:text-[#fcf7ef]/60">
                      The Human Element
                    </span>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                    We are{" "}
                    <span className="text-[#faa200]">
                      Obsessed
                    </span>
                    <br />
                    With Details.
                  </h2>
                  <p className="text-lg text-[#222222]/80 dark:text-[#fcf7ef]/80 mb-8 leading-relaxed">
                    Technology is cold. We bring the heat. Zora isn&apos;t just
                    a collection of code; it&apos;s a team of perfectionists who
                    care deeply about your success. We don&apos;t hide behind
                    account managers—you talk to the builders.
                  </p>
                  <div className="flex gap-4">
                    <div className="flex -space-x-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="w-12 h-12 rounded-full border-4 border-white dark:border-black bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center font-bold text-xs"
                        >
                          <Users size={16} className="opacity-50" />
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="font-bold">Meet the Core Team</span>
                      <span className="text-xs text-zinc-500">
                        Real Humans. No AI Support.
                      </span>
                    </div>
                  </div>
                </FadeIn>
              </div>

              <div className="lg:col-span-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      title: "Radical Transparency",
                      desc: "No hidden fees. No jargon. We show you the dashboard.",
                      color: "bg-rose-500",
                    },
                    {
                      title: "Pixel Perfection",
                      desc: "We agonize over 1px misalignments so you don't have to.",
                      color: "bg-orange-500",
                    },
                    {
                      title: "24/7 Reliability",
                      desc: "We sleep in shifts so your website never goes down.",
                      color: "bg-cyan-500",
                    },
                    {
                      title: "Owner Mindset",
                      desc: "We treat your budget like it's our own money.",
                      color: "bg-purple-500",
                    },
                  ].map((card, i) => (
                    <FadeIn key={i} delay={i * 100}>
                      <div className="p-8 rounded-3xl bg-[#fde9c4] dark:bg-[#222222] border border-[#fed382] dark:border-[#f79f47] hover:border-[#faa200] group hover:shadow-xl transition-all duration-300 relative overflow-hidden h-full">
                        <div
                          className={`absolute inset-0 opacity-0 group-hover:opacity-10 ${card.color} transition-opacity duration-300`}
                        />
                        <div
                          className={`w-2 h-12 ${card.color} rounded-full mb-6`}
                        />
                        <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                        <p className="text-sm text-[#222222]/80 dark:text-[#fcf7ef]/80">
                          {card.desc}
                        </p>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* --- NEW SECTION 6: VELOCITY ECOSYSTEM (Live/Authentic Data) --- */}
          <section className="py-24 bg-[#1a1a1a] text-[#fcf7ef] relative overflow-hidden">
            {/* Moving Background Mesh */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#faa200]/20 via-[#1a1a1a] to-[#1a1a1a]" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-zinc-800 pb-8">
                <div>
                  <h2 className="text-3xl md:text-5xl font-black mb-2">
                    VELOCITY ECOSYSTEM
                  </h2>
                  <p className="text-[#faa200]">
                    Live metrics from our client network.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[#f79f47] text-sm font-mono mt-4 md:mt-0">
                  <div className="w-2 h-2 bg-[#f79f47] rounded-full animate-pulse" />
                  LIVE DATA FEED
                </div>
              </div>

              {/* The "Ticker" Style Cards */}
              <div className="grid md:grid-cols-3 gap-6">
                <FadeIn delay={0}>
                  <div className="bg-[#222222]/50 border border-[#f79f47] p-6 rounded-2xl backdrop-blur-sm">
                    <div className="flex justify-between items-start mb-8">
                      <span className="text-[#fcf7ef]/60 text-xs font-bold uppercase">
                        Total Traffic Generated
                      </span>
                      <Globe2 className="text-[#faa200]" size={20} />
                    </div>
                    <div className="text-4xl font-mono font-bold mb-2 tabular-nums">
                      14.2M+
                    </div>
                    <div className="text-xs text-[#f79f47] flex items-center gap-1">
                      <MoveRight className="-rotate-45" size={12} /> +12% this
                      week
                    </div>
                  </div>
                </FadeIn>

                <FadeIn delay={100}>
                  <div className="bg-[#222222]/50 border border-[#f79f47] p-6 rounded-2xl backdrop-blur-sm">
                    <div className="flex justify-between items-start mb-8">
                      <span className="text-[#fcf7ef]/60 text-xs font-bold uppercase">
                        Revenue Unlocked
                      </span>
                      <BarChart className="text-[#faa200]" size={20} />
                    </div>
                    <div className="text-4xl font-mono font-bold mb-2 tabular-nums">
                      $52.8M
                    </div>
                    <div className="text-xs text-[#f79f47] flex items-center gap-1">
                      <MoveRight className="-rotate-45" size={12} /> +8.4% vs
                      last month
                    </div>
                  </div>
                </FadeIn>

                <FadeIn delay={200}>
                  <div className="bg-[#222222]/50 border border-[#f79f47] p-6 rounded-2xl backdrop-blur-sm">
                    <div className="flex justify-between items-start mb-8">
                      <span className="text-[#fcf7ef]/60 text-xs font-bold uppercase">
                        Uptime Guarantee
                      </span>
                      <Cpu className="text-[#faa200]" size={20} />
                    </div>
                    <div className="text-4xl font-mono font-bold mb-2 tabular-nums">
                      99.99%
                    </div>
                    <div className="text-xs text-[#fcf7ef]/60">
                      Zero unplanned outages
                    </div>
                  </div>
                </FadeIn>
              </div>

              {/* Client Scrolling Ticker (Simulated) */}
              <div className="mt-12 pt-8 border-t border-zinc-800">
                <p className="text-center text-xs font-bold uppercase tracking-widest text-zinc-600 mb-8">
                  Powering Next-Gen Brands
                </p>
                <div className="flex justify-between opacity-50 grayscale hover:grayscale-0 transition-all duration-500 px-4 md:px-20 overflow-hidden gap-8">
                  {/* Simple placeholders for logos */}
                  <span className="text-xl font-black">NEXUS</span>
                  <span className="text-xl font-black">ORBITAL</span>
                  <span className="text-xl font-black">VORTEX</span>
                  <span className="text-xl font-black">LUMINA</span>
                  <span className="text-xl font-black hidden md:block">
                    QUANTUM
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* --- CTA SECTION --- */}
          <section id="contact" className="px-6 pb-20 pt-32">
            <div className="max-w-7xl mx-auto rounded-[3rem] bg-gradient-to-br from-[#faa200] via-[#f79f47] to-[#222222] p-12 md:p-32 text-center text-[#222222] relative overflow-hidden group shadow-2xl shadow-[#faa200]/20">
              {/* Decorative Circles */}
              <div className="absolute top-0 left-0 w-96 h-96 bg-[#fed382] rounded-full blur-[150px] opacity-30 -translate-x-1/2 -translate-y-1/2 group-hover:opacity-50 transition-opacity duration-700"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#f79f47] rounded-full blur-[150px] opacity-30 translate-x-1/2 translate-y-1/2 group-hover:opacity-50 transition-opacity duration-700"></div>

              <div className="relative z-10">
                <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-8">
                  READY TO{" "}
                  <span className="text-[#fcf7ef]">
                    ASCEND?
                  </span>
                </h2>
                <p className="text-xl md:text-2xl text-[#222222]/80 mb-12 max-w-2xl mx-auto">
                  Your competition isn&apos;t waiting. Neither should you.
                </p>

                <button className="group relative inline-flex items-center gap-4 px-12 py-6 bg-[#fcf7ef] text-[#222222] rounded-full font-black text-xl hover:scale-105 transition-all duration-300 hover:shadow-[0_0_40px_-10px_rgba(252,247,239,0.6)]">
                  Book Strategy Call
                  <div className="w-8 h-8 bg-[#222222] text-[#fcf7ef] rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform">
                    <ArrowRight size={16} />
                  </div>
                </button>
              </div>
            </div>
          </section>

          {/* Footer */}
          <Footer />
        </main>
      </div>
    </div>
  );
}

// Icon helper
const Trophy = ({ size, className }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);
