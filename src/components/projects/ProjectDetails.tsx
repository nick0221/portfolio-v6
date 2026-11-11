import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { MaskReveal } from "@/components/animations/MaskReveal";
import { Reveal } from "@/components/animations/Reveal";
import { SplitText } from "@/components/animations/SplitText";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { useSEO } from "@/hooks/useSEO";
import { getNextProject } from "@/data/projects";
import type { Project } from "@/types";

/** Full project case-study view: hero, metadata, overview and gallery. */
export function ProjectDetails({ project }: { project: Project }) {
  const nextProject = getNextProject(project.slug);

  useSEO({
    title: `${project.name} — ${project.category} | NickDevs`,
    description: project.summary,
    path: `/work/${project.slug}`,
    type: "article",
  });

  return (
    <article className="pb-24 pt-28 md:pb-32 md:pt-36">
      <div className="shell">
        <Reveal distance={14}>
          <Link
            to="/"
            state={{ target: "works" }}
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-dim transition-colors duration-300 hover:text-accent"
          >
            <ArrowLeft
              aria-hidden="true"
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5"
            />
            All works
          </Link>
        </Reveal>

        <div className="mt-10 flex items-center gap-4">
          <span className="label">{project.index}</span>
          <span className="hairline flex-1" />
          <span className="label">{project.category}</span>
        </div>

        <h1 className="mt-8 text-[clamp(2.6rem,8vw,7rem)] leading-[0.9] tracking-[-0.05em]">
          <SplitText text={project.name} stagger={0.05} />
        </h1>

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end">
          <p className="body-lg max-w-xl text-balance lg:col-span-7">
            {project.summary}
          </p>
          <div className="flex flex-wrap items-center gap-3 lg:col-span-5 lg:justify-end">
            {project.liveUrl ? (
              <MagneticButton href={project.liveUrl} variant="accent">
                Visit live site
              </MagneticButton>
            ) : null}
            {project.repoUrl ? (
              <MagneticButton href={project.repoUrl}>Repository</MagneticButton>
            ) : null}
            {!project.liveUrl && !project.repoUrl ? (
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                Private build — case study only
              </span>
            ) : null}
          </div>
        </div>

        <MaskReveal className="relative mt-12 w-full overflow-hidden border border-line bg-surface">
          <div style={{ aspectRatio: "16 / 9" }}>
            <ProjectVisual
              variant={project.visual.variant}
              tint={project.visual.tint}
              caption={project.visual.caption}
              index={project.index}
              name={project.name}
              stack={project.stack}
            />
          </div>
        </MaskReveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <SectionLabel>Overview</SectionLabel>
            <div className="mt-6 space-y-5">
              {project.overview.map((paragraph) => (
                <Reveal key={paragraph} distance={18}>
                  <p className="body-lg">{paragraph}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <dl className="divide-y divide-line border-y border-line">
              <MetaRow label="Role" value={project.role} />
              {project.year ? (
                <MetaRow label="Year" value={String(project.year)} />
              ) : null}
              <MetaRow label="Category" value={project.category} />
              <div className="py-4">
                <dt className="label">Stack</dt>
                <dd className="mt-3 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="border border-line px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-dim"
                    >
                      {tech}
                    </span>
                  ))}
                </dd>
              </div>
              {project.liveUrl ? (
                <div className="py-4">
                  <dt className="label">Live preview</dt>
                  <dd className="mt-2">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="link-underline inline-flex items-center gap-2 break-all font-mono text-[11px] text-dim hover:text-accent"
                    >
                      {project.liveUrl.replace(/^https?:\/\//, "")}
                      <ExternalLink aria-hidden="true" className="h-3 w-3 shrink-0" />
                    </a>
                  </dd>
                </div>
              ) : null}
            </dl>
          </aside>
        </div>

        <div className="mt-20">
          <SectionLabel>Interface studies</SectionLabel>
          <div className="mt-6">
            <ProjectGallery project={project} />
          </div>
        </div>

        <div className="mt-24 border-t border-line pt-10">
          <p className="label">Next project</p>
          <Link
            to={`/work/${nextProject.slug}`}
            data-cursor="Next"
            className="group mt-4 flex items-end justify-between gap-6"
          >
            <div>
              <h2 className="display text-[clamp(2rem,5.4vw,4.2rem)] transition-colors duration-300 group-hover:text-accent">
                {nextProject.name}
              </h2>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                {nextProject.category}
              </p>
            </div>
            <ArrowUpRight
              aria-hidden="true"
              className="mb-2 h-7 w-7 shrink-0 text-dim transition-transform duration-500 ease-expo group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="label shrink-0">{children}</span>
      <span className="hairline flex-1" />
    </div>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-6 py-4">
      <dt className="label">{label}</dt>
      <dd className="text-right text-sm text-ink">{value}</dd>
    </div>
  );
}
