import { motion } from "framer-motion";
import { FiArrowRight, FiAward, FiMapPin } from "react-icons/fi";
import { profile } from "../data/profile";
import { fadeLeft, fadeRight, fadeUp, staggerContainer, viewportOnce } from "../utils/animations";

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-2 md:gap-14 md:px-10">
        {/* Image travels in from the right, settling on the left */}
        <motion.div
          variants={fadeRight}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="order-1 flex justify-center md:justify-start"
        >
          <div className="relative">
            <motion.div
              className="absolute -inset-4 rounded-[2rem] opacity-40 blur-2xl"
              style={{ background: "var(--accent-gradient)" }}
              animate={{ opacity: [0.25, 0.45, 0.25] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <div
              className="relative h-72 w-64 overflow-hidden rounded-[2rem] border sm:h-80 sm:w-72"
              style={{ borderColor: "var(--border-soft)" }}
            >
              <img
                src={profile.profileImage}
                alt={`${profile.name}, UI/UX designer and data analyst`}
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
                width={288}
                height={320}
              />
            </div>

            {/* Floating credential badge */}
            <motion.div
              className="glass absolute -bottom-5 -right-4 flex items-center gap-2.5 rounded-2xl px-4 py-3"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <span
                className="flex h-9 w-9 items-center justify-center rounded-xl"
                style={{ background: "var(--surface-strong)", color: "var(--accent-blue)" }}
              >
                <FiAward />
              </span>
              <span>
                <span className="block text-xs" style={{ color: "var(--text-tertiary)" }}>
                  CGPA
                </span>
                <span
                  className="block text-sm font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  7.6 / 10
                </span>
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Content enters from the right */}
        <motion.div
          variants={fadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="order-2"
        >
          <p className="font-mono text-sm" style={{ color: "var(--accent-blue)" }}>
            About Me
          </p>
          <h2
            className="font-display mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
            style={{ color: "var(--text-primary)" }}
          >
            Designing with empathy,
            <br />
            <span className="text-gradient">deciding with data</span>
          </h2>

          <p
            className="mt-4 flex items-center gap-2 text-sm"
            style={{ color: "var(--text-tertiary)" }}
          >
            <FiMapPin aria-hidden="true" />
            Siliguri Institute of Technology, {profile.location}
          </p>

          <div className="mt-6 space-y-4">
            {profile.about.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="text-base leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3"
          >
            {profile.aboutCards.map((card) => (
              <motion.div
                key={card.label}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="glass rounded-2xl px-4 py-4 text-center"
              >
                <p
                  className="text-xs uppercase tracking-wide"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  {card.label}
                </p>
                <p
                  className="mt-1 text-sm font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {card.value}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.a
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            href="#contact"
            className="group mt-9 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-black shadow-lg transition-transform hover:-translate-y-0.5"
            style={{ background: "var(--accent-gradient)" }}
          >
            Let&apos;s Work Together
            <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
