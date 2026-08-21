// ─── All portfolio content centralized here ───

// ─── HUBSPOT BADGES ───
// Template: copy a badge block from HubSpot Academy and add here.
// Each entry needs: title, badgeUrl (verification link), imageUrl (badge image)
export const HUBSPOT_BADGES = [
  {
    title: "HubSpot Marketing Hub Software Certified",
    badgeUrl: "#",
    imageUrl: "#",
  },
  {
    title: "HubSpot Revenue Operations Certified",
    badgeUrl: "https://app-na2.hubspot.com/academy/achievements/fc5k6d45/en/1/peash-das-rudra/hubspot-revenue-operations-certified",
    imageUrl: "https://hubspot-credentials-na1.s3.amazonaws.com/prod/badges/user/73a67e7711fb43dfbf108ab9050e6f56.png",
  },
  {
    title: "HubSpot Reporting Certified",
    badgeUrl: "https://app-na2.hubspot.com/academy/achievements/b543gs3k/en/1/peash-das-rudra/hubspot-reporting-certified",
    imageUrl: "https://hubspot-credentials-na1.s3.amazonaws.com/prod/badges/user/f7c4226c1ee44f3cae2cb426ce30ca89.png",
  },
  // ↓ Add more badges here — just copy the pattern above ↓
];

export const PROFILE = {
  name: "Peash Das Rudra",
  title: "RevOps & AI Automation Engineer",
  subtitle: "HubSpot Certified · Agentic RAG Systems (LangGraph, MCP)",
  email: "peashrudraa@gmail.com",
  phone: "+880 1533679773",
  location: "Khulna, Bangladesh",
  availability: "Open to Freelance & Remote Worldwide",
  tagline: "I build AI systems that run your CRM so your team doesn't have to.",
  description:
    "I architect Agentic AI systems and automated CRM workflows that eliminate manual tasks and scale revenue. As a HubSpot RevOps Certified specialist, I've shipped 20+ production automations for live B2B accounts—turning operational bottlenecks into automated growth engines.",
  resumeUrl: "https://drive.google.com/file/d/1TE_kF9RsfHjgstnWgpoGGFIBkE5usESq/view?usp=sharing",
  calendlyUrl: "https://calendly.com/pdrpeash/30min",
  languages: ["English", "Italian", "French", "German", "Spanish"],
  social: {
    linkedin: "https://www.linkedin.com/in/peashdasrudra/",
    github: "https://github.com/peashdasrudra",
    fiverr: "https://www.fiverr.com/peash_rudra",
  },
  roles: [
    "RevOps & AI Automation Engineer",
    "HubSpot Certified Specialist",
    "Agentic RAG Systems Builder",
    "CRM Automation Architect",
    "Full-Stack Developer",
    "Real Estate Lead Automation Pro",
    "xAI Researcher",
  ],
  fiverr: {
    title: "Real Estate Lead Automation & CRM Specialist",
    skills: [
      "Real Estate Marketing",
      "Marketing Automation",
      "HubSpot CRM",
      "Email Automations",
      "Task Automation",
      "Lead Generation",
      "SMS Automation",
      "Process Automation",
    ],
    level: "Pro",
  },
};

export const STATS = [
  {
    value: 20,
    suffix: "+",
    label: "Production automations shipped for live UK B2B client accounts",
    featured: true,
  },
  { value: 88, suffix: "%", label: "RAG retrieval precision@5 on DealSense" },
  { value: 41, suffix: "%", label: "Reduction in manual lead-triage time" },
  { value: 76, suffix: "%", label: "Shared codebase across 6 platforms" },
  { value: 17, suffix: "+", label: "AI tools shipped in Genius AI" },
  { value: 7, suffix: "", label: "Certifications & credentials" },
  { value: 5, suffix: "", label: "Languages spoken fluently" },
  { value: 70, suffix: "+", label: "Skills across LinkedIn profile" },
  { value: 10, suffix: "k+", label: "Hours of manual work eliminated" },
];

