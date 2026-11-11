export type ProjectVariant =
  | "stream"
  | "commerce"
  | "dashboard"
  | "kiosk"
  | "pharmacy"
  | "health"
  | "hotel"
  | "estate";

/** Desktop placement inside the 12-column asymmetric works grid. */
export interface ProjectLayout {
  row: number;
  /** CSS grid-column value, e.g. "1 / span 8". */
  col: string;
  /** Desktop aspect ratio for the poster. */
  aspect: string;
  /** Mobile aspect ratio for the poster. */
  aspectMobile?: string;
  /** Vertical offset so columns do not align (e.g. "12vh"). */
  offset?: string;
  /** Parallax travel in px at desktop. */
  parallax: number;
}

export interface ProjectVisual {
  variant: ProjectVariant;
  /** Restrained tint used only inside the generated preview. */
  tint: string;
  /** Short mono caption printed on the preview, e.g. "catalogue.stream". */
  caption: string;
}

export interface Project {
  id: string;
  slug: string;
  index: string;
  name: string;
  category: string;
  /** Only present when the year is verified. */
  year?: number;
  summary: string;
  overview: string[];
  role: string;
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
  visual: ProjectVisual;
  layout: ProjectLayout;
}
