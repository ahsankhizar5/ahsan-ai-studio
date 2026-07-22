"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";
import { portraitMotion } from "./motionConfig";
import { useMotionPreferences } from "./useMotionPreferences";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function AboutPortraitMotion({ portraitRef }: { portraitRef: RefObject<HTMLElement | null> }) {
  const { finePointer, reducedMotion } = useMotionPreferences();

  useGSAP(
    () => {
      const root = portraitRef.current;
      if (!root || reducedMotion) return;

      const stage = root.querySelector<HTMLElement>("[data-portrait-stage]");
      const humanPointer = root.querySelector<HTMLElement>("[data-human-pointer]");
      const aiPointer = root.querySelector<HTMLElement>("[data-ai-pointer]");
      const cyanPointer = root.querySelector<HTMLElement>("[data-cyan-pointer]");
      const redPointer = root.querySelector<HTMLElement>("[data-red-pointer]");
      const yellowPointer = root.querySelector<HTMLElement>("[data-yellow-pointer]");
      const humanAssembly = root.querySelector<HTMLElement>("[data-human-assembly]");
      const aiAssembly = root.querySelector<HTMLElement>("[data-ai-assembly]");
      const fragments = root.querySelectorAll<HTMLElement>("[data-fragment-assembly]");
      const particles = root.querySelectorAll<HTMLElement>("[data-portrait-particle]");
      const sweep = root.querySelector<HTMLElement>("[data-portrait-sweep]");
      const aboutHero = root.closest<HTMLElement>(".about-hero");
      const aboutCopy = aboutHero?.querySelector<HTMLElement>(".about-hero-copy");

      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: "top 80%",
            end: "top 44%",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })
        .fromTo(humanAssembly, { x: 10 }, { x: 0 }, 0)
        .fromTo(aiAssembly, { x: -20 }, { x: 0 }, 0)
        .fromTo(fragments, { x: -24, opacity: 0, scale: 0.98 }, { x: 0, opacity: 0.42, scale: 1, stagger: 0.08 }, 0.08)
        .fromTo(sweep, { xPercent: -125, opacity: 0 }, { xPercent: 135, opacity: 0.62 }, 0.04);

      const particleDrift = gsap.to(particles, {
        x: (index) => (index % 2 === 0 ? 9 : -7),
        y: (index) => -12 - (index % 4) * 4,
        rotation: (index) => (index % 2 === 0 ? 26 : -22),
        scale: (index) => 0.86 + (index % 3) * 0.15,
        opacity: (index) => 0.46 + (index % 4) * 0.12,
        duration: (index) => 3.8 + (index % 5) * 0.72,
        stagger: 0.12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        paused: true,
      });

      ScrollTrigger.create({
        trigger: root,
        start: "top bottom",
        end: "bottom top",
        onToggle: ({ isActive }) => {
          if (isActive) particleDrift.play();
          else particleDrift.pause();
        },
      });

      if (aboutHero && stage) {
        const heroScroll = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: aboutHero,
            start: "top top",
            end: "bottom top",
            scrub: 0.7,
            invalidateOnRefresh: true,
          },
        });
        heroScroll.to(stage, { y: finePointer ? 48 : 26, scale: finePointer ? 1.015 : 1.008 }, 0);
        if (aboutCopy) heroScroll.to(aboutCopy, { y: finePointer ? -30 : -16, opacity: 0.82 }, 0);
      }

      if (!finePointer || !stage || !humanPointer || !aiPointer || !cyanPointer || !redPointer || !yellowPointer) {
        return;
      }

      const tiltX = gsap.quickTo(stage, "rotationX", { duration: 0.9, ease: "power3.out" });
      const tiltY = gsap.quickTo(stage, "rotationY", { duration: 0.9, ease: "power3.out" });
      const humanX = gsap.quickTo(humanPointer, "x", { duration: 0.88, ease: "power3.out" });
      const humanY = gsap.quickTo(humanPointer, "y", { duration: 0.88, ease: "power3.out" });
      const aiX = gsap.quickTo(aiPointer, "x", { duration: 0.82, ease: "power3.out" });
      const aiY = gsap.quickTo(aiPointer, "y", { duration: 0.82, ease: "power3.out" });
      const cyanX = gsap.quickTo(cyanPointer, "x", { duration: 0.76, ease: "power3.out" });
      const redX = gsap.quickTo(redPointer, "x", { duration: 0.8, ease: "power3.out" });
      const redY = gsap.quickTo(redPointer, "y", { duration: 0.8, ease: "power3.out" });
      const yellowY = gsap.quickTo(yellowPointer, "y", { duration: 0.78, ease: "power3.out" });
      const setLightX = gsap.quickSetter(root, "--portrait-light-x");
      const setLightY = gsap.quickSetter(root, "--portrait-light-y");

      let bounds = root.getBoundingClientRect();
      let hovering = false;
      const updateBounds = () => {
        bounds = root.getBoundingClientRect();
      };

      const enter = () => {
        if (hovering) return;
        hovering = true;
        updateBounds();
        root.classList.add("is-interacting");
      };

      const move = (event: PointerEvent) => {
        if (!hovering) enter();
        const x = gsap.utils.clamp(-1, 1, ((event.clientX - bounds.left) / bounds.width) * 2 - 1);
        const y = gsap.utils.clamp(-1, 1, ((event.clientY - bounds.top) / bounds.height) * 2 - 1);

        tiltX(-y * portraitMotion.tilt);
        tiltY(x * portraitMotion.tilt);
        humanX(x * portraitMotion.human);
        humanY(y * 2);
        aiX(x * portraitMotion.ai);
        aiY(y * 6);
        cyanX(x * portraitMotion.cyan);
        redX(x * portraitMotion.red);
        redY(y * portraitMotion.red);
        yellowY(y * portraitMotion.yellow);
        setLightX(`${((x + 1) / 2) * 100}%`);
        setLightY(`${((y + 1) / 2) * 100}%`);
      };

      const leave = () => {
        hovering = false;
        root.classList.remove("is-interacting");
        tiltX(0);
        tiltY(0);
        humanX(0);
        humanY(0);
        aiX(0);
        aiY(0);
        cyanX(0);
        redX(0);
        redY(0);
        yellowY(0);
        setLightX("50%");
        setLightY("42%");
      };

      root.addEventListener("pointerenter", enter);
      root.addEventListener("pointermove", move);
      root.addEventListener("pointerleave", leave);
      window.addEventListener("resize", updateBounds, { passive: true });

      return () => {
        root.removeEventListener("pointerenter", enter);
        root.removeEventListener("pointermove", move);
        root.removeEventListener("pointerleave", leave);
        window.removeEventListener("resize", updateBounds);
        root.classList.remove("is-interacting");
      };
    },
    { scope: portraitRef, dependencies: [finePointer, reducedMotion], revertOnUpdate: true },
  );

  return null;
}
