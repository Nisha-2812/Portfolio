import { motion } from "framer-motion";
import { SiFigma, SiPython, SiPostgresql, SiGit, SiGithub } from "react-icons/si";
import {
  FiLayout,
  FiUsers,
  FiGrid,
  FiLayers,
  FiBox,
  FiSearch,
  FiImage,
  FiBarChart2,
  FiTable,
  FiCpu,
  FiCoffee,
  FiCode,
} from "react-icons/fi";
import { fadeUp } from "../utils/animations";

const ICON_MAP = {
  SiFigma,
  SiPython,
  SiPostgresql,
  SiGit,
  SiGithub,
  FiLayout,
  FiUsers,
  FiGrid,
  FiLayers,
  FiBox,
  FiSearch,
  FiImage,
  FiBarChart2,
  FiTable,
  FiCpu,
  FiCoffee,
};

export default function SkillCard({ skill }) {
  const Icon = ICON_MAP[skill.icon] || FiCode;

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="glass group relative flex flex-col items-center gap-3 rounded-2xl px-4 py-6 text-center transition-shadow"
      style={{ borderColor: "var(--border-soft)" }}
    >
      <div
        className="absolute inset-0 -z-10 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          boxShadow: "0 0 0 1px var(--accent-blue), 0 12px 30px -12px var(--accent-purple)",
        }}
      />
      <motion.div
        whileHover={{ scale: 1.15, rotate: 6 }}
        transition={{ type: "spring", stiffness: 400, damping: 12 }}
        className="flex h-11 w-11 items-center justify-center rounded-xl text-xl"
        style={{
          background: "var(--surface-strong)",
          color: "var(--accent-blue)",
        }}
      >
        <Icon />
      </motion.div>
      <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
        {skill.name}
      </p>
      <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
        {skill.level}
      </p>
    </motion.div>
  );
}
