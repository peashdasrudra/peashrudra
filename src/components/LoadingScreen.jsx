import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./LoadingScreen.css";

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 650; // fast 650ms max duration

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const nextProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(nextProgress);

      if (nextProgress >= 100) {
        clearInterval(interval);
        setTimeout(onComplete, 120);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="loading-content">
        <div className="loading-logo">
          <span className="loading-dot" />
          <span className="loading-name">peash.das</span>
        </div>
        <div className="loading-bar-track">
          <motion.div
            className="loading-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="loading-status">
          <span className="loading-text">initializing portfolio</span>
          <span className="loading-percent">{progress}%</span>
        </div>
      </div>
    </motion.div>
  );
}
