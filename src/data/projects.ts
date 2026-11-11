import type { Project } from "@/types";

/**
 * Project data is intentionally centralised and typed.
 *
 * Notes for the owner:
 * - Only Streamnest has a verified live URL supplied by Nick. Other projects
 *   deliberately have no URL rather than an invented one.
 * - Stack entries describe technologies used on each build; review them before
 *   publishing.
 * - No performance statistics, client names or business results are stated.
 */
export const PROJECTS: Project[] = [
  {
    id: "streamnest",
    slug: "streamnest",
    index: "01",
    name: "Streamnest",
    category: "Streaming Platform",
    summary:
      "A streaming platform demo built to explore how a content catalogue can feel cinematic in the browser.",
    overview: [
      "Streamnest is a demo streaming product: a catalogue-first interface where content is the layout, not decoration. The build treats browsing as the primary experience — wide artwork, restrained chrome and type that steps back to let titles lead.",
      "The visual system is deliberately dark and quiet, with motion used to guide attention between rows and titles rather than to perform. It is a playground for interaction and pacing ideas that carry into production work.",
    ],
    role: "Full Stack Development",
    stack: ["React", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://streamnest-lake.vercel.app/",
    visual: { variant: "stream", tint: "#C8FF00", caption: "catalogue / stream" },
    layout: {
      row: 1,
      col: "1 / span 8",
      aspect: "16 / 10",
      aspectMobile: "4 / 3",
      offset: "0vh",
      parallax: 64,
    },
  },
  {
    id: "urbankix",
    slug: "urbankix",
    index: "02",
    name: "UrbanKix",
    category: "E-commerce",
    summary:
      "An e-commerce storefront exploring product presentation and a clear, unfussy path from browsing to buying.",
    overview: [
      "UrbanKix is a commerce build centred on the product: generous imagery, honest pricing hierarchy and a checkout journey that removes decisions instead of adding them.",
      "The interface keeps the storefront monochrome so photography and product colour carry the brand, with every control sized for thumbs first.",
    ],
    role: "Full Stack Development",
    stack: ["Laravel", "Livewire", "Tailwind CSS", "MySQL"],
    visual: { variant: "commerce", tint: "#FF6B3D", caption: "store / catalogue" },
    layout: {
      row: 1,
      col: "9 / span 4",
      aspect: "4 / 5",
      aspectMobile: "4 / 5",
      offset: "16vh",
      parallax: -48,
    },
  },
  {
    id: "time-commitment-service",
    slug: "time-commitment-service",
    index: "03",
    name: "Time Commitment Service",
    category: "Business Management System",
    summary:
      "An internal business management system rebuilt from a legacy VB6 desktop tool into a standalone web application.",
    overview: [
      "The Time Commitment Service began as a Visual Basic 6 desktop application. Rebuilding it as a web application meant translating years of accumulated business rules into a structure that could be maintained and extended.",
      "The result is a standalone system for internal operational data — built to be legible to the people who use it daily, with clear records, consistent patterns and no dependence on the old runtime.",
    ],
    role: "Full Stack Development",
    stack: ["Laravel", "Livewire", "Filament", "MySQL"],
    visual: { variant: "dashboard", tint: "#8FA6FF", caption: "operations / records" },
    layout: {
      row: 2,
      col: "2 / span 10",
      aspect: "21 / 9",
      aspectMobile: "4 / 3",
      offset: "8vh",
      parallax: 80,
    },
  },
  {
    id: "advanced-service-kiosk",
    slug: "advanced-service-kiosk",
    index: "04",
    name: "Advanced Service Kiosk",
    category: "Internal Tooling & Kiosk",
    summary:
      "An internal management application paired with a dedicated service kiosk interface for on-site use.",
    overview: [
      "This project pairs a back-office application with a kiosk surface: two very different audiences, one data model. Staff need density and control; the kiosk needs a single, unambiguous action at arm's length.",
      "Designing both at once kept the flows honest — every kiosk state maps to something staff can see and manage, and every staff action has a visible on-floor consequence.",
    ],
    role: "Full Stack Development",
    stack: ["Laravel", "Filament", "Livewire", "MySQL"],
    visual: { variant: "kiosk", tint: "#B6F0FF", caption: "queue / service" },
    layout: {
      row: 3,
      col: "8 / span 4",
      aspect: "3 / 4",
      aspectMobile: "4 / 5",
      offset: "0vh",
      parallax: -56,
    },
  },
  {
    id: "pharmacy-mis",
    slug: "pharmacy-mis",
    index: "05",
    name: "Pharmacy MIS",
    category: "Management Information System",
    summary:
      "A pharmacy management information system built to keep day-to-day records and operations in one place.",
    overview: [
      "A management information system for pharmacy operations: records, references and reporting brought into one consistent, database-driven application.",
      "The priority was reliability and clarity — dense tabular data made readable through rhythm, typography and predictable interaction rather than decoration.",
    ],
    role: "Full Stack Development",
    stack: ["Laravel", "Filament", "MySQL"],
    visual: { variant: "pharmacy", tint: "#9EF0C4", caption: "records / inventory" },
    layout: {
      row: 3,
      col: "1 / span 6",
      aspect: "4 / 3",
      aspectMobile: "4 / 3",
      offset: "18vh",
      parallax: 44,
    },
  },
  {
    id: "allacapan-rural-health-unit",
    slug: "allacapan-rural-health-unit",
    index: "06",
    name: "Allacapan Rural Health Unit",
    category: "Healthcare Information System",
    summary:
      "A healthcare information system built for a rural health unit, centred on patient records and everyday clinic workflows.",
    overview: [
      "An information system for a rural health unit, where staff time is scarce and records have to be right. The interface favours explicit labels, fast lookup and a short path between finding a patient and updating their record.",
      "The build stays close to the unit's own processes, adapting the software to the clinic rather than asking the clinic to adapt to the software.",
    ],
    role: "Full Stack Development",
    stack: ["Laravel", "PHP", "Bootstrap", "MySQL"],
    visual: { variant: "health", tint: "#FFD166", caption: "patients / clinic" },
    layout: {
      row: 4,
      col: "5 / span 8",
      aspect: "16 / 9",
      aspectMobile: "4 / 3",
      offset: "0vh",
      parallax: 68,
    },
  },
  {
    id: "valley-and-coast",
    slug: "valley-and-coast",
    index: "07",
    name: "Valley & Coast Hotel Reservation",
    category: "Reservation System",
    summary:
      "A hotel reservation application for presenting rooms and managing bookings online.",
    overview: [
      "A reservation application for a hotel: accommodation presented with editorial calm, availability handled as the core object rather than a side feature.",
      "The booking flow is built to be understood at a glance on a phone, with the room, the dates and the total always visible while the guest decides.",
    ],
    role: "Full Stack Development",
    stack: ["Laravel", "Livewire", "MySQL"],
    visual: { variant: "hotel", tint: "#7FD1C9", caption: "rooms / bookings" },
    layout: {
      row: 4,
      col: "1 / span 3",
      aspect: "4 / 5",
      aspectMobile: "4 / 5",
      offset: "22vh",
      parallax: -40,
    },
  },
  {
    id: "quicksell-detroit",
    slug: "quicksell-detroit",
    index: "08",
    name: "QuickSell Detroit",
    category: "Real Estate Platform",
    summary:
      "A real estate property submission platform where owners can list properties for review.",
    overview: [
      "QuickSell Detroit is a property submission platform: owners describe a property, attach what they have, and submit it into a review flow.",
      "The submission experience is structured as a short sequence of decisions, with progress made explicit and data validated as it is entered rather than at the end.",
    ],
    role: "Full Stack Development",
    stack: ["React", "Express.js", "MongoDB", "Tailwind CSS"],
    visual: { variant: "estate", tint: "#E7B7FF", caption: "listings / review" },
    layout: {
      row: 5,
      col: "3 / span 9",
      aspect: "16 / 10",
      aspectMobile: "4 / 3",
      offset: "6vh",
      parallax: 52,
    },
  },
];

export const PROJECT_COUNT = PROJECTS.length;

export function getProjectBySlug(slug?: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

export function getNextProject(slug: string): Project {
  const index = PROJECTS.findIndex((project) => project.slug === slug);
  return PROJECTS[(index + 1) % PROJECTS.length];
}

export function getPreviousProject(slug: string): Project {
  const index = PROJECTS.findIndex((project) => project.slug === slug);
  return PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
}
