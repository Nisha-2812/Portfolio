import { motion } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      aria-pressed={!isDark}
      className={`relative flex h-9 w-16 items-center rounded-full border px-1 transition-colors duration-300 ${className}`}
      style={{
        borderColor: "var(--border-strong)",
        background: "var(--surface-strong)",
      }}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className="flex h-7 w-7 items-center justify-center rounded-full text-[13px] shadow-sm"
        style={{
          background: "var(--accent-gradient)",
          marginLeft: isDark ? 0 : "auto",
          color: "#05050a",
        }}
      >
        {isDark ? <FiMoon /> : <FiSun />}
      </motion.span>
      <span className="sr-only">Toggle color theme</span>
    </button>
  );
}
