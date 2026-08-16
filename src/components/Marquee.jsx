const ITEMS = [
  "UI/UX Design",
  "Figma",
  "Prototyping",
  "Design Systems",
  "User Research",
  "Power BI",
  "SQL",
  "Python",
  "Excel",
  "Data Storytelling",
];

/**
 * Edge-to-edge scrolling keyword strip. Pure CSS animation (see .marquee-track
 * in index.css) so it costs nothing on the main thread, and it pauses on hover.
 */
export default function Marquee() {
  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden border-y py-5"
      style={{
        borderColor: "var(--border-soft)",
        background: "var(--surface)",
      }}
    >
      {/* Fade masks on both edges */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24"
        style={{
          background: "linear-gradient(90deg, var(--bg-primary), transparent)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24"
        style={{
          background: "linear-gradient(270deg, var(--bg-primary), transparent)",
        }}
      />

      <div className="marquee-track flex w-max items-center gap-8">
        {/* Rendered twice for a seamless -50% loop */}
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center gap-8">
            {ITEMS.map((item) => (
              <span key={item} className="flex items-center gap-8">
                <span
                  className="font-display whitespace-nowrap text-lg font-medium sm:text-xl"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {item}
                </span>
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: "var(--accent-blue)", opacity: 0.7 }}
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
