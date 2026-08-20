import { motion } from "framer-motion";
import { SKILLS } from "../data/portfolio";
import "./Skills.css";

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
        </motion.div>

        <motion.div
          className="skill-groups"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {SKILLS.map((group, i) => (
            <motion.div
              key={i}
              className="skill-group"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="skill-category">{group.category}</div>
              <div className="pill-row">
                {group.items.map((item, j) => (
                  <motion.span
                    key={j}
                    className="pill skill-pill"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.3,
                      delay: i * 0.1 + j * 0.03,
                    }}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
