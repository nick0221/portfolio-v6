export type * from "./project";

export interface SkillItem {
  name: string;
  note?: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  caption: string;
  items: SkillItem[];
}

export interface Role {
  id: string;
  company: string;
  position: string;
  period: string;
  isCurrent?: boolean;
  summary: string;
  highlights: string[];
}

export interface SocialLink {
  label: string;
  href: string;
  handle?: string;
}
