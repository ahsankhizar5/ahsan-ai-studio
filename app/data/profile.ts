export type Link = { label: string; href: string };
export type Project = {
  name: string;
  category: string;
  description: string;
  contribution: string;
  stack: readonly string[];
  image: string;
  year: string;
  href?: string;
};
export type Experience = {
  role: string;
  organization: string;
  location: string;
  period: string;
  summary: string;
};

export const profile = {
  name: "Ahsan Khizar",
  email: "ahsankhizar1075@gmail.com",
  location: "Pakistan",
  education: {
    institution: "University of Engineering and Technology, Taxila",
    degree: "Bachelor of Engineering in Software Engineering",
    period: "September 2022 — December 2026",
  },
  links: {
    github: "https://github.com/ahsankhizar5",
    linkedin: "https://www.linkedin.com/in/ahsankhizar/",
  },
} as const;

export const engineeringProjects: readonly Project[] = [
  {
    name: "Audio Deepfake Detection System",
    category: "Security-oriented AI",
    description: "An audio anti-spoofing system built around an AASIST-style detection pipeline.",
    contribution: "Backend/API and model-integration direction focused on testable inputs and deployable model behavior.",
    stack: ["Python", "FastAPI", "PyTorch", "AASIST-style pipeline"],
    image: "/media/projects/audio-deepfake-detection.webp",
    year: "2026",
    href: "https://www.verivox.studio/",
  },
  {
    name: "DocuSync",
    category: "AI documentation automation",
    description: "A working system connecting GitHub pull requests to LLM drafting, human review, Notion sync, APIs, and persistent state.",
    contribution: "Built the automation workflow, backend APIs, database integration, and product interface.",
    stack: ["FastAPI", "Next.js", "PostgreSQL", "Gemini", "Notion API"],
    image: "/media/projects/docusync.webp",
    year: "2026",
    href: "https://github.com/ahsankhizar5/docusync",
  },
  {
    name: "PIGEON Reproduction",
    category: "Visual geolocation",
    description: "A PIGEON-style image-geolocation pipeline using visual embeddings and hierarchical geographic classification.",
    contribution: "Used frozen CLIP ViT-B/32 features, S2 Geometry, and confidence-based filtering.",
    stack: ["Python", "CLIP ViT-B/32", "S2 Geometry"],
    image: "/media/projects/pigeon-geolocation.webp",
    year: "2026",
    href: "https://github.com/ahsankhizar5/PIGEON_Reproduction",
  },
  {
    name: "Customer Behavior Profiling",
    category: "Fraud and anomaly detection",
    description: "A testable behavior-profiling workflow covering preprocessing, feature preparation, clustering, and experimentation.",
    contribution: "Built the analysis workflow and Streamlit delivery surface with automated tests.",
    stack: ["Python", "Pandas", "Scikit-learn", "Streamlit", "Pytest"],
    image: "/media/projects/customer-behavior-profiling.webp",
    year: "2026",
    href: "https://github.com/ahsankhizar5/customer-behavior-profiling",
  },
  {
    name: "Fraud Detection ML Pipeline",
    category: "Production machine learning",
    description: "An end-to-end fraud detection pipeline covering feature engineering, class balancing, classification, and ROC-based evaluation.",
    contribution: "Structured the complete Python workflow for reproducible training, evaluation, and operational fraud-risk decisions.",
    stack: ["Python", "Pandas", "Scikit-learn", "Random Forest", "ROC evaluation"],
    image: "/media/projects/fraud-detection-pipeline.webp",
    year: "2026",
    href: "https://github.com/ahsankhizar5/fraud-detection-ml-pipeline",
  },
] as const;

export const experience: readonly Experience[] = [
  { role: "Software Engineer Intern", organization: "Qadri Group", location: "Lahore, Pakistan", period: "July 2025 — August 2025", summary: "Built engineering automation logic and contributed to private SolidWorks-based CAD automation tooling using C#, WinForms, and the SolidWorks API." },
  { role: "Data Science & Analytics Intern", organization: "DevelopersHub Corporation", location: "Remote", period: "May 2025 — June 2025", summary: "Applied Python, Pandas, NumPy, Matplotlib, SQL, and Power BI to real datasets and received the internship Best Award." },
  { role: "Web Development Intern", organization: "Prodigy InfoTech", location: "Remote", period: "September 2024 — October 2024", summary: "Developed responsive web projects with HTML5, CSS3, JavaScript, Bootstrap, browser debugging, and UI/UX implementation practices." },
] as const;

export const recognition = [
  "4th Position, All Pakistan Prompt Engineering Competition — 2026",
  "Top 20 Finalist, Global AI Hackathon — 2026",
] as const;

export const certifications = [
  "Generative AI Application Developer — NCEAC, Top Performer",
  "AI Basic to Advanced — ITSOLERA",
  "Meta React Specialization — Meta",
  "PEEF Scholar — Punjab Educational Endowment Fund, 2018–2026",
] as const;

export const videoServices = [
  { name: "Avatar-led explainers", description: "Turn a script into a credible on-screen presenter without scheduling a studio day." },
  { name: "UGC & performance ads", description: "Produce native-looking concepts and fast creative variations built for testing." },
  { name: "Product demonstrations", description: "Show the product, problem, and payoff before attention moves elsewhere." },
  { name: "Localized content", description: "Adapt voice, captions, pacing, and edits for new audiences." },
  { name: "Creative variations", description: "Build multiple hooks, cuts, and formats from one approved message." },
] as const;

export const technicalCapabilities = {
  languages: ["Python", "TypeScript", "JavaScript", "SQL", "C#", "HTML/CSS"],
  aiMl: ["PyTorch", "Scikit-learn", "Pandas", "NumPy", "CLIP", "ViT-B/32", "Anomaly detection", "Classification", "Model evaluation"],
  backendProduct: ["FastAPI", "REST APIs", "React", "Next.js", "Vite", "Streamlit", "PostgreSQL", "Supabase", "Postman"],
  tools: ["Git", "GitHub", "GitHub Actions", "Docker basics", "Power BI", "Codex", "Claude Code", "LLM workflows"],
} as const;

export const process = [
  { name: "Discover", description: "Clarify the audience, the problem, and what success must look like." },
  { name: "Design", description: "Choose the system architecture or creative treatment before production." },
  { name: "Build", description: "Engineer the working product or produce the complete video asset." },
  { name: "Refine", description: "Test, review, revise, and deliver a result ready for real use." },
] as const;
