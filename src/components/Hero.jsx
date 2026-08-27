import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FiArrowRight, FiDownload, FiMail, FiActivity, FiPieChart, FiFigma } from "react-icons/fi";
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

const roles = ["UI/UX Designer", "Data Analyst", "Problem Solver", "Creative Thinker"];

export default function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16 md:pt-32"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Background Ambience - Cinematic Mountain Village */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#071925] hero-cinematic-bg">
        {/* The Mountain Village Background Image */}
        <motion.div 
          className="absolute inset-0 bg-cover bg-center lg:bg-[center_top_15%] opacity-100"
          style={{ backgroundImage: "url('/images/hero-bg.jpeg')" }}
          animate={prefersReducedMotion ? {} : { scale: [1.02, 1.04, 1.02] }}
          transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Soft 30-40% gradient overlay to gently darken the image without hiding it */}
        {/* Left-to-right gradient ensuring text on the left stays readable, and right side is slightly darker */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#071925]/75 via-[#071925]/40 to-[#071925]/60" />
        
        {/* Subtle bottom-to-top gradient for blending with the next section */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#071925]/80 via-[#071925]/20 to-transparent" />

        {/* Atmospheric Glow behind Profile Image on the right */}
        <div className="absolute inset-0 flex items-center justify-center md:justify-end lg:pr-[15%]">
          <motion.div
            animate={prefersReducedMotion ? {} : { opacity: [0.3, 0.45, 0.3], scale: [1, 1.03, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full blur-[130px] mix-blend-screen"
            style={{ background: "radial-gradient(circle, rgba(255,84,4,0.12) 0%, rgba(245,222,188,0.08) 30%, transparent 70%)" }}
          />
        </div>

        {/* Very Slow Mist/Cloud Movement overlay */}
        {!prefersReducedMotion && (
          <motion.div 
            className="absolute inset-0 opacity-[0.05] mix-blend-screen blur-[50px] pointer-events-none"
            animate={{ x: ['-3%', '3%', '-3%'] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-[120%] h-full bg-gradient-to-tr from-transparent via-[#F5DEBC] to-transparent" />
          </motion.div>
        )}
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-[1fr_1.1fr] lg:grid-cols-[1fr_1.2fr] md:gap-8 lg:px-12">
        
        {/* Text column */}
        <motion.div
          variants={fadeRight}
          initial="hidden"
          animate="visible"
          className="order-2 flex flex-col justify-center text-center md:order-1 md:text-left z-20"
        >
          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass mb-6 inline-flex self-center md:self-start items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium border border-white/5 shadow-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "var(--accent-blue)" }}></span>
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "var(--accent-blue)" }}></span>
            </span>
            Open to internships & freelance work
          </motion.div>

          <h1
            className="font-display text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl"
            style={{ color: "var(--text-primary)" }}
          >
            {profile.name}
          </h1>

          <h2
            className="font-mono mt-4 text-lg md:text-xl font-medium tracking-wide uppercase flex items-center justify-center md:justify-start h-8"
            style={{ color: "#FF5404" }}
          >
            {prefersReducedMotion ? (
              <span>{roles[0]} <span className="animate-pulse font-normal opacity-80" style={{ color: "var(--text-primary)" }}>|</span></span>
            ) : (
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentRoleIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block whitespace-nowrap"
                >
                  {roles[currentRoleIndex]} <span className="animate-pulse font-normal opacity-80" style={{ color: "var(--text-primary)" }}>|</span>
                </motion.span>
              </AnimatePresence>
            )}
          </h2>

          <p
            className="mx-auto mt-6 max-w-lg text-base leading-relaxed md:mx-0 md:text-lg border-l-2 pl-4"
            style={{ 
              color: "var(--text-secondary)",
              borderColor: "var(--border-strong)"
            }}
          >
            I turn complex problems into interfaces people understand — and data into stories people remember.
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
              className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-black shadow-lg transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--accent-gradient)" }}
            >
              View My Work
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </motion.a>
            <motion.a
              variants={buttonItem}
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border px-7 py-3.5 text-sm font-bold transition-transform hover:-translate-y-0.5"
              style={{
                borderColor: "var(--border-strong)",
                color: "var(--text-primary)",
              }}
            >
              <FiDownload />
              Resume
            </motion.a>
            <motion.a
              variants={buttonItem}
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full px-4 py-3.5 text-sm font-semibold transition-transform hover:-translate-y-0.5 hover:text-white"
              style={{ color: "var(--text-secondary)" }}
            >
              <FiMail />
              Contact Me
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Image column (Creative Control Room / System View) */}
        <motion.div
          variants={fadeLeft}
          initial="hidden"
          animate="visible"
          className="order-1 flex items-center justify-center md:order-2 w-full relative z-10 min-h-[400px] lg:min-h-[500px]"
        >
          <div className="relative w-full max-w-[340px] md:max-w-[400px] lg:max-w-[460px] flex items-center justify-center">
            
            {/* --- GLOW & AURA EFFECTS --- */}
            
            {/* 1. Deep Atmospheric Bloom (Wide, soft) */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
              animate={prefersReducedMotion ? {} : { opacity: [0.4, 0.6, 0.4] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="h-[400px] w-[400px] md:h-[500px] md:w-[500px] lg:h-[600px] lg:w-[600px] rounded-full blur-[100px] bg-gradient-to-tr from-[#FF5404]/30 to-[#F5DEBC]/10 mix-blend-screen" />
            </motion.div>

            {/* 2. Core Radial Glow (Strongest near the edge of the image) */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
              animate={prefersReducedMotion ? {} : { opacity: [0.7, 0.9, 0.7], scale: [1, 1.02, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="h-[280px] w-[280px] md:h-[320px] md:w-[320px] lg:h-[380px] lg:w-[380px] rounded-full blur-[40px] bg-[#FF5404]/50 shadow-[0_0_80px_#FF5404] mix-blend-screen" />
            </motion.div>

            {/* 3. Glowing Concentric Rings (Behind the photo) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <motion.div
                className="absolute h-[340px] w-[340px] md:h-[400px] md:w-[400px] lg:h-[440px] lg:w-[440px] rounded-full border border-[#FF5404]/40 shadow-[0_0_15px_rgba(255,84,4,0.4)]"
                animate={prefersReducedMotion ? {} : { scale: [1, 1.05, 1], opacity: [0.5, 0.2, 0.5] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute h-[380px] w-[380px] md:h-[460px] md:w-[460px] lg:h-[520px] lg:w-[520px] rounded-full border border-[#F5DEBC]/20 shadow-[0_0_20px_rgba(245,222,188,0.2)]"
                animate={prefersReducedMotion ? {} : { scale: [1.02, 1, 1.02], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute h-[420px] w-[420px] md:h-[520px] md:w-[520px] lg:h-[600px] lg:w-[600px] rounded-full border border-[#FF5404]/10 shadow-[0_0_25px_rgba(255,84,4,0.1)]"
                animate={prefersReducedMotion ? {} : { rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              >
                {/* Floating Particles on outer ring */}
                <div className="absolute top-0 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF5404] blur-[1px] shadow-[0_0_10px_#FF5404,0_0_20px_#FF5404]" />
                <div className="absolute bottom-1/4 right-[10%] h-1.5 w-1.5 rounded-full bg-[#F5DEBC] blur-[0.5px] shadow-[0_0_8px_#F5DEBC]" />
                <div className="absolute top-1/3 left-[5%] h-1 w-1 rounded-full bg-[#FF5404] shadow-[0_0_6px_#FF5404]" />
              </motion.div>
            </div>

            {/* Profile Image Node */}
            <motion.div
              variants={floating}
              animate="animate"
              className="relative z-20 h-64 w-64 md:h-72 md:w-72 lg:h-[340px] lg:w-[340px] rounded-full shadow-[0_0_40px_rgba(0,0,0,0.5)] p-[2px]"
              style={{ background: "linear-gradient(135deg, #FF5404 0%, rgba(245,222,188,0.4) 100%)" }}
            >
              <div
                className="h-full w-full overflow-hidden rounded-full bg-[#071925]"
              >
                <img
                  src={profile.profileImage}
                  alt={`Portrait of ${profile.name}`}
                  className="h-full w-full object-cover object-top transition-transform duration-700 hover:scale-105"
                  width={340}
                  height={340}
                  fetchPriority="high"
                />
              </div>
            </motion.div>

            {/* FLOATING SYSTEM ELEMENTS */}
            
            {/* 1. UX PROCESS Card */}
            <motion.div
              className="glass absolute -left-8 top-[10%] z-30 flex items-center gap-3 rounded-xl px-4 py-2.5 shadow-xl hidden sm:flex"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/5" style={{ color: "var(--text-primary)" }}>
                <FiFigma size={14} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono tracking-wider opacity-60" style={{ color: "var(--text-primary)" }}>UX PROCESS</span>
                <span className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>Wireframing</span>
              </div>
            </motion.div>

            {/* 2. DATA STORY Card / Metric */}
            <motion.div
              className="glass absolute -right-4 bottom-[20%] z-30 flex items-center gap-3 rounded-xl px-4 py-3 shadow-xl hidden sm:flex border"
              style={{ borderColor: "var(--border-soft)" }}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-mono tracking-wider uppercase" style={{ color: "var(--accent-blue)" }}>Data Story</span>
                <div className="flex items-end gap-2">
                  <span className="text-lg font-bold leading-none" style={{ color: "var(--text-primary)" }}>94%</span>
                  <span className="text-[10px] leading-tight pb-0.5" style={{ color: "var(--text-secondary)" }}>Clarity<br/>Score</span>
                </div>
              </div>
              <div className="h-8 w-8 ml-1 opacity-80" style={{ color: "var(--accent-blue)" }}>
                <FiPieChart size={32} strokeWidth={1.5} />
              </div>
            </motion.div>

            {/* 3. Small Insight / Metric Node */}
            <motion.div
              className="absolute -right-6 top-[25%] z-10 flex h-10 w-10 items-center justify-center rounded-full border shadow-lg backdrop-blur-md"
              style={{ background: "var(--surface)", borderColor: "var(--border-soft)", color: "var(--text-primary)" }}
              animate={{ y: [0, -12, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <FiActivity size={16} style={{ color: "var(--accent-blue)" }} />
            </motion.div>

            {/* 4. Mini Data Point (Top Left) */}
            <motion.div
              className="absolute left-6 -top-4 z-10 flex items-center gap-2"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent-blue)", boxShadow: "0 0 8px var(--accent-blue)" }} />
              <span className="text-[9px] font-mono tracking-widest opacity-40" style={{ color: "var(--text-primary)" }}>NODE.01</span>
            </motion.div>

            {/* Connecting line decoration */}
            <svg className="absolute inset-0 h-full w-full pointer-events-none z-0" style={{ overflow: 'visible' }}>
              <motion.circle 
                cx="8%" 
                cy="18%" 
                r="3" 
                fill="var(--accent-blue)"
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.path 
                d="M 10% 18% L 20% 18% L 25% 25%" 
                fill="none" 
                stroke="var(--border-strong)" 
                strokeWidth="1" 
                strokeDasharray="4 4"
              />
              <motion.circle 
                cx="92%" 
                cy="75%" 
                r="2" 
                fill="var(--text-primary)"
                animate={{ opacity: [0.2, 0.6, 0.2] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              />
              <motion.path 
                d="M 90% 75% L 85% 75% L 80% 68%" 
                fill="none" 
                stroke="var(--border-strong)" 
                strokeWidth="1" 
                strokeDasharray="2 4"
              />
            </svg>

          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: "var(--text-primary)" }}>Scroll</span>
        <span
          className="flex h-10 w-5 items-start justify-center rounded-full border p-1"
          style={{ borderColor: "var(--border-strong)" }}
        >
          <span
            className="h-2 w-1 rounded-full mt-1"
            style={{ background: "var(--accent-blue)" }}
          />
        </span>
      </motion.a>
    </section>
  );
}
