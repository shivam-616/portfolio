import { featuredExperience } from "../data/site";

export function ExperienceTimeline() {
  return (
    <ol className="timeline">
      {featuredExperience.map((item, index) => {
        const isCurrent = item.end === null;
        return (
          <li
            key={`${item.company}-${item.start}`}
            className={`timeline-item ${isCurrent ? "timeline-item--current" : ""}`}
            style={{ animationDelay: `${index * 90}ms` }}
          >
            <span
              className={`timeline-dot ${index === 0 ? "timeline-dot--pulse" : ""}`}
              aria-hidden
            />
            <p className="timeline-when">
              {item.start} — {item.end ?? "Present"}
              {item.duration ? ` · ${item.duration}` : ""}
              {item.location ? ` · ${item.location}` : ""}
              {isCurrent ? <span className="timeline-badge">Active</span> : null}
            </p>
            <h3>
              {item.role}
              <span className="muted"> · {item.company}</span>
            </h3>
            <p>{item.summary}</p>
          </li>
        );
      })}
    </ol>
  );
}
