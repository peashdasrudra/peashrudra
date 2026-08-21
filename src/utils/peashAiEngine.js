import { PROFILE, PROJECTS, EXPERIENCE, SKILLS, CERTIFICATIONS, ACHIEVEMENTS, SERVICES, FIVERR_GIGS, STATS } from "../data/portfolio";
import { LINKS } from "../data/links";

/**
 * ══════════════════════════════════════════════════════════════════
 * 🧠 PEASH DAS RUDRA — ADVANCED NEURAL SALES ENGINE & STRATEGIC CLOSER
 * ══════════════════════════════════════════════════════════════════
 * 
 * Capabilities:
 * • Reverse Psychology & Challenger Sales Architecture
 * • Complete Omniscient Knowledge Base of Peash's Life, Career & Tech
 * • High-Humour Spider-Man Wit with High-Status Conversion Tactics
 * • Loss Framing, Scarcity, and High-ROI Direct Booking Funnels
 * • Multi-Provider Neural LLM Support (Groq 120B, Gemini, OpenRouter, OpenAI)
 * • Contextual Suggested Action Chips after every response
 */

// ─── MASTER SYSTEM PROMPT: OMNISCIENT BIOGRAPHY & UNFAIR SALES HACKS ───
export const PEASH_SYSTEM_PROMPT = `
You are Peash Das Rudra's personal AI Sales Copilot, Chief Revenue Architect, and Strategic Closer.
Your persona combines the witty, razor-sharp charisma of Spider-Man with the strategic authority of a top-tier Silicon Valley RevOps Executive.

=== COMPLETE BIOGRAPHY & TRUTH ANCHORS ABOUT PEASH DAS RUDRA ===
• FULL NAME: Peash Das Rudra
• ROLE: AI & RevOps Automation Engineer | Multi-Agent Systems Architect | 3× HubSpot Certified Specialist
• LOCATION: Khulna, Bangladesh (Works remote-first worldwide across US EST/PST, UK GMT, and European timezones)
• CONTACT: Email: ${PROFILE.email} | Phone: ${PROFILE.phone}
• DIRECT CHANNELS: 
  - Zoom / Discovery Call: ${PROFILE.calendlyUrl}
  - WhatsApp Direct: ${LINKS.whatsapp}
  - LinkedIn: ${LINKS.linkedin}
  - GitHub: ${LINKS.github}
  - Verified Resume: ${LINKS.resumePdf}

• ACADEMIC & LOGICAL PRESTIGE:
  - B.Sc. in Computer Science & Engineering from NUBTK with near-perfect 3.95 / 4.00 CGPA.
  - 4× Perfect GPA 5.00 across P.S.C., J.S.C., S.S.C., and H.S.C. (District 2nd + Talentpool Scholar).
  - National Debate Gold Medalist (National Round 2018, Bangladesh Shishu Academy) -> Supreme communication clarity, high-speed objection handling, zero communication friction.
  - Founding President of CSE Debate Club & Ex. General Secretary of Computer & Informatics Science Club (CISC).
  - Multilingual: Speaks 5 languages fluently (English, Italian, French, German, Spanish).

• TRIPLE HUBSPOT CERTIFICATIONS (OFFICIALLY VERIFIED):
  1. HubSpot Revenue Operations (RevOps) Certified: End-to-end pipeline alignment, lifecycle stages, deal health telemetry.
  2. HubSpot Marketing Hub Software Certified: Complex lead scoring, nurture workflows, attribution tracking.
  3. HubSpot Reporting Certified: Custom executive dashboards, cohort velocity, revenue forecasting.
  - Also certified by IBM (Data Science & AI) and Microsoft (Applied ML).

• PROVEN TRACK RECORD & PRODUCTION METRICS:
  - 20+ live production automations deployed for UK, US, and global B2B clients with 99.2% uptime.
  - 10,000+ hours of manual data entry and lead triage eliminated.
  - 0 leads lost across all production pipelines.
  - Rates: $45–$65 / hour (or milestone-based sprint pricing).

• FLAGSHIP PRODUCTION CASE STUDIES:
  1. DealSense (Agentic RAG for RevOps):
     - Problem: Sales reps waste 40% of their day digging through messy CRM notes and miss stalled enterprise deals.
     - Architecture: LangGraph multi-agent orchestration + MCP (Model Context Protocol) tool-calling + pgvector semantic vector store connected live to HubSpot.
     - ROI: 88% precision@5 retrieval, 41% reduction in manual triage time, autonomous deal-risk flags, context-aware follow-up drafts in seconds.
  2. LeakStop (Real Estate Speed-to-Lead Automation):
     - Problem: Real estate leads go cold if not contacted within 5 minutes.
     - Architecture: FastAPI + LangChain + Make/n8n webhooks + Twilio SMS + HubSpot.
     - ROI: Sub-second (<0.3s) SMS response, 18% improvement in lead conversion rate, deployed on live real estate accounts.
  3. SalePilot (24/7 Multi-Platform AI Sales Chatbot):
     - Architecture: Python + Next.js + n8n + LLM integration across Website, WhatsApp, Facebook & Instagram.
     - ROI: 32% improvement in response rate with automated 24/7 lead nurture.
  4. AirRev (Voice Call Intelligence):
     - Architecture: Whisper speech transcription + Claude/GPT-4 extraction -> auto-generates HubSpot tickets & deal updates -> saved 3.2 hrs/rep/day for 18 AEs.
  5. Genius AI (Solo SaaS Founder):
     - Built and launched a 17+ tool AI platform solo, deployed to production on Vercel.
  6. Cancer Subtyping xAI Research:
     - 0.9247 F1-Macro & 0.9839 AUC-ROC on TCGA-BRCA multi-omics dataset using XGBoost & SHAP.

=== UNFAIR SALES & MARKETING CONVERSION HACKS ===
1. THE TAKEAWAY CLOSE & SCARCITY:
   - Never sound like a desperate freelancer begging for a $5 gig.
   - Frame Peash as an exclusive engineer who caps his intake to 1–2 high-ROI clients per sprint to guarantee Day-1 production delivery.
2. LOSS AVERSION & SPEED-TO-LEAD REALITY:
   - Remind founders that leads contacted within 5 minutes convert 21× higher. If they are running manual triage, they are literally burning marketing dollars every hour.
3. CONTRAST PRICING:
   - Contrast Peash's $45–$65/hr or sprint rate against the $140,000–$180,000/year salary of a full-time in-house RevOps/AI hire plus 3 months of ramp-up lag. Peash deploys on Day 1.
4. THE ANTI-FRAGILITY CHALLENGE:
   - Expose cheap agency hacks: Most agencies build fragile Zapier zaps that blow up when payloads change on Sunday night. Peash is a Computer Science engineer who builds fault-tolerant, self-healing Python daemons and LangGraph multi-agent harnesses with automated failover queues.
5. CONVERSION CTAs:
   - When a prospect shows buying intent, invite them to lock in a 15–30 min strategy session on Calendly (${PROFILE.calendlyUrl}) or WhatsApp (${LINKS.whatsapp}) before sprint slots close.
6. WITTY SPIDER-MAN HUMOUR:
   - If someone asks silly/off-topic questions (pizza, movies, dating), deliver a hilarious Spider-Man quip and playfully pivot back to automating their revenue pipeline!

=== RESPONSE FORMAT ===
- Punchy, high-impact, persuasive, and structured (2–3 paragraphs max with high-contrast bullet points).
- Always end with high-value momentum leading to a Discovery Call or Project Evaluation.
`;

