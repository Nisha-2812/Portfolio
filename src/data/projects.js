export const projectCategories = ["All", "UI/UX Design", "Data Analytics"];

/**
 * Each project's `links` array drives the buttons on its card.
 * `icon` maps to the ICON_MAP inside ProjectCard.jsx.
 * Replace the placeholder URLs with real Figma / dashboard / repo links.
 */
export const projects = [
  {
    id: "local-travel-agency",
    name: "Local Travel Agency Website",
    category: "UI/UX Design",
    year: "2026",
    description:
      "A responsive website for a local travel agency, featuring destination discovery, itinerary planning, and a streamlined booking process tailored for local tourists.",
    highlights: [
      "Interactive destination map with filtering",
      "Simplified booking flow with cost estimator",
    ],
    image: "/images/projects/travel-website-mockup.png",
    technologies: ["Figma", "Wireframing", "UI Design", "Responsive Design"],
    links: [
      { label: "Figma", url: "https://www.figma.com/design/Nkheb64AiLExavkrntYyRV/Travel-website?t=XcVmJquFoeUIHvP9-1", icon: "figma", primary: true },
      { label: "Case study", url: "https://www.figma.com/proto/Nkheb64AiLExavkrntYyRV/Travel-website?node-id=139-222&p=f&t=PE4TyOOP0cqBa8EF-1&scaling=min-zoom&content-scaling=fixed&page-id=139%3A2", icon: "link", primary: false },
    ],
  },
  {
    id: "fluxpay-fintech-app",
    name: "FluxPay — Fintech Payment App",
    category: "UI/UX Design",
    year: "2026",
    description:
      "A mobile payment app designed around speed and trust — one-tap transfers, clear transaction history and a bill-splitting flow that removes the usual friction from sending money.",
    highlights: [
      "Research-led onboarding that cuts setup to three screens",
      "Reusable component library for cards, sheets and states",
    ],
    image: "/images/projects/fluxpay-mockup.png",
    technologies: ["Figma", "Prototyping", "Design System", "User Research"],
    links: [
      { label: "Figma", url: "https://www.figma.com/design/DpBS2S18p4CxIVWCH4zxWC/FluxPay-mobile-app?t=XcVmJquFoeUIHvP9-1", icon: "figma", primary: true },
      { label: "Case study", url: "#", icon: "link", primary: false, disabled: true },
    ],
  },
  {
    id: "doctor-consultancy-app",
    name: "Doctor Consultancy Mobile App",
    category: "UI/UX Design",
    year: "2026",
    description:
      "A healthcare app for booking consultations, joining video appointments and tracking prescriptions — designed with accessible contrast and generous tap targets for every age group.",
    highlights: [
      "Appointment booking in under four taps",
      "Accessibility-first colour and typography choices",
    ],
    image: "/images/projects/doctor-app-mockup.png",
    technologies: ["Figma", "UX Research", "Prototyping", "Accessibility"],
    links: [
      { label: "Figma", url: "https://www.figma.com/design/gFF15UtYOWiNrvneQuni23/Doctor-Consultancy-App?t=XcVmJquFoeUIHvP9-1", icon: "figma", primary: true },
      { label: "Case study", url: "#", icon: "link", primary: false, disabled: true },
    ],
  },
  {
    id: "shopping-behavior-dashboard",
    name: "Customer Shopping Behavior Analysis",
    category: "Data Analytics",
    year: "2025",
    description:
      "A comprehensive analysis of customer shopping behavior using Python and PostgreSQL on 3,900 transactions. It uncovers insights into spending patterns, product preferences, and subscriber revenue, culminating in an interactive Power BI dashboard.",
    highlights: [
      "Cleaned data and engineered features (like age group binning) using Python (Pandas)",
      "Performed structured SQL analysis on revenue by demographics, product ratings, and shipping types",
      "Built an interactive Power BI dashboard and provided data-driven business recommendations"
    ],
    image: "/images/projects/customer-shopping-behavior.png",
    technologies: ["Python", "Pandas", "PostgreSQL", "Power BI"],
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
