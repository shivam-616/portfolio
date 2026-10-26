import { experience } from "../data/site";

export function ExperienceTimeline() {
  return (
    <ol className="timeline">
      {experience.map((item, index) => {
        const isCurrent = item.end === null;
        return (
          <li
            key={`${item.company}-${item.start}`}
            className={`timeline-item ${isCurrent ? "timeline-item--current" : ""}`}
            style={{ animationDelay: `${index * 120}ms` }}
          >
            <span
              className={`timeline-dot ${isCurrent ? "timeline-dot--pulse" : ""}`}
              aria-hidden
            />
            <p className="timeline-when">
              {item.start} — {item.end ?? "Present"}
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
