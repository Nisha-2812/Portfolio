import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { fadeUp, viewportOnce } from "../utils/animations";

// Creative Toolkit Data
const toolkitData = [
  {
    category: "UI/UX",
    label: "Design Mode: ON",
    skills: [
      { name: "Figma", isPrimary: true, desc: "My main playground", percent: "95%" },
      { name: "UI Design", desc: "pixel pushing", percent: "92%" },
      { name: "UX Design", desc: "User-first thinking", percent: "90%" },
      { name: "Wireframing", desc: "Low-fi concepts", percent: "88%" },
      { name: "Prototyping", desc: "Bringing static to life", percent: "91%" },
      { name: "Design Systems", desc: "Building scalable components", percent: "87%" },
      { name: "User Research", desc: "Understanding the why", percent: "89%" },
    ],
    bg: "rgba(255, 84, 4, 0.08)", // primary teal
    borderColor: "rgba(255, 84, 4, 0.4)",
    accent: "rgba(255, 84, 4, 0.9)",
  },
  {
    category: "Data",
    label: "crunching numbers",
    skills: [
      { name: "Python", desc: "Data manipulation", percent: "85%" },
      { name: "SQL", desc: "Querying databases", percent: "88%" },
      { name: "Power BI", desc: "Visualizing insights", percent: "86%" },
      { name: "Excel", desc: "Pivot table magic", percent: "90%" },
      { name: "AI Tools", desc: "currently learning →", percent: "82%" },
    ],
    bg: "rgba(12, 86, 96, 0.12)", // deep teal
    borderColor: "rgba(12, 86, 96, 0.5)",
    accent: "rgba(12, 86, 96, 1)",
  },
  {
    category: "Programming",
    label: "building logic",
    skills: [
      { name: "Python", desc: "Backend & scripting", percent: "78%" },
      { name: "SQL", desc: "Database architecture", percent: "80%" },
      { name: "Java", desc: "Object-oriented basics", percent: "72%" },
    ],
    bg: "rgba(247, 216, 185, 0.08)", // cream
    borderColor: "rgba(247, 216, 185, 0.4)",
    accent: "rgba(247, 216, 185, 0.9)",
  },
  {
    category: "Tools",
    label: "everyday essentials",
    skills: [
      { name: "Figma", desc: "Vector graphics", percent: "90%" },
      { name: "Canva", desc: "Quick assets", percent: "88%" },
      { name: "Power BI", desc: "Dashboards", percent: "85%" },
      { name: "Excel", desc: "Spreadsheets", percent: "89%" },
      { name: "Git", desc: "Version control", percent: "81%" },
      { name: "GitHub", desc: "Code hosting", percent: "84%" },
    ],
    bg: "rgba(92, 93, 86, 0.12)", // muted gray
    borderColor: "rgba(92, 93, 86, 0.4)",
    accent: "rgba(92, 93, 86, 0.9)",
  },
];

// Continuous subtle floating animation for bubbles
const bubbleAnimation = {
  initial: { y: 0 },
  animate: (i) => ({
    y: [0, -8, 0],
    transition: {
      duration: 3 + (i % 3), // randomizes float speed slightly
      repeat: Infinity,
      ease: "easeInOut",
      delay: i * 0.2, // randomizes start times
    },
  }),
};

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background glowing orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-[#FF5404]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-[#FF5404]/20 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-6xl px-6 md:px-10 relative z-10">
        <SectionHeading
          eyebrow="Creative Toolkit"
          title="My Digital Workspace"
          subtitle="A funky mix of design, data, and logic tools I use to build modern experiences."
        />

        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {toolkitData.map((area, areaIdx) => (
            <motion.div
              key={area.category}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="relative rounded-3xl p-8 lg:p-10"
              style={{
                backgroundColor: area.bg,
                borderColor: area.borderColor,
                borderWidth: "1px",
                borderStyle: "solid",
                boxShadow: `0 8px 32px 0 rgba(0,0,0,0.1), inset 0 0 0 1px rgba(255,255,255,0.05)`,
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
                <h3 
                  className="font-display text-2xl font-bold tracking-tight"
                  style={{ color: "var(--text-primary)" }}
                >
                  {area.category}
                </h3>
                <span 
                  className="text-xs font-mono px-4 py-1.5 rounded-full border transition-colors duration-300" 
                  style={{ borderColor: area.borderColor, color: area.accent, backgroundColor: `${area.accent}10` }}
                >
                  {area.label}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-4 items-center">
                {area.skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    custom={i}
                    variants={bubbleAnimation}
                    initial="initial"
                    animate="animate"
                    whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.2 } }}
                    className="group relative cursor-crosshair flex items-center justify-center transition-all duration-300 ease-out"
                  >
                    {/* The Bubble */}
                    <div 
                      className="relative z-10 rounded-full flex items-center justify-center backdrop-blur-md transition-colors duration-300"
                      style={{
                        padding: skill.isPrimary ? "1rem 2rem" : "0.5rem 1.25rem",
                        border: `1px solid ${area.borderColor}`,
                        background: `linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))`,
                        boxShadow: `0 4px 20px -2px rgba(0,0,0,0.2)`
                      }}
                    >
                      <span 
                        className={`font-medium transition-colors duration-300 ${skill.isPrimary ? 'text-lg font-bold tracking-wide' : 'text-sm'}`}
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {skill.name}
                      </span>
                    </div>

                    {/* Hover Glow Effect */}
                    <div 
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{ boxShadow: `0 0 25px 2px ${area.accent}`, backgroundColor: `${area.accent}15` }}
                    />
                    
                    {/* Custom Tooltip */}
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-300 pointer-events-none z-20 flex flex-col items-center">
                      <div 
                        className="px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-mono shadow-xl backdrop-blur-xl border flex gap-2 items-center" 
                        style={{ borderColor: area.borderColor, color: "var(--text-primary)", backgroundColor: "rgba(10,10,15,0.9)" }}
                      >
                        <span style={{ color: area.accent }} className="font-bold">{skill.percent}</span>
                        <span className="opacity-50">|</span>
                        <span>{skill.desc}</span>
                      </div>
                      {/* Triangle pointer */}
                      <div 
                        className="w-2 h-2 -mt-1 border-b border-r transform rotate-45"
                        style={{ borderColor: area.borderColor, backgroundColor: "rgba(10,10,15,0.9)" }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
