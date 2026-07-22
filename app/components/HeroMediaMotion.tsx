"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";
import { heroMotion } from "./motionConfig";
import { useMotionPreferences } from "./useMotionPreferences";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function HeroMediaMotion({ mediaRef }: { mediaRef: RefObject<HTMLDivElement | null> }) {
  const { finePointer, reducedMotion } = useMotionPreferences();
  const { contextSafe } = useGSAP({ scope: mediaRef });

  useGSAP(
    () => {
      const root = mediaRef.current;
      const hero = root?.closest<HTMLElement>(".cinematic-hero");
      if (!root || !hero || reducedMotion) return;

      const backgrounds = gsap.utils.toArray<HTMLElement>("[data-pointer-background]", root);
      const characters = gsap.utils.toArray<HTMLElement>("[data-pointer-character]", root);
      const energyPointer = root.querySelector<HTMLElement>("[data-pointer-energy]");
      const glowPointer = root.querySelector<HTMLElement>("[data-pointer-glow]");
      const spotlight = root.querySelector<HTMLElement>("[data-hero-spotlight]");
      const spotlightAura = root.querySelector<HTMLElement>("[data-hero-spotlight-aura]");
      const scene = root.querySelector<HTMLElement>("[data-hero-scene]");
      const energyAmbient = root.querySelector<HTMLElement>("[data-energy-ambient]");
      const redGlow = root.querySelector<HTMLElement>("[data-red-glow]");
      const cyanRim = root.querySelector<HTMLElement>("[data-cyan-rim]");
      const helmetSweep = root.querySelector<HTMLElement>("[data-helmet-sweep]");
      const yellowParticles = root.querySelectorAll<HTMLElement>("[data-yellow-particle]");
      const scrollBackgrounds = root.querySelectorAll<HTMLElement>("[data-scroll-background]");
      const scrollEnergy = root.querySelector<HTMLElement>("[data-scroll-energy]");
      const scrollCharacters = root.querySelectorAll<HTMLElement>("[data-scroll-character]");
      const scrollSweep = root.querySelector<HTMLElement>("[data-scroll-sweep]");
      const energyImages = root.querySelectorAll<HTMLElement>("[data-energy-image]");
      const heroCopy = hero.querySelector<HTMLElement>("[data-home-hero-copy]");
      const capabilityRail = hero.querySelector<HTMLElement>(".hero-capability-rail");
      const capabilityItems = capabilityRail?.querySelectorAll<HTMLElement>("div");
      const scrollProgress = hero.querySelector<HTMLElement>("[data-hero-scroll-progress]");
      const titleWords = gsap.utils.toArray<HTMLElement>("[data-hero-word]", hero);
      const characterIdle = gsap.utils.toArray<HTMLElement>("[data-character-idle]", root);

      const ambient = gsap.timeline({ repeat: -1, yoyo: true });
      ambient
        .to(energyAmbient, { x: 3, y: -2, duration: 8.5, ease: "sine.inOut" }, 0)
        .to(redGlow, { opacity: 0.9, scale: 1.025, duration: 7.5, ease: "sine.inOut" }, 0)
        .to(cyanRim, { opacity: 0.56, duration: 6.2, ease: "sine.inOut" }, 0.7)
        .to(helmetSweep, { xPercent: 125, duration: 10.5, ease: "sine.inOut" }, 0.4)
        .to(characterIdle, { y: -2.5, rotationZ: 0.08, scale: 1.002, duration: 7.8, ease: "sine.inOut" }, 0.2);

      const particleFlicker = gsap.to(yellowParticles, {
        opacity: 0.84,
        duration: 2.8,
        stagger: { each: 0.7, repeat: -1, yoyo: true },
        ease: "sine.inOut",
      });

      if (!finePointer) {
        ambient.pause(0);
        particleFlicker.pause(0);
      }

      if (titleWords.length > 0) {
        gsap.fromTo(
          titleWords,
          { opacity: 0, yPercent: 115, rotationX: -18 },
          {
            opacity: 1,
            yPercent: 0,
            rotationX: 0,
            duration: 0.86,
            stagger: 0.035,
            delay: 0.14,
            ease: "power4.out",
          },
        );
      }

      const scrollScale = finePointer ? 1 : 0.55;
      const scrollTimeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

      scrollTimeline
        .to(scrollBackgrounds, { y: heroMotion.scroll.background * scrollScale }, 0)
        .to(scrollEnergy, { y: heroMotion.scroll.energy * scrollScale }, 0)
        .to(scrollCharacters, { y: heroMotion.scroll.character * scrollScale }, 0)
        .fromTo(scrollSweep, { xPercent: -115, opacity: 0 }, { xPercent: 125, opacity: 0.54 }, 0)
        .to(energyImages, { opacity: 0.72 }, 0.1)
        .to(root, { opacity: 0.92 }, 0.68);

      if (heroCopy) {
        scrollTimeline.to(heroCopy, { y: -28 * scrollScale, opacity: 0.74 }, 0);
      }
      if (capabilityItems && capabilityItems.length > 0) {
        scrollTimeline.fromTo(
          capabilityItems,
          { y: 14, opacity: 0.54 },
          { y: 0, opacity: 1, stagger: 0.035 },
          0.18,
        );
      }
      if (scrollProgress) {
        scrollTimeline.fromTo(scrollProgress, { scaleX: 0 }, { scaleX: 1 }, 0);
      }

      const visibilityTrigger = ScrollTrigger.create({
        trigger: hero,
        start: "top bottom",
        end: "bottom top",
        onToggle: ({ isActive }) => {
          root.classList.toggle("is-ambient-active", isActive);
          if (isActive && finePointer) {
            ambient.play();
            particleFlicker.play();
          } else {
            ambient.pause();
            particleFlicker.pause();
          }
        },
      });

      if (!finePointer || !scene || !energyPointer || !glowPointer || !spotlight || !spotlightAura) {
        return;
      }

      const toBackgroundX = gsap.quickTo(backgrounds, "x", { duration: 0.85, ease: "power3.out" });
      const toBackgroundY = gsap.quickTo(backgrounds, "y", { duration: 0.85, ease: "power3.out" });
      const toEnergyX = gsap.quickTo(energyPointer, "x", { duration: 0.78, ease: "power3.out" });
      const toEnergyY = gsap.quickTo(energyPointer, "y", { duration: 0.78, ease: "power3.out" });
      const toCharacterX = gsap.quickTo(characters, "x", { duration: 0.92, ease: "power3.out" });
      const toCharacterY = gsap.quickTo(characters, "y", { duration: 0.92, ease: "power3.out" });
      const toCharacterRotateX = gsap.quickTo(characters, "rotationX", { duration: 1, ease: "power3.out" });
      const toCharacterRotateY = gsap.quickTo(characters, "rotationY", { duration: 1, ease: "power3.out" });
      const toGlowX = gsap.quickTo(glowPointer, "x", { duration: 1.05, ease: "power3.out" });
      const toGlowY = gsap.quickTo(glowPointer, "y", { duration: 1.05, ease: "power3.out" });
      const toSceneScaleX = gsap.quickTo(scene, "scaleX", { duration: 1.1, ease: "power3.out" });
      const toSceneScaleY = gsap.quickTo(scene, "scaleY", { duration: 1.1, ease: "power3.out" });
      const setSpotlightX = gsap.quickSetter(root, "--spotlight-x");
      const setSpotlightY = gsap.quickSetter(root, "--spotlight-y");

      let bounds = hero.getBoundingClientRect();
      let hovering = false;
      const updateBounds = () => {
        bounds = hero.getBoundingClientRect();
      };

      const enter = contextSafe(() => {
        if (hovering) return;
        hovering = true;
        updateBounds();
        root.classList.add("is-interacting");
        gsap.to(spotlight, { opacity: 1, duration: 0.38, ease: "power3.out" });
        gsap.to(spotlightAura, { opacity: 1, duration: 0.46, ease: "power3.out" });
      });

      const move = (event: PointerEvent) => {
        if (!hovering) enter();
        const normalizedX = gsap.utils.clamp(-1, 1, ((event.clientX - bounds.left) / bounds.width) * 2 - 1);
        const normalizedY = gsap.utils.clamp(-1, 1, ((event.clientY - bounds.top) / bounds.height) * 2 - 1);

        toBackgroundX(normalizedX * heroMotion.background.x);
        toBackgroundY(normalizedY * heroMotion.background.y);
        toEnergyX(normalizedX * heroMotion.energy.x);
        toEnergyY(normalizedY * heroMotion.energy.y);
        toCharacterX(normalizedX * heroMotion.character.x);
        toCharacterY(normalizedY * heroMotion.character.y);
        toCharacterRotateX(-normalizedY * heroMotion.character.rotateX);
        toCharacterRotateY(normalizedX * heroMotion.character.rotateY);
        toGlowX(-normalizedX * 8);
        toGlowY(-normalizedY * 5);
        toSceneScaleX(1.008);
        toSceneScaleY(1.008);
        setSpotlightX(`${event.clientX - bounds.left}px`);
        setSpotlightY(`${event.clientY - bounds.top}px`);
      };

      const leave = contextSafe(() => {
        hovering = false;
        root.classList.remove("is-interacting");
        toBackgroundX(0);
        toBackgroundY(0);
        toEnergyX(0);
        toEnergyY(0);
        toCharacterX(0);
        toCharacterY(0);
        toCharacterRotateX(0);
        toCharacterRotateY(0);
        toGlowX(0);
        toGlowY(0);
        toSceneScaleX(1);
        toSceneScaleY(1);
        setSpotlightX("72%");
        setSpotlightY("42%");
        gsap.to(spotlight, { opacity: 0, duration: 0.62, ease: "power2.inOut" });
        gsap.to(spotlightAura, { opacity: 0, duration: 0.58, ease: "power2.inOut" });
      });

      hero.addEventListener("pointerenter", enter);
      hero.addEventListener("pointermove", move);
      hero.addEventListener("pointerleave", leave);
      window.addEventListener("resize", updateBounds, { passive: true });

      return () => {
        hero.removeEventListener("pointerenter", enter);
        hero.removeEventListener("pointermove", move);
        hero.removeEventListener("pointerleave", leave);
        window.removeEventListener("resize", updateBounds);
        visibilityTrigger.kill();
        root.classList.remove("is-interacting");
        root.classList.remove("is-ambient-active");
      };
    },
    { scope: mediaRef, dependencies: [finePointer, reducedMotion], revertOnUpdate: true },
  );

  return null;
}
