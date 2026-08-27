import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiCheckCircle, FiAlertCircle, FiLoader, FiArrowRight } from "react-icons/fi";

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

const InputField = ({ label, name, type = "text", value, error, isFocused, onFocus, onBlur, onChange }) => {
  const hasValue = value.length > 0;
  
  return (
    <div className="relative mb-5">
      <label 
        className={`absolute left-4 transition-all duration-300 pointer-events-none uppercase tracking-wider font-semibold z-10 ${
          isFocused || hasValue ? "top-2 text-[9px] text-[#FF5404]" : "top-4 text-xs text-white/40"
        }`}
      >
        {label}
      </label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        className={`w-full bg-[#0A2233]/40 border ${
          error ? "border-red-500/50" : isFocused ? "border-[#FF5404]/50" : "border-white/10"
        } rounded-xl px-4 pt-6 pb-2 text-sm text-white outline-none focus:bg-[#0A2233]/60 transition-all backdrop-blur-md`}
      />
      {error && <p className="absolute -bottom-4 right-0 text-[10px] text-red-400">{error}</p>}
    </div>
  );
};

const TextAreaField = ({ label, name, value, error, isFocused, onFocus, onBlur, onChange }) => {
  const hasValue = value.length > 0;
  
  return (
    <div className="relative mb-5">
      <label 
        className={`absolute left-4 transition-all duration-300 pointer-events-none uppercase tracking-wider font-semibold z-10 ${
          isFocused || hasValue ? "top-2 text-[9px] text-[#FF5404]" : "top-4 text-xs text-white/40"
        }`}
      >
        {label}
      </label>
      <textarea
        name={name}
        rows={4}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        className={`w-full resize-none bg-[#0A2233]/40 border ${
          error ? "border-red-500/50" : isFocused ? "border-[#FF5404]/50" : "border-white/10"
        } rounded-xl px-4 pt-6 pb-2 text-sm text-white outline-none focus:bg-[#0A2233]/60 transition-all backdrop-blur-md`}
      />
      {error && <p className="absolute -bottom-4 right-0 text-[10px] text-red-400">{error}</p>}
    </div>
  );
};

export default function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [focusedField, setFocusedField] = useState(null);

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
      {/* Soft orange glow entering from the right side */}
      <div className="absolute top-1/4 -right-12 w-32 h-64 bg-[#FF5404]/20 blur-[60px] pointer-events-none rounded-full z-0" />

      <motion.div 
        className="relative z-10 rounded-2xl p-6 sm:p-10 shadow-2xl overflow-hidden"
        style={{
          background: "linear-gradient(145deg, rgba(10,34,51,0.8) 0%, rgba(10,34,51,0.4) 100%)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderTopColor: "rgba(255,255,255,0.15)",
          borderLeftColor: "rgba(255,255,255,0.15)",
        }}
      >
        {/* Header */}
        <div className="mb-8">
          <h3 className="text-[11px] font-mono tracking-widest text-[#FF5404] uppercase mb-2">Start a conversation</h3>
          <h4 className="text-xl md:text-2xl font-bold text-white tracking-tight">Tell me what you're working on.</h4>
        </div>

        <form onSubmit={handleSubmit} noValidate className="relative z-10 flex flex-col">
          <div className="flex flex-col sm:flex-row gap-0 sm:gap-4">
            <div className="flex-1">
              <InputField 
                label="Name" 
                name="name" 
                value={values.name}
                error={errors.name}
                isFocused={focusedField === "name"}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                onChange={handleChange}
              />
            </div>
            <div className="flex-1">
              <InputField 
                label="Email" 
                name="email" 
                type="email" 
                value={values.email}
                error={errors.email}
                isFocused={focusedField === "email"}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                onChange={handleChange}
              />
            </div>
          </div>

          <InputField 
            label="Project / Idea" 
            name="project" 
            value={values.project}
            error={errors.project}
            isFocused={focusedField === "project"}
            onFocus={() => setFocusedField("project")}
            onBlur={() => setFocusedField(null)}
            onChange={handleChange}
          />
          <TextAreaField 
            label="Message" 
            name="message" 
            value={values.message}
            error={errors.message}
            isFocused={focusedField === "message"}
            onFocus={() => setFocusedField("message")}
            onBlur={() => setFocusedField(null)}
            onChange={handleChange}
          />

          <motion.button
            type="submit"
            disabled={status === "loading"}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="w-full relative overflow-hidden group rounded-xl px-6 py-4 mt-2 text-sm font-bold text-white transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            style={{
              background: "linear-gradient(135deg, #FF5404 0%, #d94500 100%)",
              boxShadow: "0 8px 25px -8px rgba(255, 84, 4, 0.6)"
            }}
          >
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {status === "loading" ? (
              <><FiLoader className="animate-spin text-lg" /> SENDING...</>
            ) : (
              <>SEND MESSAGE <FiArrowRight className="text-lg group-hover:translate-x-1 transition-transform" /></>
            )}
          </motion.button>

          <AnimatePresence>
            {status === "success" && (
              <motion.div 
                initial={{ opacity: 0, y: 10, height: 0 }} 
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 flex items-center justify-center gap-2 text-xs font-medium text-emerald-400 bg-emerald-400/10 py-3 rounded-lg border border-emerald-400/20"
              >
                <FiCheckCircle size={14} /> Message sent successfully! I'll get back to you soon.
              </motion.div>
            )}
            {status === "error" && (
              <motion.div 
                initial={{ opacity: 0, y: 10, height: 0 }} 
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 flex items-center justify-center gap-2 text-xs font-medium text-red-400 bg-red-400/10 py-3 rounded-lg border border-red-400/20"
              >
                <FiAlertCircle size={14} /> Something went wrong. Please try again.
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </motion.div>
    </div>
  );
}
