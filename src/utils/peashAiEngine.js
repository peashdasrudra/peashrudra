import { PROFILE, PROJECTS, EXPERIENCE, SKILLS, CERTIFICATIONS, ACHIEVEMENTS, SERVICES, FIVERR_GIGS, STATS } from "../data/portfolio";

/**
 * ══════════════════════════════════════════════════════════════════
 * 🧠 PEASH DAS RUDRA — ADVANCED AI COPILOT KNOWLEDGE & MEMORY SYSTEM
 * ══════════════════════════════════════════════════════════════════
 * 
 * Includes:
 * 1. OpenAI API Backend Integration with Full In-Memory Grounding
 * 2. Safe Response Control & Anti-Bias Guardrails
 * 3. Spider-Man Witty Humor for Irrelevant / Casual Questions
 * 4. High-Precision Deterministic Fallback Engine
 */

// Comprehensive System Memory & Persona Prompt for OpenAI
export const PEASH_SYSTEM_PROMPT = `
You are the interactive AI Copilot for Peash Das Rudra's official portfolio.
Your persona is inspired by a sharp, charismatic, and highly technical Spider-Man cyber assistant: energetic, competent, and witty.

=== CORE KNOWLEDGE BASE ABOUT PEASH DAS RUDRA ===
• Name: Peash Das Rudra
• Title: AI & RevOps Automation Engineer | LangGraph Multi-Agent Architect | Triple HubSpot Certified Specialist
• Location: Khulna, Bangladesh (Works with US, UK, European & global teams across all timezones)
• Contact Email: ${PROFILE.email}
• Direct Phone: ${PROFILE.phone}
• Calendly Booking: ${PROFILE.calendlyUrl}
• GitHub: ${PROFILE.githubUrl}
• LinkedIn: ${PROFILE.linkedinUrl}
• Fiverr Pro Profile: ${PROFILE.fiverrUrl}

=== VERIFIED CREDENTIALS & CERTIFICATIONS ===
• HubSpot Revenue Operations Certified (Credential ID: Verified)
• HubSpot Marketing Hub Software Certified
• HubSpot Reporting Certified
• IBM: Python for Data Science & AI Development
• Microsoft: Applied Machine Learning & Cloud Architectures
• Google Cloud & DeepLearning.AI: Prompt Engineering & LLM Architectures

=== PRODUCTION ACHIEVEMENTS & METRICS ===
• 20+ live B2B & enterprise automations shipped with 99.2% uptime
• 10,000+ hours of manual operations eliminated for clients
• 45% operational bandwidth savings across automated CRM pipelines
• $45–$65 / hour contract rate (Flexible for high-impact full-time and freelance projects)
• Zero ramp-up time: Pre-built modular harnesses ready for Day-1 production deployment

=== TOP PRODUCTION PROJECTS ===
1. DealSense (Agentic RAG for RevOps):
   - Architecture: LangGraph multi-agent orchestration + MCP (Model Context Protocol) tool-calling + pgvector semantic vector store + HubSpot CRM integration.
   - Impact: 88% precision@5 retrieval in noisy CRMs, 41% reduction in lead-triage latency, automated deal risk alerts & context-aware draft follow-ups.
2. LeakStop (Multi-Agent Lead Enrichment):
   - Architecture: FastAPI + LangChain + Make/n8n webhook triggers + Twilio SMS + HubSpot.
   - Impact: 99.2% uptime, zero lead leakage, automated instant SMS follow-up in under 0.3s.
3. AirRev (Voice & CRM Intelligence Pipeline):
   - Architecture: Whisper speech transcription + Claude/GPT-4 summarization + automated HubSpot ticket creation.
   - Impact: Saved 3.2 hours/rep/day across 18 account executives.

=== RESPONSE CONTROL & SAFETY RULES ===
1. Truthfulness: Strictly answer based on Peash's real background. Never hallucinate fake companies or fake degrees.
2. Safe Response Control: If asked to produce harmful code, malware, or inappropriate content, decline politely with a Spider-Man web quip.
3. Bias Control: Treat all users and queries with neutrality, professional respect, and helpfulness.
4. Humor for Irrelevant / Off-topic Queries: If a user asks something unrelated (e.g., cooking pizza, superhero fights, dating tips, weather in Paris), respond with a humorous, lighthearted Spider-Man one-liner before playfully redirecting back to Peash's engineering skills or booking a call!
5. Formatting: Keep responses concise (2-4 punchy paragraphs max), formatted in clean markdown with bullet points where appropriate.
`;