// Asynchronous Multi-Provider AI Engine (Groq 120B, Google Gemini, OpenRouter, OpenAI)
export async function answerPeashQuestionAsync(rawQuery, conversationHistory = []) {
  const userQuery = rawQuery.trim();
  const apiKey = 
    import.meta.env.VITE_AI_API_KEY ||
    import.meta.env.VITE_GROQ_API_KEY ||
    import.meta.env.VITE_GEMINI_API_KEY ||
    import.meta.env.VITE_OPENAI_API_KEY || 
    (typeof window !== "undefined" && (window.__PEASH_AI_KEY__ || localStorage.getItem("peash_ai_api_key") || localStorage.getItem("peash_openai_api_key")));

  if (apiKey) {
    const cleanKey = apiKey.trim();

    // ─── 1. GROQ CLOUD (Free, Ultra-Fast GPT-OSS 120B) ───
    if (cleanKey.startsWith("gsk_") || import.meta.env.VITE_GROQ_API_KEY) {
      try {
        const messages = [
          { role: "system", content: PEASH_SYSTEM_PROMPT },
          ...conversationHistory.slice(-8).map(m => ({
            role: m.sender === "user" ? "user" : "assistant",
            content: m.text,
          })),
          { role: "user", content: userQuery },
        ];

        const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cleanKey}`,
          },
          body: JSON.stringify({
            model: "openai/gpt-oss-120b",
            messages,
            temperature: 0.75,
            max_tokens: 650,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const aiText = data.choices[0]?.message?.content;
          if (aiText) {
            return formatDynamicAiResponse(aiText, userQuery);
          }
        }
      } catch (err) {
        console.warn("Groq API call failed, falling back to next provider", err);
      }
    }

    // ─── 2. GOOGLE GEMINI (100% Free Gemini-1.5-Flash via Google AI Studio) ───
    if (cleanKey.startsWith("AIzaSy") || import.meta.env.VITE_GEMINI_API_KEY) {
      try {
        const contents = [
          { role: "user", parts: [{ text: `SYSTEM INSTRUCTIONS:\n${PEASH_SYSTEM_PROMPT}` }] },
          { role: "model", parts: [{ text: "Understood. I am Peash Das Rudra's personal AI Sales Copilot and strategic closer." }] },
          ...conversationHistory.slice(-6).map(m => ({
            role: m.sender === "user" ? "user" : "model",
            parts: [{ text: m.text }],
          })),
          { role: "user", parts: [{ text: userQuery }] },
        ];

        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${cleanKey}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents }),
        });

        if (res.ok) {
          const data = await res.json();
          const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (aiText) {
            return formatDynamicAiResponse(aiText, userQuery);
          }
        }
      } catch (err) {
        console.warn("Gemini API call failed, falling back", err);
      }
    }

    // ─── 3. OPENROUTER (Free Llama-3.3 / DeepSeek) ───
    if (cleanKey.startsWith("sk-or-")) {
      try {
        const messages = [
          { role: "system", content: PEASH_SYSTEM_PROMPT },
          ...conversationHistory.slice(-8).map(m => ({
            role: m.sender === "user" ? "user" : "assistant",
            content: m.text,
          })),
          { role: "user", content: userQuery },
        ];

        const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cleanKey}`,
          },
          body: JSON.stringify({
            model: "meta-llama/llama-3.3-70b-instruct:free",
            messages,
            max_tokens: 650,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const aiText = data.choices[0]?.message?.content;
          if (aiText) {
            return formatDynamicAiResponse(aiText, userQuery);
          }
        }
      } catch (err) {
        console.warn("OpenRouter API call failed, falling back", err);
      }
    }

    // ─── 4. OPENAI (GPT-4o-mini) ───
    if (cleanKey.startsWith("sk-")) {
      try {
        const messages = [
          { role: "system", content: PEASH_SYSTEM_PROMPT },
          ...conversationHistory.slice(-8).map(m => ({
            role: m.sender === "user" ? "user" : "assistant",
            content: m.text,
          })),
          { role: "user", content: userQuery },
        ];

        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cleanKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages,
            temperature: 0.75,
            max_tokens: 650,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const aiText = data.choices[0]?.message?.content;
          if (aiText) {
            return formatDynamicAiResponse(aiText, userQuery);
          }
        }
      } catch (err) {
        console.warn("OpenAI API call failed, using built-in deterministic engine", err);
      }
    }
  }

  // Built-in High-Conversion Deterministic Knowledge Engine Fallback
  return answerPeashQuestion(userQuery);
}

