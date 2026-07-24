"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Project } from "../data/profile";

type ProjectStageProps = {
  projects: readonly Project[];
};

export function ProjectStage({ projects }: ProjectStageProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const cursorPreviewRef = useRef<HTMLDivElement>(null);
  const activeProject = projects[activeIndex];

  useEffect(() => {
    let active = true;
    let cleanup: (() => void) | undefined;

    void import("gsap")
      .then(({ default: gsap }) => {
      const section = sectionRef.current;
      const list = listRef.current;
      const preview = cursorPreviewRef.current;
      if (!active || !section || !list || !preview) return;

      const finePointer = window.matchMedia(
        "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
      );
      if (!finePointer.matches) return;

      const moveX = gsap.quickTo(preview, "x", { duration: 0.5, ease: "power3.out" });
      const moveY = gsap.quickTo(preview, "y", { duration: 0.5, ease: "power3.out" });
      const rotate = gsap.quickTo(preview, "rotation", { duration: 0.7, ease: "power3.out" });

      const handlePointerMove = (event: PointerEvent) => {
        const sectionBounds = section.getBoundingClientRect();
        const previewBounds = preview.getBoundingClientRect();
        const x = gsap.utils.clamp(
          12,
          Math.max(12, sectionBounds.width - previewBounds.width - 12),
          event.clientX - sectionBounds.left + 24,
        );
        const y = gsap.utils.clamp(
          110,
          Math.max(110, sectionBounds.height - previewBounds.height - 24),
          event.clientY - sectionBounds.top - previewBounds.height * 0.48,
        );

        moveX(x);
        moveY(y);
        rotate(gsap.utils.clamp(-2.4, 2.4, (event.movementX || 0) * 0.16));
      };

      const showPreview = () => {
        gsap.to(preview, {
          autoAlpha: 1,
          scale: 1,
          duration: 0.34,
          ease: "power3.out",
          overwrite: true,
        });
      };

      const hidePreview = () => {
        gsap.to(preview, {
          autoAlpha: 0,
          scale: 0.9,
          rotation: 0,
          duration: 0.48,
          ease: "power2.inOut",
          overwrite: true,
        });
      };

      list.addEventListener("pointermove", handlePointerMove);
      list.addEventListener("pointerenter", showPreview);
      list.addEventListener("pointerleave", hidePreview);

      cleanup = () => {
        list.removeEventListener("pointermove", handlePointerMove);
        list.removeEventListener("pointerenter", showPreview);
        list.removeEventListener("pointerleave", hidePreview);
        gsap.killTweensOf(preview);
      };
      })
      .catch((error: unknown) => {
        if (active) console.warn("Project hover enhancement unavailable.", error);
      });

    return () => {
      active = false;
      cleanup?.();
    };
  }, []);

  if (!activeProject) return null;

  return (
    <section
      id="work"
      className="project-stage project-showcase"
      aria-labelledby="work-title"
      data-project-stage
      ref={sectionRef}
    >
      <header className="project-stage-heading">
        <div>
          <p className="project-stage-kicker">Selected engineering evidence</p>
          <h2 id="work-title">Proof, not placeholders.</h2>
        </div>
        <p>
          Five working systems. Explore each build; the evidence assembles in sequence as you move.
        </p>
      </header>

      <div className="project-showcase-desktop">
        <ol className="project-showcase-list" ref={listRef} data-project-list>
          {projects.map((project, index) => (
            <li
              key={project.name}
              data-project-row
              data-active={index === activeIndex}
              onPointerEnter={() => setActiveIndex(index)}
              onFocusCapture={() => setActiveIndex(index)}
            >
              <a href={project.href} target="_blank" rel="noreferrer">
                <span className="project-showcase-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="project-showcase-title">
                  <strong>{project.name}</strong>
                  <small>{project.category}</small>
                </span>
                <span className="project-showcase-year">{project.year}</span>
                <span className="project-showcase-arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ol>

        <aside className="project-showcase-stage" aria-live="polite" data-project-stage-preview>
          <div className="project-showcase-stage-media">
            {projects.map((project, index) => (
              <Image
                key={project.image}
                src={project.image}
                alt={index === activeIndex ? `${project.name} system artwork` : ""}
                fill
                sizes="42vw"
                data-active={index === activeIndex}
                priority={index === 0}
                unoptimized
              />
            ))}
            <span>{activeProject.category}</span>
          </div>
          <div className="project-showcase-stage-copy">
            <p>{activeProject.description}</p>
            <strong>My contribution</strong>
            <p>{activeProject.contribution}</p>
            <ul aria-label={`${activeProject.name} technology stack`}>
              {activeProject.stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="project-cursor-preview" ref={cursorPreviewRef} aria-hidden="true">
          {projects.map((project, index) => (
            <Image
              key={project.image}
              src={project.image}
              alt=""
              fill
              sizes="22rem"
              data-active={index === activeIndex}
              unoptimized
            />
          ))}
          <span>
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(projects.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      <div className="project-showcase-mobile" aria-label="Selected engineering projects">
        {projects.map((project, index) => (
          <article className="project-mobile-card" data-project-mobile-card key={project.name}>
            <div className="project-mobile-media">
              <Image
                src={project.image}
                alt={`${project.name} system artwork`}
                fill
                sizes="calc(100vw - 2.5rem)"
                unoptimized
              />
              <span>{String(index + 1).padStart(2, "0")}</span>
            </div>
            <div className="project-mobile-copy">
              <span>{project.category}</span>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <strong>My contribution</strong>
              <p>{project.contribution}</p>
              <small>{project.stack.join(" · ")}</small>
              <a href={project.href} target="_blank" rel="noreferrer">
                View project <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
