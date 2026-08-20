import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { SKILLS } from "../data/portfolio";
import "./Skills.css";

function MagneticPill({ children }) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for X and Y pull
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Physics springs for smooth snap back
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    // Calculate distance from center of the pill
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Magnetic pull distance
    const pullX = (e.clientX - centerX) * 0.3; // 30% pull strength
    const pullY = (e.clientY - centerY) * 0.3;

    x.set(pullX);
    y.set(pullY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`magnetic-pill-wrap ${isHovered ? 'active' : ''}`}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <span className="magnetic-pill">
        {children}
      </span>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills">
      <div className="wrap">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="kicker">./skills --stack</div>
          <h2 className="section-title">What I actually build with.</h2>
          <p className="section-desc">Hover over the tech stack to interact with the magnetic layout.</p>
        </motion.div>

        <div className="skills-magnetic-container">
          {SKILLS.map((group, i) => (
            <motion.div
              key={i}
              className="skill-magnetic-group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <h3 className="skill-magnetic-category">{group.category}</h3>
              <div className="skill-magnetic-cluster">
                {group.items.map((item, j) => (
                  <MagneticPill key={j}>{item}</MagneticPill>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
