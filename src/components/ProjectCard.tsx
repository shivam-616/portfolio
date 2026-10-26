import { ArrowUpRight, Code2 } from "lucide-react";
import type { Project } from "../data/site";

export function ProjectCard({ project }: { project: Project }) {
  // Visit points to GitHub as requested until dedicated live deployments are configured
  const visitUrl = project.live || "https://github.com/shivam-616";
  const sourceUrl = project.source || "https://github.com/shivam-616";

  return (
    <article className="project">
      <div className="project-top">
        <div>
          <h3>{project.name}</h3>
          <span className="muted"> — {project.type}</span>
        </div>
        <div className="project-links">
          {sourceUrl ? (
            <a href={sourceUrl} target="_blank" rel="noreferrer" title="View source on GitHub">
              <Code2 size={13} strokeWidth={1.7} />
              Source
            </a>
          ) : null}
          {visitUrl ? (
            <a href={visitUrl} target="_blank" rel="noreferrer" title="Visit GitHub">
              Visit
              <ArrowUpRight size={13} strokeWidth={1.7} />
            </a>
          ) : null}
        </div>
      </div>
      <p>{project.description}</p>
      <p className="stack">Stack: {project.stack.join(" / ")}</p>
    </article>
  );
}
