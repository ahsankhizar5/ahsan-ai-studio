"use client";

import { useEffect, useState } from "react";

type ActivePage = "home" | "about";

const navigation = [
  { label: "Work", target: "work" },
  { label: "Services", target: "services" },
  { label: "Experience", target: "experience" },
  { label: "Process", target: "process" },
] as const;

function anchorHref(activePage: ActivePage, target: string) {
  return `${activePage === "home" ? "" : "/"}#${target}`;
}

function NavigationLinks({ activePage, onNavigate }: { activePage: ActivePage; onNavigate: () => void }) {
  return (
    <>
      {navigation.map((item) => (
        <a href={anchorHref(activePage, item.target)} key={item.target} onClick={onNavigate}>
          {item.label}
        </a>
      ))}
      <a href="/about" aria-current={activePage === "about" ? "page" : undefined} onClick={onNavigate}>
        About
      </a>
    </>
  );
}

export function SiteHeader({ activePage }: { activePage: ActivePage }) {
  const [enhanced, setEnhanced] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const enhancementFrame = window.requestAnimationFrame(() => setEnhanced(true));

    function handleScroll() {
      setScrolled(window.scrollY > 12);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(enhancementFrame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  const menuExpanded = !enhanced || menuOpen;

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`} data-enhanced={enhanced}>
      {/* vinext's next/link shim currently loads a second React runtime in client components. */}
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a
        className="wordmark"
        href="/"
        aria-label="Ahsan Khizar, home"
        aria-current={activePage === "home" ? "page" : undefined}
        onClick={closeMenu}
      >
        Ahsan Khizar
      </a>
      <nav className="site-navigation" aria-label="Main navigation">
        <div className="desktop-nav">
          <NavigationLinks activePage={activePage} onNavigate={closeMenu} />
        </div>
        <a className="header-cta" href={anchorHref(activePage, "contact")} onClick={closeMenu}>
          Discuss a project
        </a>
        <button
          className="menu-button"
          type="button"
          aria-expanded={menuExpanded}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
        >
          Open menu
        </button>
      </nav>
      <nav
        id="mobile-menu"
        className="mobile-menu"
        aria-label="Mobile navigation"
        data-open={menuOpen}
      >
        <NavigationLinks activePage={activePage} onNavigate={closeMenu} />
        <a className="mobile-menu-cta" href={anchorHref(activePage, "contact")} onClick={closeMenu}>
          Discuss a project
        </a>
      </nav>
    </header>
  );
}
