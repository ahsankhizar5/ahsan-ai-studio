import { profile } from "../data/profile";
import { AkMark } from "./AkMark";

/* vinext's next/link shim currently loads a second React runtime in client-adjacent components. */
/* eslint-disable @next/next/no-html-link-for-pages */

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-invitation" data-footer-flow>
        <p>Have an AI product that needs to become real?</p>
        <a className="footer-email" href="/contact">
          Start with the problem <span aria-hidden="true">↗</span>
        </a>
      </div>

      <div className="footer-directory" data-footer-flow>
        <div className="footer-identity">
          <AkMark />
          <div>
            <strong>{profile.name}</strong>
            <p>AI product engineering with the communication layer built in.</p>
          </div>
        </div>
        <nav aria-label="Footer navigation">
          <span>Explore</span>
          <a href="/#work">Selected work</a>
          <a href="/#practice">Practice</a>
          <a href="/#process">Process</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>
        <nav aria-label="Social links">
          <span>Connect</span>
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href={profile.links.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href={`mailto:${profile.email}`}>Email ↗</a>
        </nav>
      </div>

      <div data-footer-flow>
        <p className="footer-wordmark" aria-hidden="true">AHSAN KHIZAR</p>
      </div>
      <div className="footer-meta" data-footer-flow>
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>{profile.location} · Available for remote projects</span>
        <a href="#main-content">Back to top ↑</a>
      </div>
    </footer>
  );
}
