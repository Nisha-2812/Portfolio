import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FiExternalLink, FiBarChart2, FiFigma, FiArrowUpRight } from "react-icons/fi";
import { fadeUp } from "../utils/animations";

const ICON_MAP = {
  figma: FiFigma,
  chart: FiBarChart2,
  link: FiExternalLink,
};

/**
 * Card with a subtle pointer-tracked 3D tilt. The tilt is driven by
 * motion values (no re-renders) and resets smoothly on pointer leave.
 */
export default function ProjectCard({ project }) {
  const ref = useRef(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const springCfg = { stiffness: 220, damping: 24, mass: 0.4 };
  const rotateX = useSpring(useTransform(py, [0, 1], [6, -6]), springCfg);
  const rotateY = useSpring(useTransform(px, [0, 1], [-6, 6]), springCfg);

  const handlePointerMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const handlePointerLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.article
      ref={ref}
      variants={fadeUp}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="glass group relative flex flex-col overflow-hidden rounded-2xl"
    >
      {/* Hover glow ring */}
      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          boxShadow:
            "0 0 0 1px var(--accent-blue), 0 24px 60px -24px var(--accent-purple)",
        }}
      />

      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={project.image}
          alt={`${project.name} preview`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
        />
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(180deg, transparent 45%, rgba(0,0,0,0.6) 100%)",
          }}
        />
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span
            className="rounded-full px-3 py-1 text-[11px] font-semibold backdrop-blur-md"
            style={{
              background: "rgba(255,255,255,0.14)",
              color: "#ffffff",
              border: "1px solid rgba(255,255,255,0.22)",
            }}
          >
            {project.category}
          </span>
          {project.year && (
            <span
              className="rounded-full px-2.5 py-1 text-[11px] font-medium backdrop-blur-md"
              style={{
                background: "rgba(0,0,0,0.35)",
                color: "rgba(255,255,255,0.85)",
              }}
            >
              {project.year}
            </span>
          )}
        </div>
      </div>

      <div className="relative z-20 flex flex-1 flex-col p-6">
        <h3
          className="font-display text-lg font-semibold"
          style={{ color: "var(--text-primary)" }}
        >
          {project.name}
        </h3>
        <p
          className="mt-2 text-sm leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          {project.description}
        </p>

        {project.highlights?.length > 0 && (
          <ul className="mt-4 space-y-1.5">
            {project.highlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-xs leading-relaxed"
                style={{ color: "var(--text-tertiary)" }}
              >
                <span
                  aria-hidden="true"
                  className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                  style={{ background: "var(--accent-blue)" }}
                />
                {item}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 flex flex-1 flex-wrap content-start gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border px-2.5 py-1 text-xs font-medium transition-colors"
              style={{
                borderColor: "var(--border-soft)",
                color: "var(--text-secondary)",
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {project.links.map((link) => {
            const Icon = ICON_MAP[link.icon] || FiExternalLink;
            return link.primary ? (
              <a
                key={link.label}
                href={link.disabled ? undefined : link.url}
                target={link.disabled ? undefined : "_blank"}
                rel={link.disabled ? undefined : "noreferrer noopener"}
                className={`group/btn inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-black shadow-lg transition-transform ${link.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-0.5'}`}
                style={{ background: "var(--accent-gradient)" }}
                onClick={link.disabled ? (e) => e.preventDefault() : undefined}
              >
                <Icon aria-hidden="true" />
                {link.label}
                {!link.disabled && <FiArrowUpRight className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />}
              </a>
            ) : (
              <a
                key={link.label}
                href={link.disabled ? undefined : link.url}
                target={link.disabled ? undefined : "_blank"}
                rel={link.disabled ? undefined : "noreferrer noopener"}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-transform ${link.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-0.5'}`}
                style={{
                  borderColor: "var(--border-strong)",
                  color: "var(--text-primary)",
                }}
                onClick={link.disabled ? (e) => e.preventDefault() : undefined}
              >
                <Icon aria-hidden="true" />
                {link.label}
              </a>
            );
          })}
        </div>
      </div>
    </motion.article>
  );
}
