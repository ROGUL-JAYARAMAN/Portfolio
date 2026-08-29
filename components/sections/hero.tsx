"use client";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { TRANSITION } from "@/lib/motion";
import { useLenis } from "@/components/LenisProvider";

export default function Hero() {
  const { scrollTo } = useLenis();
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  // subtle parallax: disabled when prefers-reduced-motion — spec requires no parallax when reduced
  const orbY = useTransform(scrollY, [0, 300], [0, shouldReduceMotion ? 0 : -24]);

  return (
    <section id="home" className="relative overflow-hidden bg-[#f5f5f5] dark:bg-[#0c0a09]">
      {/* Atmospheric orbs with subtle parallax */}
      <motion.div style={{ y: orbY }} className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="orb orb-mint w-[520px] h-[520px] -top-32 -left-32 opacity-60 dark:opacity-[0.15]" style={{ background: "radial-gradient(circle at 30% 30%, #a7e5d3 0%, transparent 70%)" }} />
        <div className="orb orb-peach w-[640px] h-[640px] top-[10%] right-[-12%] opacity-50 dark:opacity-[0.1]" style={{ background: "radial-gradient(circle at 50% 50%, #f4c5a8 0%, transparent 70%)" }} />
        <div className="orb orb-lavender w-[480px] h-[480px] bottom-[-10%] left-[20%] opacity-40 dark:opacity-[0.08]" style={{ background: "radial-gradient(circle at 50% 50%, #c8b8e0 0%, transparent 70%)" }} />
      </motion.div>

      <div className="relative max-w-[1200px] mx-auto px-6 lg:px-8 pt-[88px]">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center py-12 md:py-16">
          <div>
            {/* h1 lines stagger onMount: delay 0 / 0.1s duration 1.0 luxury */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
              }}
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0 } },
                }}
                className="font-display text-[42px] md:text-[56px] lg:text-[64px] leading-[1.05] tracking-[-1.92px] font-light text-[#0c0a09] dark:text-white"
              >
                Rogul Jayaraman
              </motion.div>
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 } },
                }}
                className="block mt-4 md:mt-6 font-display italic font-light text-[26px] md:text-[32px] lg:text-[36px] leading-none tracking-[-0.36px] text-[#6b6560] dark:text-[#a8a29e]"
              >
                Full Stack Developer
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.28 }}
              className="mt-6 max-w-[52ch]"
            >
              <p className="text-[16px] leading-7 text-[#4e4e4e] dark:text-[#a8a29e]">
                I design, develop, test, and ship modern web products across the full stack — blending engineering fundamentals with AI-assisted development to build faster, better, and with purpose.
              </p>
              <p className="mt-6 font-display italic font-light text-[20px] md:text-[22px] leading-[1.15] tracking-[-0.32px] text-[#0c0a09] dark:text-white">
                Building software from idea to reality.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.42 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <button onClick={() => scrollTo("#projects", { offset: -68 })} className="btn-primary">
                View projects
              </button>
              <button onClick={() => scrollTo("#contact", { offset: -68 })} className="btn-outline">
                Contact me
              </button>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08, delayChildren: 0.6 } },
              }}
              className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-3 max-w-[520px]"
            >
              {[
                { k: "CGPA", v: "8.29/10" },
                { k: "Live platforms", v: "02" },
                { k: "Location", v: "Namakkal" },
              ].map((s) => (
                <motion.div
                  key={s.k}
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
                  }}
                  className="group relative rounded-2xl bg-white/60 dark:bg-white/[0.06] md:backdrop-blur-xl backdrop-blur-sm border border-white/50 dark:border-white/10 p-4 md:p-6 text-center shadow-[0_8px_32px_rgba(12,10,9,0.06),0_2px_8px_rgba(12,10,9,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:bg-white/75 dark:hover:bg-white/[0.08] hover:border-white/60 dark:hover:border-white/15 hover:shadow-[0_12px_40px_rgba(12,10,9,0.08)] transition-all duration-300 overflow-hidden"
                >
                  <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#e7e5e4] dark:via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="font-display text-[24px] md:text-[28px] leading-none tracking-tight font-light text-[#0c0a09] dark:text-white">{s.v}</div>
                  <div className="caption-uppercase text-[#777169] dark:text-[#a8a29e] mt-2 text-[11px] md:text-[12px] leading-tight">{s.k}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
            className="relative"
          >
            <div className="relative mx-auto max-w-[440px] bg-white dark:bg-[#1c1917] rounded-[24px] border border-[#e7e5e4] dark:border-white/10 p-3 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
              <div className="rounded-[16px] overflow-hidden">
                <img
                  src="/images/photo.png"
                  alt="Rogul Jayaraman — portrait"
                  width={440}
                  height={550}
                  loading="eager"
                  className="w-full aspect-[4/5] object-cover object-top"
                />
              </div>
              <div className="absolute -bottom-3 left-6 bg-[#0c0a09] dark:bg-white text-white dark:text-[#0c0a09] rounded-full px-4 py-2 flex items-center gap-2 shadow-md">
                <span className="w-2 h-2 rounded-full bg-white dark:bg-[#0c0a09] animate-pulse" />
                <span className="text-xs font-medium tracking-wide">HARDWARE</span>
              </div>
              <div className="absolute -top-3 right-6 bg-white dark:bg-[#1c1917] border border-[#e7e5e4] dark:border-white/10 rounded-full px-3 py-1.5 shadow-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#292524] dark:bg-white animate-pulse" />
                <span className="caption-uppercase text-[#0c0a09] dark:text-white">SOFTWARE</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
