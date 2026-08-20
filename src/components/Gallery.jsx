import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GALLERY } from "../data/portfolio";
import "./Gallery.css";

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Duplicate the gallery array to create a seamless infinite loop
  const infiniteGallery = [...GALLERY, ...GALLERY, ...GALLERY];

  return (
    <section id="gallery" className="gallery-section" ref={ref}>
      <div className="wrap">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="kicker">./gallery --bts</div>
          <h2 className="section-title">Behind the screens.</h2>
          <p className="section-desc">
            Deep work, late-night architecture sessions, and building in production.
          </p>
        </motion.div>
      </div>

      <motion.div
        className="gallery-marquee-container"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <div className="gallery-marquee-track">
          {infiniteGallery.map((item, index) => (
            <div key={index} className="gallery-card spot"
                 onMouseMove={(e) => {
                   const r = e.currentTarget.getBoundingClientRect();
                   e.currentTarget.style.setProperty("--mx", e.clientX - r.left + "px");
                   e.currentTarget.style.setProperty("--my", e.clientY - r.top + "px");
                 }}
            >
              <div className="gallery-img-wrapper">
                <img src={item.src} alt={item.caption} loading="lazy" />
                <div className="gallery-caption-overlay">
                  <span>{item.caption}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
