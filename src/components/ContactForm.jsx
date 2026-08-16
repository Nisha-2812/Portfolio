import { useState } from "react";
import { motion } from "framer-motion";
import { FiSend, FiCheckCircle, FiAlertCircle, FiLoader } from "react-icons/fi";

const initialValues = { name: "", email: "", subject: "", message: "" };

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.subject.trim()) errors.subject = "Please add a subject.";
  if (!values.message.trim()) {
    errors.message = "Please write a message.";
  } else if (values.message.trim().length < 10) {
    errors.message = "Message should be at least 10 characters.";
  }
  return errors;
}

/**
 * Submission is abstracted here so it can later be wired to EmailJS,
 * Formspree, or a custom backend endpoint without touching the UI.
 * Never put private API keys in this file — call a backend route,
 * or use a service's public/client-safe key only.
 */
async function submitContactForm(values) {
  // Placeholder implementation. Replace with, e.g.:
  //   await emailjs.send(SERVICE_ID, TEMPLATE_ID, values, PUBLIC_KEY)
  // or
  //   await fetch("/api/contact", { method: "POST", body: JSON.stringify(values) })
  await new Promise((resolve) => setTimeout(resolve, 1200));
  return { ok: true };
}

export default function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

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

  const fieldStyle = {
    background: "var(--surface)",
    borderColor: "var(--border-soft)",
    color: "var(--text-primary)",
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={handleChange}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-colors focus:border-transparent"
            style={fieldStyle}
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-xs text-red-400">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-colors focus:border-transparent"
            style={fieldStyle}
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-xs text-red-400">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          value={values.subject}
          onChange={handleChange}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? "subject-error" : undefined}
          className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-colors focus:border-transparent"
          style={fieldStyle}
        />
        {errors.subject && (
          <p id="subject-error" className="mt-1.5 text-xs text-red-400">
            {errors.subject}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={handleChange}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="w-full resize-none rounded-xl border px-4 py-3 text-sm outline-none transition-colors focus:border-transparent"
          style={fieldStyle}
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-xs text-red-400">
            {errors.message}
          </p>
        )}
      </div>

      <motion.button
        type="submit"
        disabled={status === "loading"}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-black shadow-lg transition-opacity disabled:opacity-70 sm:w-auto"
        style={{ background: "var(--accent-gradient)" }}
      >
        {status === "loading" ? (
          <>
            <FiLoader className="animate-spin" /> Sending...
          </>
        ) : (
          <>
            <FiSend /> Send Message
          </>
        )}
      </motion.button>

      {status === "success" && (
        <p className="flex items-center gap-2 text-sm font-medium text-emerald-400">
          <FiCheckCircle /> Your message has been sent. I&apos;ll get back to you soon.
        </p>
      )}
      {status === "error" && (
        <p className="flex items-center gap-2 text-sm font-medium text-red-400">
          <FiAlertCircle /> Something went wrong. Please try again in a moment.
        </p>
      )}
    </form>
  );
}
