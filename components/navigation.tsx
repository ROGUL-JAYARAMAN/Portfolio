"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useReducedMotion, useMotionValueEvent } from "framer-motion";
import { Menu, X, ArrowUpRight, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { useLenis } from "@/components/LenisProvider";
import ScrollToTop from "@/components/ScrollToTop";

const navItems = [
  { href: "#education", label: "Education" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "How I Work" },
  { href: "#internships", label: "Experience" },
  { href: "#achievements", label: "Achievements" },
];

function ThemeToggleButton() {
  const { theme, toggleThemeWithTransition } = useTheme();
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      onClick={(e) => toggleThemeWithTransition(e)}
      aria-label={theme === "dark" ? "Switch to light" : "Switch to dark"}
      title={theme === "dark" ? "Light mode" : "Dark mode"}
      className="w-10 h-10 rounded-full backdrop-blur-xl border flex items-center justify-center shrink-0 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0c0a09]/15 dark:focus-visible:ring-white/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f5f5] dark:focus-visible:ring-offset-[#0c0a09] bg-white/85 dark:bg-white/[0.06] border-[#e7e5e4] dark:border-white/10 shadow-[0_1px_2px_rgba(12,10,9,0.06),0_4px_16px_rgba(12,10,9,0.05)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.4),0_8px_24px_rgba(0,0,0,0.35)] text-[#0c0a09] dark:text-white hover:border-[#d6d3d1] dark:hover:border-white/15 transition-colors"
      whileHover={shouldReduceMotion ? undefined : { y: -1, scale: 1.02 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={
            shouldReduceMotion
              ? { opacity: 0 }
              : { rotate: -90, scale: 0.5, opacity: 0, filter: "blur(4px)" }
          }
          animate={
            shouldReduceMotion
              ? { opacity: 1 }
              : { rotate: 0, scale: 1, opacity: 1, filter: "blur(0px)" }
          }
          exit={
            shouldReduceMotion
              ? { opacity: 0 }
              : { rotate: 90, scale: 0.5, opacity: 0, filter: "blur(4px)" }
          }
          transition={
            shouldReduceMotion
              ? { duration: 0.14, ease: [0.4, 0, 0.2, 1] }
              : {
                  duration: 0.32,
                  ease: [0.4, 0, 0.2, 1] as const,
                  rotate: { duration: 0.42, ease: [0.4, 0, 0.2, 1] as const },
                }
          }
          className="flex items-center justify-center"
          aria-hidden
        >
          {theme === "dark" ? (
            <Sun size={16} strokeWidth={1.75} />
          ) : (
            <Moon size={16} strokeWidth={1.75} />
          )}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progressVisible, setProgressVisible] = useState(false);
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const progressOpacity = useTransform(scrollY, [0, 80, 81], progressVisible ? [0, 0, 1] : [0, 0, 0]);
  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 10);
    setProgressVisible(y > 80);
  });
  const { scrollTo: lenisScrollTo } = useLenis();
  const scrollTo = (href: string) => {
    lenisScrollTo(href, { offset: -68 });
    setMobileOpen(false);
  };

  return (
    <>
      {/* Top 2px progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left bg-[#0c0a09] dark:bg-white pointer-events-none"
        style={{ scaleX, opacity: progressOpacity, willChange: "transform, opacity" } as unknown as CSSProperties}
      />

      <motion.nav
        initial={false}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 w-full z-50 transition-colors duration-300 border-b ${
          scrolled
            ? "bg-[#f5f5f5]/90 dark:bg-[#0c0a09]/90 backdrop-blur-xl border-[#e7e5e4] dark:border-white/10 shadow-[0_1px_0_0_#e7e5e4] dark:shadow-[0_1px_0_0_rgba(255,255,255,0.08)]"
            : "bg-[#f5f5f5] dark:bg-[#0c0a09] border-transparent"
        }`}
        style={{ willChange: "transform" } as CSSProperties}
      >
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-[68px]">
            <button onClick={() => scrollTo("#home")} className="flex items-center gap-3 group">
              <span className="w-9 h-9 rounded-full bg-[#0c0a09] dark:bg-white text-white dark:text-[#0c0a09] flex items-center justify-center font-display text-[13px] tracking-[-0.02em] font-light group-hover:bg-[#292524] dark:group-hover:bg-[#f5f5f5] transition-colors">
                RJ
              </span>
              <span className="font-display text-[16px] tracking-[-0.02em] font-light text-[#0c0a09] dark:text-white hidden sm:inline group-hover:text-[#292524] dark:group-hover:text-[#f5f5f5] transition-colors">Rogul Jayaraman</span>
            </button>

            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className="relative px-3 py-2 text-[13px] font-medium tracking-[0.02em] text-[#4e4e4e] dark:text-[#a8a29e] hover:text-[#0c0a09] dark:hover:text-white transition-colors group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-3 right-3 h-px bg-[#0c0a09] dark:bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <ThemeToggleButton />

              <button
                onClick={() => lenisScrollTo("#contact", { offset: -68 })}
                className="hidden md:inline-flex items-center gap-1.5 bg-[#0c0a09] dark:bg-white text-white dark:text-[#0c0a09] rounded-full pl-5 pr-4 h-9 text-[13px] font-medium hover:bg-[#1c1917] dark:hover:bg-[#f5f5f5] transition-all group"
              >
                Let&apos;s talk
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                className="lg:hidden w-10 h-10 rounded-full border border-[#e7e5e4] dark:border-white/15 flex items-center justify-center bg-white dark:bg-[#1c1917] hover:border-[#0c0a09] dark:hover:border-white/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0c0a09] dark:focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f5f5] dark:focus-visible:ring-offset-[#0c0a09]"
              >
                {mobileOpen ? <X className="h-4 w-4 text-[#0c0a09] dark:text-white" /> : <Menu className="h-4 w-4 text-[#0c0a09] dark:text-white" />}
              </button>
            </div>
          </div>

          {mobileOpen && (
            <div id="mobile-menu" className="lg:hidden border-t border-[#e7e5e4] dark:border-white/10 bg-[#f5f5f5] dark:bg-[#0c0a09] -mx-6 px-6 py-8">
              <div className="flex flex-col">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => scrollTo(item.href)}
                    className="text-left py-4 text-[16px] font-display font-light tracking-[-0.02em] text-[#0c0a09] dark:text-white border-b border-[#e7e5e4]/60 dark:border-white/10 last:border-0 flex items-center justify-between group"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="h-4 w-4 text-[#a8a29e] group-hover:text-[#0c0a09] dark:group-hover:text-white transition-colors" />
                  </button>
                ))}
                <div className="mt-6 flex gap-3">
                  <ThemeToggleButton />
                  <button onClick={() => scrollTo("#contact")} className="flex-1 bg-[#0c0a09] dark:bg-white text-white dark:text-[#0c0a09] rounded-full h-10 text-[14px] font-medium inline-flex items-center justify-center gap-2 hover:bg-[#292524] dark:hover:bg-[#f5f5f5] transition-colors group">
                    Let&apos;s talk — start a project
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.nav>

      <ScrollToTop />
    </>
  );
}
