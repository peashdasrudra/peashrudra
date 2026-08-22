import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Search } from "lucide-react";
import "./Navbar.css";

const NAV_LINKS = [
  { href: "#work", label: "work" },
  { href: "#projects", label: "projects" },
  { href: "#fiverr", label: "fiverr" },
  { href: "#services", label: "services" },
  { href: "#certifications", label: "certs" },
  { href: "#education", label: "education" },
];

export default function Navbar({ onOpenCmd, theme, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 40);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleLinkClick() {
    setIsOpen(false);
  }

  return (
    <header className={`nav-header ${scrolled ? "nav-scrolled" : ""}`}>
      <nav className="navbar" aria-label="Primary">
        <a href="#" className="logo">
          <span className="logo-dot" aria-hidden="true" />
          peash.das
        </a>

        <div className="navlinks">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>

        <a href="#contact" className="nav-cta">
          let's talk
        </a>

        <div className="nav-controls">
          <button
            className="nav-cmd-btn"
            onClick={onOpenCmd}
            aria-label="Open command search"
            title="Search & Quick Actions"
          >
            <Search size={14} />
          </button>

          <motion.button
            className={`theme-toggle ${theme === "light" ? "light-mode" : ""}`}
            onClick={toggleTheme}
            aria-label="Toggle theme"
            whileTap={{ scale: 0.9 }}
          >
            <div className="theme-toggle-slider" />
            <Sun size={12} className="theme-icon sun" />
            <Moon size={12} className="theme-icon moon" />
          </motion.button>
          
          <motion.button
            className="nav-toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-menu"
            id="mobile-menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
              >
                {link.label}
              </a>
            ))}
            <a href="#contact" className="mobile-cta" onClick={handleLinkClick}>
              let's talk
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
