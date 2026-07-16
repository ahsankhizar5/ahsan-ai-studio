export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="wordmark" href="#main-content" aria-label="Ahsan Khizar, home">
        Ahsan Khizar
      </a>
      <nav className="desktop-nav" aria-label="Main navigation">
        <a href="#engineering">Engineering</a>
        <a href="#video">AI video</a>
        <a href="#process">Process</a>
        <a href="#about">About</a>
      </nav>
      <a className="header-cta" href="#contact">
        Start a project
      </a>
      <details className="mobile-nav">
        <summary>Menu</summary>
        <nav aria-label="Mobile navigation">
          <a href="#engineering">Engineering</a>
          <a href="#video">AI video</a>
          <a href="#process">Process</a>
          <a href="#about">About</a>
          <a href="#contact">Start a project</a>
        </nav>
      </details>
    </header>
  );
}
