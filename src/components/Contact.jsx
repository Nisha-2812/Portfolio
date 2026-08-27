import { motion } from "framer-motion";
import { FiMail, FiMapPin, FiLinkedin, FiInstagram, FiArrowRight } from "react-icons/fi";
import ContactForm from "./ContactForm";
import { fadeUp } from "../utils/animations";

export default function Contact() {
  const bubbles = [
    { icon: FiMail, label: "Email", href: "mailto:barmannisha648@gmail.com", color: "#FF5404", orbitClass: "top-[-5%] left-[10%] sm:top-[5%] sm:left-[15%]" },
    { icon: FiLinkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/nisha-rani-barman-a4787b287/", color: "#FF5404", orbitClass: "top-[15%] right-[-5%] sm:top-[20%] sm:right-[0%]" },
    { icon: FiInstagram, label: "Instagram", href: "https://www.instagram.com/nisha.official28?igsi=Ym15aTY0MHYyYzkz", color: "#F5DEBC", orbitClass: "bottom-[15%] right-[5%] sm:bottom-[20%] sm:right-[10%]" },
    { icon: FiMapPin, label: "Location", hoverText: "Siliguri, India", href: null, color: "#FF5404", orbitClass: "bottom-[0%] left-[5%] sm:bottom-[5%] sm:left-[10%]" },
  ];

  return (
    <section id="contact" className="relative py-32 overflow-hidden" style={{ background: "#071925" }}>
      {/* Texture & Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      {/* Background glow effects */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full blur-[150px] pointer-events-none opacity-30 bg-[#FF5404]" />
      <div className="absolute bottom-1/4 left-[-10%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full blur-[120px] pointer-events-none opacity-10 bg-[#FF5404]" />

      {/* Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#FF5404] rounded-full shadow-[0_0_8px_#FF5404]"
            initial={{
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
              y: Math.random() * 800,
              opacity: Math.random() * 0.5 + 0.1
            }}
            animate={{
              y: [null, Math.random() * -100 - 50],
              opacity: [null, 0.8, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-10 relative z-10">
        
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-24 relative">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 uppercase text-[#F5DEBC]" 
            style={{ fontFamily: 'var(--font-display, sans-serif)' }}
          >
            Let’s Make <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5404] to-[#F5DEBC]">Something Cool.</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base md:text-lg font-medium max-w-xl mx-auto text-[#F5DEBC]/70"
          >
            Got an idea, project, or random thought? Let’s turn it into something real.
          </motion.p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-12 items-center">
          
          {/* Left Side: Creative Contact Hub */}
          <div className="relative h-[380px] sm:h-[450px] lg:h-[550px] w-full flex items-center justify-center">
            
            {/* Orbital Rings */}
            <motion.div 
              className="absolute w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] rounded-full border border-white/5"
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="absolute w-[320px] h-[320px] sm:w-[440px] sm:h-[440px] rounded-full border border-white/5 border-dashed"
              animate={{ rotate: -360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            />

            {/* Orbiting Glassmorphism Cards */}
            {bubbles.map((bubble, i) => (
              <motion.a
                key={i}
                href={bubble.href}
                target={bubble.href ? "_blank" : undefined}
                rel={bubble.href ? "noreferrer noopener" : undefined}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, zIndex: 30 }}
                className={`absolute ${bubble.orbitClass} flex items-center gap-3 p-2.5 pr-5 rounded-2xl backdrop-blur-xl border border-white/10 shadow-2xl group ${bubble.href ? 'cursor-pointer' : 'cursor-default'}`}
                style={{ 
                  background: "rgba(10, 34, 51, 0.7)",
                }}
              >
                {/* Glow behind card on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl z-0" style={{ background: bubble.color, opacity: 0.15 }} />
                
                <div className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-white bg-white/5 group-hover:bg-white/10 transition-colors border border-white/5" style={{ color: bubble.color }}>
                  <bubble.icon size={18} />
                </div>
                <div className="relative z-10 flex flex-col">
                  <span className="text-[9px] uppercase tracking-wider text-white/40">{bubble.label}</span>
                  <span className="font-semibold text-sm text-white/90 group-hover:text-white transition-colors whitespace-nowrap">
                    {bubble.hoverText ? bubble.hoverText : bubble.label}
                  </span>
                </div>
              </motion.a>
            ))}

            {/* Central Visual Piece */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="relative group z-10 flex flex-col items-center justify-center cursor-crosshair"
            >
              <div className="absolute inset-0 rounded-full blur-[40px] opacity-30 bg-[#FF5404] group-hover:opacity-50 transition-opacity duration-500" />
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full flex flex-col items-center justify-center gap-2 backdrop-blur-2xl border border-white/10 shadow-2xl bg-[#0A2233]/90">
                <span className="font-black tracking-widest text-base sm:text-lg text-[#F5DEBC] group-hover:text-white transition-colors">LET'S TALK</span>
                <FiArrowRight className="text-xl text-[#FF5404] group-hover:translate-x-2 transition-transform" />
              </div>
            </motion.div>

            {/* Microcopy decoration */}
            <motion.div 
              className="absolute bottom-[-10%] sm:bottom-0 left-[50%] -translate-x-1/2 text-[#F5DEBC]/60 font-medium text-sm text-center w-full"
            >
              Have an idea? Let’s build something meaningful.
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
