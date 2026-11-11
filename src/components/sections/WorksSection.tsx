import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { PROJECT_COUNT } from "@/data/projects";

export function WorksSection() {
  return (
    <section
      id="works"
      className="relative scroll-mt-20 border-t border-line py-20 md:py-28 lg:py-36"
    >
      <div className="shell">
        <SectionHeading
          index="02"
          label={`Selected works — ${PROJECT_COUNT}`}
          title={"SELECTED\nWORKS"}
          description="Platforms, internal systems and storefronts built end to end — from schema and server logic to the interface."
        />

        <ProjectGrid />

        <div className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
          <p className="label">Designed &amp; developed — not templated</p>
          <span className="mono-meta text-faint">01 — 0{PROJECT_COUNT}</span>
        </div>
      </div>
    </section>
  );
}
