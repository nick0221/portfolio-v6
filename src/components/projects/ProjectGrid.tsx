import { ProjectItem } from "@/components/projects/ProjectItem";
import { PROJECTS } from "@/data/projects";

/** The asymmetric parallax grid. Placement lives in project data. */
export function ProjectGrid() {
  return (
    <div className="mt-16 grid grid-cols-1 gap-y-16 md:mt-20 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-[9vh]">
      {PROJECTS.map((project) => (
        <ProjectItem key={project.id} project={project} />
      ))}
    </div>
  );
}