export const EXPERIENCE = [
  {
    role: "CRM & Business Automation Specialist",
    company: "Clickless",
    location: "Mildenhall, UK",
    locationDetail: "Mildenhall, UK · Remote",
    highlightLocation: true,
    period: "Feb 2026 – May 2026 (Internship)",
    type: "Full-time · Remote",
    bullets: [
      "Engineered a native Aircall–HubSpot integration, syncing missed calls into tracked tickets in real-time to eliminate third-party (Slack) dependencies and manual routing delays for a UK AutoTech Company.",
      "Delivered 20+ production-grade automations (covering lead creation, support ticketing, deal pipelines, and email marketing), directly scaling client marketing operations.",
      "Architected CRM and marketing automation infrastructure from scratch for live e-commerce and healthcare portals.",
      "Enabled data-driven executive decisions by building multiple reporting dashboards (10+ reports each) and structuring automated HubSpot Deal Pipelines for enhanced sales visibility.",
      "Standardized operational protocols by documenting comprehensive technical SOPs in Confluence.",
    ],
    tags: ["HubSpot", "n8n", "Aircall", "Slack", "CRM", "RevOps", "Confluence"],
  },
  {
    role: "Junior Software Developer",
    company: "Appstick",
    location: "Khulna, Bangladesh",
    locationDetail: "Khulna · Onsite",
    highlightLocation: false,
    period: "Oct 2025 – Dec 2025",
    type: "Full-time · Onsite",
    bullets: [
      "Engineered a real-time, cross-platform social media application (Loom) using Flutter and BLoC, shipping a unified codebase across mobile, web, and desktop.",
      "Accelerated engineering velocity by maintaining a 75%+ shared codebase, drastically reducing per-platform development effort.",
      "Architected live data synchronization by integrating Firebase Firestore, enabling seamless UI state updates across all devices.",
      "Implemented robust security protocols, managing secure user authentication and cross-platform sessions via Firebase Auth.",
      "Enforced production-grade code reliability by authoring comprehensive unit, widget, and integration tests.",
    ],
    tags: ["Flutter", "Dart", "BLoC", "Firebase", "Mobile", "Testing"],
  },
];

