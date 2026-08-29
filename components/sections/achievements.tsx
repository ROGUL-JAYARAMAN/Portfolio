"use client";
import { motion } from "framer-motion";
import { Trophy, Wrench } from "lucide-react";
import { TRANSITION, VIEWPORT } from "@/lib/motion";

export default function Achievements() {
  const achievements = [
    {
      icon: Trophy,
      title: "Winner — Product Expo",
      subtitle: "BIT V-PRAYUKTI'25 · Bannari Amman Institute of Technology",
      desc: "First place for an innovative tech product. Feb 8, 2025.",
    },
    {
      icon: Wrench,
      title: "Second Place — PC Building Competition",
      subtitle: "CRYPTERA 2025 · Coimbatore Institute of Technology",
      desc: "Assembled and booted a rig under time — second place. Feb 21, 2025.",
    },
  ];

  return (
    <section id="achievements" className="py-24 md:py-32 bg-[#f5f5f5] dark:bg-[#0c0a09] border-y border-[#e7e5e4] dark:border-white/10 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={TRANSITION.luxury}
        >
          <p className="caption-uppercase text-[#777169] dark:text-[#a8a29e]">— Achievements</p>
          <h2 className="mt-3 font-display text-[36px] md:text-[48px] leading-[1.08] tracking-[-0.96px] font-light text-[#0c0a09] dark:text-white">
            Proof, <span className="italic">not promises</span>.
          </h2>
          <p className="mt-4 text-[16px] leading-7 text-[#4e4e4e] dark:text-[#a8a29e]">A couple of moments where the work was judged and landed.</p>
        </motion.div>

        <motion.div
          className="mt-12 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {achievements.map((a) => (
            <motion.div
              key={a.title}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: TRANSITION.luxury },
              }}
              className="bg-white dark:bg-[#1c1917] border border-[#e7e5e4] dark:border-white/10 rounded-[16px] p-8 md:p-9 text-center flex flex-col"
            >
              <div className="w-14 h-14 rounded-full bg-[#fafafa] dark:bg-[#0c0a09] border border-[#e7e5e4] dark:border-white/10 mx-auto flex items-center justify-center">
                <a.icon className="h-6 w-6 text-[#0c0a09] dark:text-white" />
              </div>
              <h3 className="mt-6 font-display text-[22px] leading-tight font-light tracking-[-0.02em] text-[#0c0a09] dark:text-white">{a.title}</h3>
              <p className="mt-2 text-[13px] font-medium leading-5 text-[#292524] dark:text-white">{a.subtitle}</p>
              <div className="mt-3 w-8 h-px bg-[#e7e5e4] dark:bg-white/10 mx-auto" />
              <p className="mt-4 text-sm leading-6 text-[#4e4e4e] dark:text-[#a8a29e] flex-1">{a.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
