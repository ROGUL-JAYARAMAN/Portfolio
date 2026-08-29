"use client";
import { motion } from "framer-motion";
import { Code2, Server, Database, Wrench } from "lucide-react";
import { TRANSITION, VIEWPORT } from "@/lib/motion";

export default function Skills() {
  const groups = [
    {
      title: "Frontend",
      icon: Code2,
      skills: ["HTML", "CSS", "Responsive Design", "JavaScript", "React.js", "Next.js", "Tailwind CSS", "TypeScript"],
    },
    {
      title: "Backend",
      icon: Server,
      skills: ["Node.js", "Express.js", "REST APIs", "Authentication", "RBAC"],
    },
    {
      title: "Database",
      icon: Database,
      skills: ["PostgreSQL", "Prisma ORM", "Neon DB", "MySQL", "MongoDB"],
    },
    {
      title: "Tools & Practices",
      icon: Wrench,
      skills: ["Git", "GitHub", "Postman", "VS Code", "Docker", "Vercel", "Vibe Coding"],
    },
  ];

  return (
    <section id="skills" className="py-24 md:py-32 bg-white dark:bg-[#0c0a09] border-y border-[#e7e5e4] dark:border-white/10 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <motion.div
          className="max-w-[720px]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={TRANSITION.luxury}
        >
          <p className="caption-uppercase text-[#777169] dark:text-[#a8a29e]">— Skills</p>
          <h2 className="mt-3 font-display text-[36px] md:text-[44px] leading-[1.08] tracking-[-0.96px] font-light text-[#0c0a09] dark:text-white">
            A <span className="italic">practical</span> stack.
          </h2>
          <p className="mt-4 text-[16px] leading-7 text-[#4e4e4e] dark:text-[#a8a29e]">Focused on shipping — from interfaces to APIs to data. Strongest in the web, with enough hardware depth to handle real-world data.</p>
        </motion.div>

        <motion.div
          className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {groups.map((group) => (
            <motion.div
              key={group.title}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: TRANSITION.luxury },
              }}
              className="bg-[#fafafa] dark:bg-[#1c1917] border border-[#e7e5e4] dark:border-white/10 rounded-[16px] p-6 flex flex-col"
            >
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-white dark:bg-[#0c0a09] border border-[#e7e5e4] dark:border-white/10 flex items-center justify-center">
                  <group.icon className="h-4 w-4 text-[#0c0a09] dark:text-white" />
                </span>
                <h3 className="font-display text-[16px] tracking-tight font-light text-[#0c0a09] dark:text-white">{group.title}</h3>
              </div>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <span key={skill} className="inline-flex items-center bg-white dark:bg-[#0c0a09] border border-[#e7e5e4] dark:border-white/10 rounded-full px-3 py-1 text-xs font-medium text-[#0c0a09] dark:text-white">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-8 bg-[#0c0a09] dark:bg-white text-white dark:text-[#0c0a09] rounded-[16px] p-6 md:p-7"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={TRANSITION.luxury}
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="caption-uppercase text-white/60 dark:text-[#0c0a09]/60">Also familiar — hardware-aware edge</div>
            <span className="hidden md:inline-flex items-center bg-white dark:bg-[#0c0a09] text-[#0c0a09] dark:text-white rounded-full px-3 py-1 text-[11px] font-medium">Full Stack + Embedded</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {["C++", "Python (Basics)", "Embedded C", "Arduino", "ESP32", "Sensors"].map((s) => (
              <span key={s} className="inline-flex items-center bg-white/10 dark:bg-[#0c0a09]/5 border border-white/15 dark:border-[#0c0a09]/10 rounded-full px-3 py-1 text-xs font-medium text-white dark:text-[#0c0a09]">
                {s}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