export const PROJECTS = [
  {
    title: "DealSense",
    subtitle: "Agentic RAG Copilot for RevOps",
    icon: "🧠",
    period: "2026",
    type: "CASE STUDY",
    description:
      "A LangGraph multi-agent RAG system integrated with live HubSpot CRM via MCP-based tool-calling. Retrieves deal and contact history from a pgvector store to auto-flag at-risk deals and draft context-aware follow-ups.",
    problem:
      "Sales teams drowning in CRM data with no way to identify at-risk deals or draft personalized outreach. Manual lead triage consumed hours daily across messy CRM environments with thousands of records.",
    solution:
      "Architected a multi-agent LangGraph system with MCP tool-calling that connects to live HubSpot data. Built a pgvector semantic store for deal/contact history retrieval, combined with function-calling for real-time CRM queries and context-aware email generation.",
    impact: [
      "88% retrieval precision@5 in messy CRM environments",
      "41% reduction in manual lead-triage time",
      "Auto-flags at-risk deals with context-aware reasoning",
      "Drafts personalized follow-ups from live CRM data",
    ],
    tags: ["LangGraph", "RAG", "MCP", "HubSpot API", "pgvector", "PostgreSQL", "AI Agent"],
    featured: true,
    metrics: [
      { value: "88%", label: "Precision@5" },
      { value: "41%", label: "Less Triage" },
      { value: "Multi", label: "Agent System" },
    ],
    // ↓ Add links when available — buttons auto-render
    url: "#",
    caseStudyUrl: "",
    githubUrl: "",
  },
  {
    title: "Clickless Automation Suite",
    subtitle: "Enterprise CRM & RevOps Infrastructure",
    icon: "⚡",
    period: "2026",
    type: "CASE STUDY",
    description:
      "End-to-end CRM automation infrastructure built for UK B2B clients — from missed-call ticket creation to lead scoring pipelines and automated deal routing.",
    problem:
      "Manual CRM operations were creating bottlenecks: missed calls went untracked, leads were scored manually, and pipeline updates required constant human intervention across 3+ client accounts.",
    solution:
      "Architected a fully automated system integrating Aircall, Slack, and HubSpot with real-time data flows. Built 20+ production automations, multiple reporting dashboards, and comprehensive SOP documentation.",
    impact: [
      "20+ automations deployed and running in production",
      "Real-time missed call → ticket → alert pipeline",
      "Multiple dashboards with 10+ reports for full CRM visibility",
      "Served 3+ concurrent client accounts simultaneously",
    ],
    tags: ["HubSpot", "n8n", "Aircall", "Slack", "CRM Automation", "RevOps"],
    featured: true,
    metrics: [
      { value: "20+", label: "Automations" },
      { value: "3+", label: "Clients" },
      { value: "5", label: "Dashboards" },
    ],
    url: "#",
    caseStudyUrl: "",
    githubUrl: "",
  },
  {
    title: "LeakStop",
    subtitle: "Real Estate Lead Automation System",
    icon: "🏠",
    period: "2023 – 2024",
    type: "CASE STUDY",
    description:
      "An industry-standard Lead Automation System deployed on live Real Estate Agents' accounts with serverless, offline-first backend and sub-second real-time sync.",
    problem:
      "Real estate agents lose leads because of slow response times. The lead waits and contacts another agent. Manual CRM entry and follow-up sequences waste hours daily.",
    solution:
      "Engineered an automated pipeline: new inquiry → lead capture → SMS → agent alert → CRM → automated follow-up. Using n8n, Next.js, API & LLM Integration with a serverless backend.",
    impact: [
      "18% improvement in lead conversion rate",
      "Instant SMS response to every lead automatically",
      "Deployed on live Real Estate Agents' accounts",
      "Sub-second real-time sync with offline-first backend",
    ],
    tags: ["n8n", "Next.js", "API Integration", "LLM", "SMS", "Lead Automation"],
    featured: true,
    metrics: [
      { value: "18%", label: "↑ Conversion" },
      { value: "Live", label: "Agents" },
      { value: "<1s", label: "Sync Time" },
    ],
    url: "#",
    caseStudyUrl: "",
    githubUrl: "",
  },
  {
    title: "SalePilot",
    subtitle: "Multi-Platform AI Sales Chatbot",
    icon: "🤖",
    period: "2024 – 2025",
    type: "CASE STUDY",
    description:
      "AI Sales Chatbot engineered from zero with multi-platform integration (Website, WhatsApp, Facebook, Instagram), 24/7 instant customer reply & nurture mechanism.",
    problem:
      "Businesses losing sales because customer inquiries go unanswered after hours. Manual follow-up across multiple platforms (web, WhatsApp, social) is impossible to scale.",
    solution:
      "Built an AI chatbot from scratch with multi-platform deployment using n8n, Next.js, Python, and LLM integration. 24/7 instant reply with automated lead nurturing.",
    impact: [
      "32% improvement in response rate",
      "24/7 instant customer reply across 4 platforms",
      "Automated lead nurture mechanism",
      "Website, WhatsApp, Facebook & Instagram integration",
    ],
    tags: ["n8n", "Next.js", "Python", "LLM", "WhatsApp", "AI Chatbot"],
    featured: false,
    metrics: [
      { value: "32%", label: "↑ Response" },
      { value: "4", label: "Platforms" },
      { value: "24/7", label: "Availability" },
    ],
    url: "#",
    caseStudyUrl: "",
    githubUrl: "",
  },
  {
    title: "Loom",
    subtitle: "Cross-Platform Real-Time Social App",
    icon: "🧵",
    period: "Oct 2025 – Present",
    type: "PROJECT",
    description:
      "A Flutter-based cross-platform social media application with Firebase integration for instant content synchronization and real-time interactions. Supports 6 platforms with live updates, comments, and reactions.",
    problem:
      "Building a social media platform that works seamlessly across 6 platforms with real-time capabilities and offline-first architecture is an enormous engineering challenge.",
    solution:
      "Leveraged Flutter's cross-platform capabilities with Firebase serverless backend, BLoC state management, and platform-adaptive UI to achieve 76% code sharing while maintaining native feel.",
    impact: [
      "76% shared codebase across 6 platforms",
      "Sub-second real-time sync",
      "Offline-first architecture with seamless reconnection",
      "Platform-adaptive UI for native experience on each device",
    ],
    tags: ["Flutter", "Dart 3", "Firebase", "BLoC", "Cross-platform"],
    featured: false,
    metrics: [
      { value: "76%", label: "Shared Code" },
      { value: "6", label: "Platforms" },
      { value: "<1s", label: "Sync Time" },
    ],
    url: "#",
    caseStudyUrl: "",
    githubUrl: "",
  },
  {
    title: "Genius AI",
    subtitle: "AI Content Generator SaaS (Beta)",
    icon: "✨",
    period: "Dec 2024 – Present",
    type: "PROJECT",
    description:
      "A Next.js web application leveraging AI models for intelligent content creation with type-safe database operations using Drizzle ORM. Secure Clerk authentication, modern shadcn/ui, production-deployed on Vercel.",
    problem:
      "The market needed an accessible, unified AI content platform combining multiple generation tools with proper usage controls and billing.",
    solution:
      "Built a full SaaS from scratch with Next.js and TypeScript, integrating multiple LLM providers, per-user API quota tracking, and tiered Stripe billing.",
    impact: [
      "17+ AI content generation tools in one platform",
      "Per-user API quota tracking and management",
      "Tiered subscription billing with Stripe integration",
      "Solo end-to-end ownership: design, dev, deployment",
    ],
    tags: ["Next.js", "TypeScript", "LLM Integration", "Drizzle ORM", "Clerk Auth", "Vercel"],
    featured: false,
    metrics: [
      { value: "17+", label: "AI Tools" },
      { value: "3", label: "Billing Tiers" },
      { value: "1", label: "Solo Dev" },
    ],
    url: "#",
    caseStudyUrl: "",
    githubUrl: "",
  },
];

