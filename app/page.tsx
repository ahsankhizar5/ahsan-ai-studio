import { CopyEmail } from "./components/CopyEmail";
import { ConnectedBuild } from "./components/ConnectedBuild";
import { HomepageHero } from "./components/HomepageHero";
import { MotionController } from "./components/MotionController";
import { ProjectStage } from "./components/ProjectStage";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { ToolMarquee } from "./components/ToolMarquee";
import {
  engineeringProjects,
  experience,
  process,
  profile,
  recognition,
  technicalCapabilities,
  videoServices,
} from "./data/profile";

const proofSignals = [
  `${profile.education.degree} · ${profile.education.institution}`,
  experience.map(({ role }) => role).join(" · "),
  recognition[0],
  recognition[1],
] as const;

const featuredProjectNames = [
  "DocuSync",
  "PIGEON Reproduction",
  "Audio Deepfake Detection System",
  "Customer Behavior Profiling",
] as const;

const featuredProjects = featuredProjectNames
  .map((name) => engineeringProjects.find((project) => project.name === name))
  .filter(
    (project): project is (typeof engineeringProjects)[number] => Boolean(project),
  );

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: profile.name,
      email: `mailto:${profile.email}`,
      address: { "@type": "PostalAddress", addressCountry: profile.location },
      sameAs: [profile.links.linkedin, profile.links.github],
    },
    {
      "@type": "ProfessionalService",
      name: `${profile.name} professional services`,
      email: `mailto:${profile.email}`,
      areaServed: profile.location,
      sameAs: [profile.links.linkedin, profile.links.github],
    },
  ],
};

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <SiteHeader activePage="home" />

      <main id="main-content" className="conversion-home" data-motion-page="home">
        <HomepageHero email={profile.email} location={profile.location} />

        <section id="services" className="positioning-scene" aria-labelledby="positioning-title">
          <div data-motion-reveal>
            <h2 id="positioning-title">
              Bring the problem. <span>Leave with something real.</span>
            </h2>
          </div>
          <div>
            <p>
              I work across the system, product surface, and the story around it—without
              splitting responsibility between technical and creative teams.
            </p>
            <strong>
              One person.
              <br />
              One standard.
            </strong>
            <small className="positioning-depth">
              Working depth: {technicalCapabilities.aiMl[0]} · {technicalCapabilities.backendProduct[0]} · {technicalCapabilities.backendProduct[6]}
            </small>
          </div>
        </section>

        <section className="credibility-rail" aria-label="Evidence before promises">
          <strong>Evidence before promises</strong>
          <ul>
            {proofSignals.map((signal) => (
              <li key={signal}>{signal}</li>
            ))}
          </ul>
        </section>

        <ToolMarquee />

        <ProjectStage projects={featuredProjects} />

        <ConnectedBuild videoServices={videoServices} />

        <section id="process" className="unified-process" aria-labelledby="process-title">
          <header data-motion-reveal>
            <h2 id="process-title">A direct path from problem to proof.</h2>
            <p>One shared method keeps engineering, product, and communication decisions aligned.</p>
          </header>
          <ol data-reveal-group>
            {process.map((step, index) => (
              <li key={step.name}>
                <span>{index + 1}</span>
                <h3>{step.name}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="recognition-band" aria-label="Selected recognition">
          <strong>Selected signals</strong>
          {recognition.map((item) => (
            <p key={item}>{item}</p>
          ))}
          <a href="/about">
            Read the full background <span aria-hidden="true">→</span>
          </a>
        </section>

        <section id="contact" className="red-noir-contact" aria-labelledby="contact-title">
          <h2 id="contact-title" data-motion-reveal>
            What should your AI product <span>make possible?</span>
          </h2>
          <div>
            <p>
              Send the problem, audience, constraints, and desired outcome. I will reply with the
              clearest place to start.
            </p>
            <div className="red-noir-contact-actions">
              <a href={`mailto:${profile.email}?subject=AI%20product%20project`}>
                Start a project <span aria-hidden="true">↗</span>
              </a>
              <CopyEmail email={profile.email} />
            </div>
          </div>
        </section>
        <MotionController page="home" />
      </main>

      <SiteFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
