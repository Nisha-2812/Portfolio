# Nisha Rani Barman — Portfolio

A single-page React + Vite + Tailwind CSS portfolio for a UI/UX designer and data
analyst, with Framer Motion animations, a cursor-reactive background glow, a
scroll-progress bar, filterable project cards with pointer-tracked 3D tilt, and a
light/dark theme switch.

## Stack
React 18 · Vite 6 · Tailwind CSS v4 · Framer Motion · React Icons

## Run locally

```bash
npm install
npm run dev
```

## Build for production

```bash
npm run build
npm run preview   # optional local check of the production build
```

## Sections
Hero → keyword marquee → stats → About → Skills → Design Process → Projects → Contact → Footer

## Deploy (Vercel / Netlify)
- **Vercel:** import the repo, framework preset "Vite", build command `npm run build`, output directory `dist`.
- **Netlify:** build command `npm run build`, publish directory `dist`.

No environment variables are required for the current placeholder contact form.

## Files to customize

| File | What to change |
| --- | --- |
| `src/data/profile.js` | Name, role, tagline, **email**, location, education, about paragraphs |
| `src/data/socialLinks.js` | LinkedIn / Behance / Instagram / GitHub / email URLs |
| `src/data/projects.js` | Project details and the **Figma / dashboard links** |
| `src/data/skills.js` | Skill categories, items and proficiency labels |
| `src/data/process.js` | Stats strip values and the design-process steps |
| `src/data/navLinks.js` | Navigation items (shared by navbar and footer) |
| `public/images/profile.svg` | Replace the illustrated placeholder with a real photo (`.jpg`/`.png` is fine — update `profileImage` in `profile.js` to match) |
| `public/images/projects/*.svg` | Replace the demo mockups with real screenshots (update `image` in `projects.js` to match) |
| `public/images/profile.png` | Social-preview image only (`og:image` / `twitter:image` in `index.html`). Swap in a real 1200×630 PNG or JPG — crawlers do not render SVG |
| `public/resume/Nisha_Rani_Barman_Resume.pdf` | Replace with the real resume PDF |
| `src/components/ContactForm.jsx` | Wire `submitContactForm()` to EmailJS, Formspree or an API route |

> The contact form currently simulates a send. Connect it to a real service before
> going live, and keep private API keys server-side — never in this frontend code.

## Demo assets
All images are hand-built SVG mockups (app screens, browser layout, Power BI-style
dashboards) — self-contained, crisp at any size, and no network request. Swap them
for real screenshots when available. `scripts/gen-resume-placeholder.cjs` generated
the stand-in resume PDF and can be deleted once the real one is in place.

## Pointer effects
Two cooperating layers, both gated behind `usePointerFine()` — they render only for
a fine pointer (mouse/trackpad) with no `prefers-reduced-motion` preference:

- **`CursorGlow.jsx`** — ambient background: a dot grid revealed by a spotlight mask,
  plus fast and slow accent glows that lag at different rates for parallax. Touch and
  reduced-motion visitors still get the static corner glows.
- **`CustomCursor.jsx`** — a precise dot (no smoothing, so aim is unaffected), a springy
  ring that grows over links/buttons and becomes a caret bar over text fields, and a
  four-dot comet trail. Hides the native cursor only while mounted; text inputs keep
  their native caret.

Both coalesce `mousemove` to one update per frame and animate via motion values, so
pointer movement triggers no React re-renders.

## Notes
- Theme preference is stored in `localStorage` and follows the OS setting on first visit.
- The marquee, project tilt and reveal animations all respect `prefers-reduced-motion`.
