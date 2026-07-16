import { profile } from "../data/profile";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <strong>{profile.name}</strong>
      <nav aria-label="Social links">
        <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a href={profile.links.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href={`mailto:${profile.email}`}>Email</a>
      </nav>
      <span>© {new Date().getFullYear()}</span>
    </footer>
  );
}
