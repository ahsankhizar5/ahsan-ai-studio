import type { Metadata } from "next";
import { headers } from "next/headers";
import { CopyEmail } from "../components/CopyEmail";
import { MotionController } from "../components/MotionController";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import {
  certifications,
  experience,
  process,
  profile,
  recognition,
  technicalCapabilities,
} from "../data/profile";

export const metadata: Metadata = {
  title: "About Ahsan Khizar \u2014 AI Engineer & AI Video Producer",
  description:
    "Meet Ahsan Khizar, a Software Engineering student building applied AI products, agents, automation, and complementary AI video production.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "profile",
    url: "/about",
    title: "About Ahsan Khizar \u2014 AI Engineer",
    description:
      "Software Engineering, applied AI systems, and complementary AI video production from Ahsan Khizar.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Ahsan Khizar \u2014 AI Engineer and AI Video Producer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Ahsan Khizar \u2014 AI Engineer",
    description: "Software Engineering, applied AI systems, and complementary AI video production.",
    images: ["/og.png"],
  },
};

const capabilityGroups = [
  { name: "Languages", items: technicalCapabilities.languages },
  { name: "AI and machine learning", items: technicalCapabilities.aiMl },
  { name: "Backend and product", items: technicalCapabilities.backendProduct },
  { name: "Delivery tools", items: technicalCapabilities.tools },
] as const;

const recognitionAndCredentials = [
  ...recognition,
  ...certifications,
  "Best Award \u2014 DevelopersHub Corporation internship",
] as const;

async function requestOrigin() {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  return `${protocol}://${host}`;
}

