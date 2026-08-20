import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Award, Users, FlaskConical, Zap, Rocket, Star, BadgeCheck, Brain, Globe, Target } from "lucide-react";
import { ACHIEVEMENTS } from "../data/portfolio";
import "./Achievements.css";

const ICONS = { Trophy, Award, Users, FlaskConical, Zap, Rocket, Star, BadgeCheck, Brain, Globe, Target };

export default function Achievements() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id="achievements">
      <div className="wrap">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="kicker">./achievements --unlocked</div>
          <h2 className="section-title">Recognition & milestones.</h2>
          <p className="section-desc">
            Gold medals, HubSpot certifications, AI research breakthroughs, and solo SaaS launches.
          </p>
        </motion.div>

        <div className="achievements-list">
          {ACHIEVEMENTS.map((achievement, i) => {
            const Icon = ICONS[achievement.icon];
            const isHovered = hoveredIndex === i;
            const isDimmed = hoveredIndex !== null && hoveredIndex !== i;

            return (
              <motion.div
                key={i}
                className={`achievement-row ${isHovered ? "active" : ""} ${isDimmed ? "dimmed" : ""}`}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                // Touch support
                onTouchStart={() => setHoveredIndex(i)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <div className="achievement-row-content">
                  <h3 className="achievement-title">{achievement.title}</h3>
                  <div className="achievement-meta">
                    <p className="achievement-desc">{achievement.description}</p>
                  </div>
                </div>

                <div className="achievement-visual">
                  <AnimatePresence>
                    {isHovered && Icon && (
                      <motion.div
                        className={`achievement-icon-reveal type-${achievement.type}`}
                        initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <Icon size={48} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
