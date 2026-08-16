import { motion } from "framer-motion";
import { FiSearch, FiGrid, FiLayout, FiPlay, FiBarChart2 } from "react-icons/fi";
import { processSteps } from "../data/process";
import SectionHeading from "./SectionHeading";
import { fadeUp, staggerContainer, viewportOnce } from "../utils/animations";

const ICON_MAP = { FiSearch, FiGrid, FiLayout, FiPlay, FiBarChart2 };

export default function Process() {
  return (
    <section id="process" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading
          eyebrow="How I Work"
          title="My Design Process"
          subtitle="From first question to measured outcome — the path every project follows."
        />

        <motion.ol
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5"
        >
          {processSteps.map((item) => {
            const Icon = ICON_MAP[item.icon] || FiSearch;
            return (
              <motion.li
                key={item.step}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="glass group relative flex flex-col gap-3 rounded-2xl p-6"
              >
                <span
                  className="font-mono text-xs font-semibold"
                  style={{ color: "var(--accent-purple)" }}
                >
                  {item.step}
                </span>
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl text-xl transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: "var(--surface-strong)",
                    color: "var(--accent-blue)",
                  }}
                >
                  <Icon aria-hidden="true" />
                </span>
                <h3
                  className="font-display text-base font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {item.description}
                </p>
              </motion.li>
            );
          })}
        </motion.ol>
      </div>
    </section>
  );
}
