import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ContactList } from "../components/ContactList";
import { EducationTimeline } from "../components/EducationTimeline";
import { ExperienceModal } from "../components/ExperienceModal";
import { ExperienceTimeline } from "../components/ExperienceTimeline";
import { ProjectCard } from "../components/ProjectCard";
import {
  achievements,
  education,
  featuredProjects,
  formatPostDate,
  posts,
  projects,
  site,
  skills,
} from "../data/site";

export function HomePage() {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  return (
    <main>
      <section className="hero">
        <div>
          <h1>{site.name}</h1>
          <p className="role">{site.title}</p>
        </div>
        <p className="bio">{site.bio}</p>
        <a className="resume" href={site.resumePath} target="_blank" rel="noreferrer">
          View my resume (PDF)
          <ArrowUpRight size={14} strokeWidth={1.7} />
        </a>
      </section>

      <section>
        <div className="section-head">
          <h2>Experience</h2>
          <div className="experience-head-actions">
            <span className="count">[ Active + 3 mos internship ]</span>
            <button
              type="button"
              className="journey-btn"
              onClick={() => setIsHistoryOpen(true)}
              title="View career journey from Ninternet to GridCrest Technologies"
            >
              ▶ Career Journey
            </button>
          </div>
        </div>
        <ExperienceTimeline />
      </section>

      <ExperienceModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
      />

      <section>
        <div className="section-head">
          <h2>Projects</h2>
          <span className="count">[ {projects.length} ]</span>
        </div>
        <div className="project-list">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
        <div className="see-all-wrap">
          <Link className="see-all" to="/projects">
            see all projects ( {projects.length} )
            <ArrowUpRight size={13} strokeWidth={1.7} />
          </Link>
        </div>
      </section>

      <section>
        <div className="section-head">
          <h2>Technical Skills</h2>
          <span className="count">[ {skills.length} ]</span>
        </div>
        <ul className="skills-list">
          {skills.map((skill) => (
            <li key={skill.category} className="skill-row">
              <span className="skill-cat">{skill.category}</span>
              <span className="leaders" aria-hidden />
              <span className="skill-vals">{skill.items.join(" · ")}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <div className="section-head">
          <h2>Education</h2>
          <span className="count">[ {education.length} ]</span>
        </div>
        <EducationTimeline />
      </section>

      <section>
        <div className="section-head">
          <h2>Achievements & Highlights</h2>
          <span className="count">[ {achievements.length} ]</span>
        </div>
        <ul className="achievements-list">
          {achievements.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <div className="section-head">
          <h2>Blog</h2>
          <span className="count">[ Coming Soon ]</span>
        </div>
        {posts.length > 0 ? (
          <ul className="post-list">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link to={`/p/${post.slug}`}>{post.title}</Link>
                <span className="leaders" aria-hidden />
                <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              </li>
            ))}
          </ul>
        ) : (
          <p className="bio italic" style={{ opacity: 0.75 }}>
            Writing in progress — technical articles on Spring Boot, microservices, and distributed systems are coming soon.
          </p>
        )}
      </section>

      <section>
        <h2>Contact</h2>
        <p className="bio contact-note">{site.contactNote}</p>
        <ContactList />
      </section>
    </main>
  );
}