export const FIVERR_GIGS = [
  {
    title: "Real Estate Lead Response, SMS & CRM Follow-Up",
    description:
      "I build real estate lead automation systems that help agents respond faster, capture missed opportunities, and automate follow-ups. Speed-to-lead automation, instant SMS responses, missed-call text-back, lead capture, CRM synchronization, lead routing, and nurture sequences.",
    tools: ["n8n", "Twilio", "HubSpot", "CRM Platforms", "APIs", "SMS", "WhatsApp", "Zillow", "Realtor.com"],
    pricing: { basic: "$50", standard: "$150", premium: "$500" },
    tags: ["CRM professional", "CRM automation", "CRM workflows", "Real estate leads"],
    url: "https://www.fiverr.com/peash_rudra",
  },
  {
    title: "AI Chatbot for Your Website or WhatsApp",
    description:
      "Custom AI chatbots for websites and WhatsApp that answer customers 24/7 using your own business content. No generic replies — just accurate, on-brand responses that capture leads.",
    tools: ["OpenAI", "GPT", "LLM", "Google Sheets", "CRM Integration", "WhatsApp", "Websites"],
    pricing: { basic: "$45", standard: "$145", premium: "$410" },
    tags: ["Website chatbot", "AI customer support", "WhatsApp chatbot", "AI chatbot setup"],
    url: "https://www.fiverr.com/peash_rudra",
  },
];

