export function HeroMedia() {
  return (
    <div className="hero-media" data-hero-media aria-hidden="true">
      <picture>
        <source
          media="(max-width: 760px)"
          srcSet="/hero-system-story-960.webp"
          width={960}
          height={540}
        />
        <img
          src="/hero-system-story-1728.webp"
          width={1728}
          height={973}
          sizes="100vw"
          alt=""
          fetchPriority="high"
          decoding="async"
        />
      </picture>
      <span className="hero-media-beam" />
      <span className="hero-media-vignette" />
    </div>
  );
}
