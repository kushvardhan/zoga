"use client";
import { useEffect } from "react";
import { X } from "lucide-react";

interface PopupProps {
  title: string;          // <-- big heading
  message: string;        // <-- small description
  type?: "success" | "error";
  onClose: () => void;
}

export default function Popup({
  title,
  message,
  type = "success",
  onClose,
}: PopupProps) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[999]">
      <div className="absolute inset-0 backdrop-blur-sm bg-black/10 dark:bg-black/30" />

      <div
        className={`
          relative px-7 py-6 rounded-2xl shadow-xl backdrop-blur-xl
          border max-w-md w-full animate-fadeIn
          ${type === "success"
            ? "bg-white dark:bg-[#0a0a12] border-green-500/30 text-green-700 dark:text-green-400"
            : "bg-white dark:bg-[#0a0a12] border-red-500/30 text-red-700 dark:text-red-400"}
        `}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 rounded-full
          bg-slate-200/70 dark:bg-slate-700/70
          hover:bg-slate-300 dark:hover:bg-slate-600
          transition"
        >
          <X className="w-4 h-4 text-black dark:text-white" />
        </button>

        {/* Big Heading */}
        <h2 className="text-xl font-bold mb-1">
          {title}
        </h2>

        {/* Small Description Message */}
        <p className="text-sm opacity-80">
          {message}
        </p>
      </div>
    </div>
  );
}
