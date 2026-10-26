import { Link, Outlet, useLocation } from "react-router-dom";
import { site, socials } from "../data/site";
import { ClockStatus } from "./ClockStatus";
import { ThemeToggle } from "./ThemeToggle";

export function Layout() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const email = socials.find((item) => item.label === "Email");

  return (
    <div className="shell">
      <div className="rail" aria-hidden />
      <div className="page">
        <header className="topbar">
          {isHome ? (
            <ClockStatus />
          ) : (
            <Link to="/" className="back-link">
              ← Back to Portfolio
            </Link>
          )}
          <ThemeToggle />
        </header>
        <Outlet />
        <footer className="site-footer">
          <p>
            © {site.domain}. {site.footer}
          </p>
          {email ? <a href={email.href}>{email.value}</a> : null}
        </footer>
      </div>
    </div>
  );
}
