import { education } from "../data/site";

export function EducationTimeline() {
  return (
    <ol className="timeline">
      {education.map((item, index) => (
        <li
          key={`${item.institution}-${item.start}`}
          className="timeline-item"
          style={{ animationDelay: `${index * 120}ms` }}
        >
          <span className="timeline-dot" aria-hidden />
          <p className="timeline-when">
            {item.start} — {item.end} · {item.score}
          </p>
          <h3>
            {item.degree}
            <span className="muted"> · {item.institution}</span>
          </h3>
        </li>
      ))}
    </ol>
  );
}
