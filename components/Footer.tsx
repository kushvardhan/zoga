"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

const Footer = () => (
  <footer
    className="
    bg-white 
    dark:bg-[#020205] 
    text-slate-700 
    dark:text-white
    pt-16 pb-8 
    border-t 
    border-slate-200 
    dark:border-white/10
  "
  >
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
        {/* LOGO + DESC */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-5">
            <div className="relative w-34 h-34 rounded-full overflow-hidden">
              <img
                src="/logo.png"
                alt="Avioni Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-5 max-w-md">
            We turn ideas into visuals, code & experiences. From Ranchi to the
            entire world — creative, fast & reliable. 🚀
          </p>

          {/* CONTACT */}
          <div className="space-y-3 text-slate-600 dark:text-slate-400">
            <a
              className="flex items-center gap-2 hover:text-purple-500 dark:hover:text-purple-400 transition"
              href="mailto:hello@Avioni.agency"
            >
              <Mail size={16} /> hello@Avioni.agency
            </a>

            <a
              className="flex items-center gap-2 hover:text-blue-500 dark:hover:text-blue-400 transition"
              href="tel:+919876543210"
            >
              <Phone size={16} /> +91 98765 43210
            </a>

            <p className="flex items-center gap-2">
              <MapPin size={16} /> Ranchi, Jharkhand, India
            </p>
          </div>

          {/* SOCIALS */}
          <div className="flex gap-3 mt-6">
            {socialIcons.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-slate-100 dark:bg-white/5 rounded-full border border-slate-200 dark:border-white/10 hover:scale-105 transition-all"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>

        {/* SERVICES */}
        <FooterColumn
          title="Services"
          items={[
            "Web Development",
            "App Development",
            "UI/UX Design",
            "SEO & Marketing",
            "Video Production",
            "Content Writing",
            "Branding",
          ]}
        />

        {/* MORE SERVICES */}
        <FooterColumn
          title="More Services"
          items={[
            "Google Ads",
            "Social Media Ads",
            "E-Commerce Setup",
            "Email Marketing",
            "GMB Optimization",
            "Chatbot Integration",
            "Cloud Hosting",
          ]}
        />

        {/* COMPANY */}
        <div>
          <h4 className="font-semibold text-lg mb-5">Company</h4>
          <ul className="space-y-3 text-slate-500 dark:text-slate-400 text-sm">
            <li>
              <Link className="hover:text-purple-500 transition" href="/about">
                About Us
              </Link>
            </li>
            <li>
              <Link className="hover:text-purple-500 transition" href="/work">
                Our Work
              </Link>
            </li>
            <li>
              <Link className="hover:text-purple-500 transition" href="/why-us">
                Why Choose Us
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-purple-500 transition"
                href="/#contact"
              >
                Contact
              </Link>
            </li>
          </ul>

          <h4 className="font-semibold text-lg mt-8 mb-3">We Serve</h4>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
            Across India — Delhi, Mumbai, Bangalore, Kolkata, Hyderabad & 500+
            cities.
          </p>
        </div>
      </div>

      {/* BOTTOM */}
      <div
        className="
        pt-6 
        border-t border-slate-200 
        dark:border-white/10
        flex flex-col md:flex-row 
        justify-between items-center 
        gap-4 text-sm 
        text-slate-500 dark:text-slate-400
      "
      >
        <p>© 2025 Avioni Digital Agency. All rights reserved.</p><strong>Design and developed By <i><a href="rowhit.in">rowhit</a></i></strong>
        {/* <p className="flex items-center gap-1">
          Crafted with <span className="text-red-500">❤️</span> in Ranchi, India
          🇮🇳
        </p> */}
      </div>
    </div>
  </footer>
);

const FooterColumn = ({ title, items }: { title: string; items: string[] }) => (
  <div>
    <h4 className="font-semibold text-lg mb-5">{title}</h4>
    <ul className="space-y-3 text-slate-500 dark:text-slate-400 text-sm">
      {items.map((item, i) => (
        <li key={i}>
          <Link className="hover:text-purple-500 transition" href="/service">
            {item}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const socialIcons = [
  {
    href: "https://twitter.com",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231z" />
      </svg>
    ),
  },
  {
    href: "https://instagram.com",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm5 5.3A4.7 4.7 0 1112 17.7a4.7 4.7 0 010-9.4zm6.2-2a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
      </svg>
    ),
  },
  {
    href: "https://linkedin.com",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4.98 3.5C4.98 5 3.9 6 2.5 6S0 5 0 3.5 1.1 1 2.5 1s2.48 1 2.48 2.5zM0 8h5v16H0V8zm7.5 0h4.7v2.3h.1C13 8.9 15 8 17.2 8c5 0 5.8 3.3 5.8 7.7V24h-5V16.2c0-1.9 0-4.2-2.6-4.2-2.6 0-3 2-3 4V24h-5V8z" />
      </svg>
    ),
  },
  {
    href: "https://facebook.com",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 12a10 10 0 10-11.6 9.9v-7H7v-3h3.4V9.5c0-3.3 2-5.1 5-5.1 1.4 0 2.8.2 2.8.2v3H16c-1.6 0-2.1 1-2.1 2V12H19l-.5 3h-3.6v7A10 10 0 0022 12" />
      </svg>
    ),
  },
];

export default Footer;