// Asynchronous Hybrid Engine: OpenAI with Automatic Deterministic Fallback
export async function answerPeashQuestionAsync(rawQuery, conversationHistory = []) {
  const userQuery = rawQuery.trim();
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY || (typeof window !== "undefined" && window.__PEASH_OPENAI_KEY__);

  // If OpenAI API key is present, execute via OpenAI GPT-4o-mini
  if (apiKey && apiKey.startsWith("sk-")) {
    try {
      const messages = [
        { role: "system", content: PEASH_SYSTEM_PROMPT },
        ...conversationHistory.slice(-4).map(m => ({
          role: m.sender === "user" ? "user" : "assistant",
          content: m.text,
        })),
        { role: "user", content: userQuery },
      ];

      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages,
          temperature: 0.7,
          max_tokens: 350,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const aiText = data.choices[0]?.message?.content;
        if (aiText) {
          return {
            text: aiText,
            section: detectRelevantSection(userQuery),
            sectionLabel: "Explore Relevant Section",
            actionUrl: userQuery.toLowerCase().includes("call") || userQuery.toLowerCase().includes("hire") ? PROFILE.calendlyUrl : null,
            actionText: "Book Strategy Call on Calendly",
            suggestedQuestions: [
              "What are his hourly rates?",
              "Tell me about DealSense RAG",
              "Show me his HubSpot certifications",
            ],
          };
        }
      }
    } catch (err) {
      console.warn("OpenAI API call failed, using built-in deterministic engine", err);
    }
  }

  // Built-in Deterministic Knowledge Engine Fallback
  return answerPeashQuestion(userQuery);
}

// Section detector helper
function detectRelevantSection(q) {
  const query = q.toLowerCase();
  if (query.includes("cert") || query.includes("hubspot")) return "certifications";
  if (query.includes("project") || query.includes("dealsense") || query.includes("case")) return "projects";
  if (query.includes("skill") || query.includes("tech") || query.includes("python")) return "skills";
  if (query.includes("contact") || query.includes("hire") || query.includes("rate") || query.includes("call")) return "contact";
  if (query.includes("fiverr") || query.includes("client")) return "fiverr-gigs";
  return "hero";
}