export default async function AboutPage() {
  const origin = await requestOrigin();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `About ${profile.name}`,
    description:
      "A factual profile of Ahsan Khizar's education, engineering experience, technical capabilities, and recognition.",
    url: `${origin}/about`,
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${origin}/ahsan-khizar.png`,
      width: 960,
      height: 1131,
    },
    mainEntity: {
      "@type": "Person",
      name: profile.name,
      email: `mailto:${profile.email}`,
      image: `${origin}/ahsan-khizar.png`,
      address: { "@type": "PostalAddress", addressCountry: profile.location },
      sameAs: [profile.links.linkedin, profile.links.github],
    },
  };

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <SiteHeader activePage="about" />

      <main id="main-content" data-motion-page="about">
        <section className="about-hero" aria-labelledby="about-title">
          <figure className="about-portrait" data-portrait-reveal>
            {/* The approved, optimized portrait is intentionally rendered with its intrinsic dimensions. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/ahsan-khizar.png"
              width={960}
              height={1131}
              alt="Portrait of Ahsan Khizar"
              sizes="(max-width: 760px) 100vw, 42vw"
              fetchPriority="high"
              decoding="async"
            />
            <figcaption className="portrait-caption about-portrait-caption">
              <strong>{profile.name}</strong>
              <span>{profile.location}</span>
              <span>Applied AI systems</span>
            </figcaption>
          </figure>

          <div className="about-hero-copy" data-hero-reveal>
            <p className="eyebrow">About / Ahsan Khizar</p>
            <h1 id="about-title">I build the system around the model.</h1>
            <p className="about-introduction">
              I am a final-year Software Engineering student at {profile.education.institution},
              focused on turning AI capabilities into products, agents, and automation that fit real
              workflows.
            </p>
            <p>
              AI engineering is my primary practice. AI video production complements it when an idea
              also needs a clear, watchable form.
            </p>
            <a className="button button-primary" href="#experience-timeline">
              Follow the timeline <span aria-hidden="true">{"\u2193"}</span>
            </a>
          </div>
        </section>

        <section className="about-philosophy section-shell" aria-labelledby="philosophy-title">
          <div className="about-section-head" data-motion-reveal>
            <p className="eyebrow">Working philosophy</p>
            <h2 id="philosophy-title">Useful AI is a systems problem.</h2>
          </div>
          <div className="about-philosophy-copy">
            <p>
              A model is one part of the product. The API, data flow, evaluation, interface, and
              operating workflow determine whether the capability can be used with confidence.
            </p>
            <p>
              My work connects those layers. The engineering stays primary; video is a supporting
              production capability for ideas that need to be explained, demonstrated, or tested in
              public.
            </p>
          </div>
        </section>

        <section className="about-profile section-shell" aria-labelledby="profile-title">
          <div className="about-section-head" data-motion-reveal>
            <p className="eyebrow">Current profile and education</p>
            <h2 id="profile-title">Software engineering in progress. Applied work now.</h2>
          </div>
          <dl className="about-fact-index">
            <div>
              <dt>Current profile</dt>
              <dd>Final-year Software Engineering student building applied AI systems.</dd>
            </div>
            <div>
              <dt>Institution</dt>
              <dd>{profile.education.institution}</dd>
            </div>
            <div>
              <dt>Degree</dt>
              <dd>{profile.education.degree}</dd>
            </div>
            <div>
              <dt>Study period</dt>
              <dd>{profile.education.period}</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{profile.location} / available for remote collaboration</dd>
            </div>
          </dl>
        </section>

        <section
          id="experience-timeline"
          className="about-experience section-shell"
          aria-labelledby="about-experience-title"
        >
          <div className="about-section-head" data-motion-reveal>
            <p className="eyebrow">Experience timeline</p>
            <h2 id="about-experience-title">Three roles. Three working contexts.</h2>
          </div>
          <ol className="about-timeline" data-reveal-group>
            {experience.map((item, index) => (
              <li key={`${item.organization}-${item.role}`}>
                <span className="timeline-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="timeline-role">
                  <h3>{item.role}</h3>
                  <p>{item.organization}</p>
                </div>
                <p className="timeline-meta">
                  {item.period}
                  <br />
                  {item.location}
                </p>
                <p className="timeline-summary">{item.summary}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="about-capabilities section-shell" aria-labelledby="technical-title">
          <div className="about-section-head" data-motion-reveal>
            <p className="eyebrow">Technical capability index</p>
            <h2 id="technical-title">The working stack, grouped by job.</h2>
          </div>
          <ol className="indexed-list about-capability-index" data-reveal-group>
            {capabilityGroups.map((group, index) => (
              <li key={group.name}>
                <span className="row-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{group.name}</h3>
                <p>{group.items.join(" \u00b7 ")}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="about-recognition section-shell" aria-labelledby="recognition-title">
          <div className="about-section-head" data-motion-reveal>
            <p className="eyebrow">Awards and certifications</p>
            <h2 id="recognition-title">Recognition, earned and documented.</h2>
          </div>
          <ul className="about-recognition-list" data-reveal-group>
            {recognitionAndCredentials.map((item, index) => (
              <li key={item}>
                <span aria-hidden="true">R{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="about-principles section-shell" aria-labelledby="principles-title">
          <div className="about-section-head" data-motion-reveal>
            <p className="eyebrow">Personal operating principles</p>
            <h2 id="principles-title">Discover. Design. Build. Refine.</h2>
          </div>
          <ol className="about-principle-list" data-reveal-group>
            {process.map((principle, index) => (
              <li key={principle.name}>
                <span aria-hidden="true">P{String(index + 1).padStart(2, "0")}</span>
                <h3>{principle.name}</h3>
                <p>{principle.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="contact" className="about-contact contact-v2 section-shell" data-motion-reveal aria-labelledby="contact-title">
          <p className="eyebrow">Project inquiry</p>
          <h2 id="contact-title">Bring the problem. I will help shape the system.</h2>
          <p>
            Share the workflow, the audience, and what the finished work needs to do. Engineering
            comes first; video can support the idea when it needs to be seen.
          </p>
          <div className="contact-actions">
            <a className="contact-email" href={`mailto:${profile.email}?subject=Project%20inquiry`}>
              Start a project <span aria-hidden="true">{"\u2197"}</span>
            </a>
            <CopyEmail email={profile.email} />
          </div>
        </section>
        <MotionController page="about" />
      </main>

      <SiteFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
