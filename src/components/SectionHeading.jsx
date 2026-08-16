import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "../utils/animations";

/**
 * Shared section header so eyebrow/title/subtitle styling stays
 * identical across About, Skills, Projects and Contact.
 */
export default function SectionHeading({ eyebrow, title, subtitle, align = "center" }) {
  const isCenter = align === "center";

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={isCenter ? "mx-auto max-w-xl text-center" : "max-w-xl"}
    >
      {eyebrow && (
        <p
          className="font-mono text-sm tracking-wide"
          style={{ color: "var(--accent-blue)" }}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className="font-display mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
        style={{ color: "var(--text-primary)" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="mt-4 text-base leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          {subtitle}
        </p>
      )}
      <div
        className={`mt-6 h-px w-24 ${isCenter ? "mx-auto" : ""}`}
        style={{ background: "var(--accent-gradient)", opacity: 0.6 }}
      />
    </motion.div>
  );
}
