"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";

type ScrollToOptions = NonNullable<Parameters<Lenis["scrollTo"]>[1]>;

type LenisContextType = { lenis: Lenis | null; scrollTo: (target: string | HTMLElement, opts?: ScrollToOptions) => void };
const LenisContext = createContext<LenisContextType>({ lenis: null, scrollTo: () => {} });
export const useLenis = () => useContext(LenisContext);

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Respect prefers-reduced-motion: reduce → disable smoothing
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const instance = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      orientation: "vertical",
      gestureOrientation: "vertical",
      wheelMultiplier: 0.9,
      touchMultiplier: 1.6,
    });
    lenisRef.current = instance;
    setLenis(instance);

    function raf(time: number) {
      instance.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }
    rafRef.current = requestAnimationFrame(raf);

    // handle reduced-motion changes live
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        instance.destroy();
        cancelAnimationFrame(rafRef.current);
        lenisRef.current = null;
        setLenis(null);
      } else {
        // reload to re-init is simplest; for now no-op (user can refresh)
      }
    };
    // addEventListener is modern, fallback to addListener
    if (typeof mq.addEventListener === "function") mq.addEventListener("change", onChange);
    else {
      const legacyMq = mq as unknown as { addListener: (cb: (e: MediaQueryListEvent) => void) => void };
      legacyMq.addListener(onChange);
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
      if (typeof mq.removeEventListener === "function") mq.removeEventListener("change", onChange);
      else {
        const legacyMq = mq as unknown as { removeListener: (cb: (e: MediaQueryListEvent) => void) => void };
        legacyMq.removeListener(onChange);
      }
    };
  }, []);

  const scrollTo = (target: string | HTMLElement, opts?: ScrollToOptions) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { duration: 1.2, offset: opts?.offset ?? -68, ...opts });
    } else {
      const el = typeof target === "string" ? document.querySelector(target) : target;
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <LenisContext.Provider value={{ lenis, scrollTo }}>
      {children}
    </LenisContext.Provider>
  );
}
