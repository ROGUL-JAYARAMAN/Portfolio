"use client";
import { motion } from "framer-motion";
import { TRANSITION, VIEWPORT } from "@/lib/motion";

export default function About() {
  const steps = [
    { num: "01", title: "Design", italic: "Architecture first.", desc: "Plan the system before writing the code — architecture, data, APIs, security, scalability, and maintainability." },
    { num: "02", title: "Develop", italic: "Build with purpose.", desc: "Create responsive full-stack applications, robust backend services, secure APIs, and intuitive user experiences." },
    { num: "03", title: "Test", italic: "Quality by design.", desc: "Test, debug, automate, and validate software to ensure features are reliable, secure, and ready for real users." },
    { num: "04", title: "Production", italic: "Ship with confidence.", desc: "Deploy, optimize, monitor, and maintain production systems — turning working software into reliable products.", featured: true },
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-[#fafafa] dark:bg-[#0c0a09] border-y border-[#e7e5e4] dark:border-white/10 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <motion.div
          className="max-w-[1200px] mx-auto text-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={TRANSITION.luxury}
        >
          <p className="caption-uppercase text-[#6b6560] dark:text-[#a8a29e] text-center">— How I Work</p>
          <h2 className="mt-3 font-display text-[28px] md:text-[36px] leading-[1.08] tracking-[-0.36px] font-light text-center text-[#0c0a09] dark:text-white">
            Design → Develop → Test → <span className="italic">Production</span>
          </h2>
        </motion.div>

        <motion.div
          className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          {steps.map((s) => (
            <motion.div
              key={s.num}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: TRANSITION.luxury },
              }}
              className={`${s.featured ? "bg-[#0c0a09] dark:bg-white text-white dark:text-[#0c0a09]" : "bg-white dark:bg-[#1c1917] border border-[#e7e5e4] dark:border-white/10 text-[#0c0a09] dark:text-white"} rounded-[16px] p-7 relative`}
            >
              <div className="flex items-center justify-between">
                <span className={`caption-uppercase ${s.featured ? "text-white/50 dark:text-[#0c0a09]/50" : "text-[#6b6560] dark:text-[#a8a29e]"}`}>{s.num}</span>
                <span className={`w-8 h-8 rounded-full flex items-center justify-center border ${s.featured ? "bg-white/10 dark:bg-[#0c0a09]/10 border-white/20 dark:border-[#0c0a09]/10" : "bg-[#f5f5f5] dark:bg-white/10 border-[#e7e5e4] dark:border-white/10"}`}>
                  <span className={`w-2 h-2 rounded-full ${s.featured ? "bg-white dark:bg-[#0c0a09] animate-pulse" : "bg-[#0c0a09] dark:bg-white"}`} />
                </span>
              </div>
              <div className="mt-6 font-display text-[24px] leading-none tracking-[-0.32px] font-light">{s.title}</div>
              <div className={`mt-2 font-display italic text-[13px] leading-none ${s.featured ? "text-white/60 dark:text-[#0c0a09]/60" : "text-[#6b6560] dark:text-[#a8a29e]"}`}>{s.italic}</div>
              <div className={`mt-3 text-[13px] leading-6 ${s.featured ? "text-white/70 dark:text-[#0c0a09]/70" : "text-[#4e4e4e] dark:text-[#a8a29e]"}`}>{s.desc}</div>
              {!s.featured && (
                <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#f5f5f5] dark:bg-[#0c0a09] border border-[#e7e5e4] dark:border-white/10 items-center justify-center z-10">
                  <span className="text-[10px] text-[#6b6560] dark:text-[#a8a29e]">→</span>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
