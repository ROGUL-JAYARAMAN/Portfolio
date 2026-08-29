import Navigation from "@/components/navigation";
import Hero from "@/components/sections/hero";
import Education from "@/components/sections/education";
import Skills from "@/components/sections/skills";
import Projects from "@/components/sections/projects";
import About from "@/components/sections/about";
import Internships from "@/components/sections/internships";
import Achievements from "@/components/sections/achievements";
import Footer from "@/components/sections/footer";

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navigation />
      <main>
        <Hero />
        <Education />
        <Skills />
        <Projects />
        <About />
        <Internships />
        <Achievements />
        <Footer />
      </main>
    </div>
  );
}
