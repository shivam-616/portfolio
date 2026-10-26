import { Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { site } from "../data/site";
import { fetchLanyard, type LanyardPresence } from "../lib/lanyard";

function formatIst(now: Date) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: site.timezone,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(now);
}

const statusLabel: Record<string, string> = {
  online: "Online on Discord",
  idle: "Idle on Discord",
  dnd: "Do not disturb",
  offline: "Offline on Discord",
};

export function ClockStatus() {
  const [time, setTime] = useState(() => formatIst(new Date()));
  const [presence, setPresence] = useState<LanyardPresence | null>(null);

  useEffect(() => {
    const tick = () => setTime(formatIst(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const data = await fetchLanyard(site.lanyardDiscordId);
        if (!cancelled) setPresence(data);
      } catch {
        if (!cancelled) setPresence(null);
      }
    };

    load();
    const id = window.setInterval(load, 30_000);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  const status = presence?.status ?? "offline";
  const lanyardHint = presence
    ? `${presence.activity ?? statusLabel[status]} · via Lanyard API`
    : "Live IST clock. Discord presence uses the Lanyard API — set lanyardDiscordId in src/data/site.ts";

  return (
    <div className="status-cluster">
      <Clock size={14} strokeWidth={1.7} aria-hidden />
      {presence ? <span className={`status-dot status-dot--${status}`} aria-hidden /> : null}
      <time>
        {time} {site.timezoneLabel}
      </time>
      {presence?.activity ? <span className="status-meta">{presence.activity}</span> : null}
      <button type="button" className="hint" title={lanyardHint} aria-label="About Lanyard presence">
        [?]
      </button>
    </div>
  );
}