export const SERVICES = [
  {
    title: "Agentic AI & RAG Systems",
    description:
      "Production Agentic AI systems using LangGraph, MCP tool-calling, and RAG with pgvector. From deal copilots to autonomous CRM agents that reason, not just react.",
    deliverables: [
      "LangGraph multi-agent architecture",
      "MCP tool-calling integration",
      "RAG with pgvector/Pinecone",
      "Function-calling & prompt engineering",
    ],
    icon: "Brain",
  },
  {
    title: "CRM & RevOps Architecture",
    description:
      "End-to-end HubSpot CRM setup, deal pipeline design, lead scoring automation, and marketing workflow architecture. 3× HubSpot Certified.",
    deliverables: [
      "HubSpot CRM implementation",
      "Deal pipeline & lead scoring",
      "Marketing automation workflows",
      "Reporting dashboards & analytics",
    ],
    icon: "BarChart3",
  },
  {
    title: "Real Estate Lead Automation",
    description:
      "Automated lead capture, instant SMS/email response, agent alerts, CRM sync, and nurture sequences. Proven 18% lift in lead conversion on live agent accounts.",
    deliverables: [
      "Speed-to-lead automation",
      "SMS & missed-call text-back",
      "CRM sync & lead routing",
      "Automated follow-up sequences",
    ],
    icon: "Zap",
  },
  {
    title: "AI Chatbot Development",
    description:
      "Custom 24/7 AI chatbots for websites, WhatsApp, Facebook & Instagram. 32% improvement in response rate. Lead qualification, appointment booking, customer support — all on autopilot.",
    deliverables: [
      "Multi-platform chatbot deployment",
      "Lead capture & qualification",
      "Multi-language support",
      "CRM & calendar integration",
    ],
    icon: "MessageSquare",
  },
  {
    title: "Full-Stack Web Development",
    description:
      "Modern web applications built with React, Next.js, and Node.js — from SaaS platforms to dashboards, with clean architecture and scalable backends.",
    deliverables: [
      "React / Next.js applications",
      "REST & GraphQL APIs",
      "Database design (Drizzle, PostgreSQL)",
      "Cloud deployment (Vercel, AWS, GCP)",
    ],
    icon: "Code2",
  },
  {
    title: "Cross-Platform Mobile Apps",
    description:
      "Cross-platform mobile apps with Flutter, sharing 76%+ code across Android, iOS, Web, and Desktop with native performance, BLoC architecture, and Firebase backend.",
    deliverables: [
      "Flutter cross-platform apps",
      "BLoC & Riverpod state management",
      "Firebase backend integration",
      "Platform-adaptive UI",
    ],
    icon: "Smartphone",
  },
];

export const SKILLS = [
  {
    category: "AI & Agentic Systems",
    items: [
      "LLM Integration",
      "LangGraph",
      "LangChain",
      "RAG",
      "MCP Tool-Calling",
      "Prompt Engineering",
      "Function-Calling Design",
      "SHAP (Explainable AI)",
      "Metaheuristic Optimization",
    ],
  },
  {
    category: "Vector DBs & AI Platforms",
    items: [
      "Pinecone",
      "pgvector",
      "OpenAI API",
      "Claude API",
      "Google AI Studio",
      "GitHub Copilot",
      "Generative AI",
    ],
  },
  {
    category: "CRM & RevOps",
    items: [
      "HubSpot CRM",
      "Deal Pipeline Engineering",
      "Marketing Automation",
      "Lead Scoring",
      "Lead Generation",
      "Email Automations",
      "SMS Automation",
      "n8n",
      "Make",
    ],
  },
  {
    category: "Real Estate Automation",
    items: [
      "Speed-to-Lead",
      "Missed-Call Text-Back",
      "CRM Synchronization",
      "Lead Routing",
      "Nurture Sequences",
      "Twilio",
      "WhatsApp API",
      "Zillow API",
    ],
  },
  {
    category: "Frontend & Backend",
    items: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "Express.js",
      "REST APIs",
      "GraphQL",
      "Tailwind CSS",
    ],
  },
  {
    category: "Mobile & Cloud",
    items: [
      "Flutter",
      "Dart 3",
      "BLoC",
      "Riverpod",
      "Firebase",
      "PostgreSQL",
      "MongoDB",
      "AWS (S3, Lambda, EC2)",
      "Docker",
      "Git",
    ],
  },
];

