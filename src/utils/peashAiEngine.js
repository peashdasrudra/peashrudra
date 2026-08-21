import { PROFILE, PROJECTS, EXPERIENCE, SKILLS, CERTIFICATIONS, ACHIEVEMENTS, SERVICES, FIVERR_GIGS, STATS } from "../data/portfolio";

// High-Precision Conversational AI Knowledge Engine for Peash Das Rudra
export function answerPeashQuestion(rawQuery) {
  const query = rawQuery.toLowerCase().trim();

  // Helper to test if any keywords match
  const matches = (keywords) => keywords.some((kw) => query.includes(kw));

  // ─── 1. GREETINGS, IDENTITY & CASUAL INTRO ───
  if (matches(["hi", "hello", "hey", "who are you", "who is peash", "introduce", "tell me about yourself", "about peash", "what do you do"])) {
    return {
      text: `Hello! I'm Peash's interactive AI Copilot.\n\nPeash Das Rudra is an AI & RevOps Automation Engineer and Triple HubSpot Certified specialist based in Khulna, Bangladesh (working with US, UK & global teams).\n\nHe specializes in building Autonomous Agentic AI systems (LangGraph, MCP Tool-Calling, RAG with pgvector) and automated CRM workflows that eliminate manual bottlenecks and accelerate revenue.\n\nHe has shipped 20+ live production automations with 99.2% uptime and eliminated 10,000+ hours of manual operations for enterprise and B2B clients.`,
      section: "hero",
      sectionLabel: "View Hero Profile",
      suggestedQuestions: [
        "What are his HubSpot certifications?",
        "Show me his production AI projects",
        "How can I book a strategy call?",
      ]
    };
  }

  // ─── 2. CONTACT, HIRE, AVAILABILITY, CALENDLY & RATES ───
  if (matches(["hire", "contact", "book", "schedule", "call", "calendly", "email", "phone", "rate", "cost", "pricing", "available", "availability", "full-time", "contract", "freelance", "salary", "hourly"])) {
    return {
      text: `Peash is actively available for Full-Time roles, Contract engagements, and High-Impact Freelance projects worldwide.\n\n• Email: ${PROFILE.email}\n• Phone: ${PROFILE.phone}\n• Location: ${PROFILE.location} (Fully remote, seamlessly aligns with US/UK timezones)\n• Availability: Immediate / Zero Ramp-up Time\n• Direct Booking: You can schedule a 30-minute strategy call on his Calendly.`,
      section: "contact",
      sectionLabel: "Open Contact Form",
      actionUrl: PROFILE.calendlyUrl,
      actionText: "Book Strategy Call on Calendly",
      suggestedQuestions: [
        "Can he ship Day-1 with zero ramp-up?",
        "What are his HubSpot certifications?",
      ]
    };
  }

  // ─── 3. HUBSPOT & REVOPS CERTIFICATIONS ───
  if (matches(["hubspot", "cert", "certification", "license", "credential", "academy", "revops cert"])) {
    const certList = CERTIFICATIONS.map(c => `• **${c.title}** (${c.issuer}) — ${c.date}`).join("\n");
    return {
      text: `Peash holds multiple authenticated industry credentials:\n\n${certList}\n\nKey RevOps Credentials:\n1. **HubSpot Revenue Operations Certified**\n2. **HubSpot Marketing Hub Software Certified**\n3. **HubSpot Reporting Certified**\n\nAll certificates include verified credential IDs and authentic issuer authentication.`,
      section: "certifications",
      sectionLabel: "View Verified Credentials",
      suggestedQuestions: [
        "What CRM automations has he built?",
        "Tell me about the DealSense case study",
      ]
    };
  }

  // ─── 4. DEALSENSE & AGENTIC RAG SYSTEM ───
  if (matches(["dealsense", "rag", "langgraph", "mcp", "model context protocol", "agentic", "pgvector", "pinecone", "ai agent"])) {
    const ds = PROJECTS.find(p => p.title === "DealSense") || PROJECTS[0];
    return {
      text: `**DealSense** is Peash's flagship Agentic RAG Copilot for RevOps:\n\n• **Architecture**: LangGraph multi-agent orchestration with MCP (Model Context Protocol) tool-calling.\n• **Data Layer**: Live HubSpot CRM integration + pgvector semantic vector store for deal & contact history.\n• **Production Impact**:\n  - 88% retrieval precision@5 in messy CRM environments\n  - 41% reduction in manual lead-triage time\n  - Autonomous identification of at-risk deals with contextual reasoning\n  - Automated context-aware draft follow-ups.`,
      section: "projects",
      sectionLabel: "Explore DealSense Case Study",
      suggestedQuestions: [
        "What other projects has he shipped?",
        "How does he handle real estate lead automation?",
      ]
    };
  }

  // ─── 5. CLICKLESS AUTOMATION SUITE ───
  if (matches(["clickless", "aircall", "uk client", "enterprise crm", "ticket", "slack integration"])) {
    return {
      text: `**Clickless Automation Suite** is an enterprise CRM infrastructure Peash engineered for UK B2B clients:\n\n• **Core Problem**: Unsynced missed calls, manual lead scoring, and fragmented routing across 3+ client accounts.\n• **Engineered Solution**: Real-time Aircall–HubSpot sync converting missed calls directly into tracked tickets, cutting out third-party middle layers.\n• **Results**: 20+ production-grade automations running with 99.2% uptime and 5 executive reporting dashboards.`,
      section: "projects",
      sectionLabel: "View Clickless Case Study",
      suggestedQuestions: [
        "Tell me about LeakStop",
        "What is his tech stack?",
      ]
    };
  }

  // ─── 6. REAL ESTATE AUTOMATION & LEAKSTOP ───
  if (matches(["real estate", "leakstop", "zillow", "realtor", "sms", "speed to lead", "missed call text back", "nurture", "twilio"])) {
    return {
      text: `Peash is a leading specialist in Real Estate Lead & Speed-to-Lead Automation:\n\n• **LeakStop System**: Deployed on live real estate agent accounts to instantly capture leads from Zillow, Realtor.com, and Facebook Ads.\n• **Sub-60s Response**: Triggers instant SMS alerts and missed-call text-back sequences so leads never slip to competing agents.\n• **Impact**: Proven **18% lift in lead conversion** on live accounts with sub-second real-time CRM sync.`,
      section: "projects",
      sectionLabel: "View LeakStop Case Study",
      suggestedQuestions: [
        "Check his Fiverr gig pricing",
        "Schedule a strategy call",
      ]
    };
  }

  // ─── 7. FIVERR & FREELANCE SERVICES ───
  if (matches(["fiverr", "gig", "freelance service", "real estate package", "chatbot package"])) {
    const gigList = FIVERR_GIGS.map(g => `• **${g.title}**: ${g.pricing.basic} (Basic) / ${g.pricing.standard} (Standard) / ${g.pricing.premium} (Premium)`).join("\n");
    return {
      text: `Peash provides top-rated freelance services on Fiverr:\n\n${gigList}\n\n100% 5-star feedback across real estate automation, SMS workflows, and custom AI chatbots.`,
      section: "fiverr-gigs",
      sectionLabel: "View Fiverr Services",
      actionUrl: PROFILE.social.fiverr,
      actionText: "Visit Fiverr Profile",
      suggestedQuestions: [
        "Can he build custom LangGraph workflows?",
        "What tech stack does he use?",
      ]
    };
  }

  // ─── 8. AI CHATBOTS & SALEPILOT / GENIUS AI ───
  if (matches(["chatbot", "salepilot", "genius ai", "whatsapp", "facebook", "instagram", "saas"])) {
    return {
      text: `Peash has engineered advanced AI chatbots and SaaS platforms:\n\n1. **SalePilot**: Multi-platform AI sales chatbot (Website, WhatsApp, Facebook & Instagram) with 24/7 instant reply and 32% boost in response rates.\n2. **Genius AI SaaS**: Full Next.js SaaS with 17+ AI content generation tools, Drizzle ORM, Clerk auth, and tiered Stripe billing.`,
      section: "projects",
      sectionLabel: "View AI Chatbot Projects",
      suggestedQuestions: [
        "What are his core skills?",
        "How do I book a call?",
      ]
    };
  }

  // ─── 9. FLUTTER, MOBILE & FULL-STACK ───
  if (matches(["flutter", "mobile", "app", "dart", "bloc", "firebase", "loom", "react", "next.js", "frontend", "backend"])) {
    return {
      text: `Peash is an experienced full-stack & mobile engineer:\n\n• **Flutter & Dart**: Built **Loom**, a cross-platform social app with 76% shared codebase across 6 platforms, Firebase Firestore live sync, and BLoC state management.\n• **Modern Web Stack**: React.js, Next.js, Node.js, FastAPI, PostgreSQL, Drizzle ORM, Tailwind CSS.\n• **Cloud & Architecture**: AWS Lambda/S3/EC2, Docker, Vercel, Firebase Auth.`,
      section: "skills",
      sectionLabel: "View Tech Stack Matrix",
      suggestedQuestions: [
        "What AI agent frameworks does he use?",
        "What are his certifications?",
      ]
    };
  }

  // ─── 10. AI/ML STACK, TOOLS & FRAMEWORKS ───
  if (matches(["stack", "tools", "langchain", "claude", "openai", "gemini", "anthropic", "fastapi", "python", "docker", "aws"])) {
    return {
      text: `Peash's production AI engineering stack includes:\n\n• **Orchestration**: LangGraph, LangChain, MCP (Model Context Protocol), Function-Calling.\n• **LLMs & APIs**: Anthropic Claude 3.5 Sonnet, OpenAI GPT-4o, Google Gemini / AI Studio.\n• **Vector & Databases**: pgvector, Pinecone, PostgreSQL, Firebase Firestore, Drizzle ORM.\n• **Backend & Automation**: Python, FastAPI, Node.js, n8n, Make.com, Twilio API, Aircall API.`,
      section: "skills",
      sectionLabel: "Open Spider Playground",
      suggestedQuestions: [
        "Can he build custom RAG pipelines?",
        "What is his experience history?",
      ]
    };
  }

  // ─── 11. RESEARCH & EXPLAINABLE AI (SHAP) ───
  if (matches(["research", "xai", "explainable", "shap", "metaheuristic", "algorithm", "paper", "university"])) {
    return {
      text: `Peash has extensive background in Explainable AI (xAI) and algorithmic optimization:\n\n• Researched SHAP (SHapley Additive exPlanations) for interpretability in machine learning.\n• Implemented Metaheuristic Optimization algorithms for high-dimensional feature selection and model tuning.\n• Trained with the Bangladesh Computer Council & Khulna University.`,
      section: "achievements",
      sectionLabel: "View Research & Awards",
      suggestedQuestions: [
        "Tell me about his work experience",
        "Download his resume",
      ]
    };
  }

  // ─── 12. EXPERIENCE & WORK HISTORY ───
  if (matches(["experience", "work history", "job", "career", "appstick", "clickless", "internship", "background"])) {
    const expSummaries = EXPERIENCE.map(e => `• **${e.role}** at **${e.company}** (${e.period} · ${e.location})\n  ${e.bullets[0]}`).join("\n\n");
    return {
      text: `Peash's professional engineering journey:\n\n${expSummaries}`,
      section: "experience",
      sectionLabel: "View Experience Timeline",
      suggestedQuestions: [
        "What awards has he won?",
        "How can I hire him?",
      ]
    };
  }

  // ─── 13. ACHIEVEMENTS & AWARDS ───
  if (matches(["award", "achievement", "milestone", "winner", "hackathon", "recognition"])) {
    const achList = ACHIEVEMENTS.map(a => `• **${a.title}** (${a.issuer}, ${a.date})\n  ${a.desc}`).join("\n\n");
    return {
      text: `Notable achievements and milestones:\n\n${achList}`,
      section: "achievements",
      sectionLabel: "View Achievements",
      suggestedQuestions: [
        "What is his core specialization?",
        "Schedule a strategy call",
      ]
    };
  }

  // ─── 14. RESUME / CV DOWNLOAD ───
  if (matches(["resume", "cv", "pdf", "download cv", "document"])) {
    return {
      text: `You can view and download Peash's verified PDF resume directly from Google Drive. It includes complete employment history, publications, credential IDs, and portfolio references.`,
      actionUrl: PROFILE.resumeUrl,
      actionText: "Download Verified Resume (PDF)",
      suggestedQuestions: [
        "What are his HubSpot certifications?",
        "Book a strategy call",
      ]
    };
  }

  // ─── 15. SPOKEN LANGUAGES ───
  if (matches(["language", "speak", "english", "italian", "french", "german", "spanish"])) {
    return {
      text: `Peash is multilingual and comfortably communicates with global clients in 5 languages:\n\n• **English** (Fluent / Professional)\n• **Italian**\n• **French**\n• **German**\n• **Spanish**\n\nThis makes him ideal for international engineering teams and cross-border client operations.`,
      section: "hero",
      sectionLabel: "View Hero",
      suggestedQuestions: [
        "What is his availability for hire?",
        "Tell me about his AI agent projects",
      ]
    };
  }

  // ─── 16. ZERO RAMP-UP TIME & DAY-1 DEPLOYMENT ───
  if (matches(["ramp-up", "day 1", "onboarding", "how fast", "start", "immediate"])) {
    return {
      text: `Peash provides **Day-1 deployment capability** with virtually zero ramp-up time:\n\n1. **Pre-Built Modular Harnesses**: Ready-to-adapt LangGraph architectures and MCP tool connectors.\n2. **HubSpot Mastery**: Triple certified, capable of structuring pipelines, webhooks, and automated triage on day one.\n3. **Proven Velocity**: Shipped 20+ production automations for live B2B client accounts.`,
      section: "recruiter-matrix",
      sectionLabel: "View Recruiter Decision Matrix",
      suggestedQuestions: [
        "Book a 30-min strategy call",
        "What certifications does he hold?",
      ]
    };
  }

  // ─── 17. ROI & AUTOMATION SAVINGS ───
  if (matches(["roi", "save", "savings", "hours", "bandwidth", "efficiency", "value"])) {
    return {
      text: `Peash's automations have delivered measurable business ROI:\n\n• **45% Bandwidth Recovered**: Eliminated repetitive manual triage and ticket entry.\n• **$85K+ Sales Pipeline Accelerated**: Automated lead scoring and instant response sequences.\n• **10,000+ Total Hours Saved**: Running 20+ live workflows with 99.2% uptime.`,
      section: "stats",
      sectionLabel: "View Production Stats",
      suggestedQuestions: [
        "Explore DealSense case study",
        "Schedule a strategy call",
      ]
    };
  }

  // ─── 18. TECHNICAL COMPARISONS (LangGraph vs CrewAI, HubSpot vs Salesforce) ───
  if (matches(["compare", "vs", "difference", "crewai", "autogen", "salesforce", "make vs n8n"])) {
    return {
      text: `Peash's perspective on modern automation architecture:\n\n• **LangGraph vs CrewAI/AutoGen**: LangGraph provides deterministic cyclical graph control with fine-grained state persistence and human-in-the-loop checkpoints, making it superior for mission-critical enterprise RevOps.\n• **HubSpot vs Salesforce**: HubSpot offers superior API velocity, cleaner developer experience, and instant ecosystem synchronization for scaling B2B teams.\n• **n8n vs Make.com**: Peash leverages both — n8n for self-hosted data privacy & complex webhooks, Make for rapid cloud API integrations.`,
      section: "skills",
      sectionLabel: "View Tech Matrix",
      suggestedQuestions: [
        "Tell me about DealSense",
        "What certifications does he hold?",
      ]
    };
  }

  // ─── 19. PERSONALITY & WORK ETHIC ───
  if (matches(["work ethic", "philosophy", "hobby", "music", "fun fact", "personality", "culture"])) {
    return {
      text: `Peash's Engineering Philosophy:\n\n"If a task must be repeated more than twice, it belongs in an autonomous, fault-tolerant pipeline."\n\nHe is passionate about xAI transparency, clean modular code, continuous shipping, and late-night architecture deep-dives.`,
      section: "gallery",
      sectionLabel: "View Behind the Screens",
      suggestedQuestions: [
        "What languages does he speak?",
        "Schedule a call on Calendly",
      ]
    };
  }

  // ─── 20. INTELLIGENT COMPREHENSIVE FALLBACK ───
  return {
    text: `Peash Das Rudra is an AI & RevOps Engineer specializing in Autonomous LangGraph Agents, MCP Integrations, and Triple HubSpot Certified CRM Automations.\n\nHe helps companies replace manual operational bottlenecks with 99.2% uptime automated systems.\n\nI can answer questions regarding his:\n• **Agentic AI & RAG Projects** (DealSense, pgvector, LangGraph)\n• **HubSpot & RevOps Certifications** (RevOps, Marketing Hub, Reporting)\n• **Real Estate Lead Automations** (LeakStop, Twilio, Zillow API)\n• **Work History & Production Stats** (Clickless, Appstick, 20+ shipped pipelines)\n• **Availability, Rates & Strategy Call Booking**`,
    suggestedQuestions: [
      "Tell me about his core specialization",
      "What are his HubSpot certifications?",
      "How do I schedule a strategy call?",
    ]
  };
}
