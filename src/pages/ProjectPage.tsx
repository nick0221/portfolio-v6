import { useParams } from "react-router-dom";
import { ProjectDetails } from "@/components/projects/ProjectDetails";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { getProjectBySlug } from "@/data/projects";

export function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug);

  if (!project) return <NotFoundPage />;

  return <ProjectDetails project={project} />;
}