export const CERTIFICATIONS = [
  {
    title: "HubSpot Revenue Operations Certified",
    issuer: "HubSpot Academy",
    date: "May 2026",
    expiry: "Jun 2027",
    credentialId: "73a67e7711fb43dfbf108ab9050e6f56",
    skills: ["RevOps", "CRM"],
    type: "crm",
    verifyUrl: "https://app-na2.hubspot.com/academy/achievements/fc5k6d45/en/1/peash-das-rudra/hubspot-revenue-operations-certified",
    badgeImageUrl: "https://hubspot-credentials-na1.s3.amazonaws.com/prod/badges/user/73a67e7711fb43dfbf108ab9050e6f56.png",
  },
  {
    title: "HubSpot Marketing Hub Software Certification",
    issuer: "HubSpot Academy",
    date: "Aug 2026",
    expiry: "Sep 2027",
    skills: ["Marketing Automation", "Email Marketing"],
    type: "crm",
    verifyUrl: "https://app-na2.hubspot.com/academy/achievements/fc5k6d45/en/1/peash-das-rudra/hubspot-revenue-operations-certified",
    badgeImageUrl: "https://hubspot-credentials-na1.s3.amazonaws.com/prod/badges/user/73a67e7711fb43dfbf108ab9050e6f56.png",
  },
  {
    title: "HubSpot Reporting Certification",
    issuer: "HubSpot Academy",
    date: "Aug 2026",
    expiry: "Sep 2027",
    skills: ["Analytics", "Reporting Dashboards"],
    type: "crm",
    verifyUrl: "https://app-na2.hubspot.com/academy/achievements/b543gs3k/en/1/peash-das-rudra/hubspot-reporting-certified",
    badgeImageUrl: "https://hubspot-credentials-na1.s3.amazonaws.com/prod/badges/user/f7c4226c1ee44f3cae2cb426ce30ca89.png",
  },
  {
    title: "AI Literacy Certification",
    issuer: "IBM",
    date: "May 2026",
    skills: ["Artificial Intelligence Foundations"],
    type: "ai",
    verifyUrl: "",
  },
  {
    title: "Prompt Engineering with GitHub Copilot",
    issuer: "Simplilearn (Microsoft)",
    date: "Jul 2025",
    credentialId: "8648936",
    skills: ["Prompt Engineering", "GitHub Copilot"],
    type: "ai",
    verifyUrl: "",
  },
  {
    title: "Introduction to Generative AI Studio",
    issuer: "Simplilearn (Google Cloud)",
    date: "Jul 2025",
    credentialId: "8627144",
    skills: ["Generative AI", "Google Cloud AI"],
    type: "ai",
    verifyUrl: "",
  },
  {
    title: "Python Programming & Data Science Basics",
    issuer: "Bangladesh Computer Council × Khulna University",
    date: "Aug 2025",
    skills: ["Python", "Pandas", "Data Analysis"],
    type: "dev",
    verifyUrl: "",
  },
];

