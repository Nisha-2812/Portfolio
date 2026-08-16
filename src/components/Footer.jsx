import { FiLinkedin, FiInstagram, FiGithub, FiMail } from "react-icons/fi";
import { SiBehance } from "react-icons/si";
import { profile } from "../data/profile";
import { socialLinks } from "../data/socialLinks";
import { NAV_LINKS } from "../data/navLinks";

// Only links with a value are rendered, so removing one from
// socialLinks.js removes it from the UI too.
const SOCIALS = [
  { icon: FiLinkedin, href: socialLinks.linkedin, label: "LinkedIn" },
  { icon: SiBehance, href: socialLinks.behance, label: "Behance" },
  { icon: FiInstagram, href: socialLinks.instagram, label: "Instagram" },
  { icon: FiGithub, href: socialLinks.github, label: "GitHub" },
  { icon: FiMail, href: socialLinks.email, label: "Email" },
].filter((s) => Boolean(s.href));

export default function Footer() {
  return (
    <footer
      className="relative border-t"
      style={{ borderColor: "var(--border-soft)" }}
    >
      <div className="mx-auto max-w-6xl px-6 py-12 md:px-10">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
          <div className="text-center md:text-left">
            <a
              href="#home"
              className="font-display text-lg font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              {profile.firstName}
              <span className="text-gradient">.</span>
            </a>
            <p
              className="mt-2 max-w-xs text-sm leading-relaxed"
              style={{ color: "var(--text-tertiary)" }}
            >
              {profile.role} based in {profile.location}.
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-opacity hover:opacity-70"
                style={{ color: "var(--text-secondary)" }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noreferrer noopener"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border text-sm transition-transform hover:-translate-y-0.5"
                style={{
                  borderColor: "var(--border-soft)",
                  color: "var(--text-secondary)",
                }}
              >
                <Icon aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <p
          className="mt-10 text-center text-xs"
          style={{ color: "var(--text-tertiary)" }}
        >
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
