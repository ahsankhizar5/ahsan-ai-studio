"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function MotionController({ page }: { page: "home" | "about" }) {
  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      document.documentElement.dataset.motion = prefersReducedMotion ? "reduced" : "full";

      if (prefersReducedMotion) return;

      const media = gsap.matchMedia();

      gsap.from("[data-hero-reveal]", {
        y: 20,
        opacity: 0,
        duration: 0.48,
        stagger: 0.05,
        ease: "power3.out",
        clearProps: "transform,opacity",
      });

      const operator = document.querySelector<HTMLElement>(".operator-frame");
      if (operator) {
        gsap.from(operator, {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.58,
          delay: 0.08,
          ease: "expo.out",
          clearProps: "clipPath",
        });

        gsap.from(operator.querySelectorAll(".output-rail"), {
          x: 18,
          opacity: 0,
          duration: 0.36,
          delay: 0.34,
          stagger: 0.05,
          ease: "power2.out",
          clearProps: "transform,opacity",
        });
      }

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
      if (portrait) {
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

      return () => media.revert();
    },
    { dependencies: [page], revertOnUpdate: true },
  );

  return null;
}
