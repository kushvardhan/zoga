"use client";

import type { ServiceData, ServiceId, VisualComponent } from "@/lib/type";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import {
  Aperture,
  Code,
  Film,
  Layout,
  Mail,
  MapPin,
  Menu,
  MessageSquare,
  Send,
  Target,
  Terminal,
  TrendingUp,
  User,
  X,
  Zap,
} from "lucide-react";
import React, {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  ReactNode,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";

import worldMapDark from "@/public/worldMapDark.png";
import worldMapLight from "@/public/worldMapLight.png";

const SERVICES_DATA: ServiceData[] = [
  {
    id: "webdev",
    title: "Web & App Development",
    subtitle: "Dynamic Code Holograms & Staged Scroll Narrative.",
    copy: "We don't just write code; we architect resilient digital ecosystems. Leveraging Next.js and serverless cloud infrastructure, your application will handle any scale with zero latency. This is engineering as an art form.",
    color: "cyan",
    icon: Code,
    deliverables: [
      "Custom Next.js Stack",
      "Global CDN Deployment",
      "CI/CD Pipelines",
      "Enterprise-Grade Security",
    ],
    trust: "99.99% Uptime Guarantee. SOC 2 Compliant Architectures.",
    accent: "indigo", // Secondary accent color
  },
  {
    id: "webdesign",
    title: "Web Design & Experience",
    subtitle: "Neon Grids, Morphing Shapes, and Iridescent Layouts.",
    copy: "Beyond aesthetics, we craft intuitive digital blueprints. Our design systems focus on conversion rate optimization (CRO) and accessibility, ensuring every pixel works towards your business goal. Beautiful interfaces that perform.",
    color: "fuchsia",
    icon: Layout,
    deliverables: [
      "Atomic Design System",
      "High-Fidelity Prototypes",
      "User Journey Mapping",
      "A/B Tested Layouts",
    ],
    trust: "Award-Winning UX/UI Portfolio. 100% Client Satisfaction Rate.",
    accent: "purple",
  },
  {
    id: "video",
    title: "Cinematic Video Editing",
    subtitle: "Timeline Visualizer, Cinematic Reel Effects, and Glow Frames.",
    copy: "Transform raw footage into high-impact visual narratives. We utilize advanced color grading, sound design, and motion graphics to produce content that captivates audiences and elevates brand perception.",
    color: "red",
    icon: Film,
    deliverables: [
      "4K/8K Mastering",
      "Dolby Atmos Sound Mix",
      "Advanced Motion Tracking",
      "Full Rights & Royalty-Free Assets",
    ],
    trust: "Industry Certified Editors. Fast 48-Hour Turnaround Options.",
    accent: "orange",
  },
  {
    id: "seo",
    title: "SEO & Organic Growth",
    subtitle:
      "Animated Charts, Rank Growth Curves, and SERP Highlight Visuals.",
    copy: "We build durable authority. Our strategies integrate predictive keyword modeling and advanced link-building to secure dominant positions in the search results, guaranteeing sustainable, non-paid traffic.",
    color: "lime",
    icon: TrendingUp,
    deliverables: [
      "Authority Link Building",
      "Technical SEO Audit",
      "Content Strategy & Gaps",
      "Monthly Performance Modeling",
    ],
    trust: "Clients have achieved 10x organic traffic in 12 months.",
    accent: "emerald",
  },
  {
    id: "branding",
    title: "Designing & Identity",
    subtitle: "Color Blobs, Shape Morphs, and Identity Reveal Animations.",
    copy: "Your brand is not a logo—it’s a commitment. We engineer comprehensive identity systems that define your voice, vision, and visual presence, ensuring perfect recognition across all touchpoints.",
    color: "orange",
    icon: Zap,
    deliverables: [
      "Full Brand Guideline Deck",
      "Tone of Voice Strategy",
      "Visual Asset Library",
      "Mascot/Iconography Design",
    ],
    trust: "Proven track record defining Fortune 500 company identities.",
    accent: "red",
  },
  {
    id: "marketing",
    title: "Digital Marketing Strategy",
    subtitle: "Growth Arrows, Spark Trails, and Dynamic Analytics Bars.",
    copy: "Precision campaigns across paid media, social channels, and email automation. Our approach is data-driven, focusing only on verifiable ROI and audience segmentation for hyper-targeted engagement.",
    color: "amber",
    icon: Target,
    deliverables: [
      "Full Media Buying Strategy",
      "A/B Test Funnel Setup",
      "Proprietary Analytics Dashboard",
      "Monthly Performance Forecasts",
    ],
    trust: "Managed $50M+ in ad spend with an average 4x ROAS.",
    accent: "pink",
  },
  {
    id: "gmb",
    title: "Google My Business Mastery",
    subtitle: "Glowing Map, Local Highlight Pulses, and Trust Badges.",
    copy: "Dominate local search. We optimize your GMB profile for maximum local visibility, managing reviews, posts, and accurate data to ensure your business is the immediate, trusted choice in your service area.",
    color: "teal",
    icon: MapPin,
    deliverables: [
      "Geo-Targeted Content",
      "Review Generation Strategy",
      "Local Citation Cleanup",
      "GMB Posting Schedule",
    ],
    trust: "Top 3 local ranking achieved for 95% of clients.",
    accent: "blue",
  },
];

// --- Global Utilities ---

// Define custom Tailwind-like classes for dynamic use
const textPrimary = "text-white";
const accentGradient =
  "bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-500";

// Function to handle magnetic hover effect
const useMagnetic = (
  ref: RefObject<HTMLElement | null>,
  strength: number = 0.2
) => {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: globalThis.MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = el.getBoundingClientRect();

      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const deltaX = (clientX - centerX) * strength;
      const deltaY = (clientY - centerY) * strength;

      el.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    };

    const handleMouseLeave = () => {
      el.style.transform = `translate(0px, 0px)`;
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref, strength]);
};

