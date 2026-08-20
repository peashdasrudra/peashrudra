import { motion } from "framer-motion";
import { Trophy, Award, Users, FlaskConical, Zap, Rocket, Star, BadgeCheck, Brain, Globe, Target } from "lucide-react";
import { ACHIEVEMENTS } from "../data/portfolio";
import "./Achievements.css";

const ICONS = { Trophy, Award, Users, FlaskConical, Zap, Rocket, Star, BadgeCheck, Brain, Globe, Target };

export default function Achievements() {
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

        <div className="achievements-grid">
          {ACHIEVEMENTS.map((achievement, i) => {
            const Icon = ICONS[achievement.icon];
            return (
              <motion.div
                key={i}
                className={`achievement-card ${i === 0 ? "achievement-featured" : ""}`}
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div className={`achievement-icon type-${achievement.type}`}>
                  {Icon && <Icon size={18} />}
                </div>
                <div className="achievement-content">
                  <h3>{achievement.title}</h3>
                  <p>{achievement.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
