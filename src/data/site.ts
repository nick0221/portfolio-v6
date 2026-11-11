import type { SocialLink } from "@/types";

/**
 * Identity + contact configuration.
 *
 * IMPORTANT: only verified details belong here. The email below is a
 * placeholder on the reserved `example.com` domain — replace it with the real
 * address before publishing. Social entries are intentionally empty because no
 * verified profile URLs were supplied; add them and the UI will render them.
 */
export const SITE = {
  name: "NickDevs",
  role: "Full Stack Web Developer",
  location: "Philippines",
  /** Update to the real deployed origin. */
  url: "https://nickdevs.dev",
  email: "nickdevs@example.com",
  availability: "Open to freelance & collaborations",
  stackLine: ["PHP", "Laravel", "React", "TypeScript", "MySQL"],
  tagline: "Crafting digital experiences through code & creativity.",
  intro:
    "I'm a Full Stack Web Developer focused on building functional, thoughtful, and engaging digital experiences.",
} as const;

export const NAV_LINKS = [
  { id: "home", label: "Home", href: "#home" },
  { id: "works", label: "Works", href: "#works" },
  { id: "about", label: "About", href: "#about" },
  { id: "expertise", label: "Expertise", href: "#expertise" },
  { id: "contact", label: "Contact", href: "#contact" },
] as const;

export const SOCIALS: SocialLink[] = [
  // { label: "GitHub", href: "https://github.com/<handle>", handle: "@<handle>" },
  // { label: "LinkedIn", href: "https://www.linkedin.com/in/<handle>", handle: "in/<handle>" },
];

export const EMAIL = SITE.email;
