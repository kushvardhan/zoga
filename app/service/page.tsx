'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Globe, Layout, Smartphone, PenTool, Database, TrendingUp, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const servicesList = [
  { icon: Layout, title: "Website Development", desc: "Enterprise-grade headless architecture on Next.js." },
  { icon: Smartphone, title: "Mobile Apps", desc: "Native-quality experiences using React Native or Swift/Kotlin." },
  { icon: PenTool, title: "UI/UX Design", desc: "Human-centric design systems built for engagement and conversion." },
  { icon: Database, title: "Full-Stack Development", desc: "End-to-end platform creation from database to frontend." },
  { icon: TrendingUp, title: "SEO & Digital Growth", desc: "Technical SEO integration and growth strategy execution." },
  { icon: RefreshCcw, title: "Maintenance & Support", desc: "24/7 proactive monitoring and optimization." },
];

const detailedServices = [
  { 
    title: "Website Development", 
    content: "We don't just launch sites; we deploy performance machines. Leveraging Next.js and Vercel for instant loading and scale. This ensures a flawless user experience and a foundational edge in search rankings.",
    bullets: ["Headless CMS integration (Contentful, Sanity)", "Scalable serverless deployment", "Custom animation libraries"],
  },
  { 
    title: "UI/UX Design Systems", 
    content: "Our design process is rooted in behavioral psychology. We engineer emotion, creating design systems that reduce cognitive load and drive users effortlessly towards key actions. We deliver meticulous documentation for future scale.",
    bullets: ["User journey mapping", "High-fidelity prototyping", "Accessibility compliance (WCAG)"],
  },
  { 
    title: "SEO & Digital Growth", 
    content: "Growth is not accidental. We hardwire your platform for maximum discoverability. Our approach combines technical SEO audits, content strategy planning, and continuous performance monitoring to ensure organic leadership.",
    bullets: ["Technical SEO audits", "Core Web Vitals optimization", "Conversion Rate Optimization (CRO)"],
  },
];

const TechLogo = ({ name }: { name: string }) => (
    <div className="px-6 py-3 rounded-xl dark:bg-gray-800 bg-gray-200 text-gray-700 dark:text-gray-300 text-sm font-medium whitespace-nowrap border dark:border-white/5 border-gray-300 shadow-inner">
        {name}
    </div>
);

// --- Services Page Main Component ---