export const EDUCATION = [
  {
    year: "2022",
    degree: "B.Sc. in Computer Science & Engineering",
    institution: "Northern University of Business & Technology Khulna",
    location: "Khulna, Bangladesh",
    period: "Mar 2022 – Aug 2026",
    gpa: "3.95 / 4.00",
    highlights: [
      "Core: Data Structures, Algorithms, AI, Neural Networks, DBMS, Software Engineering",
      "Club Debating, Computer & Programming Club, Hackathon, Competitive Programming",
    ],
    icon: "GraduationCap",
  },
  {
    year: "2020",
    degree: "Higher Secondary Certificate (H.S.C.), Science",
    institution: "Government P.C. College, Bagerhat",
    location: "Bagerhat, Bangladesh",
    period: "Jun 2018 – Apr 2020",
    gpa: "5.00 / 5.00",
    highlights: [
      "Club Debating, Cricket, Cultural Functions, Singing Competition",
    ],
    icon: "School",
  },
  {
    year: "2018",
    degree: "Secondary School Certificate (S.S.C.), Science",
    institution: "Bagerhat ML Collegiate School",
    location: "Bagerhat, Bangladesh",
    period: "Mar 2016 – Feb 2018",
    gpa: "5.00 / 5.00",
    highlights: [
      "Debate, Singing, Cricket, Social Organizations, Sports, Archery, Quiz",
    ],
    icon: "School",
  },
  {
    year: "2015",
    degree: "Junior School Certificate (J.S.C.)",
    institution: "Ramu Khizaree Government High School",
    location: "Bangladesh",
    period: "Jul 2013 – Feb 2016",
    gpa: "5.00 / 5.00 (Talentpool Scholarship)",
    highlights: [
      "Science Club, Debate Competitions, Cricket, Football, Cultural Functions",
    ],
    icon: "School",
  },
  {
    year: "2012",
    degree: "Primary School Certificate (P.S.C.)",
    institution: "South Sofipur Model Govt. Primary School",
    location: "Bangladesh",
    period: "Apr 2010 – Dec 2012",
    gpa: "5.00 / 5.00 (District 2nd + Talentpool Scholarship)",
    highlights: [
      "Cub Scout, Cultural Functions, Leader of PT Team, Cricket, Football, Volleyball",
    ],
    icon: "School",
  },
];

export const RESEARCH = {
  title: "Explainable Multi-Omics Breast Cancer Subtyping & Omics Layer Attribution",
  institution: "NUBTK Research Lab",
  location: "Khulna, Bangladesh",
  period: "2025 – Present",
  status: "Active",
  description:
    "Architected an explainable ML pipeline classifying invasive ductal vs. lobular breast cancer subtypes on the TCGA-BRCA dataset (705 patients, 4 omics layers, 1,837 raw features).",
  highlights: [
    "Late Fusion, per-omics-layer XGBoost achieving 0.9247 F1-Macro and 0.9839 AUC-ROC",
    "SHAP (TreeExplainer) for cross-omics feature attribution",
    "Surfaced transcriptomic & proteomic markers matching known clinical E-cadherin hallmark",
    "3-stage variance/ANOVA/ensemble selection funnel → 75 consensus features",
  ],
  tools: ["Python", "XGBoost", "SHAP", "scikit-learn"],
  metrics: [
    { value: "0.92", label: "F1-Macro" },
    { value: "0.98", label: "AUC-ROC" },
    { value: "705", label: "Patients" },
    { value: "1,837", label: "Features" },
  ],
};

export const LEADERSHIP = [
  {
    role: "Ex. General Secretary",
    org: "Computer & Informatics Science Club (CISC), NUBTK",
    type: "leadership",
  },
  {
    role: "Founding President",
    org: "CSE Debate Club, NUBTK",
    type: "leadership",
  },
  {
    role: "Campus Ambassador",
    org: "English Olympiad, Sikho, Bohubrihi",
    type: "ambassador",
  },
  {
    role: "Volunteer",
    org: "Banglalink, BdApps, Cultural Classicists, Ujjibon, Prothom Alo Bandhusava",
    type: "volunteer",
  },
];

