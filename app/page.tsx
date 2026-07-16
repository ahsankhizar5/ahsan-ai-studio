import { CopyEmail } from "./components/CopyEmail";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";

const engineeringProjects = [
  {
    name: "DocuSync",
    type: "AI documentation automation",
    description:
      "A working system that connects GitHub pull requests to LLM drafting, human review, Notion sync, backend APIs, and persistent product state.",
    stack: "FastAPI · Next.js · PostgreSQL · Gemini · Notion API",
    href: "https://github.com/ahsankhizar5/docusync",
  },
  {
    name: "PIGEON Reproduction",
    type: "Visual geolocation pipeline",
    description:
      "An image-geolocation system using frozen CLIP embeddings, S2 Geometry, hierarchical geographic classification, and confidence filtering.",
    stack: "Python · CLIP ViT-B/32 · S2 Geometry",
    href: "https://github.com/ahsankhizar5/PIGEON_Reproduction",
  },
  {
    name: "Customer Behavior Profiling",
    type: "Fraud and anomaly detection",
    description:
      "A testable customer-behavior workflow covering preprocessing, feature preparation, clustering, and model experimentation.",
    stack: "Python · Pandas · Scikit-learn · Streamlit · Pytest",
    href: "https://github.com/ahsankhizar5/customer-behavior-profiling",
  },
];

const videoServices = [
  [
    "Avatar-led explainers",
    "Turn a script into a credible on-screen presenter without scheduling a studio day.",
  ],
  [
    "UGC & performance ads",
    "Produce native-looking concepts and fast creative variations built for testing.",
  ],
  [
    "Product demos",
    "Show the product, the problem, and the payoff before attention moves elsewhere.",
  ],
  [
    "Localized content",
    "Adapt voice, captions, pacing, and edits for new audiences without rebuilding from zero.",
  ],
];