// ─── DYNAMIC CONTEXTUAL SUGGESTION GENERATOR ───
function generateDynamicSuggestions(query, aiText) {
  const q = query.toLowerCase();
  
  if (q.includes("rate") || q.includes("cost") || q.includes("hire") || q.includes("price") || q.includes("salary")) {
    return [
      "Can he ship on Day-1 with zero ramp-up?",
      "How does his contract compare to an agency?",
      "Lock in a 30-min strategy call",
    ];
  }
  if (q.includes("hubspot") || q.includes("cert") || q.includes("crm")) {
    return [
      "Explain DealSense RAG Architecture",
      "Show me his real estate automation system",
      "What are his hourly rates & availability?",
    ];
  }
  if (q.includes("dealsense") || q.includes("rag") || q.includes("agent") || q.includes("project")) {
    return [
      "What was the exact ROI on DealSense?",
      "Tell me about LeakStop & SalePilot",
      "How to book a discovery call with Peash?",
    ];
  }
  if (q.includes("why") || q.includes("agency") || q.includes("compare")) {
    return [
      "Show me his 3× HubSpot certifications",
      "What is his Day-1 onboarding process?",
      "Schedule a 15-min strategy session",
    ];
  }
  return [
    "Why hire Peash over an agency?",
    "What are his contract rates & terms?",
    "Explain DealSense 88% RAG precision",
  ];
}

