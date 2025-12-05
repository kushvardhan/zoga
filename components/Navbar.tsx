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
import { useEffect, useState } from "react";

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
          <Link href="/" className="flex items-center gap-4 group">
            <div className="relative w-16 h-16 rounded-full overflow-hidden">
              <Image
                src="/logowithBGREMOVE.png"
                alt="Avioni Logo"
                fill
                className={`object-contain ${isDark ? "invert" : ""}`}
              />
            </div>

            <span className="font-black text-3xl tracking-tight text-[#222222] dark:text-[#fcf7ef]" style={{fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'}}>
              Avioni
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              href="/"
            >
              Home
            </Link>
            
            <div
              className="relative h-full flex items-center"
              onMouseEnter={() => setActiveDropdown("services")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-8">
                Services
              </button>
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
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-4">
            {/* 3D Theme Toggle */}
            <div 
              onClick={toggleTheme}
              className="relative w-16 h-8 theme-toggle-track rounded-full cursor-pointer transition-all duration-300"
            >
              <motion.div
                animate={{
                  x: isDark ? 32 : 4,
                  rotateY: isDark ? 180 : 0
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute top-1 w-6 h-6 theme-toggle-thumb rounded-full flex items-center justify-center transform-gpu"
              >
                <motion.div
                  animate={{ rotate: isDark ? 0 : 180 }}
                  transition={{ duration: 0.3 }}
                >
                  {isDark ? <Moon size={12} className="text-slate-600" /> : <Sun size={12} className="text-yellow-600" />}
                </motion.div>
              </motion.div>
            </div>

            <MagneticButton className="hidden md:block px-6 py-2.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold shadow-lg hover:shadow-blue-500/25 transition-shadow">
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

      {/* BLUE BACKDROP */}
      <AnimatePresence>
        {activeDropdown === "services" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-blue-500/20 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* FULL-WIDTH MEGA MENU */}
      <AnimatePresence>
        {activeDropdown === "services" && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-white/95 dark:bg-[#030014]/95 backdrop-blur-xl"
            onMouseEnter={() => setActiveDropdown("services")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <div className="max-w-7xl mx-auto px-6 pt-32 pb-12 h-full flex items-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-full">
                {SERVICES.map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                  >
                    <Link
                      href="/service"
                      className="group block h-full p-6 rounded-2xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800/50 dark:to-slate-900/50 hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 border border-slate-200/50 dark:border-white/10 hover:border-blue-200 dark:hover:border-blue-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div
                          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                        >
                          <service.icon size={28} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {service.title}
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                            {service.desc}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-semibold group-hover:translate-x-1 transition-transform">
                        Learn More
                        <ArrowRight size={16} className="ml-2" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
              <span className="text-xl font-bold">Menu</span>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-2 bg-slate-100 dark:bg-white/10 rounded-full"
              >
                <X size={24} />
              </button>
            </div>

            {/* Mobile links */}
            <div className="flex flex-col gap-6 text-3xl font-bold text-slate-900 dark:text-white">
              {["home", "service", "work", "about", "contact"].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-6"
                >
                  <Link
                    href={item === "home" ? "/" : `/${item}`}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </Link>
                  <ArrowRight className="-rotate-45 text-slate-300" />
                </motion.div>
              ))}
            </div>

            <div className="mt-auto">
              <MagneticButton className="w-full py-4 rounded-xl bg-blue-600 text-white font-bold text-lg">
                Let&apos;s Talk
              </MagneticButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
