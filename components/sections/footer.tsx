"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Download, Send, Github, Linkedin, Globe } from "lucide-react";
import { TRANSITION } from "@/lib/motion";

export default function Footer() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [e.target.id]: e.target.value });
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact — ${form.name}`);
    const body = encodeURIComponent(`From: ${form.name} <${form.email}>\n\n${form.message}`);
    window.location.href = `mailto:jayaramanrogul@gmail.com?subject=${subject}&body=${body}`;
    setForm({ name: "", email: "", message: "" });
  };
  const resumeUrl = "/Rogul_Jayaraman_Resume.pdf";
  const handleView = () => window.open(resumeUrl, "_blank", "noopener,noreferrer");

  return (
    <footer id="contact" className="bg-[#f5f5f5] dark:bg-[#0c0a09] border-t border-[#e7e5e4] dark:border-white/10 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="orb w-[500px] h-[500px] -top-20 right-[-10%]" style={{ background: "radial-gradient(circle, #c8b8e0 0%, transparent 70%)", filter: "blur(60px)", opacity: 0.06 }} />
      </div>
      <motion.div
        className="max-w-[1200px] mx-auto px-6 lg:px-8 py-16 md:py-20 relative"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15, margin: "0px 0px -10% 0px" }}
        transition={TRANSITION.luxury}
      >
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <p className="caption-uppercase text-[#777169] dark:text-[#a8a29e]">— Contact</p>
            <h2 className="mt-3 font-display text-[36px] md:text-[42px] leading-[1.08] tracking-[-0.96px] font-light text-[#0c0a09] dark:text-white">
              Let&apos;s build <span className="italic">something useful.</span>
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#4e4e4e] dark:text-[#a8a29e] max-w-[52ch]">Have an entry-level Full Stack role, freelance, or a hardware-aware web idea? Drop a note — I reply within a day.</p>

            <form onSubmit={onSubmit} className="mt-8 space-y-4">
              <div>
                <label htmlFor="name" className="caption-uppercase text-[#777169] dark:text-[#a8a29e]">Your name</label>
                <input id="name" value={form.name} onChange={onChange} placeholder="Rogul Jayaraman" required className="mt-2 w-full h-11 rounded-[12px] bg-white dark:bg-[#1c1917] border border-[#e7e5e4] dark:border-white/10 px-4 text-sm text-[#0c0a09] dark:text-white placeholder:text-[#a8a29e] focus:outline-none focus:border-[#0c0a09] dark:focus:border-white/20" />
              </div>
              <div>
                <label htmlFor="email" className="caption-uppercase text-[#777169] dark:text-[#a8a29e]">Email</label>
                <input id="email" type="email" value={form.email} onChange={onChange} placeholder="jayaramanrogul@gmail.com" required className="mt-2 w-full h-11 rounded-[12px] bg-white dark:bg-[#1c1917] border border-[#e7e5e4] dark:border-white/10 px-4 text-sm placeholder:text-[#a8a29e] focus:outline-none focus:border-[#0c0a09]" />
              </div>
              <div>
                <label htmlFor="message" className="caption-uppercase text-[#777169] dark:text-[#a8a29e]">Message</label>
                <textarea id="message" rows={4} value={form.message} onChange={onChange} placeholder="Tell me about your project..." required className="mt-2 w-full rounded-[12px] bg-white dark:bg-[#1c1917] border border-[#e7e5e4] dark:border-white/10 p-4 text-sm placeholder:text-[#a8a29e] focus:outline-none focus:border-[#0c0a09]" />
              </div>
              <button type="submit" className="w-full h-11 btn-primary justify-center">
                <Send className="h-4 w-4" /> Send message
              </button>
            </form>
          </div>

          <div className="lg:pl-8">
            <h3 className="font-display text-[22px] font-light text-[#0c0a09] dark:text-white">Get in touch</h3>
            <div className="mt-6 space-y-4">
              {[
                { icon: Mail, label: "Email", value: "jayaramanrogul@gmail.com" },
                { icon: Phone, label: "Phone", value: "+91 93605 04096" },
                { icon: MapPin, label: "Location", value: "Namakkal, Tamil Nadu, India" },
              ].map((r) => (
                <div key={r.label} className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-white dark:bg-[#1c1917] border border-[#e7e5e4] dark:border-white/10 flex items-center justify-center">
                    <r.icon className="h-4 w-4 text-[#292524] dark:text-white" />
                  </span>
                  <div>
                    <div className="caption-uppercase text-[#777169] dark:text-[#a8a29e] normal-case tracking-normal">{r.label}</div>
                    <div className="text-sm text-[#0c0a09] dark:text-white">{r.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h4 className="caption-uppercase text-[#777169] dark:text-[#a8a29e]">Resume</h4>
              <button onClick={handleView} className="mt-3 inline-flex items-center gap-2 bg-[#0c0a09] dark:bg-white text-white dark:text-[#0c0a09] rounded-full px-5 h-10 text-sm font-medium hover:bg-[#1c1917] dark:hover:bg-[#f5f5f5] transition-colors">
                <Download className="h-4 w-4" /> View Resume
              </button>
            </div>

            <div className="mt-8 grid sm:grid-cols-2 gap-6">
              <div>
                <h4 className="caption-uppercase text-[#777169] dark:text-[#a8a29e]">Connect</h4>
                <div className="mt-3 flex gap-2">
                  <a href="https://github.com/Rogul-Jayaraman" target="_blank" rel="noreferrer" aria-label="GitHub" className="w-10 h-10 rounded-full bg-white dark:bg-[#1c1917] border border-[#e7e5e4] dark:border-white/10 flex items-center justify-center hover:border-[#0c0a09] dark:hover:border-white">
                    <Github className="h-4 w-4 text-[#0c0a09] dark:text-white" />
                  </a>
                  <a href="https://www.linkedin.com/in/rogul-jayaraman/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-white dark:bg-[#1c1917] border border-[#e7e5e4] dark:border-white/10 flex items-center justify-center hover:border-[#0c0a09] dark:hover:border-white">
                    <Linkedin className="h-4 w-4 text-[#0c0a09] dark:text-white" />
                  </a>
                  <a href="https://rogul-jayaraman.vercel.app" target="_blank" rel="noreferrer" aria-label="Portfolio" className="w-10 h-10 rounded-full bg-white dark:bg-[#1c1917] border border-[#e7e5e4] dark:border-white/10 flex items-center justify-center hover:border-[#0c0a09] dark:hover:border-white">
                    <Globe className="h-4 w-4 text-[#0c0a09] dark:text-white" />
                  </a>
                </div>
              </div>
              <div>
                <h4 className="caption-uppercase text-[#777169] dark:text-[#a8a29e]">Hobbies</h4>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {["Driving", "Automobile Services"].map((h) => (
                    <span key={h} className="inline-flex items-center bg-[#f0efed] dark:bg-white/10 border border-[#e7e5e4] dark:border-white/10 rounded-full px-3 py-1 text-xs text-[#0c0a09] dark:text-white">
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[#e7e5e4] dark:border-white/10 flex justify-center">
          <span className="text-xs text-[#777169] dark:text-[#a8a29e] text-center">© 2026 Rogul Jayaraman. Full Stack Developer. Freelancer</span>
        </div>
      </motion.div>
    </footer>
  );
}
