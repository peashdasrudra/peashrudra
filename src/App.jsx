import { useState, useCallback, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import "./App.css";
import LoadingScreen from "./components/LoadingScreen";
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

function DynamicGlowOrb() {
  const mouseX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 40, stiffness: 100, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Account for scroll position so the orb tracks absolute document position
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
  const [loaded, setLoaded] = useState(false);

  const handleLoadComplete = useCallback(() => {
    setLoaded(true);
    document.documentElement.classList.add("loaded");
  }, []);

  return (
    <>
      {!loaded && <LoadingScreen onComplete={handleLoadComplete} />}

      {loaded && (
        <>
          {/* Background effects */}
          <div className="grain" aria-hidden="true" />
          <div className="dotgrid" aria-hidden="true" />
          <DynamicGlowOrb />

          {/* Scroll progress */}
          <ScrollProgress />

          {/* Navigation */}
          <Navbar />

          {/* Main content */}
          <main className="app-content">
            <div className="wrap">
              <Hero />
              <Stats />
            </div>
            <Experience />
            <HubSpotCertified />
            <Projects />
            <Education />
            <Services />
            <div className="wrap">
              <Skills />
            </div>
            <FiverrGigs />
            <Certifications />
            <Achievements />
            <Gallery />
            <Contact />
            <Footer />
          </main>

          {/* Status bar */}
          <StatusBar />
        </>
      )}
    </>
  );
}
