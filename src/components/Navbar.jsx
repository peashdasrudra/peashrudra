import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import "./Navbar.css";

const NAV_LINKS = [
  { href: "#work", label: "work" },
  { href: "#projects", label: "projects" },
  { href: "#fiverr", label: "fiverr" },
  { href: "#services", label: "services" },
  { href: "#certifications", label: "certs" },
  { href: "#education", label: "education" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);

    function handleScroll() {
      setScrolled(window.scrollY > 40);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

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
            className={`theme-toggle ${theme === "light" ? "light-mode" : ""}`}
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <div className="theme-toggle-slider" />
            <Sun size={12} className="theme-icon sun" />
            <Moon size={12} className="theme-icon moon" />
          </button>
          
          <button
            className="nav-toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-menu"
            id="mobile-menu"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {link.label}
              </motion.a>
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
