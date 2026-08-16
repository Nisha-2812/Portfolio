import { motion } from "framer-motion";
import { FiMail, FiMapPin, FiLinkedin, FiInstagram } from "react-icons/fi";
import { profile } from "../data/profile";
import { socialLinks } from "../data/socialLinks";
import ContactForm from "./ContactForm";
import SectionHeading from "./SectionHeading";
import { fadeLeft, fadeRight, viewportOnce } from "../utils/animations";

const INFO_ITEMS = [
  { icon: FiMail, label: "Email", value: profile.email, href: socialLinks.email },
  { icon: FiMapPin, label: "Location", value: profile.location, href: null },
  { icon: FiLinkedin, label: "LinkedIn", value: "/in/yourusername", href: socialLinks.linkedin },
  { icon: FiInstagram, label: "Instagram", value: "@yourusername", href: socialLinks.instagram },
];

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Contact"
          title="Let's Work Together"
          subtitle="Have a project in mind or want to work together? Feel free to get in touch."
        />

        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-5 md:gap-8">
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="md:col-span-2"
          >
            <div className="space-y-4">
              {INFO_ITEMS.map(({ icon: Icon, label, value, href }) => {
                const content = (
                  <div className="glass flex items-center gap-4 rounded-2xl px-5 py-4">
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg"
                      style={{
                        background: "var(--surface-strong)",
                        color: "var(--accent-blue)",
                      }}
                    >
                      <Icon aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span
                        className="block text-xs"
                        style={{ color: "var(--text-tertiary)" }}
                      >
                        {label}
                      </span>
                      <span
                        className="block truncate text-sm font-medium"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {value}
                      </span>
                    </span>
                  </div>
                );
                return href ? (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noreferrer noopener"
                    className="block transition-transform hover:-translate-y-0.5"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={label}>{content}</div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="glass rounded-2xl p-6 md:col-span-3 md:p-8"
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
