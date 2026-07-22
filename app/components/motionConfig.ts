export const heroMotion = {
  background: { x: 4, y: 3 },
  energy: { x: 8, y: 6 },
  character: { x: 16, y: 10, rotateX: 1.5, rotateY: 2.5 },
  split: { min: 42, max: 58, travel: 26, rotation: 0.75 },
  scroll: { background: 28, energy: 38, character: 58 },
} as const;

export const portraitMotion = {
  tilt: 1.5,
  human: 3,
  ai: 8,
  cyan: 11,
  red: 9,
  yellow: 12,
} as const;

export const pageMotion = {
  reveal: { distance: 42, duration: 0.86, ease: "power3.out" },
  group: { distance: 34, duration: 0.72, stagger: 0.075, ease: "power3.out" },
  magnetic: { travel: 4 },
} as const;
