"use client";

import { useEffect } from "react";

export function MotionController({ page }: { page: "home" | "about" }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.dataset.motion = prefersReducedMotion ? "reduced" : "full";

    if (prefersReducedMotion) return;

    let active = true;
    let cleanupAnimations: (() => void) | undefined;
    let observer: IntersectionObserver | undefined;

    async function setupMotion() {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (!active) return;

      gsap.registerPlugin(ScrollTrigger);
      const context = gsap.context(() => {
        const pipeline = document.querySelector<HTMLElement>("[data-pipeline]");
        if (pipeline && page === "home") {
          gsap.from(pipeline.children, {
            clipPath: "inset(0 100% 0 0)",
            duration: 0.62,
            stagger: 0.08,
            ease: "power3.out",
            clearProps: "clipPath",
            scrollTrigger: { trigger: pipeline, start: "top 78%", once: true },
          });
        }

        const aboutPortrait = document.querySelector<HTMLElement>("[data-about-portrait]");
        if (aboutPortrait && page === "about") {
          gsap.from(aboutPortrait, {
            clipPath: "inset(0 0 100% 0)",
            duration: 0.72,
            ease: "expo.out",
            clearProps: "clipPath",
            scrollTrigger: { trigger: aboutPortrait, start: "top 84%", once: true },
          });
        }
      });

      cleanupAnimations = () => {
        context.revert();
      };
    }

    const motionGate = document.querySelector<HTMLElement>(
      page === "home" ? "#work" : "[data-about-portrait]",
    );

    if (motionGate) {
      observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          observer?.disconnect();
          void setupMotion();
        },
        { rootMargin: "0px 0px -10% 0px" },
      );
      observer.observe(motionGate);
    }

    return () => {
      active = false;
      observer?.disconnect();
      cleanupAnimations?.();
    };
  }, [page]);

  return null;
}
