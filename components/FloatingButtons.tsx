"use client";

import React, {JSX, useEffect, useState } from "react";
import { Phone, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { usePathname } from "next/navigation";

type Preset = {
  id: string;
  title: string;
  message: string;
};

const WHATSAPP_NUMBER = "+919835504582";
const PHONE_NUMBER = "+919835504582";

const presets: Preset[] = [
  { id: "web-app", title: "Web & App Dev", message: "Hello! I'm interested in Web & App Development. Can we discuss scope and pricing?" },
  { id: "web-design", title: "Web Design", message: "Hi — I'd like a modern website design (UI/UX). Can you share packages?" },
  { id: "video-editing", title: "Video Editing", message: "Hello — I need video editing for marketing/social. Can you share examples?" },
  { id: "seo", title: "SEO", message: "Hi — I'm interested in SEO services for organic growth. Can we discuss strategy?" },
  { id: "designing", title: "Designing", message: "Hello — I need branding & design assets (logo, guidelines). Can you help with a quote?" },
  { id: "digital-marketing", title: "Digital Marketing", message: "Hi — I want digital marketing (ads, funnel, growth). Can you share packages?" },
  { id: "gmb", title: "GMB", message: "Hello — I need Google My Business optimization & local SEO." }
];

export default function FloatingButtons(): JSX.Element | null {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const isStudentPage =
    typeof pathname === "string" && pathname.startsWith("/student");

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!isMounted || isStudentPage) return null;

  const openWhatsApp = (message: string) => {
    const encoded = encodeURIComponent(message);
    const number = WHATSAPP_NUMBER.replace(/\+/g, "");
    window.open(`https://wa.me/${number}?text=${encoded}`, "_blank");
    setIsOpen(false);
  };

  const makePhoneCall = () => {
    window.location.href = `tel:${PHONE_NUMBER}`;
  };

  return (
    <>
      {/* MAIN FLOATING AREA */}
      <div className="fixed right-6 bottom-6 z-50 flex flex-col items-end gap-4">

        {/* DESKTOP POPUP */}
        {isOpen && (
          <div className="hidden md:block w-80 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-gray-200 dark:border-zinc-800 p-3 animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-500 text-white shadow-md shadow-green-500/20">
                  <FaWhatsapp className="w-5 h-5" />
                </div>

                <div>
                  <div className="text-sm font-semibold dark:text-white">Zoga — Quick Chat</div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">
                    Choose a topic to start
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-200 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {presets.map((p) => (
                <button
                  key={p.id}
                  onClick={() => openWhatsApp(p.message)}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
                >
                  <div className="text-sm font-medium dark:text-white">{p.title}</div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2">
                    {p.message}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* FLOATING BUTTONS */}
        <div className="flex flex-col items-end gap-3">

          {/* WHATSAPP BUTTON — NOW ABOVE */}
          <button
            onClick={() => setIsOpen((s) => !s)}
            className="w-14 h-14 rounded-full flex items-center justify-center
              bg-gradient-to-br from-green-500 to-emerald-600 
              text-white 
              shadow-lg shadow-green-500/25 dark:shadow-green-900/40
              hover:scale-[1.05]
              transition-transform"
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <FaWhatsapp className="w-7 h-7" />
            )}
          </button>

          {/* PHONE BUTTON */}
          <button
            onClick={makePhoneCall}
            className="w-14 h-14 rounded-full flex items-center justify-center 
              bg-gradient-to-br from-blue-500 to-indigo-600
              text-white
              shadow-lg shadow-blue-500/25 dark:shadow-blue-900/40
              hover:scale-[1.05]
              transition-transform"
          >
            <Phone className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* MOBILE SHEET */}
      {isOpen && (
        <div className="fixed inset-x-0 bottom-0 z-50 md:hidden">
          <div className="bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 rounded-t-2xl shadow-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg shadow-green-500/30 dark:shadow-green-900/40">
                  <FaWhatsapp className="w-8 h-8" />
                </div>

                <div>
                  <div className="text-sm font-semibold dark:text-white">Start Chat</div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">Select topic</div>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-zinc-500 dark:text-zinc-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {presets.map((p) => (
                <button
                  key={p.id}
                  onClick={() => openWhatsApp(p.message)}
                  className="w-full px-4 py-3 rounded-lg bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition"
                >
                  <div className="text-sm font-medium dark:text-white">{p.title}</div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">{p.message}</div>
                </button>
              ))}
            </div>
          </div>

          {/* BACKDROP */}
          <div
            className="fixed inset-0 bg-black/35 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
        </div>
      )}
    </>
  );
}
