import { HeroMedia } from "./HeroMedia";

type HomepageHeroProps = {
  email: string;
  location: string;
};

const capabilities = [
  ["Applied AI", "Models · evaluation · orchestration"],
  ["Product systems", "APIs · backend · automation"],
  ["Communication", "Demos · explainers · launch content"],
] as const;

export function HomepageHero({ email, location }: HomepageHeroProps) {
  return (
    <section className="cinematic-hero" aria-labelledby="hero-title">
      <HeroMedia />
      <div className="cinematic-hero-copy" data-home-hero-copy>
        <p className="hero-kicker">One connected build</p>
        <h1 id="hero-title">
          I transform complex AI ideas into{" "}
          <span>powerful products people understand and trust.</span>
        </h1>
        <p className="cinematic-hero-support">
          From the system behind the product to the demos and launch content that explain it, I lead
          the work as one connected build.
        </p>
        <div className="cinematic-hero-actions">
          <a
            className="hero-button hero-button-primary"
            href={`mailto:${email}?subject=AI%20product%20project`}
          >
            Discuss your project <span aria-hidden="true">↗</span>
          </a>
          <a className="hero-button hero-button-secondary" href="#work">
            View selected work <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
      <aside className="hero-engineering-note">
        <strong>Engineering first.</strong>
        <span>
          Product communication continues the same thinking—so what gets built is clear and ready to
          launch.
        </span>
      </aside>
      <div className="hero-capability-rail" aria-label="Practice summary">
        {capabilities.map(([name, detail]) => (
          <div key={name}>
            <strong>{name}</strong>
            <span>{detail}</span>
          </div>
        ))}
        <div>
          <strong>{location}</strong>
          <span>Available for remote projects</span>
        </div>
      </div>
    </section>
  );
}
