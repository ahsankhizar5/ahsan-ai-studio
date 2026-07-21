type AboutPortraitProps = {
  name: string;
  location: string;
};

export function AboutPortrait({ name, location }: AboutPortraitProps) {
  return (
    <figure className="about-portrait-art" data-about-portrait>
      <span className="about-portrait-color-field about-portrait-red" aria-hidden="true" />
      <span className="about-portrait-color-field about-portrait-citrus" aria-hidden="true" />
      <span className="about-portrait-color-field about-portrait-cyan" aria-hidden="true" />
      {/* The approved, optimized portrait is intentionally rendered at its intrinsic dimensions. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/ahsan-khizar.webp"
        width={960}
        height={1131}
        sizes="(max-width: 760px) 100vw, 42vw"
        fetchPriority="high"
        decoding="async"
        alt="Portrait of Ahsan Khizar"
      />
      <figcaption>
        <strong>{name}</strong>
        <span>{location}</span>
        <span>Applied AI systems</span>
      </figcaption>
    </figure>
  );
}
