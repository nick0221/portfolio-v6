import { MaskReveal } from "@/components/animations/MaskReveal";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import type { Project } from "@/types";

const FRAMES = [
  { frame: 2 as const, label: "Layout blueprint", aspect: "16 / 10" },
  { frame: 3 as const, label: "Type & system", aspect: "4 / 3" },
];

/** Gallery of generated interface studies for a project detail page. */
export function ProjectGallery({ project }: { project: Project }) {
  return (
    <div>
      <div className="grid gap-6 lg:grid-cols-2">
        {FRAMES.map((item, index) => (
          <figure key={item.label} className="space-y-3">
            <MaskReveal
              className="relative w-full overflow-hidden border border-line bg-surface"
              delay={index * 0.08}
            >
              <div style={{ aspectRatio: index === 0 ? "16 / 10" : "4 / 3" }}>
                <ProjectVisual
                  variant={project.visual.variant}
                  tint={project.visual.tint}
                  caption={project.visual.caption}
                  index={project.index}
                  name={project.name}
                  stack={project.stack}
                  frame={item.frame}
                />
              </div>
            </MaskReveal>
            <figcaption className="mono-meta flex items-center justify-between text-faint">
              <span>{item.label}</span>
              <span>0{index + 2}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
        Previews above are visual studies, not published screenshots.
      </p>
    </div>
  );
}
