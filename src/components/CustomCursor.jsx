import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePointerFine } from "../hooks/usePointerFine";

const INTERACTIVE = 'a, button, [role="button"], summary, label';
const TEXT_FIELD = "input, textarea, select";

// Each trail dot lags a little more than the one before it.
const TRAIL = [
  { size: 7, stiffness: 190, opacity: 0.5 },
  { size: 6, stiffness: 150, opacity: 0.38 },
  { size: 5, stiffness: 115, opacity: 0.28 },
  { size: 4, stiffness: 88, opacity: 0.18 },
];

/**
 * Custom pointer: a precise dot, a springy ring that morphs over interactive
 * elements, and a short comet trail. The dot tracks the raw pointer position
 * with no smoothing so aiming accuracy is never affected.
 *
 * Only renders for fine pointers without a reduced-motion preference; the
 * native cursor is hidden (via the `custom-cursor` class on <html>) solely
 * while this component is mounted.
 */
export default function CustomCursor() {
  const active = usePointerFine();

  const [variant, setVariant] = useState("default"); // default | hover | text
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);
  const visibleRef = useRef(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const ringX = useSpring(x, { damping: 22, stiffness: 260, mass: 0.45 });
  const ringY = useSpring(y, { damping: 22, stiffness: 260, mass: 0.45 });

  useEffect(() => {
    if (!active) return;

    const root = document.documentElement;
    root.classList.add("custom-cursor");

    let frame = 0;
    const onMove = (e) => {
      if (!frame) {
        frame = requestAnimationFrame(() => {
          x.set(e.clientX);
          y.set(e.clientY);
          frame = 0;
        });
      }
      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }
    };

    const onOver = (e) => {
      const el = e.target;
      if (typeof el?.closest !== "function") return;
      if (el.closest(TEXT_FIELD)) setVariant("text");
      else if (el.closest(INTERACTIVE)) setVariant("hover");
      else setVariant("default");
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => {
      visibleRef.current = false;
      setVisible(false);
    };
    const onEnter = () => {
      visibleRef.current = true;
      setVisible(true);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      root.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [active, x, y]);

  if (!active) return null;

  const ring = {
    default: { width: 34, height: 34, borderRadius: 17, opacity: 0.55 },
    hover: { width: 58, height: 58, borderRadius: 29, opacity: 0.9 },
    text: { width: 4, height: 26, borderRadius: 2, opacity: 0.9 },
  }[variant];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.25s ease" }}
    >
      {/* Comet trail — furthest-behind first so the brightest dot sits on top */}
      {TRAIL.map((dot, i) => (
        <TrailDot key={i} x={x} y={y} {...dot} />
      ))}

      {/* Springy ring */}
      <motion.div
        className="absolute border will-change-transform"
        style={{
          left: ringX,
          top: ringY,
          translateX: "-50%",
          translateY: "-50%",
          borderColor: "var(--accent-blue)",
        }}
        animate={{
          ...ring,
          scale: pressed ? 0.8 : 1,
        }}
        transition={{ type: "spring", stiffness: 320, damping: 24 }}
      />

      {/* Precise dot — no smoothing */}
      <motion.div
        className="absolute rounded-full will-change-transform"
        style={{
          left: x,
          top: y,
          translateX: "-50%",
          translateY: "-50%",
          background: "var(--accent-gradient)",
        }}
        animate={{
          width: variant === "hover" ? 6 : 9,
          height: variant === "hover" ? 6 : 9,
          opacity: variant === "text" ? 0 : 1,
          scale: pressed ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 420, damping: 26 }}
      />
    </div>
  );
}

function TrailDot({ x, y, size, stiffness, opacity }) {
  const tx = useSpring(x, { damping: 26, stiffness, mass: 0.5 });
  const ty = useSpring(y, { damping: 26, stiffness, mass: 0.5 });

  return (
    <motion.div
      className="absolute rounded-full blur-[1px] will-change-transform"
      style={{
        left: tx,
        top: ty,
        width: size,
        height: size,
        opacity,
        translateX: "-50%",
        translateY: "-50%",
        background: "var(--accent-gradient)",
      }}
    />
  );
}
