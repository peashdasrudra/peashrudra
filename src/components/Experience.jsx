import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar } from "lucide-react";
import { EXPERIENCE } from "../data/portfolio";
import "./Experience.css";

export default function Experience() {
  return (
    <section id="work">
      <div className="wrap">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="kicker">./experience --live</div>
          <h2 className="section-title">Real systems, live clients.</h2>
          <p className="section-desc">
            Not tutorials — production automation and engineering work shipped
            for real teams.
          </p>
        </motion.div>

        <div className="exp-timeline">
          <div className="timeline-line" aria-hidden="true" />
          {EXPERIENCE.map((exp, i) => (
            <motion.div
              key={i}
              className="exp-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="exp-dot" aria-hidden="true">
                <Briefcase size={14} />
              </div>
              <div className="exp-card-inner">
                <div className="exp-header">
                  <div>
                    <h3 className="exp-role">{exp.role}</h3>
                    <div className="exp-company">
                      <span className="exp-org">{exp.company}</span>
                      <span className="exp-sep">·</span>
                      <span className="exp-location">
                        <MapPin size={11} /> {exp.location}
                      </span>
                    </div>
                  </div>
                  <div className="exp-date">
                    <Calendar size={11} />
                    {exp.period}
                  </div>
                </div>
                <ul className="exp-bullets">
                  {exp.bullets.map((bullet, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: i * 0.15 + j * 0.06,
                      }}
                    >
                      {bullet}
                    </motion.li>
                  ))}
                </ul>
                <div className="pill-row" style={{ marginTop: 16 }}>
                  {exp.tags.map((tag) => (
                    <span key={tag} className="pill">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
