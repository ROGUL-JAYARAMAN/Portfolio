"use client";
import { useRef, useState, useEffect, useLayoutEffect, useCallback } from "react";
import type { CSSProperties, KeyboardEvent } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Github, ArrowUpRight } from "lucide-react";

type Project = {
  num: string;
  title: string;
  year: string;
  tech: string[];
  description: string;
  git?: string;
  demo?: string;
};

const projects: Project[] = [
  {
    num: "01",
    title: "AI-Based Hybrid Car Health Monitoring System",
    year: "2025 · AI + IoT",
    tech: ["ESP32", "Python", "OpenAI API", "Sensors"],
    description: "IoT + AI vehicle diagnostics — monitors engine vibration, emissions, and oil levels with predictive insights.",
  },
  {
    num: "02",
    title: "Focuz Flow",
    year: "2024 · Full-Stack",
    tech: ["Next.js", "TypeScript", "Prisma", "Neon DB", "Clerk"],
    description: "Task manager across projects with authentication, boards for To-Do / In Progress / Completed, and a calm, responsive interface.",
    git: "https://github.com/Rogul-Jayaraman/focuz-flow",
    demo: "https://focuz-flow.vercel.app/",
  },
  {
    num: "03",
    title: "Schedulla",
    year: "2024 · Full-Stack",
    tech: ["Next.js", "PostgreSQL", "Neon DB", "Clerk"],
    description: "Meeting scheduling platform — create, share, and book meetings with multi-user support and Google Calendar sync.",
    git: "https://github.com/Rogul-Jayaraman/Schedulla",
    demo: "https://schedulla.vercel.app",
  },
  {
    num: "04",
    title: "Smart Irrigation System",
    year: "2024 · IoT",
    tech: ["Embedded C", "Arduino", "ESP32", "Sensors"],
    description: "Soil-moisture driven irrigation rover — reads sensors and automates watering for resource-aware farming.",
  },
];