export default function ServicesPage() {
  const [openIndex, setOpenIndex] = useState(0);

  const bgClasses = "bg-gray-50 dark:bg-[#0a0a0a]";
  const textPrimary = "text-gray-900 dark:text-gray-50";
  const textSecondary = "text-gray-600 dark:text-gray-400";
  const accentGradient = "text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-500";

  return (
    <main className={`min-h-screen pt-28 pb-24 px-6 ${bgClasses}`}>
      <div className="max-w-7xl mx-auto">
        
        {/* --- HERO SECTION: Conversion Focus --- */}
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
        >
            <h1 className={`text-6xl md:text-8xl font-extrabold tracking-tighter ${textPrimary} mb-6`}>
                <span className="block">Services Engineered</span> for <span className={accentGradient}>Unstoppable Growth</span>
            </h1>
            <p className={`text-2xl max-w-4xl mx-auto ${textSecondary}`}>
                We are a full-spectrum digital partner. From initial concept to market dominance, we provide the strategic power and technical depth required to win.
            </p>
        </motion.div>

        {/* --- SERVICE CATEGORIES GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {servicesList.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(99, 102, 241, 0.2)' }}
              className="group p-8 rounded-3xl border dark:border-white/10 border-gray-200 dark:bg-gray-900/50 bg-white/50 cursor-pointer transition-all duration-300"
            >
              <service.icon className="w-8 h-8 text-indigo-500 mb-4 group-hover:text-blue-500 transition-colors" />
              <h3 className={`text-2xl font-bold mb-3 ${textPrimary}`}>{service.title}</h3>
              <p className={`text-md ${textSecondary}`}>{service.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* --- DETAILED SERVICE BREAKDOWN (ACCORDION) --- */}
        <div className="mb-24">
            <h2 className={`text-5xl font-bold tracking-tighter mb-12 text-center ${textPrimary}`}>
                The Full <span className={accentGradient}>Breakdown</span>
            </h2>
            
            <div className="max-w-5xl mx-auto space-y-4">
                {detailedServices.map((service, index) => (
                    <div key={index} className="border-b dark:border-white/10 border-gray-200">
                        <motion.button
                            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                            className="flex justify-between items-center w-full py-6 text-left"
                        >
                            <h3 className={`text-2xl font-semibold ${textPrimary}`}>{service.title}</h3>
                            <motion.div
                                animate={{ rotate: openIndex === index ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ChevronDown className="w-6 h-6 text-indigo-500" />
                            </motion.div>
                        </motion.button>
                        
                        <motion.div
                            initial={false}
                            animate={{ height: openIndex === index ? 'auto' : 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="overflow-hidden"
                        >
                            <div className="pb-6">
                                <p className={`text-lg mb-4 ${textSecondary}`}>{service.content}</p>
                                <ul className="list-disc pl-5 space-y-2">
                                    {service.bullets.map((bullet, i) => (
                                        <li key={i} className={`text-md ${textSecondary}`}>{bullet}</li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </div>
                ))}
            </div>
        </div>
        
        {/* --- TECH STACK (INFINITE SLIDER) --- */}
        <div className="mb-24 overflow-hidden">
            <h2 className={`text-4xl font-bold tracking-tighter mb-12 text-center ${textPrimary}`}>
                Powered by the <span className={accentGradient}>Best Stack</span>
            </h2>
            <div className="relative flex overflow-x-hidden">
                <motion.div
                    className="flex gap-6 py-4"
                    animate={{ x: ['0%', '-100%'] }}
                    transition={{ 
                        x: {
                            repeat: Infinity,
                            duration: 30,
                            ease: 'linear',
                        }
                    }}
                >
                    {/* Double the array for seamless loop */}
                    {['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Node.js', 'PostgreSQL', 'Contentful', 'Vercel', 'AWS'].flatMap((name, i) => [
                        <TechLogo key={`${i}-a`} name={name} />,
                        <TechLogo key={`${i}-b`} name={name} />,
                    ])}
                </motion.div>
            </div>
        </div>

        {/* --- PROCESS TIMELINE (5-Step) --- */}
        <div className="mb-24">
            <h2 className={`text-5xl font-bold tracking-tighter mb-12 text-center ${textPrimary}`}>
                Our <span className={accentGradient}>Five-Step</span> Process
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                {['Strategy', 'Design', 'Engineering', 'Launch', 'Grow'].map((step, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.6, delay: i * 0.15 }}
                        className="text-center group"
                    >
                        <div className="relative inline-block mb-4">
                            <span className="text-6xl font-extrabold italic text-indigo-500/20">{i + 1}</span>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className={`text-sm font-bold uppercase tracking-wider ${textPrimary}`}>{step}</span>
                            </div>
                        </div>
                        <h3 className={`font-semibold ${textPrimary}`}>{step}</h3>
                        <div className="h-1 w-1/2 mx-auto mt-2 bg-indigo-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                ))}
            </div>
        </div>

        {/* --- FINAL CTA SECTION --- */}
        <section className={`py-20 text-center rounded-3xl dark:bg-gray-900 bg-gray-200 border dark:border-white/10 border-gray-300`}>
            <h2 className={`text-4xl md:text-5xl font-bold ${textPrimary} mb-4`}>
                Ready to Forge Your Digital Future?
            </h2>
            <p className={`text-xl mb-10 ${textSecondary} max-w-3xl mx-auto`}>
                Stop building products, start building empires. Book a strategic consultation today.
            </p>
            <Button>
                Let&apos;s Talk Scale <Globe className="w-5 h-5" />
            </Button>
        </section>
        
      </div>
    </main>
  );
}