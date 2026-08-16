import { motion } from "framer-motion";
import { skillCategories } from "../data/skills";
import SkillCard from "./SkillCard";
import SectionHeading from "./SectionHeading";
import { fadeUp, staggerContainer, viewportOnce } from "../utils/animations";

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Capabilities"
          title="My Skills"
          subtitle="The design and analytics toolkit I use to build modern digital experiences."
        />

        <div className="mt-16 space-y-14">
          {skillCategories.map((category) => (
            <div key={category.title}>
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="mb-6 flex items-center gap-4"
              >
                <h3
                  className="font-display text-lg font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {category.title}
                </h3>
                <span
                  className="h-px flex-1"
                  style={{ background: "var(--border-soft)" }}
                />
                <span
                  className="font-mono text-xs"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  {String(category.items.length).padStart(2, "0")}
                </span>
              </motion.div>

              <motion.div
                variants={staggerContainer(0.07)}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
              >
                {category.items.map((skill) => (
                  <SkillCard key={category.title + skill.name} skill={skill} />
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
