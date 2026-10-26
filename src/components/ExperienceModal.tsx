import { useCallback, useEffect, useRef, useState } from "react";
import { experience } from "../data/site";

interface ExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExperienceModal({ isOpen, onClose }: ExperienceModalProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const [dotPositions, setDotPositions] = useState<number[]>([]);
  const [walkerY, setWalkerY] = useState(400);
  const [isWalking, setIsWalking] = useState(false);
  const [direction, setDirection] = useState<"down" | "up">("up");
  const [reachedMilestones, setReachedMilestones] = useState<number[]>([]);

  const rafRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const stepToNextRef = useRef<(currentIndex: number, positions: number[]) => void>(() => {});

  // Measure dot Y positions relative to the timeline list
  const measurePositions = useCallback(() => {
    if (!listRef.current) return [];
    const listRect = listRef.current.getBoundingClientRect();
    const positions = dotRefs.current.map((dot) => {
      if (!dot) return 0;
      const r = dot.getBoundingClientRect();
      return r.top - listRect.top + r.height / 2;
    });
    setDotPositions(positions);
    return positions;
  }, []);

  // Lock body scroll and listen for Escape key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  // Step upwards from bottom milestone (origin) to top milestone (GridCrest)
  const stepToNext = useCallback((currentIndex: number, positions: number[]) => {
    const nextIndex = currentIndex - 1; // Moving UP the timeline
    if (nextIndex < 0) {
      setIsWalking(false);
      return;
    }

    setIsWalking(true);
    setDirection("up");

    const startY = positions[currentIndex];
    const targetY = positions[nextIndex];
    const duration = 1300; // 1.3s smooth climb between milestones
    let startTimestamp: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const t = Math.min(1, elapsed / duration);
      // Ease in-out
      const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      const currentY = startY + (targetY - startY) * ease;

      setWalkerY(currentY);

      // Smooth auto-scroll following the walker upwards
      if (scrollContainerRef.current) {
        const targetScroll = Math.max(0, currentY - 110);
        scrollContainerRef.current.scrollTo({
          top: targetScroll,
          behavior: "auto",
        });
      }

      if (t < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        // Arrived at next milestone up!
        setWalkerY(targetY);
        setIsWalking(false);
        setReachedMilestones((prev) => [...prev, nextIndex]);

        if (nextIndex > 0) {
          // Pause for 1.2 seconds at this milestone before continuing upward!
          timeoutRef.current = window.setTimeout(() => {
            stepToNextRef.current(nextIndex, positions);
          }, 1200);
        }
      }
    };

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    stepToNextRef.current = stepToNext;
  }, [stepToNext]);

  // Start journey from the bottom milestone (origin) to top active milestone
  const startChoreographedJourney = useCallback((positions: number[]) => {
    if (positions.length < 2) return;

    const bottomIndex = positions.length - 1;
    const bottomY = positions[bottomIndex];

    // Reset to start at bottom (earliest milestone)
    setWalkerY(bottomY);
    setReachedMilestones([bottomIndex]);
    setIsWalking(false);
    setDirection("up");

    // Scroll modal down to the start of the journey
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // Initial 500ms pause at the bottom origin milestone before starting upward climb
    timeoutRef.current = window.setTimeout(() => {
      stepToNextRef.current(bottomIndex, positions);
    }, 500);
  }, []);

  // Trigger tour on modal open
  useEffect(() => {
    if (!isOpen) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      return;
    }

    // Give DOM a frame to render then measure and start walk
    const timer = setTimeout(() => {
      const positions = measurePositions();
      if (positions.length > 0) {
        startChoreographedJourney(positions);
      }
    }, 120);

    return () => {
      clearTimeout(timer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isOpen, measurePositions, startChoreographedJourney]);

  const handleReplay = () => {
    const positions = measurePositions();
    if (positions.length > 0) {
      startChoreographedJourney(positions);
    }
  };

  // Jump/walk to a specific milestone on click
  const handleMilestoneClick = (targetIndex: number) => {
    const positions = dotPositions;
    if (positions.length === 0 || !positions[targetIndex]) return;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const targetY = positions[targetIndex];
    const startY = walkerY;
    const duration = 800;
    let startTimestamp: number | null = null;

    setIsWalking(true);
    setDirection(targetY < startY ? "up" : "down");

    const stepTo = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const t = Math.min(1, elapsed / duration);
      const ease = 1 - Math.pow(1 - t, 3);
      const currentY = startY + (targetY - startY) * ease;

      setWalkerY(currentY);

      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = Math.max(0, currentY - 110);
      }

      if (t < 1) {
        rafRef.current = requestAnimationFrame(stepTo);
      } else {
        setWalkerY(targetY);
        setIsWalking(false);
        setReachedMilestones((prev) =>
          prev.includes(targetIndex) ? prev : [...prev, targetIndex]
        );
      }
    };

    rafRef.current = requestAnimationFrame(stepTo);
  };

  if (!isOpen) return null;

  const bottomY =
    dotPositions.length > 0 ? dotPositions[dotPositions.length - 1] : 400;

  return (
    <div
      className="history-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-modal="true"
      role="dialog"
    >
      <div className="history-modal">
        {/* Modal Header */}
        <div className="history-modal-head">
          <div>
            <h3>Career Journey</h3>
            <p className="history-modal-sub">
              Tracing the path from Ninternet internship up to GridCrest Technologies
            </p>
          </div>
          <div className="history-modal-actions">
            <button
              type="button"
              className="history-replay-btn"
              onClick={handleReplay}
              title="Replay journey from Ninternet"
            >
              ↺ Replay Journey
            </button>
            <button
              type="button"
              className="history-close-btn"
              onClick={onClose}
              aria-label="Close dialog"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Modal Scrollable Timeline View */}
        <div className="history-modal-scroll" ref={scrollContainerRef}>
          <div className="history-timeline-track">
            {/* Illuminated trail beam extending upwards from bottom origin to walker */}
            <div
              className="timeline-progress-beam"
              style={{
                top: `${walkerY}px`,
                height: `${Math.max(0, bottomY - walkerY)}px`,
              }}
              aria-hidden="true"
            />

            {/* Little walker walking along the timeline bar */}
            <div
              className={`timeline-walker ${isWalking ? "walking" : "idle"} ${direction}`}
              style={{
                transform: `translateY(${walkerY - 13}px)`,
              }}
              aria-hidden="true"
            >
              <svg
                width="18"
                height="26"
                viewBox="0 0 18 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Left Leg */}
                <g className="walker-leg-left">
                  <line
                    x1="8"
                    y1="14"
                    x2="5"
                    y2="22"
                    stroke="var(--text)"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <circle cx="4.5" cy="22.5" r="1.2" fill="var(--online)" />
                </g>

                {/* Left Arm */}
                <g className="walker-arm-left">
                  <line
                    x1="8"
                    y1="9.5"
                    x2="4"
                    y2="14"
                    stroke="var(--text)"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </g>

                {/* Torso & Head */}
                <g className="walker-torso">
                  <circle
                    cx="9"
                    cy="4"
                    r="3.2"
                    stroke="var(--text)"
                    strokeWidth="1.6"
                    fill="var(--bg)"
                  />
                  <circle cx="11" cy="3.5" r="0.9" fill="var(--online)" />
                  <line
                    x1="9"
                    y1="7.5"
                    x2="9"
                    y2="14"
                    stroke="var(--text)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  {/* Minimal backpack */}
                  <rect
                    x="5.5"
                    y="8.5"
                    width="2.5"
                    height="4.5"
                    rx="1"
                    fill="var(--online)"
                    opacity="0.9"
                  />
                </g>

                {/* Right Leg */}
                <g className="walker-leg-right">
                  <line
                    x1="9.5"
                    y1="14"
                    x2="12.5"
                    y2="22"
                    stroke="var(--text)"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <circle cx="13" cy="22.5" r="1.2" fill="var(--online)" />
                </g>

                {/* Right Arm */}
                <g className="walker-arm-right">
                  <line
                    x1="9"
                    y1="9.5"
                    x2="13"
                    y2="14"
                    stroke="var(--text)"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </g>
              </svg>
            </div>

            <ol className="timeline" ref={listRef}>
              {experience.map((item, index) => {
                const isCurrent = item.end === null;
                const isReached = reachedMilestones.includes(index);

                return (
                  <li
                    key={`${item.company}-${item.start}`}
                    className={`timeline-item ${
                      isCurrent ? "timeline-item--current" : ""
                    } ${isReached ? "timeline-item--reached" : ""} timeline-item--interactive`}
                    style={{ animationDelay: `${index * 80}ms` }}
                    onClick={() => handleMilestoneClick(index)}
                    title={`Click to step directly to ${item.company}`}
                  >
                    <span
                      ref={(el) => {
                        dotRefs.current[index] = el;
                      }}
                      className={`timeline-dot ${
                        index === 0
                          ? "timeline-dot--pulse"
                          : isReached
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
        </div>
      </div>
    </div>
  );
}
