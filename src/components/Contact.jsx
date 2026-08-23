import { motion } from "framer-motion";
import { FiMail, FiMapPin, FiLinkedin, FiInstagram, FiArrowRight } from "react-icons/fi";
import ContactForm from "./ContactForm";
import { fadeUp } from "../utils/animations";

export default function Contact() {
  const bubbles = [
    { icon: FiMail, label: "Email", href: "mailto:barmannisha648@gmail.com", color: "#09909D", position: "top-10 left-[5%] md:left-[10%]" },
    { icon: FiLinkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/nisha-rani-barman-a4787b287/", color: "#0C5660", position: "top-[30%] right-[5%] md:right-[10%]" },
    { icon: FiInstagram, label: "Instagram", href: "https://www.instagram.com/nisha.official28?igsi=Ym15aTY0MHYyYzkz", color: "#F7D8B9", position: "bottom-[25%] left-[0%] md:left-[5%]" },
    { icon: FiMapPin, label: "Location", hoverText: "Siliguri, West Bengal, India", href: null, color: "#09909D", position: "bottom-[5%] right-[15%] md:right-[20%]" },
  ];

  return (
    <section id="contact" className="relative py-32 overflow-hidden" style={{ background: "var(--bg-primary)" }}>
      {/* Background glow effects */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none opacity-50" style={{ background: "var(--accent-blue)" }} />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none opacity-30" style={{ background: "var(--surface-strong)" }} />

      <div className="mx-auto max-w-7xl px-6 md:px-10 relative z-10">
        
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-24 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full border border-[#09909D]/30 bg-[#09909D]/10 text-[#09909D] text-xs font-mono flex items-center gap-2 whitespace-nowrap shadow-lg backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-[#09909D] animate-pulse shadow-[0_0_8px_#09909D]" />
            currently accepting interesting ideas ✦
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 uppercase" 
            style={{ fontFamily: 'var(--font-display, sans-serif)', color: "var(--text-primary)" }}
          >
            Let’s Make <br/><span className="text-transparent bg-clip-text" style={{ backgroundImage: "var(--accent-gradient)" }}>Something Cool.</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl font-medium max-w-xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            Got an idea, project, or random thought? Let’s turn it into something real.
          </motion.p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          
          {/* Left Side: Floating Bubbles Workspace */}
          <div className="relative h-[350px] sm:h-[400px] lg:h-[500px] w-full flex items-center justify-center">
            {bubbles.map((bubble, i) => (
              <motion.a
                key={i}
                href={bubble.href}
                target={bubble.href ? "_blank" : undefined}
                rel={bubble.href ? "noreferrer noopener" : undefined}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                animate={{ y: [0, -12, 0] }}
                transition={{ 
                  y: { duration: 4 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: i * 0.5 },
                  opacity: { delay: i * 0.15 },
                  scale: { delay: i * 0.15 }
                }}
                whileHover={{ scale: 1.1, zIndex: 30 }}
                className={`absolute ${bubble.position} flex items-center gap-3 p-3 pr-5 rounded-full backdrop-blur-xl border border-white/10 shadow-xl group ${bubble.href ? 'cursor-pointer' : 'cursor-default'}`}
                style={{ 
                  background: "rgba(255, 255, 255, 0.03)",
                  boxShadow: `0 10px 30px -10px ${bubble.color}40, inset 0 0 0 1px rgba(255,255,255,0.05)`
                }}
              >
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-transform group-hover:scale-110 group-hover:rotate-12 shadow-inner"
                  style={{ backgroundColor: bubble.color }}
                >
                  <bubble.icon size={18} />
                </div>
                <span className="font-semibold text-sm text-gray-300 group-hover:text-white transition-colors relative whitespace-nowrap">
                  <span className={bubble.hoverText ? "group-hover:hidden" : ""}>{bubble.label}</span>
                  {bubble.hoverText && <span className="hidden group-hover:inline text-[#F7D8B9]">{bubble.hoverText}</span>}
                </span>
                
                {/* Connecting glow on hover */}
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ boxShadow: `0 0 20px 2px ${bubble.color}30` }} />
              </motion.a>
            ))}

            {/* Central Glowing Button / Orb */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="relative group cursor-crosshair z-10"
            >
              <div className="absolute inset-0 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" style={{ background: "var(--accent-gradient)" }} />
              <div className="relative border border-white/10 px-8 py-8 rounded-full flex flex-col items-center justify-center gap-2 shadow-2xl backdrop-blur-md" style={{ background: "var(--bg-primary)" }}>
                <span className="font-black tracking-widest text-lg transition-colors group-hover:text-[var(--accent-purple)]" style={{ color: "var(--text-primary)" }}>LET'S TALK</span>
                <FiArrowRight className="text-2xl group-hover:translate-x-2 transition-transform" style={{ color: "var(--accent-blue)" }} />
              </div>
            </motion.div>

            {/* Microcopy decoration */}
            <motion.div 
              animate={{ rotate: [-12, -8, -12] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[65%] left-[25%] text-gray-500 font-mono text-xs opacity-60 pointer-events-none"
            >
              drop me a message →
            </motion.div>
          </div>

          {/* Right Side: Message Window */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full flex justify-center lg:justify-end z-20 relative"
          >
            <ContactForm />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
