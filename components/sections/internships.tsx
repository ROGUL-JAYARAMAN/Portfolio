"use client";
import { useRef, useState, useEffect } from "react";
import type { KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { Check, Briefcase, MapPin, Calendar } from "lucide-react";
import { TRANSITION, VIEWPORT } from "@/lib/motion";

export default function Internships() {
  const items = [
    {
      company: "Freelance",
      role: "Full Stack Developer",
      period: "Mar 2026 – Present",
      location: "Namakkal · Ongoing",
      current: true,
      logo: null as string | null,
      bullets: [
        "Delivering full stack web applications end-to-end — secure architectures, authentication, RBAC, deployments, and hosting for production use.",
        "Building responsive interfaces with React and secure REST APIs using Node.js, Express.js, PostgreSQL, and Prisma ORM — with optimization, monitoring, and maintainability in mind.",
      ],
      tags: ["React", "Node.js", "PostgreSQL", "Prisma", "REST APIs"],
    },
    {
      company: "DT Privacy Technologies",
      role: "Software Testing Intern",
      period: "Aug 2025 – Sep 2025",
      location: "Remote",
      current: false,
      logo: "/images/Intern/companyLogo.png",
      bullets: [
        "Performed functional, usability, and regression testing; identified, documented, and tracked defects throughout the testing lifecycle.",
        "Validated application behavior against business requirements and collaborated on issue resolution.",
      ],
      tags: ["Manual Testing", "QA", "Regression"],
    },
  ];

  const railRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      const p = max > 0 ? el.scrollLeft / max : 0;
      const idx = Math.round(p * items.length);
      setActiveIndex(idx);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const amount = 360;
    railRef.current?.scrollBy({ left: e.key === "ArrowRight" ? amount : -amount, behavior: "smooth" });
  };

  return (
    <section id="internships" className="py-24 md:py-32 bg-[#fafafa] dark:bg-[#0c0a09] overflow-hidden border-y border-[#e7e5e4] dark:border-white/10">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <motion.div
          className="max-w-[720px]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={TRANSITION.luxury}
        >
          <p className="caption-uppercase text-[#6b6560] dark:text-[#a8a29e]">— Experience</p>
          <h2 className="mt-3 font-display text-[36px] md:text-[44px] leading-[1.08] tracking-[-0.96px] font-light text-[#0c0a09] dark:text-white">
            Professional <span className="italic">experience.</span>
          </h2>
        </motion.div>

        <motion.div
          ref={railRef}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          role="region"
          aria-label="Experience carousel"
          className="mt-10 flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden outline-none focus-visible:ring-2 focus-visible:ring-[#0c0a09] dark:focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#fafafa] dark:focus-visible:ring-offset-[#0c0a09] rounded-[16px]"
          style={{ scrollbarWidth: "none", overscrollBehaviorX: "contain" } as React.CSSProperties}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {items.map((it) => (
            <motion.div
              key={it.company + it.role}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: TRANSITION.luxury },
              }}
              className="snap-start shrink-0 w-full md:basis-[calc(50%-12px)] bg-white dark:bg-[#1c1917] border border-[#e7e5e4] dark:border-white/10 rounded-[16px] p-6 md:p-7 flex flex-col"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  {it.logo ? (
                    <img
                      src={it.logo}
                      alt={it.company}
                      width={44}
                      height={44}
                      className="w-11 h-11 rounded-full object-cover border border-[#e7e5e4] dark:border-white/10 bg-white shrink-0"
                    />
                  ) : (
                    <span className="w-11 h-11 rounded-full bg-[#f5f5f5] dark:bg-[#0c0a09] border border-[#e7e5e4] dark:border-white/10 flex items-center justify-center shrink-0">
                      <Briefcase className="h-4 w-4 text-[#0c0a09] dark:text-white" />
                    </span>
                  )}
                  <div className="min-w-0">
                    <p className="caption-uppercase text-[#6b6560] dark:text-[#a8a29e] tracking-[0.12em] text-[11px]">{it.company}</p>
                    <h3 className="mt-1.5 font-display text-[17px] leading-tight font-light text-[#0c0a09] dark:text-white">{it.role}</h3>
                  </div>
                </div>
                {it.current && (
                  <span className="shrink-0 inline-flex items-center gap-1.5 bg-[#0c0a09] dark:bg-white text-white dark:text-[#0c0a09] rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-[0.08em] uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-white dark:bg-[#0c0a09] animate-pulse" /> Current
                  </span>
                )}
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 bg-[#f5f5f5] dark:bg-white/5 border border-[#e7e5e4] dark:border-white/10 rounded-full px-3 py-1 text-xs text-[#4e4e4e] dark:text-[#a8a29e]">
                  <Calendar className="h-3 w-3" /> {it.period}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-[#f5f5f5] dark:bg-white/5 border border-[#e7e5e4] dark:border-white/10 rounded-full px-3 py-1 text-xs text-[#4e4e4e] dark:text-[#a8a29e]">
                  <MapPin className="h-3 w-3" /> {it.location}
                </span>
              </div>

              <ul className="mt-5 space-y-3 flex-1">
                {it.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-sm leading-6 text-[#4e4e4e] dark:text-[#a8a29e]">
                    <span className="mt-1 w-5 h-5 rounded-full bg-[#f0efed] dark:bg-white/10 border border-[#e7e5e4] dark:border-white/10 flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3 text-[#0c0a09] dark:text-white" />
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-1.5">
                {it.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center bg-[#fafafa] dark:bg-[#0c0a09] border border-[#e7e5e4] dark:border-white/10 rounded-full px-2.5 py-1 text-[11px] font-medium text-[#6b6560] dark:text-[#a8a29e]">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
          {/* Future slots — subtle hint */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: TRANSITION.luxury },
            }}
            className="snap-start shrink-0 w-full md:basis-[calc(50%-12px)] border border-dashed border-[#e7e5e4] dark:border-white/10 rounded-[16px] p-6 md:p-7 flex flex-col items-center justify-center text-center min-h-[280px]"
          >
            <span className="w-10 h-10 rounded-full border border-dashed border-[#d6d3d1] dark:border-white/20 flex items-center justify-center">
              <span className="text-lg leading-none text-[#6b6560] dark:text-[#a8a29e]">+</span>
            </span>
            <p className="mt-3 caption-uppercase text-[#6b6560] dark:text-[#a8a29e]">More to come</p>
            <p className="mt-1 text-xs leading-5 text-[#6b6560] dark:text-[#a8a29e] max-w-[28ch]">Future experience will appear here — horizontal scroll ready.</p>
          </motion.div>
        </motion.div>
        {/* page dots hint — mobile */}
        <div className="mt-4 flex flex-col items-center gap-2">
          <div className="flex items-center justify-center gap-1.5" aria-hidden="true">
            {[...Array(items.length + 1)].map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? "w-6 bg-[#0c0a09] dark:bg-white" : "w-1.5 bg-[#e7e5e4] dark:bg-white/20"}`}
              />
            ))}
          </div>
          <p className="text-[11px] tracking-wide text-[#6b6560] dark:text-[#a8a29e]">Swipe or use arrow keys</p>
        </div>
      </div>
    </section>
  );
}