export const ACHIEVEMENTS = [
  {
    title: "National Debate Gold Medalist",
    description:
      "National School Debate Competition 2018 (National Round) — Gold Medal. Bangladesh Shishu Academy.",
    icon: "Trophy",
    type: "award",
  },
  {
    title: "88% RAG Retrieval Precision",
    description:
      "DealSense — Agentic RAG Copilot achieved 88% precision@5 in a messy CRM environment, reducing manual lead-triage by 41%.",
    icon: "Target",
    type: "professional",
  },
  {
    title: "CGPA 3.95 / 4.00",
    description:
      "Near-perfect academic record in B.Sc. Computer Science & Engineering at NUBTK.",
    icon: "Award",
    type: "academic",
  },
  {
    title: "Perfect GPA 5.00 — Four Times",
    description:
      "Achieved perfect GPA in P.S.C., J.S.C., S.S.C., and H.S.C. examinations. District 2nd + Talentpool Scholarship.",
    icon: "Star",
    type: "academic",
  },
  {
    title: "3× HubSpot Certified",
    description:
      "Revenue Operations, Marketing Hub Software, and Reporting — all certified by HubSpot Academy.",
    icon: "BadgeCheck",
    type: "certification",
  },
  {
    title: "IBM AI Literacy Certified",
    description:
      "AI Literacy Certification from IBM — Artificial Intelligence Foundations.",
    icon: "Brain",
    type: "certification",
  },
  {
    title: "Founding President, CSE Debate Club",
    description:
      "Founded the CSE Debate Club at NUBTK from scratch. Ex. General Secretary of CISC.",
    icon: "Users",
    type: "leadership",
  },
  {
    title: "AI Research Contributor",
    description:
      "Active research in Explainable AI — 0.9247 F1-Macro on TCGA-BRCA breast cancer subtyping.",
    icon: "FlaskConical",
    type: "research",
  },
  {
    title: "5 Languages Spoken",
    description:
      "Fluent in English, Italian, French, German, and Spanish — global communication ready.",
    icon: "Globe",
    type: "language",
  },
  {
    title: "Solo SaaS Founder",
    description:
      "Built and shipped Genius AI — a 17+ tool AI SaaS platform — entirely solo, production-deployed on Vercel.",
    icon: "Rocket",
    type: "entrepreneurship",
  },
];

export const TERMINAL_LINES = [
  {
    prompt: "▶",
    text: "watching hubspot.deals for stage change...",
    type: "meta",
  },
  {
    prompt: "✓",
    text: "aircall → missed call detected → hubspot ticket #4821 created",
    type: "ok",
  },
  {
    prompt: "✓",
    text: "lead scored: 87/100 → routed to sales queue",
    type: "ok",
  },
  {
    prompt: "▶",
    text: "dealsense: querying pgvector store for deal context...",
    type: "meta",
  },
  {
    prompt: "✓",
    text: "rag retrieval: precision@5 = 88% — 3 at-risk deals flagged",
    type: "ok",
  },
  {
    prompt: "✓",
    text: "mcp tool-call → drafted context-aware follow-up for deal #7291",
    type: "ok",
  },
  {
    prompt: "✓",
    text: "sms response sent via twilio in 0.3s",
    type: "ok",
  },
  {
    prompt: "✓",
    text: 'deal pipeline updated: "discovery" → "qualified"',
    type: "ok",
  },
  {
    prompt: "▶",
    text: "salepilot: 12 leads qualified overnight across 4 platforms",
    type: "meta",
  },
  {
    prompt: "✓",
    text: "20+ automations running — 0 errors — 0 leads lost",
    type: "ok",
  },
];

export const TICKER_ITEMS = [
  { text: "production automations shipped for live UK clients", highlight: "20+" },
  { text: "RAG retrieval precision@5 on DealSense copilot", highlight: "88%" },
  { text: "reduction in manual lead-triage time", highlight: "41%" },
  { text: "3× HubSpot Certified — RevOps, Marketing Hub, Reporting", highlight: null },
  { text: "lead conversion improvement with LeakStop", highlight: "18%" },
  { text: "response rate improvement with SalePilot chatbot", highlight: "32%" },
  { text: "languages spoken: EN, IT, FR, DE, ES", highlight: "5" },
  { text: "currently open for freelance & remote work worldwide", highlight: null },
];

export const GALLERY = [
  {
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
    caption: "Deep Work Sessions",
  },
  {
    src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
    caption: "Code & Architecture",
  },
  {
    src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop",
    caption: "Building in Production",
  },
  {
    src: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&h=400&fit=crop",
    caption: "Problem Solving",
  },
  {
    src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
    caption: "Engineering Focus",
  },
  {
    src: "https://images.unsplash.com/photo-1550439062-609e1531270e?w=600&h=400&fit=crop",
    caption: "System Design",
  },
];
