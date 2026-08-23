import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { profile } from "../data/profile";
import { NAV_LINKS } from "../data/navLinks";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav item for whichever section is currently in view.
  useEffect(() => {
    const sections = NAV_LINKS.map((l) =>
      document.querySelector(l.href)
    ).filter(Boolean);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close the mobile menu on Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "top-4 px-4 md:px-10" : "top-0"
      }`}
    >
      <div
        className={`mx-auto max-w-6xl transition-all duration-300 overflow-hidden ${
          scrolled ? "rounded-full shadow-2xl" : ""
        }`}
        style={{
          background: scrolled ? "var(--surface)" : "transparent",
          border: scrolled ? "1px solid var(--border-soft)" : "1px solid transparent",
          borderBottom: !scrolled ? "1px solid transparent" : undefined,
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        }}
      >
        <nav className="flex items-center justify-between px-6 py-4">
          {/* Logo (Left) */}
          <div className="flex flex-1 justify-start">
            <a
              href="#home"
              className="font-display text-xl font-semibold tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              {profile.firstName}
              <span className="text-gradient">.</span>
            </a>
          </div>

          {/* Nav Links (Middle, Desktop) */}
          <div className="hidden items-center justify-center gap-1 md:flex md:flex-none">
            {NAV_LINKS.map((link) => {
              const isActive = `#${activeId}` === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className="relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors"
                  style={{
                    color: isActive
                      ? "var(--text-primary)"
                      : "var(--text-secondary)",
                  }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute inset-0 -z-10 rounded-full"
                      style={{ background: "var(--surface-strong)" }}
                    />
                  )}
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Controls (Right) */}
          <div className="flex flex-1 items-center justify-end gap-3">
            <ThemeToggle />
            
            {/* Mobile Menu Button */}
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full border text-lg md:hidden"
              style={{
                borderColor: "var(--border-soft)",
                color: "var(--text-primary)",
              }}
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={`md:hidden mx-4 mt-2 rounded-2xl shadow-2xl overflow-hidden border ${
              scrolled ? "" : "border-t-0 rounded-t-none"
            }`}
            style={{
              background: "var(--surface-strong)",
              borderColor: "var(--border-soft)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-lg px-3 py-3 text-base font-medium"
                  style={{
                    color:
                      `#${activeId}` === link.href
                        ? "var(--accent-blue)"
                        : "var(--text-primary)",
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
