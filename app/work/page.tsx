'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Grid, Smartphone, Palette, Code } from 'lucide-react';

const projects = [
  { id: 1, title: "The Hyperion SaaS", category: "Websites", desc: "A complex data visualization platform built on Next.js and AWS.", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2940&auto=format&fit=crop" },
  { id: 2, title: "Aura Mobile Finance", category: "Apps", desc: "Native iOS/Android app focusing on banking friction reduction.", image: "https://images.unsplash.com/photo-1587440854495-20199dc27471?q=80&w=2940&auto=format&fit=crop" },
  { id: 3, title: "Solstice Rebrand", category: "Branding", desc: "Full visual identity system, tone-of-voice, and digital guidelines.", image: "https://images.unsplash.com/photo-1542382559-05f242e970b1?q=80&w=2940&auto=format&fit=crop" },
  { id: 4, title: "Enterprise CMS", category: "Websites", desc: "Headless CMS integration for scalable global content distribution.", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2940&auto=format&fit=crop" },
  // Add more projects
];

const categories = [
  { name: 'All', icon: Grid },
  { name: 'Websites', icon: Code },
  { name: 'Apps', icon: Smartphone },
  { name: 'Branding', icon: Palette },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const ShimmerBorderCard = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ '--shimmer-degree': '0deg' }}
    whileHover={{ '--shimmer-degree': '360deg' }}
    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
    className="relative rounded-2xl p-[1px] group overflow-hidden"
    style={{ 
        background: `linear-gradient(var(--shimmer-degree), transparent 0%, rgba(99, 102, 241, 0.6) 33%, transparent 66%, transparent 100%)`,
        backgroundSize: '300% 300%',
    }}
  >
    <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl h-full w-full">{children}</div>
  </motion.div>
);

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = projects.filter(p => activeFilter === 'All' || p.category === activeFilter);

  const bgClasses = "bg-gray-50 dark:bg-[#0a0a0a]";
  const textPrimary = "text-gray-900 dark:text-gray-50";
  const textSecondary = "text-gray-600 dark:text-gray-400";
  const accentGradient = "text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-500";
  
  return (
    <main className={`min-h-screen pt-28 pb-24 px-6 ${bgClasses}`}>
      <div className="max-w-7xl mx-auto">
        
        {/* Hero */}
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
        >
            <h1 className={`text-6xl md:text-8xl font-extrabold tracking-tighter ${textPrimary} mb-4`}>
                The Work That <span className={accentGradient}>Defines Us</span>
            </h1>
            <p className={`text-xl max-w-3xl mx-auto ${textSecondary}`}>
                A curated selection of the platforms, brands, and systems we’ve engineered for category leaders.
            </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(cat.name)}
              className={`flex items-center gap-2 px-5 py-2 rounded-full font-medium transition-all duration-300 
                ${activeFilter === cat.name 
                  ? 'bg-indigo-600 dark:bg-indigo-500 text-white shadow-lg shadow-indigo-500/40' 
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                }`}
            >
              <cat.icon className="w-5 h-5" />
              {cat.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Project Grid */}
        <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
                visible: {
                    transition: { staggerChildren: 0.1 }
                }
            }}
        >
          {filteredProjects.map((project) => (
            <motion.div key={project.id} variants={cardVariants}>
              <ShimmerBorderCard>
                <motion.div 
                    whileHover={{ scale: 1.01, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)' }}
                    className="group relative cursor-pointer overflow-hidden rounded-2xl h-full"
                >
                  
                  {/* Image Container with Parallax Tilt */}
                  <motion.div
                    whileHover={{ rotateX: 3, rotateY: 3, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="aspect-[4/3] w-full overflow-hidden"
                  >
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                  </motion.div>

                  {/* Text Content */}
                  <div className="p-6 relative">
                    <span className="uppercase text-xs font-bold tracking-widest text-indigo-500 mb-2 block">
                      {project.category}
                    </span>
                    <h2 className={`text-2xl font-bold mb-3 ${textPrimary}`}>{project.title}</h2>
                    <p className={`text-sm ${textSecondary}`}>{project.desc}</p>
                    
                    <button className="mt-4 flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-sm group-hover:underline">
                      View Case Study
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              </ShimmerBorderCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}