import { ProjectCard } from "../components/ProjectCard";
import { projects } from "../data/site";

export function ProjectsPage() {
  return (
    <main>
      <section>
        <div className="section-head">
          <h2>All projects</h2>
          <span className="count">[ {projects.length} ]</span>
        </div>
        <p className="bio section-lead">
          Selected backend, microservices, and systems projects built by Shivam Mittal.
        </p>
        <div className="project-list">
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </section>
    </main>
  );
}