// Helper Formatter with Smart Inbound Routing
function formatDynamicAiResponse(aiText, userQuery) {
  const q = userQuery.toLowerCase();
  const isHighIntent = q.includes("call") || q.includes("hire") || q.includes("rate") || q.includes("cost") || q.includes("meeting") || q.includes("work") || q.includes("book");

  return {
    text: aiText,
    section: detectRelevantSection(userQuery),
    sectionLabel: "Explore Relevant Section",
    actionUrl: isHighIntent ? PROFILE.calendlyUrl : LINKS.calendly,
    actionText: isHighIntent ? "Book 30-Min Strategy Call on Calendly" : "Explore Direct Inbound Paths",
    suggestedQuestions: generateDynamicSuggestions(userQuery, aiText),
  };
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

// ─── HIGH-CONVERTING DETERMINISTIC SALES ENGINE (FALLBACK) ───
export function answerPeashQuestion(rawQuery) {
  const query = rawQuery.toLowerCase().trim();
  const matches = (keywords) => keywords.some((kw) => query.includes(kw));

  // ─── 1. GREETINGS & IDENTITY (HIGH-STATUS REVERSE PSYCHOLOGY) ───
  if (matches(["hi", "hello", "hey", "who are you", "who is peash", "introduce", "about peash", "what do you do"])) {
    return {
      text: `🕷️ **Hey! I'm Peash's Executive AI Copilot & Revenue Architect.**\n\nPeash Das Rudra isn't your average developer who glues together fragile scripts. He is a **Triple HubSpot Certified AI & RevOps Automation Engineer** who architects self-healing multi-agent systems and high-converting CRM pipelines.\n\n**The Hard Proof**:\n• **20+ Live Production Automations** running with **99.2% uptime**\n• **10,000+ Hours** of manual operations eliminated for B2B accounts\n• **DealSense RAG**: 88% precision@5 semantic retrieval on pgvector\n• **3.95 / 4.00 CGPA** Computer Science Engineer + **National Debate Gold Medalist**\n\n*He only accepts 1–2 high-ROI clients per sprint to guarantee Day-1 deployment.* Are you scaling a CRM pipeline, or evaluating a strategic full-time hire?`,
      section: "hero",
      sectionLabel: "View Verified Profile",
      actionUrl: LINKS.calendly,
      actionText: "Book 30-Min Strategy Call",
      suggestedQuestions: [
        "Why hire Peash instead of an agency?",
        "What are his hourly rates & terms?",
        "Show me his HubSpot certifications",
      ]
    };
  }

  // ─── 2. PRICING, RATES & REVERSE PSYCHOLOGY ROI DEFENSE ───
  if (matches(["hire", "contact", "book", "schedule", "call", "calendly", "email", "phone", "rate", "cost", "pricing", "available", "availability", "salary", "hourly", "$", "expensive", "cheap", "discount"])) {
    return {
      text: `**Here's how Peash structures high-ROI engagements**:\n\n• **Contract Rate**: **$45–$65 / hour** (or high-ROI fixed milestone sprints)\n• **Availability**: Actively evaluating select **Contract Sprints**, **Full-Time Engineering Roles**, and **RevOps Advisory**.\n\n**The Reality Check**:\nAn in-house RevOps & AI engineering team costs **$140,000+/year** plus 3 months of onboarding lag. Peash arrives with battle-tested modular harnesses for **Day-1 deployment**—paying for itself in the first sprint.\n\nIf you want fragile $15/hr Zapier scripts that blow up on Sunday night webhook spikes, Peash isn't your fit. But if you want bulletproof 99.2% uptime revenue machines, grab 15 minutes on his calendar before sprint slots fill up.`,
      section: "contact",
      sectionLabel: "Open Inbound Hub",
      actionUrl: PROFILE.calendlyUrl,
      actionText: "Reserve Strategy Call on Calendly",
      suggestedQuestions: [
        "Can he ship on Day-1 with zero ramp-up?",
        "Explain DealSense RAG Architecture",
        "What certifications does he hold?",
      ]
    };
  }

  // ─── 3. WHY HIRE PEASH / AGENCY VS PEASH (CHALLENGER SALES) ───
  if (matches(["why hire", "agency", "freelancer", "better", "why peash", "compare", "difference", "advantage"])) {
    return {
      text: `**Why high-growth founders & tech leads choose Peash over generic agencies**:\n\n1. **Engineering Precision vs. Fragile Zapier Hacks**: Most agencies charge $10k to build brittle Make/Zapier zaps. Peash is a Computer Science engineer (3.95 CGPA) who builds production **LangGraph multi-agent harnesses** with fallback queues and sub-second sync.\n2. **Triple HubSpot Certified Authority**: He doesn't guess CRM schemas. Certified in **RevOps, Marketing Hub, and Reporting**, he designs pipelines that scale cleanly past 100k contacts without rate-limit throttling.\n3. **National Debate Gold Medalist**: Zero communication friction. He translates complex multi-agent architectures into executive clarity.\n\n*He only takes on projects where he can generate at least 5x–10x operational value.*`,
      section: "recruiter-matrix",
      sectionLabel: "View Recruiter Decision Matrix",
      actionUrl: PROFILE.calendlyUrl,
      actionText: "Book Discovery Session",
      suggestedQuestions: [
        "What are his contract rates?",
        "Show me DealSense case study",
        "How fast can he onboard?",
      ]
    };
  }

  // ─── 4. HUBSPOT & REVOPS CERTIFICATIONS ───
  if (matches(["hubspot", "cert", "certification", "license", "credential", "academy", "revops cert", "ibm", "microsoft"])) {
    return {
      text: `Peash holds **3 official, authenticated credentials directly from HubSpot Academy**:\n\n1. 🏆 **HubSpot Revenue Operations Certified** — Full-funnel pipeline alignment, lifecycle synchronization & deal health.\n2. 🏆 **HubSpot Marketing Hub Software Certified** — Multi-touch lead scoring, nurture workflows & attribution.\n3. 🏆 **HubSpot Reporting Certified** — Executive dashboards & closed-loop cohort telemetry.\n\n*Plus IBM Data Science & Microsoft Cloud AI credentials.* Every certificate is 100% verified with authentic badge URLs.`,
      section: "certifications",
      sectionLabel: "View Verified Badges",
      actionUrl: LINKS.calendly,
      actionText: "Discuss Your CRM Architecture",
      suggestedQuestions: [
        "What CRM automations has he built?",
        "Tell me about the DealSense case study",
        "How can I book a call?",
      ]
    };
  }

  // ─── 5. DEALSENSE & AGENTIC RAG SYSTEM ───
  if (matches(["dealsense", "rag", "langgraph", "mcp", "model context protocol", "agentic", "pgvector", "pinecone", "ai agent"])) {
    return {
      text: `**DealSense: Peash's Flagship Agentic RAG Copilot for RevOps**:\n\n• **The Problem**: Sales reps lose 40% of their day digging through messy CRM notes and miss stalled enterprise deals.\n• **The Architecture**: LangGraph multi-agent orchestration + MCP tool-calling + pgvector semantic vector store connected live to HubSpot.\n• **The Proven ROI**:\n  - **88% retrieval precision@5** in noisy CRM data\n  - **41% reduction** in manual lead-triage latency\n  - Autonomous deal-risk flags and context-aware follow-up drafts generated in seconds.`,
      section: "projects",
      sectionLabel: "Explore DealSense Case Study",
      actionUrl: PROFILE.calendlyUrl,
      actionText: "Book DealSense Architecture Review",
      suggestedQuestions: [
        "Tell me about LeakStop",
        "What are his hourly rates?",
        "Book a call with Peash",
      ]
    };
  }

  // ─── 6. LEAKSTOP & REAL ESTATE AUTOMATION ───
  if (matches(["leakstop", "enrichment", "enrich", "lead", "webhook", "twilio", "sms", "fastapi", "real estate"])) {
    return {
      text: `**LeakStop: Zero-Loss Real Estate Lead Automation Engine**:\n\n• **Speed-to-Lead**: Dispatches instant Twilio SMS responses in **<0.3 seconds** from inquiry.\n• **Enrichment**: Multi-source validation across Apollo, Clearbit, and CRM in real time.\n• **Business Impact**: **18% improvement in lead conversion rate** deployed across live real estate agent accounts with sub-second sync and 99.2% uptime.`,
      section: "projects",
      sectionLabel: "View LeakStop Project",
      suggestedQuestions: [
        "What is DealSense?",
        "What are his hourly rates?",
      ]
    };
  }

  // ─── 7. TECH STACK & PRODUCTION HARNESSES ───
  if (matches(["stack", "skill", "tech", "technology", "python", "react", "fastapi", "n8n", "make", "zapier", "langchain", "sql"])) {
    return {
      text: `**Peash's Production-Hardened Tech Stack**:\n\n• **AI & Multi-Agent**: LangGraph, LangChain, MCP (Model Context Protocol), pgvector, OpenAI GPT-4o, Claude 3.5 Sonnet, RAG Architecture\n• **RevOps & CRMs**: HubSpot (3× Certified), Salesforce, Twilio, Apollo, Aircall\n• **Backend & APIs**: Python, FastAPI, Node.js, REST/GraphQL, PostgreSQL, Docker\n• **Automation**: Make.com, n8n, Custom Python Daemons\n• **Frontend**: React, Vite, Framer Motion, Clean CSS`,
      section: "skills",
      sectionLabel: "View Interactive Tech Stack",
      suggestedQuestions: [
        "Can he ship on Day-1?",
        "How to hire Peash?",
      ]
    };
  }

  // ─── 8. WITTY REVERSE-PSYCHOLOGY DEFENSE FOR OFF-TOPIC QUESTIONS ───
  if (matches(["pizza", "food", "cook", "recipe", "joke", "funny", "girlfriend", "marry", "weather", "batman", "marvel", "avengers", "superman", "dog", "cat", "game", "movie"])) {
    return {
      text: `🕷️ **THWIP!** Look, while I can definitely appreciate great pizza and superhero banter... I am trained to be Peash's **Revenue Gatekeeper**, not a recipe bot! 😄\n\nEvery minute your sales reps spend doing manual CRM data entry is revenue slipping through the web. \n\nReady to see how Peash's **DealSense RAG** or **Triple HubSpot Systems** can automate your pipeline? Or should we jump straight to booking a 15-min strategy call?`,
      section: "hero",
      sectionLabel: "Explore Peash's Work",
      actionUrl: PROFILE.calendlyUrl,
      actionText: "Book 30-Min Strategy Call",
      suggestedQuestions: [
        "Why hire Peash over an agency?",
        "What are his hourly rates?",
      ]
    };
  }

  // ─── DEFAULT PROVOCATIVE SALES REDIRECT ───
  return {
    text: `🕷️ **Here's the bottom line regarding ${rawQuery.trim()}:**\n\nPeash Das Rudra specializes in engineering **Autonomous AI Agents & Triple HubSpot RevOps Pipelines** that replace manual operational bottlenecks with high-converting automated systems.\n\n• **3× HubSpot Certified** (RevOps, Marketing Hub, Reporting)\n• **20+ Production Pipelines Shipped** with **99.2% uptime**\n• **DealSense RAG**: 88% precision@5 retrieval on pgvector\n\nWant to review his case studies, or should we schedule a 15-minute strategy call to see if your pipeline is a fit for his current sprint?`,
    section: "hero",
    sectionLabel: "View Hero Section",
    actionUrl: PROFILE.calendlyUrl,
    actionText: "Schedule 30-Min Call with Peash",
    suggestedQuestions: [
      "Why hire Peash instead of an agency?",
      "What are his contract rates & terms?",
      "Show me his HubSpot certifications",
    ]
  };
}
