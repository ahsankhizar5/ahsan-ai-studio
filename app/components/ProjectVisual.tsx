import type { Project } from "../data/profile";
import { TechnologyLogo, technologyIcon } from "./TechnologyLogo";

function visualType(name: string) {
  if (name.includes("Audio")) return "audio";
  if (name.includes("PIGEON")) return "geo";
  if (name.includes("Customer")) return "clusters";
  return "workflow";
}
export function ProjectVisual({ project }: { project: Project }) {
  const type = visualType(project.name);
  const icons = project.stack
    .map((technology) => ({ technology, icon: technologyIcon(technology) }))
    .filter((item) => Boolean(item.icon))
    .slice(0, 4);

  return (
    <div className={`project-visual project-visual-${type}`} data-project-visual aria-label={`${project.name} technology visual`}>
      <div className="project-visual-grid" aria-hidden="true" />
      <div className="project-visual-signal" aria-hidden="true">
        {Array.from({ length: type === "audio" ? 18 : 8 }, (_, index) => (
          <span key={index} data-project-signal />
        ))}
      </div>
      <div className="project-visual-core" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="project-technology-orbit">
        {icons.map(({ technology, icon }) => (
          <TechnologyLogo icon={icon!} compact key={technology} />
        ))}
      </div>
      <span className="project-visual-label">{project.category}</span>
    </div>
  );
}
