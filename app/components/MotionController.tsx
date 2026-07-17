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
      const media = gsap.matchMedia();
      const context = gsap.context(() => {
        document.querySelectorAll<HTMLElement>("[data-motion-reveal]").forEach((element) => {
          gsap.from(element, {
            y: 18,
            opacity: 0,
            duration: 0.42,
            ease: "power2.out",
            clearProps: "transform,opacity",
            scrollTrigger: { trigger: element, start: "top 86%", once: true },
          });
        });

        document.querySelectorAll<HTMLElement>("[data-reveal-group]").forEach((group) => {
          gsap.from(group.children, {
            y: 18,
            opacity: 0,
            duration: 0.4,
            stagger: 0.045,
            ease: "power2.out",
            clearProps: "transform,opacity",
            scrollTrigger: { trigger: group, start: "top 84%", once: true },
          });
        });

        const portrait = document.querySelector<HTMLElement>("[data-portrait-reveal]");
        if (portrait && page === "home") {
          gsap.from(portrait, {
            clipPath: "inset(100% 0 0 0)",
            duration: 0.52,
            ease: "expo.out",
            clearProps: "clipPath",
            scrollTrigger: { trigger: portrait, start: "top 82%", once: true },
          });
        }

        media.add("(min-width: 1024px)", () => {
          const panels = gsap.utils.toArray<HTMLElement>("[data-project-panel]");
          panels.forEach((panel, index) => {
            gsap.from(panel, {
              y: 32,
              opacity: 0.18,
              duration: 0.46,
              delay: Math.min(index * 0.02, 0.06),
              ease: "power2.out",
              clearProps: "transform,opacity",
              scrollTrigger: { trigger: panel, start: "top 82%", once: true },
            });
          });
        });
      });

      cleanupAnimations = () => {
        media.revert();
        context.revert();
      };
    }

    const motionGate = document.querySelector<HTMLElement>(
      page === "home" ? "#services" : ".about-philosophy",
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