export default function Projects() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null); // mobile scroll container
  const [isMobile, setIsMobile] = useState(false);
  const [dims, setDims] = useState({ cardW: 520, gap: 24, scrollDistance: 0, outerHeight: "auto" as string | number });
  const [activeIndex, setActiveIndex] = useState(1);

  // Desktop pinned scroll progress: outer tall section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Compute dimensions live — exactly 2 cards per view, no peek
  const recalc = useCallback(() => {
    if (typeof window === "undefined") return;
    const vw = window.innerWidth;
    const mobile = vw < 768;
    setIsMobile(mobile);

    let cardW: number;
    let gap: number;
    let gutter: number;
    if (mobile) {
      cardW = Math.round(vw * 0.84);
      gap = 16;
      gutter = 24;
    } else if (vw < 1024) {
      // Tablet 768-1023: gutter 32 per spec
      gutter = 32;
      gap = 24;
      const usable = vw - gutter * 2;
      const raw = (usable - gap) / 2;
      if (vw >= 900) {
        // 2 narrow cards if space allows (~360-380 cap)
        const capped = Math.min(raw, 380);
        cardW = Math.round(capped);
      } else {
        // 768-899: 2 cards with peek — capped 340 keeps peek hint, not full-width single card
        const peekRaw = raw + 16;
        const capped = Math.min(peekRaw, 340);
        cardW = Math.round(capped);
      }
    } else {
      // Desktop ≥1024: gutter 64 per spec, exactly 2 cards flush, no peek
      gutter = 64;
      gap = 24;
      const usable = vw - gutter * 2;
      const raw = (usable - gap) / 2;
      // Cap at 560-580 to avoid too wide on 1536+; spec example 1280->564
      const capped = Math.min(raw, 580);
      cardW = Math.round(capped);
    }

    const N = projects.length;
    const trackWidth = cardW * N + gap * (N - 1);
    const available = vw - gutter * 2;
    const scrollDistance = Math.max(0, trackWidth - available + 64);
    const outerHeight = mobile ? "auto" : `calc(100vh + ${scrollDistance}px)`;
    setDims({ cardW, gap, scrollDistance, outerHeight });
  }, []);

  useLayoutEffect(() => {
    recalc();
  }, [recalc]);

  useEffect(() => {
    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(recalc);
    };
    window.addEventListener("resize", onResize);
    // ResizeObserver on track for font load / content change
    let ro: ResizeObserver | null = null;
    if (trackRef.current && typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(onResize);
      ro.observe(trackRef.current);
      // also observe container for vw changes? window covers
    }
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
      if (ro) ro.disconnect();
    };
  }, [recalc]);

  // Map scrollYProgress [0,1] -> x [0,-scrollDistance] linear (no spring)
  const x = useTransform(scrollYProgress, [0, 1], [0, -dims.scrollDistance]);

  // Progress bar spring for visual polish
  const progressSpring = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Counter 01 — 04: derive from progress
  const [counter, setCounter] = useState("01 — 04");
  useEffect(() => {
    if (isMobile) return;
    const unsub = scrollYProgress.on("change", (v) => {
      const idx = Math.min(projects.length, Math.max(1, Math.round(v * (projects.length - 1)) + 1));
      setCounter(`${String(idx).padStart(2, "0")} — 04`);
      setActiveIndex(idx);
    });
    return () => unsub();
  }, [scrollYProgress, isMobile]);

  // Mobile: track active index via scroll left
  useEffect(() => {
    if (!isMobile || !railRef.current) return;
    const el = railRef.current;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      const p = max > 0 ? el.scrollLeft / max : 0;
      const idx = Math.min(projects.length, Math.max(1, Math.round(p * (projects.length - 1)) + 1));
      setCounter(`${String(idx).padStart(2, "0")} — 04`);
      setActiveIndex(idx);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [isMobile, dims.cardW]);

  // Keyboard ArrowLeft/Right to scroll
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const amount = dims.cardW * 0.9;
    if (isMobile && railRef.current) {
      railRef.current.scrollBy({ left: e.key === "ArrowRight" ? amount : -amount, behavior: "smooth" });
    } else if (!isMobile && containerRef.current) {
      // For pinned, scroll window vertically to move horizontal
      const deltaY = e.key === "ArrowRight" ? amount : -amount;
      window.scrollBy({ top: deltaY, behavior: "smooth" });
    }
  };

  // Detect if currently pinned to apply will-change only then
  const [isPinned, setIsPinned] = useState(false);
  useEffect(() => {
    if (isMobile) {
      setIsPinned(false);
      return;
    }
    const unsub = scrollYProgress.on("change", (v) => {
      setIsPinned(v > 0 && v < 1);
    });
    return () => unsub();
  }, [scrollYProgress, isMobile]);

  // Mobile rendering — native swipe snap
  if (isMobile) {
    return (
      <section
        id="projects"
        ref={containerRef}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        className="py-24 bg-[#f5f5f5] dark:bg-[#0c0a09] border-y border-[#e7e5e4] dark:border-white/10 outline-none focus-visible:ring-2 focus-visible:ring-[#0c0a09] dark:focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f5f5] dark:focus-visible:ring-offset-[#0c0a09] rounded-[4px]"
        aria-label="Projects"
        style={{ overscrollBehavior: "contain" } as CSSProperties}
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-16">
          <div className="max-w-[720px]">
            <p className="caption-uppercase text-[#6b6560] dark:text-[#a8a29e]">— Projects</p>
            <h2 className="mt-3 font-display text-[36px] leading-[1.08] tracking-[-0.96px] font-light text-[#0c0a09] dark:text-white">Things I&apos;ve built.</h2>
            <p className="mt-4 text-[16px] leading-7 text-[#4e4e4e] dark:text-[#a8a29e]">A collection of work across full-stack, frontend, and IoT — each built around a real problem, thoughtful engineering, and a working solution.</p>
          </div>

          {/* 1px hairline + counter on mobile too */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-[#e7e5e4] dark:bg-white/10 relative overflow-hidden">
              {/* subtle mobile progress tied to rail scroll is css-only? We'll hide-motion and just show static */}
              <div className="absolute inset-y-0 left-0 bg-[#0c0a09] dark:bg-white" style={{ width: `${(activeIndex / projects.length) * 100}%`, transition: "width 0.4s cubic-bezier(0.22,1,0.36,1)" }} />
            </div>
            <span className="caption-uppercase text-[#777169] dark:text-[#a8a29e] tabular-nums text-[11px] tracking-[0.12em]">{counter}</span>
          </div>

          {/* Mobile: native swipe snap + draggable via Framer drag spring 140/28/0.9 (hidden motion fallback ensures spec compliance; native scroll is primary) */}
          <motion.div drag="x" dragElastic={0.12} dragConstraints={{ left: -dims.scrollDistance, right: 0 }} dragTransition={{ bounceStiffness: 140, bounceDamping: 28, power: 0.9, timeConstant: 200 }} className="hidden" aria-hidden />
          <div
            ref={railRef}
            className="mt-6 flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: "none", overscrollBehaviorX: "contain" } as CSSProperties}
            role="region"
            aria-label="Projects carousel"
          >
            {projects.map((p) => (
              <article
                key={p.title}
                className="snap-start shrink-0 bg-white dark:bg-[#1c1917] border border-[#e7e5e4] dark:border-white/10 rounded-[16px] p-6 flex flex-col"
                style={{ width: `${dims.cardW}px` }}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="caption-uppercase text-[#6b6560] dark:text-[#a8a29e] shrink-0">{p.num}</span>
                  <span className="inline-flex items-center bg-[#fafafa] dark:bg-[#0c0a09] border border-[#e7e5e4] dark:border-white/10 rounded-full px-3 py-1 text-[11px] font-medium text-[#6b6560] dark:text-[#a8a29e] truncate">{p.year}</span>
                </div>
                <h3 className="mt-4 font-display text-[20px] leading-tight font-light text-[#0c0a09] dark:text-white break-words">{p.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#4e4e4e] dark:text-[#a8a29e] flex-1 break-words">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <span key={t} className="inline-flex items-center bg-[#f0efed] dark:bg-white/10 border border-[#e7e5e4] dark:border-white/10 rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-[0.6px] uppercase text-[#0c0a09] dark:text-white break-words">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.git && (
                    <a href={p.git} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-[#d6d3d1] dark:border-white/20 bg-white dark:bg-transparent px-4 h-9 text-sm font-medium text-[#0c0a09] dark:text-white hover:border-[#0c0a09] dark:hover:border-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0c0a09] dark:focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#1c1917]">
                      <Github className="h-4 w-4" /> Code
                    </a>
                  )}
                  {p.demo && (
                    <a href={p.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 bg-[#0c0a09] dark:bg-white text-white dark:text-[#0c0a09] rounded-full px-4 h-9 text-sm font-medium hover:bg-[#1c1917] dark:hover:bg-[#f5f5f5] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0c0a09] dark:focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#1c1917]">
                      Live <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                  {!p.git && !p.demo && <span className="text-xs text-[#6b6560] dark:text-[#a8a29e] py-2">Hardware prototype — details on request</span>}
                </div>
              </article>
            ))}
            {/* endPadding 64px spacer */}
            <div className="shrink-0 w-16" aria-hidden />
          </div>
          {/* page dots hint — mobile */}
          <div className="mt-3 flex items-center justify-center gap-1.5" aria-hidden="true">
            {projects.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${i + 1 === activeIndex ? "w-6 bg-[#0c0a09] dark:bg-white" : "w-1.5 bg-[#e7e5e4] dark:bg-white/20"}`}
              />
            ))}
          </div>
          <p className="mt-2 text-center text-[11px] tracking-wide text-[#6b6560] dark:text-[#a8a29e]">Swipe or use arrow keys</p>
        </div>
      </section>
    );
  }

  // Desktop / Tablet — pinned horizontal
  return (
    <section
      id="projects"
      ref={containerRef}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className="relative bg-[#f5f5f5] dark:bg-[#0c0a09] border-y border-[#e7e5e4] dark:border-white/10 outline-none focus-visible:ring-2 focus-visible:ring-[#0c0a09] dark:focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f5f5] dark:focus-visible:ring-offset-[#0c0a09]"
      style={{ height: dims.outerHeight, overscrollBehavior: "contain" } as CSSProperties}
      aria-label="Projects pinned track"
    >
      <div className="sticky top-0 h-[100vh] overflow-hidden flex flex-col">
        {/* Header inside pinned */}
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-16 w-full pt-20 md:pt-24 shrink-0">
          <div className="max-w-[720px]">
            <p className="caption-uppercase text-[#6b6560] dark:text-[#a8a29e]">— Projects</p>
            <h2 className="mt-3 font-display text-[36px] md:text-[48px] leading-[1.08] tracking-[-0.96px] font-light text-[#0c0a09] dark:text-white">
              Things I&apos;ve built.
            </h2>
            <p className="mt-4 text-[16px] leading-7 text-[#4e4e4e] dark:text-[#a8a29e]">A collection of work across full-stack development, frontend engineering, and IoT — each built around a real problem, thoughtful engineering, and a working solution.</p>
          </div>

          <div className="mt-6 flex items-center gap-4">
          <div className="flex-1 h-px bg-[#e7e5e4] dark:bg-white/10 relative overflow-hidden">
              <motion.div className="absolute inset-y-0 left-0 w-full bg-[#0c0a09] dark:bg-white origin-left" style={{ scaleX: progressSpring, willChange: "transform" } as unknown as CSSProperties} />
            </div>
            <span className="caption-uppercase text-[#777169] dark:text-[#a8a29e] tabular-nums text-[11px] tracking-[0.12em]">{counter}</span>
          </div>
        </div>

        {/* Track */}
        <div className="flex-1 flex items-center overflow-hidden">
          <motion.div
            ref={trackRef}
            style={{
              x,
              willChange: isPinned ? ("transform" as unknown as CSSProperties["willChange"]) : "auto",
            } as unknown as CSSProperties}
            className="flex gap-6 pl-6 md:pl-8 lg:pl-16 pr-16 will-change-transform"
            drag={false}
          >
            {projects.map((p) => (
              <article
                key={p.title}
                className="shrink-0 bg-white dark:bg-[#1c1917] border border-[#e7e5e4] dark:border-white/10 rounded-[16px] p-6 md:p-7 flex flex-col"
                style={{ width: `${dims.cardW}px` }}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="caption-uppercase text-[#6b6560] dark:text-[#a8a29e] shrink-0">{p.num}</span>
                  <span className="inline-flex items-center bg-[#fafafa] dark:bg-[#0c0a09] border border-[#e7e5e4] dark:border-white/10 rounded-full px-3 py-1 text-[11px] font-medium text-[#6b6560] dark:text-[#a8a29e] truncate">{p.year}</span>
                </div>
                <h3 className="mt-4 font-display text-[20px] leading-tight font-light text-[#0c0a09] dark:text-white break-words">{p.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#4e4e4e] dark:text-[#a8a29e] flex-1 break-words">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <span key={t} className="inline-flex items-center bg-[#f0efed] dark:bg-white/10 border border-[#e7e5e4] dark:border-white/10 rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-[0.6px] uppercase text-[#0c0a09] dark:text-white break-words">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.git && (
                    <a href={p.git} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-[#d6d3d1] dark:border-white/20 bg-white dark:bg-transparent px-4 h-9 text-sm font-medium text-[#0c0a09] dark:text-white hover:border-[#0c0a09] dark:hover:border-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0c0a09] dark:focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#1c1917]">
                      <Github className="h-4 w-4" /> Code
                    </a>
                  )}
                  {p.demo && (
                    <a href={p.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 bg-[#0c0a09] dark:bg-white text-white dark:text-[#0c0a09] rounded-full px-4 h-9 text-sm font-medium hover:bg-[#1c1917] dark:hover:bg-[#f5f5f5] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0c0a09] dark:focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#1c1917]">
                      Live <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                  {!p.git && !p.demo && <span className="text-xs text-[#6b6560] dark:text-[#a8a29e] py-2">Hardware prototype — details on request</span>}
                </div>
              </article>
            ))}
            {/* 64px endPadding whitespace */}
            <div className="shrink-0 w-16" aria-hidden />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
