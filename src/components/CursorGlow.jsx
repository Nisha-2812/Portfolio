import { useEffect } from "react";
import { motion, useMotionValue, useMotionTemplate, useSpring } from "framer-motion";
import { usePointerFine } from "../hooks/usePointerFine";

/**
 * Ambient pointer-reactive background.
 *
 * Three layers, each lagging further behind the pointer for a parallax feel:
 *   1. a dot-grid revealed by a spotlight mask,
 *   2. a fast accent glow,
 *   3. a slow, larger companion glow.
 *
 * All movement runs on motion values (no React re-renders per frame) and the
 * whole thing disables itself for touch devices and reduced-motion visitors,
 * falling back to the static corner glows alone.
 */
export default function CursorGlow() {
  const active = usePointerFine();

  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  // Progressively softer springs create the parallax lag between layers.
  const gridX = useSpring(mouseX, { damping: 26, stiffness: 220, mass: 0.4 });
  const gridY = useSpring(mouseY, { damping: 26, stiffness: 220, mass: 0.4 });

  const fastX = useSpring(mouseX, { damping: 30, stiffness: 130, mass: 0.5 });
  const fastY = useSpring(mouseY, { damping: 30, stiffness: 130, mass: 0.5 });

  const slowX = useSpring(mouseX, { damping: 40, stiffness: 45, mass: 1.1 });
  const slowY = useSpring(mouseY, { damping: 40, stiffness: 45, mass: 1.1 });

  useEffect(() => {
    if (!active) return;

    let frame = 0;
    const handleMove = (e) => {
      // Coalesce to one update per frame — mousemove can fire far more often.
      if (frame) return;
      frame = requestAnimationFrame(() => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
        frame = 0;
      });
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [active, mouseX, mouseY]);

  const gridMask = useMotionTemplate`radial-gradient(260px circle at ${gridX}px ${gridY}px, #000 0%, rgba(0,0,0,0.6) 42%, transparent 72%)`;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Static ambient corners — the only layer touch users see */}
      <div
        className="absolute left-[6%] top-[10%] h-[420px] w-[420px] rounded-full opacity-[0.1] blur-[130px]"
        style={{ background: "var(--accent-purple)" }}
      />
      <div
        className="absolute bottom-[6%] right-[4%] h-[460px] w-[460px] rounded-full opacity-[0.1] blur-[130px]"
        style={{ background: "var(--accent-blue)" }}
      />

      {active && (
        <>
          {/* Spotlight-revealed dot grid */}
          <motion.div
            className="absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                "radial-gradient(circle, var(--grid-dot) 1px, transparent 1px)",
              backgroundSize: "26px 26px",
              maskImage: gridMask,
              WebkitMaskImage: gridMask,
            }}
          />

          {/* Slow companion glow */}
          <motion.div
            className="absolute h-[620px] w-[620px] rounded-full opacity-[0.1] blur-[130px] will-change-transform"
            style={{
              left: slowX,
              top: slowY,
              translateX: "-50%",
              translateY: "-50%",
              background: "var(--accent-purple)",
            }}
          />

          {/* Primary accent glow */}
          <motion.div
            className="absolute h-[460px] w-[460px] rounded-full opacity-[0.16] blur-[100px] will-change-transform"
            style={{
              left: fastX,
              top: fastY,
              translateX: "-50%",
              translateY: "-50%",
              background: "var(--accent-gradient)",
            }}
          />
        </>
      )}
    </div>
  );
}
