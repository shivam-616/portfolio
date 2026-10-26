import { useEffect, useRef, useState } from "react";
import { experience } from "../data/site";

export function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const firstDotRef = useRef<HTMLSpanElement>(null);
  const secondDotRef = useRef<HTMLSpanElement>(null);

  const [positions, setPositions] = useState({ start: 8, end: 120 });
  const [progress, setProgress] = useState(0);
  const [isWalking, setIsWalking] = useState(false);
  const [direction, setDirection] = useState<"down" | "up">("down");

  const lastScrollY = useRef(0);
  const stopTimeoutRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  // Recalculate dot positions relative to container
  const updatePositions = () => {
    if (!containerRef.current || !firstDotRef.current || !secondDotRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const firstRect = firstDotRef.current.getBoundingClientRect();
    const secondRect = secondDotRef.current.getBoundingClientRect();

    const start = firstRect.top - containerRect.top + firstRect.height / 2;
    const end = secondRect.top - containerRect.top + secondRect.height / 2;

    if (start > 0 && end > start) {
      setPositions({ start, end });
    }
  };

  useEffect(() => {
    updatePositions();
    window.addEventListener("resize", updatePositions);

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      rafRef.current = requestAnimationFrame(() => {
        if (!containerRef.current) return;
        const currentScrollY = window.scrollY;
        const diff = currentScrollY - lastScrollY.current;

        if (Math.abs(diff) > 0.5) {
          setIsWalking(true);
          setDirection(diff >= 0 ? "down" : "up");

          if (stopTimeoutRef.current) {
            window.clearTimeout(stopTimeoutRef.current);
          }
          stopTimeoutRef.current = window.setTimeout(() => {
            setIsWalking(false);
          }, 220);
        }
        lastScrollY.current = currentScrollY;

        const rect = containerRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Start walking when the top item enters upper half of screen
        const triggerPoint = viewportHeight * 0.45;
        const travelDistance = Math.max(1, positions.end - positions.start);
        const scrolledPast = triggerPoint - (rect.top + positions.start);
        const rawProgress = scrolledPast / travelDistance;
        const clamped = Math.max(0, Math.min(1, rawProgress));

        setProgress(clamped);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Run once on load to position accurately
    onScroll();

    return () => {
      window.removeEventListener("resize", updatePositions);
      window.removeEventListener("scroll", onScroll);
      if (stopTimeoutRef.current) window.clearTimeout(stopTimeoutRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [positions.start, positions.end]);

  const currentWalkerY = positions.start + progress * (positions.end - positions.start) - 15;
  const isSecondDotReached = progress >= 0.88;

  return (
    <div className="timeline-container" ref={containerRef}>
      {/* Progress beam connecting top blinking signal to walker */}
      <div
        className="timeline-progress-beam"
        style={{
          top: `${positions.start}px`,
          height: `${Math.max(0, progress * (positions.end - positions.start))}px`,
        }}
        aria-hidden="true"
      />

      {/* Walking character traveling on the timeline rail */}
      <div
        className={`timeline-walker ${isWalking ? "walking" : "idle"} ${direction}`}
        style={{
          transform: `translateY(${currentWalkerY}px)`,
        }}
        aria-hidden="true"
      >
        <svg
          width="22"
          height="30"
          viewBox="0 0 22 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Backpack */}
          <rect
            x="3"
            y="10"
            width="4"
            height="8"
            rx="1.5"
            fill="var(--online)"
            className="walker-backpack"
          />

          {/* Left (Back) Arm */}
          <g className="walker-arm-left">
            <path
              d="M9 11L6 17"
              stroke="var(--text)"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </g>

          {/* Left (Back) Leg */}
          <g className="walker-leg-left">
            <path
              d="M10 18L8 27"
              stroke="var(--text)"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <circle cx="7.5" cy="27" r="1.5" fill="var(--online)" />
          </g>

          {/* Torso & Head */}
          <g className="walker-torso">
            <circle cx="12" cy="5.5" r="4.5" fill="var(--text)" />
            <path
              d="M12 2C14.5 2 16.5 3.5 16.5 5.5H12V2Z"
              fill="var(--online)"
              opacity="0.9"
            />
            <rect
              x="8"
              y="10"
              width="7"
              height="9"
              rx="2"
              fill="var(--text)"
            />
            <line
              x1="11.5"
              y1="10"
              x2="11.5"
              y2="19"
              stroke="var(--bg)"
              strokeWidth="1"
            />
          </g>

          {/* Right (Front) Leg */}
          <g className="walker-leg-right">
            <path
              d="M13 18L15 27"
              stroke="var(--text)"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <circle cx="15.5" cy="27" r="1.5" fill="var(--online)" />
          </g>

          {/* Right (Front) Arm */}
          <g className="walker-arm-right">
            <path
              d="M14 11L17 17"
              stroke="var(--text)"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </g>
        </svg>
      </div>

      <ol className="timeline">
        {experience.map((item, index) => {
          const isCurrent = item.end === null;
          const isSecondDot = index === 1;

          return (
            <li
              key={`${item.company}-${item.start}`}
              className={`timeline-item ${isCurrent ? "timeline-item--current" : ""}`}
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <span
                ref={index === 0 ? firstDotRef : isSecondDot ? secondDotRef : undefined}
                className={`timeline-dot ${
                  index === 0
                    ? "timeline-dot--pulse"
                    : isSecondDotReached
                    ? "timeline-dot--green-signal"
                    : ""
                }`}
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
    </div>
  );
}
