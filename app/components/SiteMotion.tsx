"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { pageMotion } from "./motionConfig";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type SiteMotionProps = {
  page: "home" | "about" | "contact";
};

type Cleanup = () => void;

function animateReveal(element: HTMLElement) {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      y: pageMotion.reveal.distance,
      clipPath: "inset(0 0 14% 0)",
    },
    {
      opacity: 1,
      y: 0,
      clipPath: "inset(0 0 0% 0)",
      duration: pageMotion.reveal.duration,
      ease: pageMotion.reveal.ease,
      scrollTrigger: {
        trigger: element,
        start: "top 86%",
        toggleActions: "play none none reverse",
      },
    },
  );
}

function animateGroup(group: HTMLElement) {
  const children = gsap.utils.toArray<HTMLElement>(group.children);
  if (children.length === 0) return null;

  return gsap.fromTo(
    children,
    { opacity: 0, y: pageMotion.group.distance, rotationX: 3 },
    {
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration: pageMotion.group.duration,
      stagger: pageMotion.group.stagger,
      ease: pageMotion.group.ease,
      scrollTrigger: {
        trigger: group,
        start: "top 84%",
        toggleActions: "play none none reverse",
      },
    },
  );
}

export function SiteMotion({ page }: SiteMotionProps) {
  const { contextSafe } = useGSAP();

  useGSAP(
    () => {
      const root = document.querySelector<HTMLElement>(`[data-motion-page="${page}"]`);
      if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      ScrollTrigger.config({ limitCallbacks: true });
      const matchMedia = gsap.matchMedia();

      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils
          .toArray<HTMLElement>("[data-motion-reveal]", root)
          .forEach((element) => animateReveal(element));

        gsap.utils
          .toArray<HTMLElement>("[data-reveal-group]", root)
          .filter((group) => !group.hasAttribute("data-pipeline"))
          .forEach((group) => animateGroup(group));

        gsap.utils.toArray<HTMLElement>(":scope > section:not(:first-child)", root).forEach((section) => {
          gsap.fromTo(
            section,
            { "--section-rule-progress": 0 },
            {
              "--section-rule-progress": 1,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top 94%",
                end: "top 42%",
                scrub: 0.55,
              },
            },
          );
        });

        const pipeline = root.querySelector<HTMLElement>("[data-pipeline]");
        if (pipeline) {
          gsap.fromTo(
            pipeline.children,
            { opacity: 0, clipPath: "inset(0 100% 0 0)", x: -18 },
            {
              opacity: 1,
              clipPath: "inset(0 0% 0 0)",
              x: 0,
              duration: 0.72,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: pipeline,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }

        if (page === "home") {
          const toolTracks = gsap.utils.toArray<HTMLElement>("[data-tool-track]", root);
          toolTracks.forEach((track) => {
            const reverse = track.dataset.direction === "reverse";
            const tween = gsap.fromTo(
              track,
              { xPercent: reverse ? -50 : 0 },
              { xPercent: reverse ? 0 : -50, duration: 28, ease: "none", repeat: -1, paused: true },
            );
            ScrollTrigger.create({
              trigger: track,
              start: "top bottom",
              end: "bottom top",
              onToggle: ({ isActive }) => isActive ? tween.play() : tween.pause(),
            });
          });

          gsap.utils.toArray<HTMLElement>("[data-project-visual]", root).forEach((visual) => {
            const signals = gsap.utils.toArray<HTMLElement>("[data-project-signal]", visual);
            const signalTween = gsap.to(signals, {
              scaleY: (index) => 0.45 + (index % 5) * 0.14,
              opacity: (index) => 0.38 + (index % 4) * 0.14,
              duration: 0.7,
              stagger: { each: 0.045, from: "center", repeat: -1, yoyo: true },
              ease: "sine.inOut",
              paused: true,
            });
            ScrollTrigger.create({
              trigger: visual,
              start: "top bottom",
              end: "bottom top",
              onToggle: ({ isActive }) => isActive ? signalTween.play() : signalTween.pause(),
            });
          });

          const projectHeader = root.querySelector<HTMLElement>(".project-stage-heading");
          if (projectHeader) animateReveal(projectHeader);

          const videoScan = root.querySelector<HTMLElement>("[data-video-service-scan]");
          const videoPreview = root.querySelector<HTMLElement>("[data-video-service-preview]");
          if (videoPreview) {
            gsap.fromTo(
              videoPreview,
              { clipPath: "inset(0 0 18% 0)", opacity: 0.72, scale: 0.94, y: 28 },
              {
                clipPath: "inset(0 0 0% 0)",
                opacity: 1,
                scale: 1,
                y: 0,
                ease: "none",
                scrollTrigger: {
                  trigger: videoPreview,
                  start: "top 94%",
                  end: "top 54%",
                  scrub: 0.6,
                },
              },
            );
          }
          if (videoScan) {
            const scanTween = gsap.fromTo(
              videoScan,
              { yPercent: -135, opacity: 0 },
              { yPercent: 135, opacity: 0.7, duration: 5.4, repeat: -1, ease: "sine.inOut", paused: true },
            );
            ScrollTrigger.create({
              trigger: videoScan,
              start: "top bottom",
              end: "bottom top",
              onToggle: ({ isActive }) => isActive ? scanTween.play() : scanTween.pause(),
            });
          }

          const initialProjectRows = root.querySelectorAll<HTMLElement>(".active-project-flow li");
          if (initialProjectRows.length > 0) {
            gsap.fromTo(
              initialProjectRows,
              { opacity: 0, x: 22 },
              {
                opacity: 1,
                x: 0,
                duration: 0.58,
                stagger: 0.055,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: ".active-project",
                  start: "top 80%",
                  toggleActions: "play none none reverse",
                },
              },
            );
          }

          const credibility = root.querySelector<HTMLElement>(".credibility-rail ul");
          if (credibility) {
            gsap.fromTo(
              credibility,
              { xPercent: -4 },
              {
                xPercent: 4,
                ease: "none",
                scrollTrigger: {
                  trigger: credibility,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.8,
                },
              },
            );
          }

          const recognitionItems = root.querySelectorAll<HTMLElement>(".recognition-band > *");
          if (recognitionItems.length > 0) {
            gsap.fromTo(
              recognitionItems,
              { opacity: 0, x: (index) => (index % 2 === 0 ? -22 : 22) },
              {
                opacity: 1,
                x: 0,
                duration: 0.64,
                stagger: 0.07,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: ".recognition-band",
                  start: "top 84%",
                  toggleActions: "play none none reverse",
                },
              },
            );
          }
        }

        if (page === "about") {
          const aboutCopy = root.querySelector<HTMLElement>("[data-hero-reveal]");
          if (aboutCopy) {
            const supportingCopy = Array.from(aboutCopy.children).filter((child) => !child.matches("h1"));
            gsap.fromTo(
              supportingCopy,
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                duration: 0.78,
                stagger: 0.085,
                delay: 0.12,
                ease: "power3.out",
                clearProps: "opacity,transform",
              },
            );
          }

          const aboutTitleWords = gsap.utils.toArray<HTMLElement>("[data-about-word]", root);
          if (aboutTitleWords.length > 0) {
            gsap.fromTo(
              aboutTitleWords,
              { opacity: 0, yPercent: 105, rotationX: -14 },
              {
                opacity: 1,
                yPercent: 0,
                rotationX: 0,
                duration: 0.78,
                stagger: 0.045,
                delay: 0.16,
                ease: "power4.out",
              },
            );
          }

          const philosophy = root.querySelectorAll<HTMLElement>(".about-philosophy-copy p");
          if (philosophy.length > 0) {
            gsap.fromTo(
              philosophy,
              { opacity: 0, y: 26 },
              {
                opacity: 1,
                y: 0,
                duration: 0.72,
                stagger: 0.12,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: ".about-philosophy-copy",
                  start: "top 84%",
                  toggleActions: "play none none reverse",
                },
              },
            );
          }

        }

        if (page === "contact") {
          const contactSequence = root.querySelector<HTMLElement>("[data-contact-sequence]");
          if (contactSequence) {
            gsap.fromTo(
              contactSequence.children,
              { opacity: 0, y: 34, clipPath: "inset(0 0 18% 0)" },
              {
                opacity: 1,
                y: 0,
                clipPath: "inset(0 0 0% 0)",
                duration: 0.82,
                stagger: 0.075,
                delay: 0.1,
                ease: "power4.out",
              },
            );
          }
        }

        return undefined;
      });

      matchMedia.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
        const controls = gsap.utils.toArray<HTMLElement>(
          ".hero-button, .header-cta, .contact-email, .red-noir-contact-actions > a, .copy-email, .footer-email",
        );
        const cleanups: Cleanup[] = [];

        controls.forEach((control) => {
          const toX = gsap.quickTo(control, "x", { duration: 0.38, ease: "power3.out" });
          const toY = gsap.quickTo(control, "y", { duration: 0.38, ease: "power3.out" });

          const move = (event: PointerEvent) => {
            const bounds = control.getBoundingClientRect();
            const x = gsap.utils.clamp(-1, 1, ((event.clientX - bounds.left) / bounds.width) * 2 - 1);
            const y = gsap.utils.clamp(-1, 1, ((event.clientY - bounds.top) / bounds.height) * 2 - 1);
            control.classList.add("is-magnetic");
            toX(x * pageMotion.magnetic.travel);
            toY(y * pageMotion.magnetic.travel);
          };
          const leave = () => {
            control.classList.remove("is-magnetic");
            toX(0);
            toY(0);
          };

          control.addEventListener("pointermove", move);
          control.addEventListener("pointerleave", leave);
          cleanups.push(() => {
            control.removeEventListener("pointermove", move);
            control.removeEventListener("pointerleave", leave);
            control.classList.remove("is-magnetic");
          });
        });

        const practiceCards = gsap.utils.toArray<HTMLElement>(".connected-build-phases li", root);
        practiceCards.forEach((card) => {
          const toRotateX = gsap.quickTo(card, "rotationX", { duration: 0.5, ease: "power3.out" });
          const toRotateY = gsap.quickTo(card, "rotationY", { duration: 0.5, ease: "power3.out" });
          const setX = gsap.quickSetter(card, "--card-light-x");
          const setY = gsap.quickSetter(card, "--card-light-y");
          const enter = contextSafe(() => gsap.to(card, { y: -7, duration: 0.36, ease: "power3.out" }));
          const move = (event: PointerEvent) => {
            const bounds = card.getBoundingClientRect();
            const x = gsap.utils.clamp(-1, 1, ((event.clientX - bounds.left) / bounds.width) * 2 - 1);
            const y = gsap.utils.clamp(-1, 1, ((event.clientY - bounds.top) / bounds.height) * 2 - 1);
            toRotateX(-y * 1.15);
            toRotateY(x * 1.15);
            setX(`${((x + 1) / 2) * 100}%`);
            setY(`${((y + 1) / 2) * 100}%`);
          };
          const leave = contextSafe(() => {
            toRotateX(0);
            toRotateY(0);
            gsap.to(card, { y: 0, duration: 0.48, ease: "power2.inOut" });
          });
          card.addEventListener("pointerenter", enter);
          card.addEventListener("pointermove", move);
          card.addEventListener("pointerleave", leave);
          cleanups.push(() => {
            card.removeEventListener("pointerenter", enter);
            card.removeEventListener("pointermove", move);
            card.removeEventListener("pointerleave", leave);
          });
        });

        return () => cleanups.forEach((cleanup) => cleanup());
      });

      root.dataset.motionReady = "true";

      let active = true;
      void document.fonts?.ready.then(() => {
        if (active) ScrollTrigger.refresh();
      });

      return () => {
        active = false;
        delete root.dataset.motionReady;
        matchMedia.revert();
      };
    },
    { dependencies: [page], revertOnUpdate: true },
  );

  return null;
}
