import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import "./App.css";
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import FiverrGigs from "./components/FiverrGigs";
import Services from "./components/Services";
import Skills from "./components/Skills";
import Certifications from "./components/Certifications";
import HubSpotCertified from "./components/HubSpotCertified";
import Education from "./components/Education";
import Achievements from "./components/Achievements";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import StatusBar from "./components/StatusBar";
import CommandPalette from "./components/CommandPalette";
import PeashCompanionGuide from "./components/PeashCompanionGuide";
import RecruiterConfidence from "./components/RecruiterConfidence";

function DynamicGlowOrb() {
  const mouseX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 40, stiffness: 100, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY + window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div 
      className="dynamic-glow-orb"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: "-50%",
        translateY: "-50%"
      }}
      aria-hidden="true"
    />
  );
}

export default function App() {
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
    document.documentElement.classList.add("loaded");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <>
      {/* Background effects */}
      <div className="grain" aria-hidden="true" />
      <div className="dotgrid" aria-hidden="true" />
      <DynamicGlowOrb />

      {/* Scroll progress */}
      <ScrollProgress />

      {/* Navigation */}
      <Navbar 
        onOpenCmd={() => setIsCmdOpen(true)}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Command Palette HUD */}
      <CommandPalette 
        isOpen={isCmdOpen}
        setIsOpen={setIsCmdOpen}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main content */}
      <main className="app-content">
        <div className="wrap">
          <Hero />
          <Stats />
        </div>
        <RecruiterConfidence />
        <Experience />
        <HubSpotCertified />
        <Projects />
        <Education />
        <Services />
        <Skills />
        <FiverrGigs />
        <Certifications />
        <Achievements />
        <Gallery />
        <Contact />
        <Footer />
      </main>

      {/* Floating Cartoon Peash Companion Guide */}
      <PeashCompanionGuide />

      {/* Status bar */}
      <StatusBar />
    </>
  );
}