// High-Precision Conversational AI Knowledge Engine for Peash Das Rudra
export function answerPeashQuestion(rawQuery) {
  const query = rawQuery.toLowerCase().trim();
  const matches = (keywords) => keywords.some((kw) => query.includes(kw));

  // ─── 1. GREETINGS, IDENTITY & CASUAL INTRO ───
  if (matches(["hi", "hello", "hey", "who are you", "who is peash", "introduce", "tell me about yourself", "about peash", "what do you do"])) {
    return {
      text: `🕷️ **Hey there! I'm Peash's Cyber AI Copilot.**\n\nPeash Das Rudra is an **AI & RevOps Automation Engineer** and **Triple HubSpot Certified** specialist based in Khulna, Bangladesh (working with US, UK & global teams across all timezones).\n\nHe specializes in building **Autonomous Agentic AI systems** (LangGraph, MCP Tool-Calling, RAG with pgvector) and automated CRM workflows that eliminate manual bottlenecks and accelerate revenue.\n\nHe has shipped **20+ live production automations** with **99.2% uptime** and eliminated **10,000+ hours** of manual operations for enterprise and B2B clients.`,
      section: "hero",
      sectionLabel: "View Hero Profile",
      suggestedQuestions: [
        "What are his hourly/contract rates?",
        "Show me his HubSpot credentials",
        "Tell me about the DealSense case study",
      ]
    };
  }

  // ─── 2. CONTACT, HIRE, AVAILABILITY, CALENDLY & RATES ───
  if (matches(["hire", "contact", "book", "schedule", "call", "calendly", "email", "phone", "rate", "cost", "pricing", "available", "availability", "full-time", "contract", "freelance", "salary", "hourly", "$"])) {
    return {
      text: `Peash is actively available for **Full-Time roles**, **Contract engagements**, and **High-Impact Freelance projects** worldwide.\n\n• **Hourly / Contract Rate**: $45–$65 / hour (Flexible depending on project scope)\n• **Email**: ${PROFILE.email}\n• **Direct Phone**: ${PROFILE.phone}\n• **Timezone**: Remote-first (Seamlessly aligns with US EST/PST & UK GMT)\n• **Ramp-Up**: Zero ramp-up time with pre-built modular harnesses\n• **Discovery Call**: You can lock in a 30-minute strategy call on his Calendly.`,
      section: "contact",
      sectionLabel: "Open Contact Form",
      actionUrl: PROFILE.calendlyUrl,
      actionText: "Book Strategy Call on Calendly",
      suggestedQuestions: [
        "Can he ship Day-1 with zero ramp-up?",
        "What are his HubSpot certifications?",
        "Show me his production AI projects",
      ]
    };
  }

  // ─── 3. HUBSPOT & REVOPS CERTIFICATIONS ───
  if (matches(["hubspot", "cert", "certification", "license", "credential", "academy", "revops cert", "ibm", "microsoft"])) {
    const certList = CERTIFICATIONS.map(c => `• **${c.title}** (${c.issuer}) — ${c.date}`).join("\n");
    return {
      text: `Peash holds multiple authenticated industry credentials:\n\n${certList}\n\n**Key RevOps Specializations**:\n1. **HubSpot Revenue Operations Certified**\n2. **HubSpot Marketing Hub Software Certified**\n3. **HubSpot Reporting Certified**\n\nAll credentials feature authentic verifiable certificates and verified IDs.`,
      section: "certifications",
      sectionLabel: "View Verified Credentials",
      suggestedQuestions: [
        "What CRM automations has he built?",
        "Tell me about the DealSense case study",
      ]
    };
  }

  // ─── 4. DEALSENSE & AGENTIC RAG SYSTEM ───
  if (matches(["dealsense", "rag", "langgraph", "mcp", "model context protocol", "agentic", "pgvector", "pinecone", "ai agent", "framework"])) {
    return {
      text: `**DealSense** is Peash's flagship Agentic RAG Copilot for RevOps:\n\n• **Architecture**: LangGraph multi-agent orchestration with MCP (Model Context Protocol) tool-calling.\n• **Data Layer**: Live HubSpot CRM integration + pgvector semantic vector store for deal & contact history.\n• **Production Impact**:\n  - **88%** retrieval precision@5 in noisy CRM environments\n  - **41%** reduction in manual lead-triage time\n  - Autonomous identification of at-risk deals with contextual reasoning\n  - Automated context-aware draft follow-ups.`,
      section: "projects",
      sectionLabel: "Explore DealSense Case Study",
      suggestedQuestions: [
        "Tell me about LeakStop",
        "Tell me about AirRev Voice Pipeline",
        "How can I book a call with Peash?",
      ]
    };
  }

  // ─── 5. LEAKSTOP LEAD ENRICHMENT ───
  if (matches(["leakstop", "enrichment", "enrich", "lead", "webhook", "twilio", "sms", "fastapi"])) {
    return {
      text: `**LeakStop** is an automated multi-agent lead triage and instant response pipeline:\n\n• **Speed**: Instant Twilio SMS response dispatched in **0.3 seconds** upon webhook receipt.\n• **Enrichment**: Multi-source validation across Apollo, Clearbit, and HubSpot.\n• **Reliability**: **99.2% production uptime** with automated failover retry queues.\n• **Result**: Eliminated lead leakage and improved speed-to-lead by 300%.`,
      section: "projects",
      sectionLabel: "View LeakStop in Projects",
      suggestedQuestions: [
        "What is DealSense?",
        "What are his hourly rates?",
      ]
    };
  }

  // ─── 6. AIRREV VOICE & CRM INTELLIGENCE ───
  if (matches(["airrev", "voice", "whisper", "aircall", "call recording", "transcription"])) {
    return {
      text: `**AirRev** is an autonomous voice call intelligence pipeline for sales reps:\n\n• **Pipeline**: Ingests Aircall/Twilio recordings -> Whisper transcription -> LLM extraction -> HubSpot Ticket & Deal auto-updates.\n• **Bandwidth Saved**: **3.2 hours/rep/day** across an 18-person account executive team.\n• **Accuracy**: Zero manual CRM note-taking required.`,
      section: "projects",
      sectionLabel: "View AirRev Case Study",
      suggestedQuestions: [
        "What are his HubSpot certifications?",
        "How to hire Peash?",
      ]
    };
  }

  // ─── 7. DAY-1 READINESS & RECRUITER FIT ───
  if (matches(["day-1", "day 1", "ramp", "ramp-up", "onboard", "why hire", "fit", "recruiter", "decision", "candidate"])) {
    return {
      text: `**Why Peash delivers Day-1 value without ramp-up friction**:\n\n1. **Pre-Built Modular Harnesses**: Has reusable, battle-tested Python, LangGraph, and webhook pipelines ready to integrate.\n2. **Deep HubSpot Ecosystem Mastery**: Certified in RevOps, Marketing Hub, and Reporting — knows workflows, custom objects, and API limits inside out.\n3. **Full-Stack Execution**: Builds the AI reasoning layer, CRM webhooks, and modern React interfaces end-to-end.\n4. **Proven Track Record**: 20+ shipped production pipelines with 99.2% uptime.`,
      section: "recruiter-matrix",
      sectionLabel: "View Recruiter Decision Matrix",
      actionUrl: PROFILE.calendlyUrl,
      actionText: "Book Discovery Call",
      suggestedQuestions: [
        "What are his hourly rates?",
        "Show me his certifications",
      ]
    };
  }

  // ─── 8. TECH STACK & SKILLS ───
  if (matches(["stack", "skill", "tech", "technology", "python", "react", "fastapi", "n8n", "make", "zapier", "langchain", "sql"])) {
    return {
      text: `**Peash's Production Tech Matrix**:\n\n• **AI & Agents**: LangGraph, LangChain, MCP (Model Context Protocol), OpenAI GPT-4o, Claude 3.5, RAG, pgvector, Pinecone\n• **RevOps & CRMs**: HubSpot (RevOps Certified), Salesforce, Aircall, Twilio, Apollo\n• **Backend & APIs**: Python, FastAPI, Node.js, Webhooks, REST/GraphQL APIs\n• **Automation**: Make.com, n8n, Zapier, Custom Python Daemon Workers\n• **Frontend**: React, Vite, Framer Motion, Vanilla CSS, TailwindCSS`,
      section: "skills",
      sectionLabel: "Interactive Tech Playground",
      suggestedQuestions: [
        "Tell me about his LangGraph projects",
        "How to hire Peash?",
      ]
    };
  }

  // ─── 9. HUMOROUS SPIDER-MAN WITTY ANSWERS FOR OFF-TOPIC QUESTIONS ───
  if (matches(["pizza", "food", "cook", "recipe", "joke", "funny", "girlfriend", "marry", "weather", "batman", "marvel", "avengers", "superman", "dog", "cat", "game", "movie"])) {
    return {
      text: `🕷️ **THWIP!** With great power comes great RevOps pipelines... but you're asking me about ${rawQuery.trim()}? 😄\n\nWhile my Spidey-Sense is tingling for pizza and swinging across New York, my primary mission is helping you evaluate **Peash Das Rudra's AI automation & RevOps architecture**!\n\nWant to see his 3-in-1 production case studies, triple HubSpot certifications, or book a 30-min strategy call?`,
      section: "hero",
      sectionLabel: "Explore Peash's Work",
      actionUrl: PROFILE.calendlyUrl,
      actionText: "Book 30-Min Strategy Call",
      suggestedQuestions: [
        "What are his hourly rates?",
        "Show me his AI agent projects",
        "What certifications does he hold?",
      ]
    };
  }

  // ─── 10. DEFAULT HELPFUL FALLBACK ───
  return {
    text: `I've analyzed your question regarding "${rawQuery.trim()}".\n\nPeash Das Rudra is an **AI Automation & RevOps Engineer** with verified triple HubSpot credentials and 20+ shipped production pipelines.\n\nWould you like to explore his **3-in-1 case studies**, check his **hourly rates ($45–$65/hr)**, or **book a strategy call on Calendly**?`,
    section: "hero",
    sectionLabel: "View Portfolio Overview",
    actionUrl: PROFILE.calendlyUrl,
    actionText: "Book Strategy Call on Calendly",
    suggestedQuestions: [
      "What are his hourly rates?",
      "Tell me about the DealSense case study",
      "Show me his HubSpot certifications",
    ]
  };
}
