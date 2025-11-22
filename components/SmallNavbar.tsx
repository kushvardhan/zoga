'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import Link from 'next/link';

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
];

export default function SmallNavbar() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-white/70 dark:bg-black/40 border-b border-zinc-200/40 dark:border-zinc-800/40">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tight">
          <span className="text-purple-600">Zoga</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.08, y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link 
                href={item.href} 
                className="text-zinc-700 dark:text-zinc-300 hover:text-purple-500 dark:hover:text-purple-400 transition"
              >
                {item.label}
              </Link>
            </motion.div>
          ))}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-200/50 dark:hover:bg-zinc-700/40 transition"
          >
            {theme === "light" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-xl hover:bg-zinc-200/40 dark:hover:bg-zinc-700/40 transition"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden px-6 pb-6 flex flex-col gap-4 bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800"
        >
          {navItems.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="text-zinc-800 dark:text-zinc-200 py-2 border-b border-zinc-200/30 dark:border-zinc-700/30"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          {/* Theme Toggle Mobile */}
          <button
            onClick={toggleTheme}
            className="mt-3 p-3 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-200/50 dark:hover:bg-zinc-700/40 transition flex items-center gap-2"
          >
            {theme === "light" ? <Sun size={18} /> : <Moon size={18} />}
            Toggle Theme
          </button>
        </motion.div>
      )}
    </nav>
  );
}
