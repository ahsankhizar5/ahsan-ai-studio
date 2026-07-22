import type { CSSProperties } from "react";

export type TechnologyIcon = {
  title: string;
  slug: string;
  hex: string;
};

const icons = {
  python: { title: "Python", slug: "python", hex: "3776AB" },
  typescript: { title: "TypeScript", slug: "typescript", hex: "3178C6" },
  fastapi: { title: "FastAPI", slug: "fastapi", hex: "009688" },
  react: { title: "React", slug: "react", hex: "61DAFB" },
  next: { title: "Next.js", slug: "nextdotjs", hex: "000000" },
  vite: { title: "Vite", slug: "vite", hex: "9135FF" },
  postgres: { title: "PostgreSQL", slug: "postgresql", hex: "4169E1" },
  pytorch: { title: "PyTorch", slug: "pytorch", hex: "EE4C2C" },
  github: { title: "GitHub", slug: "github", hex: "181717" },
  git: { title: "Git", slug: "git", hex: "F03C2E" },
  docker: { title: "Docker", slug: "docker", hex: "2496ED" },
  notion: { title: "Notion", slug: "notion", hex: "000000" },
  gemini: { title: "Google Gemini", slug: "googlegemini", hex: "8E75B2" },
  pandas: { title: "pandas", slug: "pandas", hex: "150458" },
  sklearn: { title: "scikit-learn", slug: "scikitlearn", hex: "F7931E" },
  streamlit: { title: "Streamlit", slug: "streamlit", hex: "FF4B4B" },
} satisfies Record<string, TechnologyIcon>;

const iconByTechnology: Record<string, TechnologyIcon> = {
  python: icons.python,
  typescript: icons.typescript,
  javascript: icons.typescript,
  fastapi: icons.fastapi,
  react: icons.react,
  "next.js": icons.next,
  vite: icons.vite,
  postgresql: icons.postgres,
  pytorch: icons.pytorch,
  github: icons.github,
  git: icons.git,
  docker: icons.docker,
  notion: icons.notion,
  "notion api": icons.notion,
  gemini: icons.gemini,
  pandas: icons.pandas,
  "scikit-learn": icons.sklearn,
  streamlit: icons.streamlit,
  "clip vit-b/32": icons.pytorch,
  "aasist-style pipeline": icons.pytorch,
};

export const marqueeTechnologies = [
  "Python", "TypeScript", "FastAPI", "React", "Next.js", "PostgreSQL", "PyTorch",
  "GitHub", "Docker", "Notion", "Gemini", "Pandas", "Scikit-learn", "Streamlit",
] as const;

export function technologyIcon(name: string) {
  return iconByTechnology[name.trim().toLowerCase()];
}
export function TechnologyLogo({
  icon,
  label,
  compact = false,
}: {
  icon: TechnologyIcon;
  label?: string;
  compact?: boolean;
}) {
  const monochrome = icon.hex.toLowerCase() === "000000" || icon.hex.toLowerCase() === "181717";
  const style = {
    "--technology-color": `#${icon.hex}`,
    "--technology-mask": `url('/media/tech/${icon.slug}.svg')`,
  } as CSSProperties;

  return (
    <span
      className={`technology-logo${compact ? " is-compact" : ""}`}
      data-monochrome={monochrome || undefined}
      style={style}
      title={label ?? icon.title}
    >
      <span className="technology-logo-mark" role="img" aria-label={label ?? icon.title} />
      {label ? <span>{label}</span> : null}
    </span>
  );
}
