import { motion } from "framer-motion";
import { useCounter } from "../hooks/useCounter";
import { STATS } from "../data/portfolio";
import "./Stats.css";

function StatCard({ stat, index }) {
  const [count, ref] = useCounter(stat.value, { duration: 2000 });

  return (
    <motion.div
      ref={ref}
      className={`stat spot ${stat.featured ? "stat-big" : ""}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", e.clientX - r.left + "px");
        e.currentTarget.style.setProperty("--my", e.clientY - r.top + "px");
      }}
    >
      <div className="stat-num">
        {count}
        {stat.suffix}
      </div>
      <div className="stat-label">
        {stat.label.split("UK").map((part, index, arr) => (
          <span key={index}>
            {part}
            {index < arr.length - 1 && (
              <span style={{ color: "var(--hubspot)", fontWeight: 700 }}>UK</span>
            )}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section className="stats-section">
      <div className="stats-grid">
        {STATS.map((stat, i) => (
          <StatCard key={i} stat={stat} index={i} />
        ))}
      </div>
    </section>
  );
}
