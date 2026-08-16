import { motion } from "framer-motion";
import { stats } from "../data/process";
import { fadeUp, staggerContainer, viewportOnce } from "../utils/animations";

export default function Stats() {
  return (
    <section aria-label="At a glance" className="relative pb-4 pt-2">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <motion.dl
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="glass grid grid-cols-2 gap-6 rounded-3xl px-6 py-8 sm:px-10 lg:grid-cols-4"
        >
          {stats.map((item) => (
            <motion.div key={item.label} variants={fadeUp} className="text-center">
              <dt className="sr-only">{item.label}</dt>
              <dd>
                <span className="font-display text-gradient block text-3xl font-semibold sm:text-4xl">
                  {item.value}
                </span>
                <span
                  className="mt-1.5 block text-xs font-medium uppercase tracking-wide sm:text-sm"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  {item.label}
                </span>
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
