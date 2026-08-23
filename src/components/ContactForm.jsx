import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiCheckCircle, FiAlertCircle, FiLoader } from "react-icons/fi";

const initialValues = { name: "", email: "", project: "", message: "" };

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Name is required.";
  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Invalid email format.";
  }
  if (!values.project.trim()) errors.project = "What are we building?";
  if (!values.message.trim()) errors.message = "Don't forget the message!";
  return errors;
}

async function submitContactForm(values) {
  // Placeholder simulation
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return { ok: true };
}

export default function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("loading");
    try {
      const result = await submitContactForm(values);
      if (result.ok) {
        setStatus("success");
        setValues(initialValues);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Decorative Floating Elements */}
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-6 -right-6 text-3xl z-20 pointer-events-none drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
      >
        ✨
      </motion.div>
      <motion.div 
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-5 -left-8 text-xs font-mono px-4 py-2 bg-[#09909D]/10 text-[#F7D8B9] rounded-full border border-[#09909D]/20 z-20 backdrop-blur-xl shadow-xl"
      >
        no boring emails, promise.
      </motion.div>

      <motion.div 
        className="relative rounded-3xl p-6 sm:p-8 overflow-hidden shadow-2xl"
        style={{
          background: "linear-gradient(145deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 30px 60px -12px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.05)"
        }}
      >
        {/* Chat Interface Header */}
        <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-5">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
            <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
          </div>
          <span className="text-xs font-mono text-gray-400 ml-3 flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]" /> 
            New Message
          </span>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-5 relative z-10">
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="flex-1">
              <input
                name="name"
                type="text"
                placeholder="Your Name"
                value={values.name}
                onChange={handleChange}
                className="w-full bg-black/5 dark:bg-white/[0.03] border border-black/10 dark:border-white/10 rounded-2xl px-5 py-4 text-sm outline-none focus:border-[#09909D]/50 focus:bg-black/10 dark:focus:bg-white/[0.06] transition-all"
                style={{ color: "var(--text-primary)" }}
              />
              {errors.name && <p className="mt-1.5 text-xs text-red-400 ml-2">{errors.name}</p>}
            </div>
            <div className="flex-1">
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={values.email}
                onChange={handleChange}
                className="w-full bg-black/5 dark:bg-white/[0.03] border border-black/10 dark:border-white/10 rounded-2xl px-5 py-4 text-sm outline-none focus:border-[#09909D]/50 focus:bg-black/10 dark:focus:bg-white/[0.06] transition-all"
                style={{ color: "var(--text-primary)" }}
              />
              {errors.email && <p className="mt-1.5 text-xs text-red-400 ml-2">{errors.email}</p>}
            </div>
          </div>

          <div>
            <input
              name="project"
              type="text"
              placeholder="What are we building?"
              value={values.project}
              onChange={handleChange}
              className="w-full bg-black/5 dark:bg-white/[0.03] border border-black/10 dark:border-white/10 rounded-2xl px-5 py-4 text-sm outline-none focus:border-[#09909D]/50 focus:bg-black/10 dark:focus:bg-white/[0.06] transition-all"
              style={{ color: "var(--text-primary)" }}
            />
            {errors.project && <p className="mt-1.5 text-xs text-red-400 ml-2">{errors.project}</p>}
          </div>

          <div>
            <textarea
              name="message"
              rows={4}
              placeholder="Type your message here..."
              value={values.message}
              onChange={handleChange}
              className="w-full resize-none bg-black/5 dark:bg-white/[0.03] border border-black/10 dark:border-white/10 rounded-2xl px-5 py-4 text-sm outline-none focus:border-[#09909D]/50 focus:bg-black/10 dark:focus:bg-white/[0.06] transition-all"
              style={{ color: "var(--text-primary)" }}
            />
            {errors.message && <p className="mt-1.5 text-xs text-red-400 ml-2">{errors.message}</p>}
          </div>

          <motion.button
            type="submit"
            disabled={status === "loading"}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full relative overflow-hidden group rounded-2xl px-6 py-4 mt-2 text-sm font-bold text-white transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            style={{
              background: "var(--accent-gradient)",
              boxShadow: "0 10px 30px -10px rgba(9, 144, 157, 0.5)"
            }}
          >
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center justify-center gap-2 tracking-wide">
              {status === "loading" ? (
                <><FiLoader className="animate-spin text-lg" /> TRANSMITTING...</>
              ) : (
                <><FiSend className="text-lg group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> SEND TO INBOX</>
              )}
            </span>
          </motion.button>

          <AnimatePresence>
            {status === "success" && (
              <motion.p 
                initial={{ opacity: 0, height: 0, marginTop: 0 }} 
                animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center justify-center gap-2 text-sm font-medium text-emerald-400 bg-emerald-400/10 py-3 rounded-xl border border-emerald-400/20"
              >
                <FiCheckCircle /> Message landed safely! I'll be in touch.
              </motion.p>
            )}
            {status === "error" && (
              <motion.p 
                initial={{ opacity: 0, height: 0, marginTop: 0 }} 
                animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center justify-center gap-2 text-sm font-medium text-red-400 bg-red-400/10 py-3 rounded-xl border border-red-400/20"
              >
                <FiAlertCircle /> Oops, signal lost. Try again in a moment.
              </motion.p>
            )}
          </AnimatePresence>
        </form>
      </motion.div>
    </div>
  );
}
