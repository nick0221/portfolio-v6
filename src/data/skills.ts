import type { SkillGroup } from "@/types";

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "frontend",
    title: "Frontend Development",
    caption: "Interfaces, component systems and motion.",
    items: [
      { name: "React" },
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "HTML5" },
      { name: "CSS3" },
      { name: "Tailwind CSS" },
      { name: "Bootstrap" },
      { name: "HeroUI" },
    ],
  },
  {
    id: "backend",
    title: "Backend Development",
    caption: "Server-side application logic and APIs.",
    items: [
      { name: "PHP" },
      { name: "Laravel" },
      { name: "Livewire", note: "Laravel ecosystem" },
      { name: "Filament", note: "Laravel ecosystem" },
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "REST APIs" },
    ],
  },
  {
    id: "database",
    title: "Database",
    caption: "Modelling, querying and keeping data honest.",
    items: [{ name: "MySQL" }, { name: "SQLite" }, { name: "MongoDB" }],
  },
  {
    id: "tools",
    title: "Tools & Infrastructure",
    caption: "The workflow around the code.",
    items: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "Docker" },
      { name: "Linux" },
      { name: "AWS EC2" },
      { name: "cPanel" },
      { name: "Postman" },
    ],
  },
  {
    id: "additional",
    title: "Additional Expertise",
    caption: "Beyond the framework.",
    items: [
      { name: "API Integration" },
      { name: "Web Application Deployment" },
      { name: "Database Management" },
      { name: "SEO Optimization" },
      { name: "Performance Optimization" },
    ],
  },
];

/** Marquee band content — kept short so the strip reads as texture. */
export const MARQUEE_SKILLS = [
  "PHP",
  "Laravel",
  "React",
  "TypeScript",
  "Livewire",
  "Filament",
  "MySQL",
  "Node.js",
  "Tailwind CSS",
  "Docker",
  "AWS",
  "REST APIs",
];
