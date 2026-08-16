import { motion } from "framer-motion";
import { FiArrowRight, FiDownload, FiMail } from "react-icons/fi";
import { profile } from "../data/profile";
import { fadeLeft, fadeRight, floating } from "../utils/animations";

const buttonStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.5 } },
};

const buttonItem = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const [roleA, roleB] = profile.role.split(" & ");

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16 md:pt-32"
    >
      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-2 md:gap-10 md:px-10">
        {/* Image column — first on mobile, right on desktop */}
        <motion.div
          variants={fadeRight}
          initial="hidden"
          animate="visible"
          className="order-1 flex justify-center md:order-2"
        >
          <div className="relative">
            <motion.div
              className="absolute -inset-6 rounded-full opacity-60 blur-2xl"
              style={{ background: "var(--accent-gradient)" }}
              animate={{ opacity: [0.35, 0.6, 0.35] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Slowly rotating dashed ring */}
            <motion.div
              aria-hidden="true"
              className="absolute -inset-5 rounded-full border border-dashed"
              style={{ borderColor: "var(--border-strong)" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            />

            <motion.div
              variants={floating}
              animate="animate"
              className="relative h-56 w-56 overflow-hidden rounded-full p-1 sm:h-64 sm:w-64 md:h-80 md:w-80"
              style={{ background: "var(--accent-gradient)" }}
            >
              <div
                className="h-full w-full overflow-hidden rounded-full"
                style={{ background: "var(--bg-secondary)" }}
              >
                <img
                  src={profile.profileImage}
                  alt={`Portrait of ${profile.name}`}
                  className="h-full w-full object-cover"
                  width={320}
                  height={320}
                  fetchPriority="high"
                />
              </div>
            </motion.div>

            {/* Floating accent dots */}
            <motion.span
              aria-hidden="true"
              className="absolute -right-2 top-6 h-3 w-3 rounded-full"
              style={{ background: "var(--accent-blue)" }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.span
              aria-hidden="true"
              className="absolute -left-3 bottom-10 h-2.5 w-2.5 rounded-full"
              style={{ background: "var(--accent-purple)" }}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            />

            {/* Floating discipline chips */}
            <motion.span
              className="glass absolute -left-6 top-10 hidden rounded-full px-3 py-1.5 text-xs font-semibold sm:block"
              style={{ color: "var(--text-primary)" }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            >
              Figma
            </motion.span>
            <motion.span
              className="glass absolute -right-8 bottom-14 hidden rounded-full px-3 py-1.5 text-xs font-semibold sm:block"
              style={{ color: "var(--text-primary)" }}
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            >
              Power BI
            </motion.span>
          </div>
        </motion.div>

        {/* Text column */}
        <motion.div
          variants={fadeLeft}
          initial="hidden"
          animate="visible"
          className="order-2 text-center md:order-1 md:text-left"
        >
          <motion.p
            className="glass mb-5 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium"
            style={{ color: "var(--text-secondary)" }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: "#34d399" }}
            />
            Open to internships &amp; freelance work
          </motion.p>

          <p
            className="font-mono mb-4 text-sm tracking-wide"
            style={{ color: "var(--accent-blue)" }}
          >
            Hi, I&apos;m {profile.name}
          </p>

          <h1
            className="font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
            style={{ color: "var(--text-primary)" }}
          >
            {roleA}
            <br />
            <span className="text-gradient">&amp; {roleB}</span>
          </h1>

          <p
            className="mx-auto mt-6 max-w-md text-base leading-relaxed md:mx-0 md:text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            {profile.tagline}
          </p>

          <motion.div
            variants={buttonStagger}
            initial="hidden"
            animate="visible"
            className="mt-10 flex flex-wrap items-center justify-center gap-4 md:justify-start"
          >
            <motion.a
              variants={buttonItem}
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-black shadow-lg transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--accent-gradient)" }}
            >
              View My Work
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </motion.a>
            <motion.a
              variants={buttonItem}
              href={profile.resumeUrl}
              download
              className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5"
              style={{
                borderColor: "var(--border-strong)",
                color: "var(--text-primary)",
              }}
            >
              <FiDownload />
              Download Resume
            </motion.a>
            <motion.a
              variants={buttonItem}
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5"
              style={{ color: "var(--text-secondary)" }}
            >
              <FiMail />
              Contact Me
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span
          className="flex h-10 w-6 items-start justify-center rounded-full border p-1.5"
          style={{ borderColor: "var(--border-strong)" }}
        >
          <span
            className="h-2 w-1 rounded-full"
            style={{ background: "var(--accent-blue)" }}
          />
        </span>
      </motion.a>
    </section>
  );
}
