"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import type { Project } from "../data/profile";

type ProjectStageProps = {
  projects: readonly Project[];
};

export function ProjectStage({ projects }: ProjectStageProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const panelRef = useRef<HTMLElement>(null);

  function selectFromKeyboard(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;

    event.preventDefault();
    const nextIndex =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? projects.length - 1
          : event.key === "ArrowRight"
            ? (index + 1) % projects.length
            : (index - 1 + projects.length) % projects.length;

    setActiveIndex(nextIndex);
    document.getElementById(`project-tab-${nextIndex}`)?.focus();
  }

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !panelRef.current) return;

    let active = true;
    let context: { revert: () => void } | undefined;

    void import("gsap").then(({ default: gsap }) => {
      if (!active || !panelRef.current) return;

      context = gsap.context(() => {
        gsap.fromTo(
          panelRef.current,
          { opacity: 0.2, clipPath: "inset(0 7% 0 0)" },
          {
            opacity: 1,
            clipPath: "inset(0 0 0 0)",
            duration: 0.42,
            ease: "power3.out",
            clearProps: "opacity,clipPath",
          },
        );
      }, panelRef);
    });

    return () => {
      active = false;
      context?.revert();
    };
  }, [activeIndex]);

  const activeProject = projects[activeIndex];
  if (!activeProject) return null;

  return (
    <section
      id="work"
      className="project-stage"
      aria-labelledby="work-title"
      data-project-stage
    >
      <header className="project-stage-heading">
        <div>
          <p className="project-stage-kicker">Selected engineering evidence</p>
          <h2 id="work-title">Work that makes the claim believable.</h2>
        </div>
        <p>Real systems, concrete contributions, and implementation depth.</p>
      </header>

      <div className="project-stage-desktop">
        <div className="project-tabs" role="tablist" aria-label="Selected engineering projects">
          {projects.map((project, index) => (
            <button
              id={`project-tab-${index}`}
              key={project.name}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-controls="active-project-panel"
              tabIndex={index === activeIndex ? 0 : -1}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(event) => selectFromKeyboard(event, index)}
            >
              {project.name}
            </button>
          ))}
        </div>

        <div
          id="active-project-panel"
          className="active-project"
          role="tabpanel"
          aria-labelledby={`project-tab-${activeIndex}`}
          ref={panelRef}
          data-project-panel
        >
          <div className="active-project-copy">
            <span>
              Selected system · {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(projects.length).padStart(2, "0")}
            </span>
            <h3>{activeProject.name}</h3>
            <p>{activeProject.description}</p>
            <strong>My contribution</strong>
            <p>{activeProject.contribution}</p>
          </div>

          <ol className="active-project-flow" aria-label={`${activeProject.name} implementation stack`}>
            {activeProject.stack.map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item}</strong>
              </li>
            ))}
          </ol>

          <div className="active-project-footer">
            <span>{activeProject.category}</span>
            {activeProject.href ? (
              <a href={activeProject.href} target="_blank" rel="noreferrer">
                View project source <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <span>Project summary available</span>
            )}
          </div>
        </div>
      </div>

      <div className="project-stage-mobile" aria-label="Selected engineering projects">
        {projects.map((project, index) => (
          <article key={project.name}>
            <span>
              {String(index + 1).padStart(2, "0")} · {project.category}
            </span>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <strong>My contribution</strong>
            <p>{project.contribution}</p>
            <small>{project.stack.join(" · ")}</small>
            {project.href ? (
              <a href={project.href} target="_blank" rel="noreferrer">
                View project source <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <span className="project-summary-available">Project summary available</span>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
