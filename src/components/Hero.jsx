import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Calendar } from "lucide-react";
import { useTypingEffect } from "../hooks/useTypingEffect";
import { PROFILE, TERMINAL_LINES } from "../data/portfolio";
import "./Hero.css";

function Terminal() {
  const bodyRef = useRef(null);
  const [lines, setLines] = useState([]);
  const lineIndex = useRef(0);
  const charIndex = useRef(0);
  const timeoutRef = useRef(null);

  const typeLine = useCallback(() => {
    if (lineIndex.current >= TERMINAL_LINES.length) {
      timeoutRef.current = setTimeout(() => {
        setLines([]);
        lineIndex.current = 0;
        charIndex.current = 0;
        typeLine();
      }, 2200);
      return;
    }

    const current = TERMINAL_LINES[lineIndex.current];

    if (charIndex.current === 0) {
      setLines((prev) => [
        ...prev,
        { prompt: current.prompt, text: "", type: current.type },
      ]);
    }

    if (charIndex.current <= current.text.length) {
      setLines((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          text: current.text.slice(0, charIndex.current),
        };
        return updated;
      });
      charIndex.current++;
      timeoutRef.current = setTimeout(typeLine, 16);
    } else {
      charIndex.current = 0;
      lineIndex.current++;
      timeoutRef.current = setTimeout(typeLine, 420);
    }
  }, []);

  useEffect(() => {
    typeLine();
    return () => clearTimeout(timeoutRef.current);
  }, [typeLine]);

  return (
    <motion.div
      className="terminal"
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="term-bar">
        <span className="tl r" aria-hidden="true" />
        <span className="tl y" aria-hidden="true" />
        <span className="tl g" aria-hidden="true" />
        <span className="term-title">automation.log — live</span>
      </div>
      <div className="term-body" ref={bodyRef} aria-hidden="true">
        {lines.map((line, i) => (
          <div key={i} className="term-line">
            <span className="prompt">{line.prompt}</span>
            <span className={line.type === "ok" ? "ok" : "meta"}>
              {line.text}
            </span>
            {i === lines.length - 1 && <span className="cursor-blink" />}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const typedRole = useTypingEffect(PROFILE.roles, {
    typeSpeed: 70,
    deleteSpeed: 35,
    pauseTime: 2200,
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="hero">
      <div className="hero-grid">
        <motion.div
          className="hero-content"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div className="eyebrow" variants={item}>
            <span className="pulse" />
            {PROFILE.availability}
          </motion.div>

          <motion.h1 className="hero-title" variants={item}>
            I build AI systems that{" "}
            <span className="accent">run your CRM</span> so your team doesn't
            have to.
          </motion.h1>

          <motion.div className="hero-typed" variants={item}>
            <span className="typed-prefix">{'>'} </span>
            <span className="typed-text">{typedRole}</span>
            <span className="typed-cursor">|</span>
          </motion.div>

          <motion.p className="hero-desc" variants={item}>
            {PROFILE.description}
          </motion.p>

          <motion.div className="hero-ctas" variants={item}>
            <a href="#contact" className="btn-primary">
              start a project <ArrowRight size={14} />
            </a>
            <a
              href={PROFILE.resumeUrl}
              className="btn-outline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download size={14} /> download resume
            </a>
          </motion.div>

          <motion.div className="hero-proof" variants={item}>
            <div className="proof-item">
              <div className="proof-num">20+</div>
              <div className="proof-label">automations shipped</div>
            </div>
            <div className="proof-divider" />
            <div className="proof-item">
              <div className="proof-num">88%</div>
              <div className="proof-label">RAG precision@5</div>
            </div>
            <div className="proof-divider" />
            <div className="proof-item">
              <div className="proof-num">7</div>
              <div className="proof-label">certifications</div>
            </div>
            <div className="proof-divider" />
            <div className="proof-item">
              <div className="proof-num">5</div>
              <div className="proof-label">languages spoken</div>
            </div>
          </motion.div>
        </motion.div>

        <Terminal />
      </div>
    </section>
  );
}
