import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { CSSProperties } from "react";
import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { MaskReveal } from "@/components/animations/MaskReveal";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import type { Project } from "@/types";

/**
 * A single asymmetric gallery entry: independent parallax travel, a masking
 * reveal, and hover metadata. The poster grid placement comes from project
 * data so the composition is editorial rather than uniform.
 */
export function ProjectItem({ project }: { project: Project }) {
  const style = {
    "--col": project.layout.col,
    "--row": String(project.layout.row),
    "--offset": project.layout.offset ?? "0vh",
    "--aspect": project.layout.aspect,
    "--aspect-mobile": project.layout.aspectMobile ?? "4 / 3",
  } as CSSProperties;

  return (
    <article className="work-cell group" style={style}>
      <Link
        to={`/work/${project.slug}`}
        data-cursor="View"
        aria-label={`${project.name} — ${project.category}. Open project.`}
        className="block focus-visible:outline-offset-8"
      >
        <MaskReveal className="poster-frame relative w-full overflow-hidden bg-surface">
          <ParallaxImage
            distance={project.layout.parallax}
            className="absolute inset-0"
            innerClassName="h-full w-full"
          >
            <div className="h-full w-full scale-[1.06] transition-transform duration-[900ms] ease-expo group-hover:scale-[1.09]">
              <ProjectVisual
                variant={project.visual.variant}
                tint={project.visual.tint}
                caption={project.visual.caption}
                index={project.index}
                name={project.name}
                stack={project.stack}
              />
            </div>
          </ParallaxImage>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090909]/55 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90"
          />

          <div className="pointer-events-none absolute inset-0 flex items-end justify-between p-4 md:p-6">
            <span className="mono-meta flex items-center gap-2 text-white/70">
              <span className="h-1 w-1 rounded-full bg-accent" />
              {project.index}
            </span>
            <span className="translate-y-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/0 transition-all duration-500 ease-expo group-hover:translate-y-0 group-hover:text-white/80">
              Open project
            </span>
          </div>
        </MaskReveal>

        <div className="mt-4 flex items-start justify-between gap-4 border-t border-line pt-4">
          <div className="flex items-baseline gap-3">
            <span className="mono-meta text-faint">{project.index}</span>
            <h3 className="font-display text-[clamp(1.15rem,1.9vw,1.6rem)] leading-tight tracking-[-0.02em] transition-colors duration-300 group-hover:text-accent">
              {project.name}
            </h3>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.14em] text-faint sm:block">
              {project.category}
            </span>
            <ArrowUpRight
              aria-hidden="true"
              className="h-4 w-4 text-faint transition-all duration-300 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
            />
          </div>
        </div>
      </Link>
    </article>
  );
}
