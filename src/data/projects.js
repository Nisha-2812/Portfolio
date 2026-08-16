export const projectCategories = ["All", "UI/UX Design", "Data Analytics"];

/**
 * Each project's `links` array drives the buttons on its card.
 * `icon` maps to the ICON_MAP inside ProjectCard.jsx.
 * Replace the placeholder URLs with real Figma / dashboard / repo links.
 */
export const projects = [
  {
    id: "fluxpay-fintech-app",
    name: "FluxPay — Fintech Payment App",
    category: "UI/UX Design",
    year: "2025",
    description:
      "A mobile payment app designed around speed and trust — one-tap transfers, clear transaction history and a bill-splitting flow that removes the usual friction from sending money.",
    highlights: [
      "Research-led onboarding that cuts setup to three screens",
      "Reusable component library for cards, sheets and states",
    ],
    image: "/images/projects/fluxpay.svg",
    technologies: ["Figma", "Prototyping", "Design System", "User Research"],
    links: [
      { label: "View Prototype", url: "https://figma.com/your-fluxpay-prototype", icon: "figma", primary: true },
    ],
  },
  {
    id: "ecommerce-web-design",
    name: "E-Commerce Website Design",
    category: "UI/UX Design",
    year: "2025",
    description:
      "A responsive shopping experience covering discovery, product detail, cart and checkout — built on a consistent grid and type scale so the catalogue stays readable at every breakpoint.",
    highlights: [
      "Checkout redesigned into a single scannable step",
      "Full light and dark theme variants",
    ],
    image: "/images/projects/ecommerce.svg",
    technologies: ["Figma", "Wireframing", "UI Design", "Responsive Design"],
    links: [
      { label: "View Prototype", url: "https://figma.com/your-ecommerce-prototype", icon: "figma", primary: true },
    ],
  },
  {
    id: "doctor-consultancy-app",
    name: "Doctor Consultancy Mobile App",
    category: "UI/UX Design",
    year: "2024",
    description:
      "A healthcare app for booking consultations, joining video appointments and tracking prescriptions — designed with accessible contrast and generous tap targets for every age group.",
    highlights: [
      "Appointment booking in under four taps",
      "Accessibility-first colour and typography choices",
    ],
    image: "/images/projects/doctor-app.svg",
    technologies: ["Figma", "UX Research", "Prototyping", "Accessibility"],
    links: [
      { label: "View Prototype", url: "https://figma.com/your-doctor-app-prototype", icon: "figma", primary: true },
    ],
  },
  {
    id: "shopping-behavior-dashboard",
    name: "Customer Shopping Behaviour Analysis",
    category: "Data Analytics",
    year: "2025",
    description:
      "An interactive dashboard segmenting customers by purchase patterns, category affinity and repeat-buy behaviour, surfacing which cohorts actually drive revenue.",
    highlights: [
      "RFM segmentation across the full customer base",
      "Cohort retention view by acquisition month",
    ],
    image: "/images/projects/shopping-analysis.svg",
    technologies: ["Power BI", "SQL", "Python", "Excel"],
    links: [
      { label: "View Dashboard", url: "https://your-dashboard-link.example.com", icon: "chart", primary: true },
    ],
  },
  {
    id: "sales-data-dashboard",
    name: "Sales Data Analysis Dashboard",
    category: "Data Analytics",
    year: "2024",
    description:
      "A sales performance dashboard tracking revenue trends, regional splits and top products, with drill-downs that take a manager from headline number to root cause in a couple of clicks.",
    highlights: [
      "Region and product drill-through in two clicks",
      "Automated monthly refresh from the source data",
    ],
    image: "/images/projects/sales-analysis.svg",
    technologies: ["Power BI", "SQL", "Excel", "Data Visualization"],
    links: [
      { label: "View Dashboard", url: "https://your-dashboard-link.example.com", icon: "chart", primary: true },
    ],
  },
];
