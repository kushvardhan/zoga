import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export default function FooterSmall() {
  return (
    <footer className="bg-zinc-100 dark:bg-black border-t border-zinc-200 dark:border-zinc-800 py-16 mt-32">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Column 1 */}
        <div>
          <h2 className="text-2xl font-black mb-3">
            <span className="text-purple-500">Zoga</span> Studios
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400">
            Premium digital agency for Web, App, Video, SEO & Branding.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4 mt-5">
            {[Instagram, Linkedin, Twitter, Facebook].map((Icon, i) => (
              <Link
                key={i}
                href="#"
                className="p-2 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-200/40 dark:hover:bg-zinc-800/40 transition"
              >
                <Icon size={18} />
              </Link>
            ))}
          </div>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="font-bold text-zinc-800 dark:text-zinc-200 mb-3">
            Company
          </h3>
          <div className="flex flex-col gap-2 text-zinc-500 dark:text-zinc-400">
            <Link href="/about">About</Link>
            <Link href="/service">Services</Link>
            <Link href="/work">Work</Link>
            <Link href="mailto:support@zoga.studio">Contact</Link>
          </div>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="font-bold text-zinc-800 dark:text-zinc-200 mb-3">
            Services
          </h3>
          <div className="flex flex-col gap-2 text-zinc-500 dark:text-zinc-400">
            <span>Web Development</span>
            <span>Web Design</span>
            <span>Video Editing</span>
            <span>SEO & GMB</span>
            <span>Digital Marketing</span>
          </div>
        </div>

        {/* Column 4 */}
        <div>
          <h3 className="font-bold text-zinc-800 dark:text-zinc-200 mb-3">
            Contact
          </h3>
          <p className="text-zinc-500 dark:text-zinc-400">
            support@zoga.studio
            <br />
            +91 98765 43210
          </p>
        </div>
      </div>

      <div className="text-center text-zinc-500 dark:text-zinc-500 mt-12">
        © {new Date().getFullYear()} Zoga. All rights reserved.
      </div>
    </footer>
  );
}
