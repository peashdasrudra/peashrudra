import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./LoadingScreen.css";

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(onComplete, 600);
          }, 300);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="loading-content">
            <div className="loading-logo">
              <span className="loading-dot" />
              <span className="loading-name">peash.das</span>
            </div>
            <div className="loading-bar-track">
              <motion.div
                className="loading-bar-fill"
                initial={{ width: "0%" }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
            </div>
            <div className="loading-status">
              <span className="loading-text">initializing portfolio</span>
              <span className="loading-percent">
                {Math.min(Math.floor(progress), 100)}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
