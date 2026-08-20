import { useState, useCallback } from "react";
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
import Education from "./components/Education";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import StatusBar from "./components/StatusBar";

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
          <div className="glow-orb" aria-hidden="true" />

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
            <Projects />
            <FiverrGigs />
            <Services />
            <div className="wrap">
              <Skills />
            </div>
            <Certifications />
            <Education />
            <Achievements />
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