// Component for a cinematic title with glow
interface CinematicTitleProps {
  children: React.ReactNode;
  colorClass: string;
}

const CinematicTitle: React.FC<CinematicTitleProps> = ({
  children,
  colorClass,
}) => (
  <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white uppercase text-center mb-4 transition-all duration-500">
    <span
      className={`text-${colorClass}-400 drop-shadow-[0_0_15px_rgba(var(--color-${colorClass}-400-rgb),0.5)]`}
    >
      {children}
    </span>
  </h2>
);

// Component for a Service Block (The "Visual World")

type ColorKey =
  | "cyan"
  | "fuchsia"
  | "red"
  | "lime"
  | "orange"
  | "amber"
  | "teal"
  | "indigo"
  | "purple"
  | "emerald"
  | "blue";

type AccentKey = ColorKey | "pink";

interface ServiceBlockProps {
  data: ServiceData;
  children: ReactNode;
}

const ServiceBlock = ({ data, children }: ServiceBlockProps) => {
  const magneticButtonRef = useRef<HTMLButtonElement>(null);

  const colorRgbMap: Record<ColorKey, string> = {
    cyan: "6, 182, 212",
    fuchsia: "232, 121, 220",
    red: "239, 68, 68",
    lime: "132, 204, 22",
    orange: "249, 115, 22",
    amber: "251, 191, 36",
    teal: "20, 184, 166",
    indigo: "99, 102, 241",
    purple: "168, 85, 247",
    emerald: "16, 185, 129",
    blue: "59, 130, 246",
  };

  const accentRgbMap: Record<AccentKey, string> = {
    cyan: "6, 182, 212",
    fuchsia: "232, 121, 220",
    red: "239, 68, 68",
    lime: "132, 204, 22",
    orange: "249, 115, 22",
    amber: "251, 191, 36",
    teal: "20, 184, 166",
    indigo: "99, 102, 241",
    purple: "168, 85, 247",
    emerald: "16, 185, 129",
    blue: "59, 130, 246",
    pink: "236, 72, 153",
  };

  const colorRgb = colorRgbMap[data.color];
  const accentRgb = accentRgbMap[data.accent];

  useEffect(() => {
    document.documentElement.style.setProperty(
      `--color-${data.color}-400-rgb`,
      colorRgb
    );
    document.documentElement.style.setProperty(
      `--color-${data.accent}-400-rgb`,
      accentRgb
    );
  }, [data.color, data.accent, colorRgb, accentRgb]);

  return (
    <section
      id={data.id}
      className={`relative py-32 md:py-48 px-4 overflow-hidden min-h-screen flex flex-col justify-center transition-all duration-1000`}
    >
      <div
        className={`absolute inset-0 opacity-10 transition-opacity duration-1000 
                    bg-linear-to-br from-${data.color}-900/50 to-transparent`}
      >
        <div
          className={`absolute w-[400px] h-[400px] rounded-full filter blur-3xl opacity-30 
                      bg-${data.color}-500/20 animate-blob top-1/4 left-[10%]`}
        ></div>

        <div
          className={`absolute w-[300px] h-[300px] rounded-full filter blur-3xl opacity-20 
                      bg-${data.accent}-500/30 animate-blob animation-delay-4000 bottom-[10%] right-[10%]`}
        ></div>
      </div>

      <div className="relative max-w-6xl mx-auto z-10 w-full">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
            <CinematicTitle colorClass={data.color}>
              {data.title}
            </CinematicTitle>

            <h3 className={`text-xl font-medium text-${data.accent}-300`}>
              {data.subtitle}
            </h3>

            <p className="text-gray-300 text-lg leading-relaxed max-w-lg lg:max-w-none mx-auto">
              {data.copy}
            </p>

            <div className="mt-8 pt-4 border-t border-gray-800">
              <h4 className="text-white font-semibold mb-3 text-lg">
                What You Get:
              </h4>

              <ul className="grid grid-cols-2 gap-2 text-gray-400 text-sm list-none p-0">
                {data.deliverables.map((item: string, index: number) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className={`text-${data.color}-500`}>&mdash;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <p
                className={`text-base font-bold text-${data.color}-400 bg-gray-900/50 p-3 rounded-lg border border-${data.accent}-700/50`}
              >
                TRUST FACTOR: {data.trust}
              </p>
            </div>

            <button
              className={`mt-8 py-3 px-8 text-lg font-semibold rounded-full bg-${data.color}-600 text-black shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.03] magnetic-target`}
              ref={magneticButtonRef}
              onClick={() => console.log(`Inquiry for ${data.title}`)}
            >
              Launch Project
            </button>
          </div>

          <div className="lg:w-1/2 w-full h-96 flex items-center justify-center relative">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

interface FormFields {
  name: string;
  email: string;
  message: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormFields>({
    name: "",
    email: "",
    message: "",
  });

  const [isSending, setIsSending] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);
    setMessage("");

    setTimeout(() => {
      console.log("Form Submitted:", formData);
      setMessage(
        "Thank you! Your inquiry has been received. We will respond within 24 hours."
      );
      setFormData({ name: "", email: "", message: "" });
      setIsSending(false);
    }, 1500);
  };

  return (
    <div
      className="
        bg-white dark:bg-gray-900 
        p-6 sm:p-10 lg:p-12 
        rounded-2xl 
        shadow-xl 
        ring-1 ring-gray-200 dark:ring-gray-700 
        max-w-3xl lg:max-w-4xl 
        mx-auto 
        transition-all duration-500
      "
    >
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-3 flex items-center">
        <Send className="w-6 h-6 sm:w-7 sm:h-7 mr-3 text-sky-500" />
        Start Your Project
      </h2>

      <p className="text-gray-600 dark:text-gray-400 mb-8 text-sm sm:text-base leading-relaxed">
        Ready to collaborate? Fill out the form below and tell us about your
        vision.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7">
        {/* Full Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="
                w-full pl-11 pr-4 py-3 
                border border-gray-300 dark:border-gray-700 
                rounded-xl 
                bg-gray-50 dark:bg-gray-800 
                text-gray-900 dark:text-white 
                focus:ring-2 focus:ring-sky-500 focus:border-sky-500
                transition-all duration-300
              "
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="
                w-full pl-11 pr-4 py-3 
                border border-gray-300 dark:border-gray-700 
                rounded-xl 
                bg-gray-50 dark:bg-gray-800 
                text-gray-900 dark:text-white 
                focus:ring-2 focus:ring-sky-500 focus:border-sky-500
                transition-all duration-300
              "
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Project Details
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
            <textarea
              name="message"
              id="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
              className="
                w-full pl-11 pr-4 py-3 
                border border-gray-300 dark:border-gray-700 
                rounded-xl 
                bg-gray-50 dark:bg-gray-800 
                text-gray-900 dark:text-white 
                focus:ring-2 focus:ring-sky-500 focus:border-sky-500
                transition-all duration-300
              "
            ></textarea>
          </div>
        </div>

        {/* Success Message */}
        {message && (
          <p
            className="
              p-3 rounded-xl text-sm font-semibold 
              text-emerald-700 bg-emerald-100 
              dark:bg-emerald-900 dark:text-emerald-300 
              animate-fadeIn
            "
          >
            {message}
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSending}
          className={`
            w-full flex items-center justify-center 
            px-6 py-3 
            text-base font-medium 
            rounded-xl 
            shadow-lg 
            text-white 
            transition-all duration-300 transform
            ${
              isSending
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-sky-600 hover:bg-sky-700 hover:scale-[1.01] focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            }
          `}
        >
          {isSending ? (
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              Send Inquiry
            </>
          )}
        </button>
      </form>
    </div>
  );
};

// --- Unique Visual Worlds for Each Service ---

interface WebDesignProps {
  color: string;
  accent: string;
}

const WebDesignVisual = ({ color, accent }: WebDesignProps) => {
  const [hoverColor, setHoverColor] = useState("gray");
  const [themeColor, setThemeColor] = useState(accent);

  // Palette (pure colors)
  const colors = [
    "#3b82f6", // blue
    "#10b981", // green
    "#f97316", // orange
    "#a855f7", // purple
    "#ef4444", // red
    "#f59e0b", // amber
  ];

  // When selecting a swatch
  const applyTheme = (c: string) => {
    setThemeColor(c);
    setHoverColor(c);
  };

  return (
    <div
      className="relative w-full h-full p-6 rounded-2xl flex items-center justify-center overflow-hidden transition-all duration-300"
      style={{
        border: `2px solid ${themeColor}`,
      }}
    >
      {/* Central Canvas */}
      <div
        className="w-64 h-64 rounded-lg shadow-2xl transition-all duration-300"
        style={{
          backgroundColor: hoverColor === "gray" ? "#1f2937" : hoverColor,
        }}
      >
        <Aperture
          className="absolute top-1/2 left-1/2 w-16 h-16"
          style={{
            transform: "translate(-50%, -50%)",
            color: themeColor,
            opacity: 0.7,
          }}
        />
      </div>

      {/* Color Palette */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <h4 className="text-sm font-semibold" style={{ color: themeColor }}>
          Palette:
        </h4>

        {colors.map((c, i) => (
          <div
            key={i}
            className="w-6 h-6 rounded-full cursor-pointer border-2 border-transparent hover:scale-125 transition-all duration-200"
            style={{ backgroundColor: c }}
            onMouseEnter={() => setHoverColor(c)}
            onMouseLeave={() => setHoverColor("gray")}
            onClick={() => applyTheme(c)}
          />
        ))}
      </div>

      {/* Gradient Background */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none animate-pulse-light"
        style={{
          background: `linear-gradient(to top right, ${themeColor}40, ${hoverColor}40)`,
        }}
      ></div>
    </div>
  );
};

// 3. Cinematic Video Editing (Draggable Timeline)

interface VisualProps {
  color: keyof typeof colorMap;
  accent: keyof typeof accentMap;
}

const colorMap = {
  cyan: "#22d3ee",
  fuchsia: "#e879f9",
  red: "#f87171",
  lime: "#a3e635",
  orange: "#fb923c",
  amber: "#fbbf24",
  teal: "#2dd4bf",
} as const;

const accentMap = {
  indigo: "#312e81",
  purple: "#a21caf",
  orange: "#fb923c",
  emerald: "#065f46",
  red: "#b91c1c",
  pink: "#ec4899",
  blue: "#3b82f6",
} as const;

interface TrackClip {
  id: string;
  label: string;
  width: number; // percentage of timeline
  color: string;
}

export const VideoVisual = ({ color, accent }: VisualProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  const [clips, setClips] = useState<{
    audio: TrackClip[];
    video: TrackClip[];
    fx: TrackClip[];
  }>({
    audio: [
      {
        id: "music",
        label: "Music Score",
        width: 40,
        color: accentMap[accent],
      },
      {
        id: "vo",
        label: "VO Track",
        width: 25,
        color: accentMap[accent] + "aa",
      },
    ],
    video: [
      { id: "clipA", label: "Clip A (4K)", width: 33, color: colorMap[color] },
      {
        id: "clipB",
        label: "Clip B (Graded)",
        width: 33,
        color: colorMap[color] + "cc",
      },
    ],
    fx: [
      { id: "motion", label: "Motion FX", width: 20, color: "#facc15aa" },
      { id: "title", label: "Title Card", width: 15, color: "#ec4899aa" },
    ],
  });

  const [hoverClip, setHoverClip] = useState<TrackClip | null>(null);

  // Generate spark particles
  const [particles, setParticles] = useState<
    { x: number; y: number; duration: number }[]
  >([]);
  useEffect(() => {
    const generated = Array.from({ length: 20 }).map(() => ({
      x: Math.random() * 400 - 200,
      y: Math.random() * 200 - 100,
      duration: 3 + Math.random() * 2,
    }));
    // defer state update to next tick to avoid synchronous setState in effect
    const t = setTimeout(() => setParticles(generated), 0);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-80 md:h-96 lg:h-[28rem] bg-gray-900 dark:bg-gray-50 rounded-2xl shadow-2xl overflow-hidden p-4 flex flex-col"
    >
      {/* Playhead */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white/80 z-20 shadow-lg" />

      {/* Spark Particles */}
      {particles.map((p, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0, 1.2, 0],
            x: p.x,
            y: p.y,
          }}
          transition={{
            repeat: Infinity,
            duration: p.duration,
            ease: "easeInOut",
          }}
          className="absolute w-2 h-2 rounded-full bg-white/60"
        />
      ))}

      {/* Timeline Tracks */}
      <motion.div
        ref={timelineRef}
        className="flex flex-col h-full gap-1 cursor-grab active:cursor-grabbing select-none"
        style={{ x }}
        drag="x"
        dragConstraints={containerRef}
        dragElastic={0.1}
      >
        {/* Track Renderer */}
        {(["audio", "video", "fx"] as const).map((trackType) => (
          <div
            key={trackType}
            className="flex items-center gap-2 h-1/3 px-1"
            style={{ background: "rgba(55,55,55,0.8)", borderRadius: "0.5rem" }}
          >
            {clips[trackType].map((clip) => (
              <motion.div
                key={clip.id}
                className="rounded-sm shadow-md flex items-center justify-center text-xs text-white p-1 cursor-pointer relative"
                style={{ width: `${clip.width}%`, background: clip.color }}
                onMouseEnter={() => setHoverClip(clip)}
                onMouseLeave={() => setHoverClip(null)}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 15px rgba(255,255,255,0.6)",
                }}
              >
                {clip.label}
                {hoverClip?.id === clip.id && (
                  <div className="absolute top-[-2rem] left-1/2 transform -translate-x-1/2 p-2 text-xs bg-gray-800 text-white rounded-lg shadow-xl">
                    {clip.label} ({clip.width}% of timeline)
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        ))}
      </motion.div>

      {/* Hint */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-white/50 animate-pulse">
        Drag the timeline & hover clips
      </div>
    </div>
  );
};

// 4. SEO (Interactive Growth Chart)
type ColorKeySeo =
  | "cyan"
  | "fuchsia"
  | "red"
  | "lime"
  | "orange"
  | "amber"
  | "teal";
type AccentKeySeo =
  | "red"
  | "orange"
  | "blue"
  | "indigo"
  | "pink"
  | "purple"
  | "emerald";

interface VisualProps {
  color: ColorKeySeo;
  accent: AccentKeySeo;
}

interface HoverData {
  value: number;
  x: number;
  y: number;
}

export const SeoVisual = ({ color, accent }: VisualProps) => {
  const [hoverData, setHoverData] = useState<HoverData | null>(null);
  const dataPoints: number[] = [80, 60, 70, 40, 50, 20, 30, 10];

  const getCoordinates = (index: number, value: number) => {
    const x = (index / (dataPoints.length - 1)) * 100;
    const y = 80 - value * 0.7;
    return { x, y };
  };

  const polylinePoints = dataPoints
    .map((v, i) => {
      const { x, y } = getCoordinates(i, v);
      return `${x},${y}`;
    })
    .join(" ");

  const areaPath = `M 0 80 L ${polylinePoints} L 100 80 Z`;

  const handleMouseMove = (e: MouseEvent<SVGSVGElement>) => {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;

    const step = rect.width / (dataPoints.length - 1);
    const nearestIndex = Math.round(x / step);

    if (nearestIndex >= 0 && nearestIndex < dataPoints.length) {
      const point = getCoordinates(nearestIndex, dataPoints[nearestIndex]);
      setHoverData({
        value: dataPoints[nearestIndex] + 50,
        x: (point.x / 100) * rect.width,
        y: (point.y / 100) * rect.height,
      });
    } else {
      setHoverData(null);
    }
  };

  return (
    <div
      className={`relative w-full h-full bg-gray-950 border border-${color}-600/80 
                  rounded-2xl p-6 overflow-hidden shadow-2xl`}
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 100 80"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoverData(null)}
      >
        <defs>
          <linearGradient
            id="seoGradientMulti"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop
              offset="0%"
              stopOpacity="0.8"
              className={`stop-color-${color}-400`}
            />
            <stop
              offset="100%"
              stopOpacity="0.1"
              className={`stop-color-${accent}-900`}
            />
          </linearGradient>
        </defs>

        {[20, 40, 60].map((y: number) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="100"
            y2={y}
            stroke="gray"
            strokeOpacity="0.2"
            strokeDasharray="2"
          />
        ))}

        <path d={areaPath} fill="url(#seoGradientMulti)" />

        <polyline
          points={polylinePoints}
          fill="none"
          stroke={`var(--color-${color}-400)`}
          strokeWidth="2"
          className="animate-draw-line"
          style={{ strokeDasharray: "200", strokeDashoffset: "200" }}
        />

        {dataPoints.map((v: number, i: number) => {
          const { x, y } = getCoordinates(i, v);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="1.5"
              className={`fill-${accent}-400 shadow-[0_0_5px_var(--color-${accent}-400)] 
                          transition-all duration-300 hover:r-3`}
            />
          );
        })}

        <TrendingUp
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                      w-16 h-16 text-${accent}-400/20 z-10`}
        />
      </svg>

      {hoverData && (
        <div
          className="absolute p-2 bg-gray-800 rounded-lg shadow-xl pointer-events-none"
          style={{ left: hoverData.x + 10, top: hoverData.y - 40 }}
        >
          <span className={`text-sm font-bold text-${color}-400`}>
            Rank: {hoverData.value}
          </span>
        </div>
      )}

      <div
        className={`absolute top-4 right-4 text-3xl font-bold text-${color}-400`}
      >
        +310%
      </div>
    </div>
  );
};

interface BrandingVisualProps {
  color: keyof typeof brandingColorMap;
  accent: keyof typeof brandingAccentMap;
}

// Branding color maps
const brandingColorMap = {
  cyan: "#22d3ee",
  fuchsia: "#e879f9",
  red: "#f87171",
  lime: "#a3e635",
  orange: "#fb923c",
  amber: "#fbbf24",
  teal: "#2dd4bf",
} as const;

const brandingAccentMap = {
  indigo: "#312e81",
  purple: "#a21caf",
  orange: "#fb923c",
  emerald: "#065f46",
  red: "#b91c1c",
  pink: "#ec4899",
  blue: "#3b82f6",
} as const;

export const BrandingVisual = ({ color, accent }: BrandingVisualProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState<string>(
    brandingAccentMap[accent]
  );
  const [brushSize, setBrushSize] = useState<number>(4);
  const [idle, setIdle] = useState(true);
  const idleTimeout = useRef<NodeJS.Timeout | null>(null);

  // Draw dominant ZOGA watermark
  const drawWatermark = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    ctx.save();

    ctx.lineWidth = 5;
    ctx.font = `bold ${Math.min(width, height) / 5}px "Poppins", sans-serif`; // larger bold font
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#a21caf"); // purple
    gradient.addColorStop(1, "#3b82f6"); // blue
    ctx.fillStyle = gradient;

    ctx.shadowColor = idle ? "#a21caf" : "transparent";
    ctx.shadowBlur = idle ? 60 : 0; // stronger glow
    ctx.globalAlpha = idle ? 0.12 : 0.05; // more visible when idle

    ctx.fillText("ZOGA", width / 2, height / 2);
    ctx.restore();
  };

  // Setup & resize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const temp = ctx.getImageData(0, 0, canvas.width, canvas.height);
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      ctx.putImageData(temp, 0, 0);
      drawWatermark(ctx, canvas.width, canvas.height);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [color, idle]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setDrawing(true);
    setIdle(false);
    if (idleTimeout.current) clearTimeout(idleTimeout.current);
    draw(e);
  };

  const endDrawing = () => {
    setDrawing(false);
    idleTimeout.current = setTimeout(() => setIdle(true), 6000); // 6s idle glow
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.fillStyle = brushColor;
    ctx.beginPath();
    ctx.arc(x, y, brushSize, 0, Math.PI * 2);
    ctx.fill();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawWatermark(ctx, canvas.width, canvas.height);
  };

  return (
    <div className="relative w-full h-96 md:h-[28rem] lg:h-[32rem] rounded-2xl bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-start overflow-hidden shadow-2xl p-4 transition-colors duration-500">
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full rounded-xl border border-gray-400 dark:border-gray-600 cursor-crosshair"
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseMove={draw}
        onMouseLeave={endDrawing}
      />

      {/* Toolbar */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-2 transition-colors duration-500">
        {Object.values(brandingAccentMap).map((c) => (
          <button
            key={c}
            onClick={() => setBrushColor(c)}
            style={{ backgroundColor: c }}
            className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-900 shadow-sm"
          />
        ))}
        <input
          type="range"
          min={1}
          max={20}
          value={brushSize}
          onChange={(e) => setBrushSize(Number(e.target.value))}
          className="w-24"
        />
        <button
          onClick={clearCanvas}
          className="bg-red-500 text-white px-2 py-1 rounded-lg shadow hover:bg-red-600 transition"
        >
          Clear
        </button>
      </div>

      {/* Instruction */}
      <div className="absolute bottom-2 text-sm text-gray-500 dark:text-gray-300">
        Draw, design, and explore your brand
      </div>
    </div>
  );
};

// 6. Digital Marketing (Interactive Funnel & Spark Trails)

interface FunnelStage {
  name: string;
  count: number;
  color: string;
}

interface MarketingVisualProps {
  color: keyof typeof marketingColorMap;
  accent: keyof typeof marketingAccentMap;
}

// Unique color maps for marketing visual
const marketingColorMap = {
  cyan: "#22d3ee",
  fuchsia: "#e879f9",
  red: "#f87171",
  lime: "#a3e635",
  orange: "#fb923c",
  amber: "#fbbf24",
  teal: "#2dd4bf",
} as const;

const marketingAccentMap = {
  indigo: "#312e81",
  purple: "#a21caf",
  orange: "#fb923c",
  emerald: "#065f46",
  red: "#b91c1c",
  pink: "#ec4899",
  blue: "#3b82f6",
} as const;

export const MarketingVisual = ({ color, accent }: MarketingVisualProps) => {
  const [hoverStage, setHoverStage] = useState<FunnelStage | null>(null);

  const [particlePositions, setParticlePositions] = useState<
    { x: number; y: number; duration: number }[]
  >([]);

  // Generate random positions only on the client (memoized to satisfy hook deps)
  useEffect(() => {
    const positions = Array.from({ length: 15 }).map(() => ({
      x: Math.random() * 400 - 200,
      y: Math.random() * 200 - 100,
      duration: 3 + Math.random() * 2,
    }));

     
    setTimeout(() => {
      setParticlePositions(positions);
    }, 0);
  }, []);

  const funnelStages: FunnelStage[] = [
    { name: "Awareness", count: 10000, color: "red" },
    { name: "Consideration", count: 4000, color: "amber" },
    { name: "Conversion", count: 500, color: "green" },
  ];

  return (
    <div
      className={`relative w-full h-96 md:h-[28rem] lg:h-[32rem] rounded-2xl overflow-hidden shadow-2xl 
      bg-gray-900 dark:bg-gray-100 flex flex-col items-center justify-center p-6`}
    >
      {/* Animated Spark/Particles */}
      {particlePositions.map((pos, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0, 1.2, 0.8, 0],
            x: pos.x,
            y: pos.y,
          }}
          transition={{
            repeat: Infinity,
            duration: pos.duration,
            ease: "easeInOut",
          }}
          className="absolute w-3 h-3 rounded-full"
          style={{ backgroundColor: marketingAccentMap[accent] }}
        />
      ))}

      {/* Funnel */}
      <div className="relative w-full max-w-4xl h-full flex flex-col justify-center items-center space-y-6">
        {funnelStages.map((stage, i) => {
          const sizePercent = 100 - i * 30;
          const stageColor =
            stage.color === "red"
              ? marketingColorMap.red
              : stage.color === "amber"
              ? marketingColorMap.amber
              : "#22c55e";

          return (
            <motion.div
              key={stage.name}
              className="relative cursor-pointer w-full text-center flex flex-col items-center"
              onMouseEnter={() => setHoverStage(stage)}
              onMouseLeave={() => setHoverStage(null)}
              whileHover={{ scale: 1.05 }}
            >
              {/* Funnel Bar */}
              <motion.div
                layout
                className="rounded-lg shadow-lg flex items-center justify-center text-black font-bold text-sm md:text-base"
                style={{
                  width: `${sizePercent}%`,
                  backgroundColor: stageColor,
                  height: "3rem",
                }}
              >
                {stage.name}
              </motion.div>

              {/* Connecting line */}
              {i < funnelStages.length - 1 && (
                <motion.div
                  className="w-1 h-6 bg-gray-600 mt-2 rounded"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.5 }}
                />
              )}

              {/* Tooltip */}
              <AnimatePresence>
                {hoverStage?.name === stage.name && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: -20 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full p-2 bg-gray-800 dark:bg-gray-200 text-white dark:text-black rounded-lg shadow-xl text-sm font-semibold"
                  >
                    Volume: {stage.count.toLocaleString()}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Footer Hint */}
      <motion.div
        className={`absolute bottom-4 text-sm font-medium`}
        style={{ color: marketingColorMap[color] }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        Hover or click funnel stages for insights
      </motion.div>
    </div>
  );
};

// 7. GMB (Interactive Local Map: Ranchi, Jharkhand, India)
// Map image imports

interface GmbVisualProps {
  color: string;
  accent: string;
}

export const GmbVisual = ({ color, accent }: GmbVisualProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // DEFAULT: Ranchi, Jharkhand
  const defaultPin = { x: 0.63, y: 0.47 };

  const [pinPos, setPinPos] = useState(defaultPin);
  const [showLocation, setShowLocation] = useState(true);

  // Re-draw map (memoized to satisfy hook deps)
  const drawMap = React.useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const img = new Image();
    img.src = isDark ? worldMapDark.src : worldMapLight.src;

    await new Promise((res) => (img.onload = res));

    ctx.drawImage(img, 0, 0, w, h);

    const px = pinPos.x * w;
    const py = pinPos.y * h;

    ctx.beginPath();
    ctx.arc(px, py, 10, 0, Math.PI * 2);
    ctx.fillStyle = "#ff4757";
    ctx.shadowBlur = 20;
    ctx.shadowColor = "#ff4757";
    ctx.fill();
  }, [pinPos]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      void drawMap();
    };

    resize();
    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, [drawMap]);

  useEffect(() => {
    void drawMap();
  }, [drawMap]);

  // Move the pin
  const handleClick = (e: MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setPinPos({ x, y });
    setShowLocation(false); // hide label after moving
  };

  // Reset pin to Ranchi
  const resetPin = () => {
    setPinPos(defaultPin);
    setShowLocation(true);
  };

  return (
    <div
      className="
      relative w-full h-[30rem] rounded-3xl overflow-hidden
      bg-white dark:bg-gray-900 shadow-2xl border border-gray-300 dark:border-gray-700
      transition-colors duration-500
      "
    >
      {/* Map Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-pointer"
        onClick={handleClick}
      />

      {/* Label (only before first click) */}
      {showLocation && (
        <div
          className="
            absolute bottom-8 left-1/2 -translate-x-1/2
            px-6 py-3 rounded-xl
            bg-white/80 dark:bg-gray-800/90 backdrop-blur-lg
            shadow-xl
          "
        >
          <h3 className={`text-xl font-bold text-${accent}-500`}>
            Ranchi, Jharkhand, India
          </h3>
        </div>
      )}

      {/* SVG PIN on top */}
      <div
        className="absolute"
        style={{
          left: `${pinPos.x * 100}%`,
          top: `${pinPos.y * 100}%`,
          transform: "translate(-50%, -100%)",
        }}
      >
        <MapPin className={`w-12 h-12 text-${accent}-400`} />
      </div>

      {/* Reset Button */}
      <button
        onClick={resetPin}
        className="
        text-zinc-900
        absolute top-4 right-4 px-4 py-2 rounded-lg
        bg-white/80 dark:bg-gray-700/80 backdrop-blur-md
        shadow-md text-sm font-medium
        hover:bg-black hover:text-white dark:hover:bg-gray-600
        "
      >
        Reset Pin
      </button>
    </div>
  );
};

// --- Process Timeline Component ---
const ProcessTimeline = () => {
  const steps = [
    {
      name: "Strategy",
      desc: "Deep dive analysis, goal definition, and resource planning.",
    },
    {
      name: "Design",
      desc: "Wireframing, prototyping, and high-fidelity UX/UI system creation.",
    },
    {
      name: "Engineering",
      desc: "Secure, scalable, and resilient cloud-native application build.",
    },
    {
      name: "Launch",
      desc: "Zero-downtime deployment, QA, and final production readiness check.",
    },
    {
      name: "Grow",
      desc: "Continuous monitoring, performance iteration, and scale optimization.",
    },
  ];

  return (
    <div className="mb-24 px-4 max-w-7xl mx-auto">
      <h2
        className={`text-5xl font-bold tracking-tighter mb-12 text-center ${textPrimary}`}
      >
        Our <span className={accentGradient}>Five-Step</span> Process
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        {steps.map((step, i) => (
          <div
            key={i}
            className="text-center group opacity-0 animate-fade-in"
            // Custom inline style for staggered delay animation
            style={{
              animationDelay: `${i * 0.15 + 0.5}s`,
              animationFillMode: "forwards",
            }}
          >
            <div className="relative inline-block mb-4">
              <span
                className="
            text-7xl font-extrabold italic
            text-indigo-500/30 
            dark:text-indigo-400/40
            drop-shadow-[0_0_10px_rgba(99,102,241,0.3)]
        "
              >
                {i + 1}
              </span>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span
                  className={`text-sm font-bold uppercase tracking-wider ${textPrimary}`}
                >
                  {step.name}
                </span>
              </div>
            </div>
            <h3
              className={`font-semibold text-lg ${textPrimary} transition-colors duration-300 group-hover:text-indigo-400`}
            >
              {step.name}
            </h3>
            <p className="text-gray-400 text-sm mt-2 hidden md:block">
              {step.desc}
            </p>
            <div className="h-1 w-1/2 mx-auto mt-2 bg-indigo-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>
    </div>
  );
};

interface WebDevProps {
  color: string;
  accent: string;
}

const WebDevVisual: VisualComponent = ({ color, accent }) => {
  const [code, setCode] = useState(
    `const App = () => {\n  const [data, setData] = useState(null);\n  return <div>{data ? 'Loaded' : 'Loading...'}</div>\n}`
  );

  const [line, setLine] = useState(3);

  const handleCodeChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  return (
    <div
      className={`relative w-full h-full bg-gray-900 border border-${color}-600/50 rounded-lg shadow-xl overflow-hidden transition-all duration-500`}
    >
      {/* Header */}
      <div
        className={`flex items-center p-2 bg-gray-800 border-b border-${accent}-500/50`}
      >
        <div className="flex space-x-2 mr-4">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <div className="w-3 h-3 bg-yellow-500 rounded-full" />
          <div className="w-3 h-3 bg-green-500 rounded-full" />
        </div>

        <span className={`text-sm font-mono text-${color}-400`}>
          ~/src/App.jsx
        </span>
      </div>

      {/* Code Editor Area */}
      <div className="flex h-full">
        {/* Line Numbers */}
        <div
          className={`p-3 text-right font-mono text-sm bg-gray-900 border-r border-${accent}-800`}
        >
          {code.split("\n").map((_, i) => (
            <div
              key={i}
              className={`h-6 ${
                i === line ? `text-${color}-400 font-bold` : "text-gray-600"
              }`}
            >
              {i + 1}
            </div>
          ))}
        </div>

        {/* Text Area */}
        <textarea
          className={`flex-1 p-3 font-mono text-sm bg-gray-900 text-white resize-none outline-none focus:ring-2 focus:ring-${accent}-500/50`}
          value={code}
          onChange={handleCodeChange}
          spellCheck="false"
        />
      </div>

      {/* Terminal Output */}
      <div
        className={`absolute bottom-0 w-full p-2 bg-gray-800/80 backdrop-blur-sm border-t border-${accent}-500/50`}
      >
        <p
          className={`flex items-center font-mono text-xs text-${accent}-300 animate-pulse`}
        >
          <Terminal className="w-3 h-3 mr-1" /> BUILD STATUS: SUCCESS. Changes
          Are Live.
        </p>
      </div>
    </div>
  );
};

// --- Main App Component ---

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  useMagnetic(ctaRef, 0.1);

  // Reduced magnetic strength for smoother feel

  // Scroll handler for subtle header effect
  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        if (window.scrollY > 50) {
          headerRef.current.classList.add(
            "bg-black/80",
            "backdrop-blur-md",
            "border-b",
            "border-gray-800"
          );
        } else {
          headerRef.current.classList.remove(
            "bg-black/80",
            "backdrop-blur-md",
            "border-b",
            "border-gray-800"
          );
        }
      }
    };
    window.addEventListener("scroll", handleScroll as EventListener);
    return () =>
      window.removeEventListener("scroll", handleScroll as EventListener);
  }, []);

  // Map service IDs to their visual components

  const visualMap: Record<ServiceId, VisualComponent> = {
    webdev: WebDevVisual,
    webdesign: WebDesignVisual,
    video: VideoVisual,
    seo: SeoVisual,
    branding: BrandingVisual,
    marketing: MarketingVisual,
    gmb: GmbVisual,
  };

  return (
    <div className="font-sans min-h-screen bg-black text-white antialiased overflow-x-hidden">
      {/* --- Global Styles for Animations & Glow --- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
        body { font-family: 'Inter', sans-serif; }

        /* General Glow/Shadow */
        .drop-shadow-neon { filter: drop-shadow(0 0 10px rgba(6, 182, 212, 0.5)); }
        .magnetic-target { transition: transform 0.1s ease-out; }

        /* Animation Keyframes */
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }

        @keyframes blob {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 50%; }
        }
        .animate-blob { animation: blob 15s ease-in-out infinite; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animation-delay-200 { animation-delay: 0.2s; }
        
        @keyframes draw-line {
          to { stroke-dashoffset: 0; }
        }
        .animate-draw-line { animation: draw-line 2.5s ease-out forwards; }

        @keyframes pulse-light {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        .animate-pulse-light { animation: pulse-light 4s ease-in-out infinite; }
        
        @keyframes ping-strong {
          0% { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        .animate-ping-strong { animation: ping-strong 2s cubic-bezier(0, 0, 0.2, 1) infinite; }
        
        @keyframes pulse-slow {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 1; }
        }
        .animate-pulse-slow { animation: pulse-slow 3s infinite ease-in-out; }

        @keyframes trail-1 {
            0% { transform: translate(0, 0); opacity: 0; }
            50% { transform: translate(50px, 50px); opacity: 1; }
            100% { transform: translate(100px, 100px); opacity: 0; }
        }
        .animate-trail-1 { animation: trail-1 3s infinite linear; }
        .animate-trail-2 { animation: trail-1 3s infinite linear reverse; }
        
        @keyframes fade-in {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
        
        /* Define color stops for SVG gradients */
        .stop-color-cyan-400 { stop-color: #22d3ee; }
        .stop-color-cyan-700 { stop-color: #0e7490; }
        .stop-color-fuchsia-400 { stop-color: #e879f9; }
        .stop-color-fuchsia-700 { stop-color: #a21caf; }
        .stop-color-red-400 { stop-color: #f87171; }
        .stop-color-red-700 { stop-color: #b91c1c; }
        .stop-color-lime-400 { stop-color: #a3e635; }
        .stop-color-lime-700 { stop-color: #65a30d; }
        .stop-color-orange-400 { stop-color: #fb923c; }
        .stop-color-orange-700 { stop-color: #c2410c; }
        .stop-color-amber-400 { stop-color: #fbbf24; }
        .stop-color-amber-700 { stop-color: #b45309; }
        .stop-color-teal-400 { stop-color: #2dd4bf; }
        .stop-color-teal-700 { stop-color: #0f766e; }
        .stop-color-indigo-900 { stop-color: #312e81; }

      `}</style>

      {/* --- HEADER (Fixed, Glass Reflection) --- */}
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
          <a
            href="#hero"
            className="text-3xl font-extrabold tracking-tight text-white drop-shadow-neon"
          >
            <span className="flex items-center">
              <Code className="h-6 w-6 mr-2 text-cyan-400" />
              THE NEXUS
            </span>
          </a>
          <nav className="hidden md:flex space-x-8">
            {SERVICES_DATA.map((service) => (
              <a
                key={service.id}
                href={`#${service.id}`}
                className={`text-sm font-medium text-gray-400 hover:text-${service.color}-400 transition-colors duration-200`}
              >
                {service.title.split(" ")[0]}
              </a>
            ))}
          </nav>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-300 hover:bg-gray-800 transition-colors duration-200"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/90 backdrop-blur-md border-t border-gray-800 py-4 absolute w-full">
            {SERVICES_DATA.map((service) => (
              <a
                key={service.id}
                href={`#${service.id}`}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-6 py-2 text-base font-medium text-gray-300 hover:text-${service.color}-400 hover:bg-gray-900 transition-colors duration-200`}
              >
                {service.title}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* --- MAIN CONTENT SECTIONS --- */}
      <main>
        {/* HERO SECTION: Cinematic Intro */}
        <section
          id="hero"
          className="pt-40 pb-20 min-h-screen flex items-center bg-black transition-colors duration-300"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl sm:text-7xl lg:text-9xl font-black tracking-tighter text-white mb-6 leading-tight">
              <span className="text-gray-700 block text-2xl mb-4 tracking-widest uppercase">
                THE SERVICE NEXUS
              </span>
              ENGINEERING{" "}
              <span className="text-cyan-400 drop-shadow-neon">RARE</span>{" "}
              OUTCOMES
            </h1>
            <p className="mt-8 max-w-4xl mx-auto text-xl text-gray-400 cinematic-spacing">
              We transcend the typical agency model. Each discipline is a
              dedicated visual world, governed by unique physics and
              unparalleled expertise. Prepare for the ultimate digital
              transformation.
            </p>
            <a
              href="#webdev"
              className="inline-flex items-center justify-center mt-12 px-10 py-4 border border-cyan-400 text-lg font-semibold rounded-full text-white bg-black hover:bg-cyan-900/50 transition-transform duration-500 transform hover:scale-105"
            >
              Explore Our Worlds
            </a>
          </div>
        </section>

        {/* --- SERVICE WORLDS (The Unique Sections) --- */}
        {SERVICES_DATA.map((service) => {
          const VisualComponent = visualMap[service.id];
          return (
            <ServiceBlock key={service.id} data={service}>
              <VisualComponent color={service.color} accent={service.accent} />
            </ServiceBlock>
          );
        })}

        {/* --- PROCESS TIMELINE (5-Step) --- */}
        <ProcessTimeline />

        {/* --- FINAL CTA SECTION --- */}
        <section id="contact" className="pt-12">
          <ContactForm />
        </section>
      </main>

      {/* --- FOOTER (Minimalist) --- */}
      <footer className="bg-black border-t border-gray-900 py-10">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600 text-sm">
          <p>
            &copy; {new Date().getFullYear()} The Nexus Digital. Confidential
            Strategy Partner.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
