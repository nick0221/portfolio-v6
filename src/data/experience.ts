import type { Role } from "@/types";

export const YEARS_OF_EXPERIENCE = "8+";

export const ROLES: Role[] = [
  {
    id: "yamaha",
    company: "Yamaha Motor Philippines Inc.",
    position: "Market Programmer",
    period: "July 2016 — September 2023",
    summary:
      "Seven years building and maintaining the internal systems that service operations run on nationwide.",
    highlights: [
      "Developed and maintained internal management information systems.",
      "Modernized the legacy Time Commitment Service from VB6 into a standalone web application.",
      "Supported nationwide service shop data and operational functionality.",
      "Worked with internal business processes and reporting systems.",
    ],
  },
  {
    id: "iclick",
    company: "Iclick Digishop Inc.",
    position: "Junior Programmer",
    period: "October 2014 — July 2016",
    summary:
      "Early career in custom PHP development, building at the join between web applications and enterprise ERP data.",
    highlights: [
      "Developed custom PHP web applications integrated with NetSuite.",
      "Maintained external web applications and ERP integrations.",
      "Worked with reporting systems and database-driven applications.",
    ],
  },
];

export const EDUCATION = {
  degree: "Bachelor of Science in Information Technology",
} as const;

export const BIO = [
  "I build web applications end to end — from database structure and server-side logic to the interface people actually touch. Eight-plus years of that work has been spent close to real operations: internal systems, service data, records that have to be right.",
  "My background is PHP and Laravel on the backend, React and TypeScript on the front. I care about the unglamorous parts — naming, state, loading behaviour, the way a form fails — because that is what separates a demo from something a team can live with.",
] as const;
