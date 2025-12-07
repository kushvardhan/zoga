"use client";

import MagneticButton from "@/components/MagneticButton";
import { useTheme } from "@/lib/theme-provider";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import {
  ArrowRight,
  Code2,
  LineChart,
  Megaphone,
  Menu,
  Moon,
  Palette,
  Smartphone,
  Sun,
  Video,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

const SERVICES = [
  {
    id: "web",
    title: "Web Engineering",
    desc: "Next.js architectures that scale to millions. Fast, secure, SEO-ready.",
    icon: Code2,
    color: "from-blue-600 to-cyan-500",
    span: "md:col-span-2",
  },
  {
    id: "app",
    title: "Native Mobile",
    desc: "iOS & Android apps with 60fps performance using React Native.",
    icon: Smartphone,
    color: "from-purple-600 to-pink-500",
    span: "md:col-span-1",
  },
  {
    id: "design",
    title: "UX/UI Design",
    desc: "Interfaces that convert. Award-winning aesthetics meet psychology.",
    icon: Palette,
    color: "from-orange-500 to-red-500",
    span: "md:col-span-1",
  },
  {
    id: "growth",
    title: "Growth & SEO",
    desc: "Dominate Google rankings. Data-driven strategies for Indian & Global markets.",
    icon: LineChart,
    color: "from-green-500 to-emerald-500",
    span: "md:col-span-2",
  },
  {
    id: "video",
    title: "Video Editing",
    desc: "Cinematic edits, reels, ads & brand stories built for high engagement.",
    icon: Video,
    color: "from-rose-500 to-fuchsia-500",
    span: "md:col-span-1",
  },
  {
    id: "marketing",
    title: "Digital Marketing",
    desc: "ROI-focused campaigns across Google, Meta, Instagram & YouTube.",
    icon: Megaphone,
    color: "from-indigo-600 to-blue-500",
    span: "md:col-span-1",
  },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

const hoverTimer = useRef<NodeJS.Timeout | null>(null);

const handleMouseEnter = () => {
  hoverTimer.current = setTimeout(() => {
    setActiveDropdown("services");
  }, 500); 
};

const handleMouseLeave = () => {
  if (hoverTimer.current) {
    clearTimeout(hoverTimer.current);
    hoverTimer.current = null;
  }
  setActiveDropdown(null);
};


  const { scrollY } = useScroll();
  useEffect(() => {
    return scrollY.onChange((latest) => setIsScrolled(latest > 50));
  }, [scrollY]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "h-20 bg-white/80 dark:bg-[#030014]/80 backdrop-blur-md border-b border-slate-200/50 dark:border-white/5 shadow-sm dark:shadow-white/5"
            : "h-24 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between relative">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-36 h-36">
              <Image
                src="/AvioniLogo.png"
                alt="Avioni Logo"
                fill
                className={`object-contain p-1 ${isDark ? "invert" : ""}`}
              />
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
          
            <div
  className="relative h-full flex items-center"
  onMouseEnter={handleMouseEnter}
  onMouseLeave={handleMouseLeave}
>
  <Link
    href="/service"
    className="
      text-sm font-semibold 
      text-slate-600 dark:text-slate-300
      hover:text-blue-600 dark:hover:text-blue-400
      transition-colors py-8
    "
  >
    Services
  </Link>

  <AnimatePresence>
    {activeDropdown === "services" && (
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="
          absolute top-[80%] left-1/2 -translate-x-1/2
          w-[600px] p-6
          bg-white dark:bg-[#0b0b13]
          rounded-2xl border border-slate-200 dark:border-white/10
          shadow-2xl grid grid-cols-2 gap-4
          z-[999]
        "
      >
        {SERVICES.map((s) => (
          <Link
            key={s.id}
            href="/service"
            className="
              flex items-start gap-4 p-4 rounded-xl
              hover:bg-slate-50 dark:hover:bg-white/5
              transition-colors group
            "
          >
            <div
              className={`
                w-12 h-12 rounded-2xl bg-gradient-to-br ${s.color}
                flex items-center justify-center text-white 
                p-2 shadow-sm dark:shadow-none
                transform transition-all duration-200
                group-hover:scale-[1.04] group-hover:shadow-md
              `}
            >
              <s.icon size={22} className="opacity-95" />
            </div>

            <div>
              <h4
                className="
                  font-bold text-slate-900 dark:text-white
                  group-hover:text-blue-500 transition-colors
                "
              >
                {s.title}
              </h4>

              <p className="text-xs text-slate-500 leading-relaxed mt-1">
                {s.desc}
              </p>
            </div>
          </Link>
        ))}
      </motion.div>
    )}
  </AnimatePresence>
</div>


            <Link
              className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              href="/about"
            >
              About
            </Link>
            <Link
              className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              href="/work"
            >
              Work
            </Link>
            <Link
              className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              href="/why-us"
            >
              Why Us
            </Link>
            <Link
              className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              href="/contact" 
            >
             Contact
            </Link>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors shadow-sm dark:shadow-white/5"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <MagneticButton className="hidden md:block px-6 py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold shadow-lg hover:shadow-blue-500/25 transition-shadow">
              Start Project
            </MagneticButton>

            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-white dark:bg-[#030014] p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-2xl font-bold tracking-wide">Menu</span>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-2 bg-slate-100 dark:bg-white/10 rounded-full"
              >
                <X size={24} />
              </button>
            </div>

            {/* Mobile links */}
            <div className="flex flex-col gap-6 text-3xl font-bold text-slate-900 dark:text-white">
              {["about","service", "work","why-us" ,"contact"].map((item, index) => (
<motion.div
  key={item}
  initial={{ opacity: 0, x: 20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: index * 0.1 }}
  className="border-b border-slate-200 dark:border-white/10 pb-4"
>
  <Link
    href={`/${item}`}
    onClick={() => setIsMobileOpen(false)}
    className="
      group
      flex items-center justify-between 
      w-full py-3
      text-[17px] 
      font-semibold                      /* Stronger weight */
      tracking-wide                      /* Cleaner typography */
      text-slate-900 dark:text-slate-200
      hover:text-black dark:hover:text-white
      transition-all duration-200
    "
  >
    <span className="font-semibold">
      {item.charAt(0).toUpperCase() + item.slice(1)}
    </span>

    <ArrowRight
      className="
        -rotate-45 
        size-5 
        text-slate-800 dark:text-slate-200
        group-hover:text-black dark:group-hover:text-white
        group-hover:translate-x-1
        transition-all duration-300
      "
    />
  </Link>
</motion.div>

              ))}
            </div>

            <div className="mt-auto flex justify-center">
  <MagneticButton className="w-[90%] py-4 rounded-xl bg-blue-600 text-white font-bold text-lg text-center">
    <Link href="/contact" className="block w-full">
      Let&apos;s Talk
    </Link>
  </MagneticButton>
</div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
