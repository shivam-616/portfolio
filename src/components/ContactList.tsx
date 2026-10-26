import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { socials } from "../data/site";

export function ContactList() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async (value: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <ul className="contact-list">
      {socials.map((item) => (
        <li key={item.label}>
          <span>{item.label}</span>
          <span className="leaders" aria-hidden />
          <span className="contact-value">
            <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
              {item.value}
            </a>
            {"copy" in item && item.copy ? (
              <button
                type="button"
                className="icon-btn"
                onClick={() => copyEmail(item.value)}
                aria-label="Copy email address"
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
              </button>
            ) : null}
          </span>
        </li>
      ))}
    </ul>
  );
}
