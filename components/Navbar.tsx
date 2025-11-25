"use client";
import { useEffect, useState } from "react";

import MagneticButton from "@/components/MagneticButton";
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

  // ⭐ Added Services Below
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

export interface Review {
  quote: string;
  name: string;
  title?: string;
}

interface Props {
  review: Review;
}

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export default function Navbar({ isDark, toggleTheme }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const { scrollY } = useScroll();
  useEffect(
    () => scrollY.onChange((latest) => setIsScrolled(latest > 50)),
    [scrollY]
  );

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          isScrolled
            ? "h-20 bg-white/80 dark:bg-[#030014]/80 backdrop-blur-md border-slate-200/50 dark:border-white/5"
            : "h-24 bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between relative">
          {/* Logo */}
          
          <Link href="/">
          <a href="#" className="flex items-center gap-3 group">
            <div
              className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 
                  flex items-center justify-center shadow-lg shadow-blue-500/20 
                  group-hover:shadow-purple-500/40 transition-all overflow-hidden"
            >
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
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {/* Services Dropdown Trigger */}
            <div
              className="relative h-full flex items-center"
              onMouseEnter={() => setActiveDropdown("services")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1 py-8">
                Services
              </button>

              {/* Mega Menu */}
              <AnimatePresence>
                {activeDropdown === "services" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-[80%] left-1/2 -translate-x-1/2 w-[600px] p-6 bg-white dark:bg-[#0a0a12] rounded-2xl border border-slate-200 dark:border-white/10 shadow-2xl grid grid-cols-2 gap-4 z-50"
                  >
                    {SERVICES.map((s) => (
                      <a
                        key={s.id}
                        href="#services"
                        className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group"
                      >
                        <div
                          className={`w-10 h-10 rounded-lg bg-gradient-to-br ${s.color} flex items-center justify-center text-white shrink-0`}
                        >
                          <s.icon size={20} />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">
                            {s.title}
                          </h4>
                          <p className="text-xs text-slate-500 leading-relaxed mt-1">
                            {s.desc}
                          </p>
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
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
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

      {/* Mobile Menu Overlay */}
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
                Let&apos;s Talk
              </MagneticButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
