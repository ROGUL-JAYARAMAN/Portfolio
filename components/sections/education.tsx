"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion, useMotionValueEvent } from "framer-motion";
import { TRANSITION, VIEWPORT } from "@/lib/motion";

const PING_THRESHOLDS = [0.15, 0.5, 0.82] as const;

export default function Education() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.7", "end 0.5"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const shouldReduceMotion = useReducedMotion();

  const items = [
    {
      year: "2022 — 2026 · Completed",
      degree: "Bachelor of Engineering",
      field: "Electronics and Communication Engineering",
      school: "Sri Krishna College of Engineering and Technology, Coimbatore",
      detail: "Learned fundamentals of Electronics. Found my interest in Software development and started building full-stack applications from concept to deployment.",
      badge: "CGPA 8.29 / 10",
    },
    {
      year: "2020 — 2022",
      degree: "Higher Secondary",
      school: "Kongu Matric Hr. Sec. School, Namakkal",
      detail: "First formal step into programming and electronics — where logic, problem-solving, and building things clicked.",
      badge: "95.16%",
    },
    {
      year: "2019 — 2020",
      degree: "SSLC",
      school: "Kalaimagal Matric Hr. Sec. School, Namakkal",
      detail: "Foundation years focused on fundamentals, discipline, and academic consistency.",
      badge: "74%",
    },
  ];

  const [pulsed, setPulsed] = useState<boolean[]>(() => items.map(() => false));

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    PING_THRESHOLDS.forEach((threshold, idx) => {
      if (latest >= threshold) {
        setPulsed((prev) => {
          if (prev[idx]) return prev;
          const next = [...prev];
          next[idx] = true;
          return next;
        });
      }
    });
  });

  useEffect(() => {
    const p = scrollYProgress.get();
    PING_THRESHOLDS.forEach((threshold, idx) => {
      if (p >= threshold) {
        setPulsed((prev) => {
          if (prev[idx]) return prev;
          const next = [...prev];
          next[idx] = true;
          return next;
        });
      }
    });
  }, [scrollYProgress]);

  return (
    <section id="education" className="py-24 md:py-32 bg-white dark:bg-[#0c0a09] border-y border-[#e7e5e4] dark:border-white/10 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <motion.div
          className="max-w-[720px]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={TRANSITION.luxury}
        >
          <p className="caption-uppercase text-[#6b6560] dark:text-[#a8a29e]">— Education</p>
          <h2 className="mt-3 font-display text-[36px] md:text-[44px] leading-[1.08] tracking-[-0.96px] font-light text-[#0c0a09] dark:text-white">
            Learning, <span className="italic">layered</span> deliberately.
          </h2>
          <p className="mt-4 text-[16px] leading-7 text-[#4e4e4e] dark:text-[#a8a29e]">Four years of ECE fundamentals, then software — each layer informs how I design systems that are reliable in the real world.</p>
        </motion.div>

        <div ref={ref} className="mt-14 relative">
          {/* DESKTOP spine is the grid's middle column — no absolute, so centering is via grid, not left calculations.
              MOBILE spine is absolute left-4, dots are in that spine. Grid handles vertical centering perfectly. */}
          {/* Mobile line (hidden on md) — perfectly centered gutter */}
          <div className="md:hidden absolute inset-y-0 left-4 w-8 z-0 pointer-events-none" aria-hidden="true">
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] h-full bg-[#e7e5e4] dark:bg-white/10" />
            <motion.div
              style={{ scaleY, originY: 0 }}
              className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-[#0c0a09] dark:bg-white origin-top will-change-transform"
            />
          </div>
          {/* Desktop line (hidden on mobile) — centered in grid middle col via flex */}
          <div className="hidden md:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 z-0 pointer-events-none" aria-hidden="true">
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] h-full bg-[#e7e5e4] dark:bg-white/10" />
            <motion.div
              style={{ scaleY, originY: 0 }}
              className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-[#0c0a09] dark:bg-white origin-top will-change-transform"
            />
          </div>

          <motion.div
            className="space-y-8 md:space-y-0 md:grid md:grid-cols-[1fr_32px_1fr] md:gap-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.14 } },
            }}
          >
            {items.map((item, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <div key={item.degree} className="contents">
                  {/* Left col */}
                  <motion.div
                    className={`${isLeft ? "hidden md:block md:pr-10" : "hidden md:block md:opacity-0 md:pointer-events-none"} `}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: TRANSITION.luxury },
                    }}
                  >
                    {isLeft && (
                      <div className="bg-[#fafafa] dark:bg-[#1c1917] border border-[#e7e5e4] dark:border-white/10 rounded-[16px] p-6 md:p-7 text-left">
                        <span className="caption-uppercase text-[#6b6560] dark:text-[#a8a29e]">{item.year}</span>
                        <h3 className="mt-2 font-display text-[19px] md:text-[20px] leading-tight font-light text-[#0c0a09] dark:text-white">{item.degree}</h3>
                        {item.field && <p className="mt-1 text-sm font-medium text-[#292524] dark:text-white">{item.field}</p>}
                        <p className="mt-1 text-xs leading-5 text-[#6b6560] dark:text-[#a8a29e]">{item.school}</p>
                        <p className="mt-3 text-sm leading-6 text-[#4e4e4e] dark:text-[#a8a29e]">{item.detail}</p>
                        <div className="mt-4 flex">
                          <span className="inline-flex items-center justify-center bg-[#0c0a09] dark:bg-white text-white dark:text-[#0c0a09] rounded-full px-4 py-1.5 text-xs font-medium tracking-wide">
                            {item.badge}
                          </span>
                        </div>
                      </div>
                    )}
                  </motion.div>

                  {/* Middle col — SPINE DOT, centered in its 32px cell via flex, so line MUST bisect it */}
                  <div className="hidden md:flex items-center justify-center relative py-6 ml-px">
                    <motion.div
                      className="relative flex items-center justify-center ml-px"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={TRANSITION.subtle}
                    >
                      <span className="w-3 h-3 rounded-full bg-white dark:bg-[#0c0a09] border-2 border-[#0c0a09] dark:border-white shadow-sm relative z-10 ml-px" />
                      {!shouldReduceMotion && (
                        <motion.span
                          aria-hidden="true"
                          className="absolute w-3 h-3 rounded-full bg-[#0c0a09] dark:bg-white pointer-events-none ml-px"
                          initial={{ scale: 1, opacity: 0 }}
                          animate={pulsed[idx] ? { scale: [1, 2.2], opacity: [0.6, 0] } : { scale: 1, opacity: 0 }}
                          transition={pulsed[idx] ? { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } : { duration: 0 }}
                        />
                      )}
                    </motion.div>
                  </div>

                  {/* Right col */}
                  <motion.div
                    className={`${!isLeft ? "hidden md:block md:pl-10" : "hidden md:block md:opacity-0 md:pointer-events-none"} `}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: TRANSITION.luxury },
                    }}
                  >
                    {!isLeft && (
                      <div className="bg-[#fafafa] dark:bg-[#1c1917] border border-[#e7e5e4] dark:border-white/10 rounded-[16px] p-6 md:p-7">
                        <span className="caption-uppercase text-[#6b6560] dark:text-[#a8a29e]">{item.year}</span>
                        <h3 className="mt-2 font-display text-[19px] md:text-[20px] leading-tight font-light text-[#0c0a09] dark:text-white">{item.degree}</h3>
                        {item.field && <p className="mt-1 text-sm font-medium text-[#292524] dark:text-white">{item.field}</p>}
                        <p className="mt-1 text-xs leading-5 text-[#6b6560] dark:text-[#a8a29e]">{item.school}</p>
                        <p className="mt-3 text-sm leading-6 text-[#4e4e4e] dark:text-[#a8a29e]">{item.detail}</p>
                        <div className="mt-4">
                          <span className="inline-flex items-center justify-center bg-[#0c0a09] dark:bg-white text-white dark:text-[#0c0a09] rounded-full px-4 py-1.5 text-xs font-medium tracking-wide">
                            {item.badge}
                          </span>
                        </div>
                      </div>
                    )}
                  </motion.div>

                  {/* Mobile card — per-card dot avoids drift from variable heights */}
                  <motion.div
                    className="md:hidden relative ml-8 bg-[#fafafa] dark:bg-[#1c1917] border border-[#e7e5e4] dark:border-white/10 rounded-[16px] p-6 col-span-2"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: TRANSITION.luxury },
                    }}
                  >
                    {/* per-card dot: anchored to card center, not flex distribution */}
                    <div className="absolute -left-[38px] top-1/2 -translate-y-1/2 z-10 pointer-events-none" aria-hidden="true">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={TRANSITION.subtle}
                        className="relative flex items-center justify-center"
                      >
                        <span className="w-3 h-3 rounded-full bg-white dark:bg-[#0c0a09] border-2 border-[#0c0a09] dark:border-white shadow-sm" />
                        {!shouldReduceMotion && (
                          <motion.span
                            aria-hidden="true"
                            className="absolute w-3 h-3 rounded-full bg-[#0c0a09] dark:bg-white pointer-events-none"
                            initial={{ scale: 1, opacity: 0 }}
                            animate={pulsed[idx] ? { scale: [1, 2.2], opacity: [0.6, 0] } : { scale: 1, opacity: 0 }}
                            transition={pulsed[idx] ? { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } : { duration: 0 }}
                          />
                        )}
                      </motion.div>
                    </div>
                    <span className="caption-uppercase text-[#6b6560] dark:text-[#a8a29e]">{item.year}</span>
                    <h3 className="mt-2 font-display text-[19px] leading-tight font-light text-[#0c0a09] dark:text-white">{item.degree}</h3>
                    {item.field && <p className="mt-1 text-sm font-medium text-[#292524] dark:text-white">{item.field}</p>}
                    <p className="mt-1 text-xs leading-5 text-[#6b6560] dark:text-[#a8a29e]">{item.school}</p>
                    <p className="mt-3 text-sm leading-6 text-[#4e4e4e] dark:text-[#a8a29e]">{item.detail}</p>
                    <div className="mt-4">
                      <span className="inline-flex items-center justify-center bg-[#0c0a09] dark:bg-white text-white dark:text-[#0c0a09] rounded-full px-4 py-1.5 text-xs font-medium tracking-wide">
                        {item.badge}
                      </span>
                    </div>
                    <span className="sr-only">{pulsed[idx] ? "pulsed" : ""}</span>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>


        </div>
      </div>
    </section>
  );
}
