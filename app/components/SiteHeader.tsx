"use client";

import { useEffect, useRef, useState } from "react";
import { AkMark } from "./AkMark";

type ActivePage = "home" | "about" | "contact";

const navigation = [
  { label: "Work", target: "work" },
  { label: "Practice", target: "practice" },
  { label: "Process", target: "process" },
  { label: "Contact", target: "contact" },
] as const;

function anchorHref(activePage: ActivePage, target: string) {
  if (target === "contact") return "/contact";
  return `${activePage === "home" ? "" : "/"}#${target}`;
}

function NavigationLinks({ activePage, onNavigate }: { activePage: ActivePage; onNavigate: () => void }) {
  return (
    <>
      {navigation.map((item) => (
        <a
          href={anchorHref(activePage, item.target)}
          key={item.target}
          aria-current={item.target === "contact" && activePage === "contact" ? "page" : undefined}
          onClick={onNavigate}
        >
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
  const [scrolled, setScrolled] = useState(activePage !== "home");
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLElement>(null);
  const restoreTriggerFocus = useRef(false);

  useEffect(() => {
    const enhancementFrame = window.requestAnimationFrame(() => setEnhanced(true));
    let boundaryFrame: number | undefined;
    let observer: IntersectionObserver | undefined;
    const hero = activePage === "home"
      ? document.querySelector<HTMLElement>(".cinematic-hero")
      : null;

    function syncHeaderWithHero() {
      setScrolled(!hero || hero.getBoundingClientRect().bottom <= 0);
    }

    if (activePage === "home") {
      boundaryFrame = window.requestAnimationFrame(syncHeaderWithHero);

      if (hero && "IntersectionObserver" in window) {
        observer = new IntersectionObserver(([entry]) => {
          if (entry) setScrolled(entry.boundingClientRect.bottom <= 0);
        });
        observer.observe(hero);
      } else {
        window.addEventListener("scroll", syncHeaderWithHero, { passive: true });
        window.addEventListener("resize", syncHeaderWithHero);
      }
    }

    return () => {
      window.cancelAnimationFrame(enhancementFrame);
      if (boundaryFrame !== undefined) window.cancelAnimationFrame(boundaryFrame);
      observer?.disconnect();
      window.removeEventListener("scroll", syncHeaderWithHero);
      window.removeEventListener("resize", syncHeaderWithHero);
    };
  }, [activePage]);

  useEffect(() => {
    if (menuOpen) {
      const previousOverflow = document.documentElement.style.overflow;
      document.documentElement.style.overflow = "hidden";

      function getFocusTargets() {
        const trigger = menuButtonRef.current;
        const menuLinks = mobileMenuRef.current
          ? Array.from(mobileMenuRef.current.querySelectorAll<HTMLAnchorElement>("a[href]"))
              .filter((link) => link.getClientRects().length > 0)
          : [];

        return trigger && trigger.getClientRects().length > 0
          ? [trigger, ...menuLinks]
          : menuLinks;
      }

      function handleFocusContainment(event: KeyboardEvent) {
        if (event.key === "Escape") {
          event.preventDefault();
          restoreTriggerFocus.current = true;
          setMenuOpen(false);
          return;
        }

        if (event.key !== "Tab") return;

        const focusTargets = getFocusTargets();
        if (focusTargets.length === 0) return;

        const firstTarget = focusTargets[0];
        const lastTarget = focusTargets.at(-1);
        const activeTarget = document.activeElement;
        const focusIsContained = focusTargets.some((target) => target === activeTarget);

        if (event.shiftKey && (!focusIsContained || activeTarget === firstTarget)) {
          event.preventDefault();
          lastTarget?.focus();
        } else if (!event.shiftKey && (!focusIsContained || activeTarget === lastTarget)) {
          event.preventDefault();
          firstTarget?.focus();
        }
      }

      const focusFrame = window.requestAnimationFrame(() => {
        mobileMenuRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
      });
      document.addEventListener("keydown", handleFocusContainment);

      return () => {
        document.documentElement.style.overflow = previousOverflow;
        window.cancelAnimationFrame(focusFrame);
        document.removeEventListener("keydown", handleFocusContainment);
      };
    }

    if (restoreTriggerFocus.current) {
      restoreTriggerFocus.current = false;
      menuButtonRef.current?.focus();
    }
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  const menuExpanded = !enhanced || menuOpen;

  return (
    <header
      className={`site-header${scrolled ? " is-scrolled" : ""}`}
      data-enhanced={enhanced}
      data-menu-open={menuOpen}
    >
      {/* vinext's next/link shim currently loads a second React runtime in client components. */}
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a
        className="brand-lockup"
        href="/"
        aria-current={activePage === "home" ? "page" : undefined}
        onClick={closeMenu}
      >
        <AkMark />
        <span>
          <strong>Ahsan Khizar</strong>
          <small>AI product engineer · AI video producer</small>
        </span>
      </a>
      <nav className="site-navigation" aria-label="Main navigation">
        <div className="desktop-nav">
          <NavigationLinks activePage={activePage} onNavigate={closeMenu} />
        </div>
        <a className="header-cta" href={anchorHref(activePage, "contact")} onClick={closeMenu}>
          Start a project <span aria-hidden="true">↗</span>
        </a>
        <button
          className="menu-button"
          type="button"
          ref={menuButtonRef}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuExpanded}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </nav>
      <nav
        id="mobile-menu"
        className="mobile-menu"
        aria-label="Mobile navigation"
        data-open={menuOpen}
        ref={mobileMenuRef}
      >
        <NavigationLinks activePage={activePage} onNavigate={closeMenu} />
        <a className="mobile-menu-cta" href={anchorHref(activePage, "contact")} onClick={closeMenu}>
          Start a project <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  );
}
