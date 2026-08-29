"use client";

import { useEffect, useState, useCallback } from "react";
import type { CSSProperties } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useLenis } from "@/components/LenisProvider";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20,
    restDelta: 0.001,
  });
  const { scrollTo } = useLenis();
  const handleClick = useCallback(() => {
    scrollTo("#home", { offset: -68 });
  }, [scrollTo]);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && visible) handleClick();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible, handleClick]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.6, y: 24, rotate: -10 }}
          animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0, rotate: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.6, y: 24, rotate: 10 }}
          transition={
            reduced
              ? { duration: 0.2 }
              : { type: "spring", stiffness: 340, damping: 22, mass: 0.9 }
          }
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[55] pointer-events-none"
          style={{ willChange: "transform, opacity" } as CSSProperties}
        >
          <div className="pointer-events-auto">
            <motion.button
              type="button"
              aria-label="Back to top"
              onClick={handleClick}
              whileHover={reduced ? {} : { scale: 1.08, y: -2 }}
              whileTap={reduced ? {} : { scale: 0.92, y: 0 }}
              transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 18 }}
              className="group pointer-events-auto relative flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-full bg-[#0c0a09] dark:bg-white text-white dark:text-[#0c0a09] border border-[#0c0a09] dark:border-white shadow-[0_8px_32px_rgba(12,10,9,0.14),0_2px_8px_rgba(12,10,9,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4),0_2px_8px_rgba(0,0,0,0.3)] hover:shadow-[0_14px_44px_rgba(12,10,9,0.2),0_4px_12px_rgba(12,10,9,0.14)] dark:hover:shadow-[0_14px_44px_rgba(0,0,0,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0c0a09] dark:focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f5f5] dark:focus-visible:ring-offset-[#0c0a09] overflow-hidden"
              style={{ willChange: "transform" } as CSSProperties}
            >
              {/* Progress ring — theme-aware via currentColor */}
              <svg
                className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
                viewBox="0 0 56 56"
                aria-hidden="true"
              >
                <circle
                  cx="28"
                  cy="28"
                  r="26"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  opacity="0.12"
                />
                <motion.circle
                  cx="28"
                  cy="28"
                  r="26"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  style={{ pathLength: smoothProgress } as unknown as CSSProperties}
                  opacity="0.88"
                />
              </svg>

              {/* Subtle top highlight */}
              <span className="absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.10] via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <span className="absolute inset-[1px] rounded-full border border-white/[0.08] dark:border-black/[0.06] pointer-events-none" />

              {/* Arrow icon — up/down loop only while button hovered */}
              <span className="relative z-10 flex items-center justify-center">
                <span
                  aria-hidden="true"
                  className="flex motion-safe:group-hover:animate-[arrow-nudge_0.7s_ease-in-out_infinite]"
                >
                  <ArrowUp className="h-4 w-4 md:h-[18px] md:w-[18px] stroke-[2.2]" />
                </span>
              </span>

              {/* Press ripple */}
              <motion.span
                className="absolute inset-0 rounded-full bg-white dark:bg-[#0c0a09] pointer-events-none"
                initial={{ opacity: 0, scale: 0.8 }}
                whileTap={{ opacity: 0.14, scale: 1 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