const process = [
  ["Discover", "Clarify the audience, the problem, and what success must look like."],
  ["Design", "Choose the system architecture or the creative treatment before production."],
  ["Build", "Engineer the working product or produce the complete video asset."],
  ["Refine", "Test, review, revise, and deliver a result ready for real use."],
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: "Ahsan Khizar",
      jobTitle: "AI Engineer",
      email: "mailto:ahsankhizar1075@gmail.com",
      sameAs: [
        "https://www.linkedin.com/in/ahsankhizar/",
        "https://github.com/ahsankhizar5",
      ],
      knowsAbout: [
        "Applied artificial intelligence",
        "AI agents",
        "Workflow automation",
        "Machine learning",
        "AI video production",
      ],
    },
    {
      "@type": "ProfessionalService",
      name: "Ahsan Khizar — AI Engineering and AI Video Production",
      description:
        "AI product engineering, agents, automation, avatar videos, UGC-style ads, product demos, and explainers.",
      provider: { "@type": "Person", name: "Ahsan Khizar" },
      areaServed: "Worldwide",
      serviceType: ["AI engineering", "AI video production"],
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

      <main id="main-content">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-name-field">
            <p className="hero-role">AI engineer &amp; video maker</p>
            <h1 id="hero-title" className="display-name" aria-label="Ahsan Khizar">
              <span>Ahsan</span>
              <span className="display-name-light">Khizar</span>
            </h1>

            <div className="hero-pitch">
              <p>
                <strong>I build AI</strong>
                <span>that works.</span>
              </p>
              <p>
                <strong>And video</strong>
                <span>that gets watched.</span>
              </p>
            </div>

            <a className="text-cta hero-cta" href="#contact">
              <span aria-hidden="true">→</span> Start a project
            </a>
          </div>

          <div className="hero-capabilities" aria-label="Core capabilities">
            <a className="capability-panel engineering-panel" href="#engineering">
              <span className="panel-index">Primary practice</span>
              <span className="panel-title">AI engineering</span>
              <span className="panel-detail">Products / Agents / Automation</span>
              <span className="panel-mark" data-mark="AI" aria-hidden="true" />
            </a>
            <a className="capability-panel video-panel" href="#video">
              <span className="panel-index">Secondary practice</span>
              <span className="panel-title">AI video production</span>
              <span className="panel-detail">Avatars / UGC / Ads / Explainers</span>
              <span className="panel-mark" data-mark="24" aria-hidden="true" />
            </a>
            <div className="one-standard">
              One person. Two capabilities. <strong>One standard.</strong>
            </div>
          </div>
        </section>

        <section id="engineering" className="engineering section-shell" aria-labelledby="engineering-title">
          <div className="section-heading">
            <p className="section-context">The main practice</p>
            <h2 id="engineering-title">
              Make the model useful.
              <br />
              Make the system real.
            </h2>
            <p className="section-intro">
              I design and build applied AI products that connect models to real workflows—clear inputs,
              reliable APIs, useful interfaces, and behavior a team can actually test.
            </p>
          </div>

          <div className="capability-rail" aria-label="AI engineering capabilities">
            <span>AI products</span>
            <span>Agents</span>
            <span>Automation</span>
            <span>Integrations</span>
            <span>Evaluation</span>
          </div>

          <div className="project-list" aria-label="Selected engineering projects">
            {engineeringProjects.map((project) => (
              <article className="project-row" key={project.name}>
                <div>
                  <p className="project-type">{project.type}</p>
                  <h3>{project.name}</h3>
                </div>
                <p>{project.description}</p>
                <div className="project-meta">
                  <span>{project.stack}</span>
                  <a href={project.href} target="_blank" rel="noreferrer">
                    View source <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="video" className="video section-shell" aria-labelledby="video-title">
          <div className="video-lead">
            <p className="section-context">The supporting capability</p>
            <h2 id="video-title">Turn the idea into something people will watch.</h2>
            <p>
              AI video production for teams that need more than a generated clip: a clear message,
              deliberate pacing, and an asset shaped for where it will actually run.
            </p>
          </div>

          <div className="service-list">
            {videoServices.map(([name, description]) => (
              <article className="service-row" key={name}>
                <h3>{name}</h3>
                <p>{description}</p>
                <span aria-hidden="true">→</span>
              </article>
            ))}
          </div>
        </section>

        <section id="process" className="process section-shell" aria-labelledby="process-title">
          <div className="process-heading">
            <p className="section-context">One working method</p>
            <h2 id="process-title">Different output. Same standard.</h2>
          </div>
          <ol className="process-list">
            {process.map(([name, description], index) => (
              <li key={name}>
                <span className="process-number">{String(index + 1).padStart(2, "0")}</span>
                <h3>{name}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="about" className="about section-shell" aria-labelledby="about-title">
          <div className="about-statement">
            <p className="section-context">Ahsan Khizar</p>
            <h2 id="about-title">Technical enough to build it. Creative enough to make it land.</h2>
          </div>
          <div className="about-copy">
            <p>
              I am an AI engineer focused on deployable systems: the model invocation, backend flow,
              data path, product interface, and review loop that turn an AI idea into useful behavior.
            </p>
            <p>
              AI video is the complementary practice. It gives the same ideas a second form—something a
              customer, user, or stakeholder can understand quickly and remember.
            </p>
          </div>
          <div className="recognition" aria-label="Selected recognition">
            <div>
              <strong>4th position</strong>
              <span>All Pakistan Prompt Engineering Competition · 2026</span>
            </div>
            <div>
              <strong>Top 20 finalist</strong>
              <span>Global AI Hackathon · 2026</span>
            </div>
          </div>
        </section>

        <section id="contact" className="contact section-shell" aria-labelledby="contact-title">
          <p className="section-context">Start with the problem</p>
          <h2 id="contact-title">Build the system. Create the cut.</h2>
          <p>
            Tell me what needs to work, who needs to see it, and what a strong result looks like.
          </p>
          <div className="contact-actions">
            <a className="contact-email" href="mailto:ahsankhizar1075@gmail.com?subject=Project%20inquiry">
              Start a project <span aria-hidden="true">↗</span>
            </a>
            <CopyEmail email="ahsankhizar1075@gmail.com" />
          </div>
        </section>
      </main>

      <SiteFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
