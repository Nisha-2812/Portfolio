import { motion, useScroll, useSpring } from "framer-motion";

/** Thin gradient bar pinned to the top edge showing read progress. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 right-0 top-0 z-[60] h-[3px] origin-left"
      style={{ scaleX, background: "var(--accent-gradient)" }}
    />
  );
}
