import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { projects, projectCategories } from "../data/projects";
import ProjectCard from "./ProjectCard";
import SectionHeading from "./SectionHeading";
import { staggerContainer, viewportOnce } from "../utils/animations";

export default function Projects() {
  const [active, setActive] = useState("All");

  const filtered = useMemo(
    () =>
      active === "All"
        ? projects
        : projects.filter((p) => p.category === active),
    [active]
  );

  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Selected Work"
          title="Featured Projects"
          subtitle="A mix of product design work and analytics dashboards I've built."
        />

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5 }}
          role="tablist"
          aria-label="Filter projects by category"
          className="mt-10 flex flex-wrap items-center justify-center gap-2"
        >
          {projectCategories.map((cat) => {
            const isActive = active === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(cat)}
                className="relative rounded-full px-4 py-2 text-sm font-medium transition-colors"
                style={{ color: isActive ? "#05050a" : "var(--text-secondary)" }}
              >
                {isActive && (
                  <motion.span
                    layoutId="project-filter-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute inset-0 -z-10 rounded-full"
                    style={{ background: "var(--accent-gradient)" }}
                  />
                )}
                {!isActive && (
                  <span
                    className="absolute inset-0 -z-10 rounded-full border"
                    style={{ borderColor: "var(--border-soft)" }}
                  />
                )}
                {cat}
              </button>
            );
          })}
        </motion.div>

        {/* Keyed on `active` so the staggered reveal replays on every filter change */}
        <motion.div
          key={active}
          variants={staggerContainer(0.1)}
          initial="hidden"
          animate="visible"
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2"
        >
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
