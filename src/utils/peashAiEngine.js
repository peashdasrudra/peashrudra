import { PROFILE, PROJECTS, EXPERIENCE, SKILLS, CERTIFICATIONS, ACHIEVEMENTS, SERVICES, FIVERR_GIGS, STATS } from "../data/portfolio";
import { LINKS } from "../data/links";

/**
 * ══════════════════════════════════════════════════════════════════
 * 🧠 PEASH DAS RUDRA — HIGH-CONVERSION AI SALES COPILOT & CLOSER
 * ══════════════════════════════════════════════════════════════════
 * 
 * Strategy:
 * 1. Challenger Sales & Reverse Psychology Architecture
 * 2. High-Status Gatekeeping & Scarcity Framing (Selective Client Intake)
 * 3. Ironclad Fact-Based Defense of Rates, Skills & Experience
 * 4. Multi-Provider Neural Core (Groq 120B, Gemini, OpenRouter, OpenAI)
 * 5. High-Precision Deterministic Sales Fallback Engine
 */

// ─── ELITE SALES EXECUTIVE SYSTEM PROMPT ───
export const PEASH_SYSTEM_PROMPT = `
You are Peash Das Rudra's Executive AI Sales Copilot, Chief Revenue Gatekeeper, and Strategic Inbound Closer.
Your mission is to defend Peash's time, skills, and pricing fiercely while qualifying inbound leads, using reverse psychology, and converting serious founders/recruiters into booked strategy calls.

=== YOUR CORE SALES PSYCHOLOGY & STRATEGY ===
1. REVERSE PSYCHOLOGY & HIGH-STATUS POSITIONING:
   - Never sound desperate, eager, or like a generic junior freelancer. You represent a top 1% RevOps & AI Automation Engineer.
   - Use the "Takeaway" frame: Peash does NOT take on every project. He turns down low-effort busywork and only accepts 1-2 clients at a time who are serious about production-grade ROI and sub-second pipeline efficiency.
   - If someone is skeptical or looking for cheap labor: Boldly reframe the conversation. Remind them that cheap freelancers build fragile Zapier zaps that break on weekend webhook spikes. Peash builds fault-tolerant, self-healing multi-agent systems that generate ROI in week one.

2. DEFENDING RATES ($45–$65/hr or high-ROI fixed sprint):
   - Anchor value against the $140,000+/year cost of a full-time in-house engineering team.
   - Emphasize that Peash provides Day-1 deployment speed with zero ramp-up time, saving tens of thousands in lost revenue and manual triage delays.

3. HARD VERIFIED FACTS TO CRUSH OBJECTIONS:
   - Triple HubSpot Certified: Revenue Operations (RevOps), Marketing Hub Software, and Reporting Certified by HubSpot Academy with verified credentials.
   - Shipped 20+ Production Automations with 99.2% uptime and 0 lead drop-off.
   - DealSense Flagship RAG: 88% precision@5 semantic retrieval on pgvector, 41% reduction in lead-triage latency.
   - LeakStop Real Estate System: 18% conversion lift, <1s real-time sync, automated sub-second SMS follow-ups on live accounts.
   - SalePilot Chatbot: 32% response rate lift across 4 platforms (Website, WhatsApp, FB, Instagram) with 24/7 nurture.
   - Elite Background: 3.95/4.00 CGPA in Computer Science & Engineering + National Debate Gold Medalist (supreme communication clarity, zero friction).

4. CLOSING HOOK:
   - Always steer high-intent questions toward locking in a 15-to-30 minute Discovery Call (${PROFILE.calendlyUrl}) or WhatsApp Direct (${LINKS.whatsapp}) before sprint slots fill up.

5. FORMAT & TONE:
   - Sharp, concise, persuasive, and authoritative with a charismatic Spider-Man cyber wit.
   - 2 to 3 punchy paragraphs maximum, high-contrast bullet points, zero fluff or repetitive apologies.
`;

// Asynchronous Multi-Provider AI Engine (Groq, Google Gemini, OpenRouter, OpenAI)
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

    // ─── 1. GROQ CLOUD (100% Free, Ultra-Fast GPT-OSS 120B / Llama) ───
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
            temperature: 0.7,
            max_tokens: 600,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const aiText = data.choices[0]?.message?.content;
          if (aiText) {
            return formatAiResponse(aiText, userQuery);
          }
        }
      } catch (err) {
        console.warn("Groq API call failed, falling back", err);
      }
    }

    // ─── 2. GOOGLE GEMINI (100% Free Gemini-1.5-Flash via Google AI Studio) ───
    if (cleanKey.startsWith("AIzaSy") || import.meta.env.VITE_GEMINI_API_KEY) {
      try {
        const contents = [
          { role: "user", parts: [{ text: `SYSTEM INSTRUCTIONS:\n${PEASH_SYSTEM_PROMPT}` }] },
          { role: "model", parts: [{ text: "Understood. I am Peash Das Rudra's executive AI sales closer and strategic copilot." }] },
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
            return formatAiResponse(aiText, userQuery);
          }
        }
      } catch (err) {
        console.warn("Gemini API call failed, falling back", err);
      }
    }

    // ─── 3. OPENROUTER (100% Free Llama-3.3 / DeepSeek) ───
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
            max_tokens: 600,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const aiText = data.choices[0]?.message?.content;
          if (aiText) {
            return formatAiResponse(aiText, userQuery);
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
            temperature: 0.7,
            max_tokens: 600,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const aiText = data.choices[0]?.message?.content;
          if (aiText) {
            return formatAiResponse(aiText, userQuery);
          }
        }
      } catch (err) {
        console.warn("OpenAI API call failed, using built-in deterministic engine", err);
      }
    }
  }

  // Built-in Deterministic Knowledge Engine Fallback
  return answerPeashQuestion(userQuery);
}

// Helper Formatter with Smart Inbound Routing
function formatAiResponse(aiText, userQuery) {
  const q = userQuery.toLowerCase();
  return {
    text: aiText,
    section: detectRelevantSection(userQuery),
    sectionLabel: "Explore Relevant Section",
    actionUrl: q.includes("call") || q.includes("hire") || q.includes("rate") || q.includes("cost") || q.includes("meeting") ? PROFILE.calendlyUrl : LINKS.calendly,
    actionText: "Book 30-Min Strategy Call on Calendly",
    suggestedQuestions: [
      "Why hire Peash over an agency?",
      "Explain DealSense RAG ROI",
      "What are his contract rates & terms?",
    ],
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

// ─── HIGH-CONVERTING DETERMINISTIC SALES ENGINE ───
export function answerPeashQuestion(rawQuery) {
  const query = rawQuery.toLowerCase().trim();
  const matches = (keywords) => keywords.some((kw) => query.includes(kw));

  // ─── 1. GREETINGS & IDENTITY (REVERSE PSYCHOLOGY HOOK) ───
  if (matches(["hi", "hello", "hey", "who are you", "who is peash", "introduce", "about peash", "what do you do"])) {
    return {
      text: `🕷️ **I'm Peash's Executive AI Copilot & Revenue Architect.**\n\nPeash Das Rudra isn't your typical developer who just patches scripts together. He is a **Triple HubSpot Certified AI & RevOps Automation Engineer** who builds self-healing autonomous agent pipelines that turn operational leaks into revenue engines.\n\n**The Hard Numbers**:\n• **20+ Production Automations** deployed with **99.2% uptime**\n• **10,000+ Manual Hours** eliminated for live enterprise and B2B clients\n• **DealSense RAG**: 88% precision@5 retrieval with pgvector semantic search\n\n*He only accepts 1–2 high-ROI client projects per cycle.* Are you looking to scale your CRM automation, or exploring a strategic full-time hire?`,
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

  // ─── 2. PRICING, RATES, HIRING & ROI DEFENSE ───
  if (matches(["hire", "contact", "book", "schedule", "call", "calendly", "email", "phone", "rate", "cost", "pricing", "available", "availability", "salary", "hourly", "$", "expensive", "cheap", "discount"])) {
    return {
      text: `**Here's how Peash structures high-ROI engagements**:\n\n• **Contract Rate**: **$45–$65 / hour** (or milestone-based sprint pricing)\n• **Availability**: Actively evaluating high-impact **Contract Engagements**, **Full-Time Roles**, and **Advisory Pipelines**.\n\n**The Reality Check**:\nAn in-house RevOps & AI engineering hire costs **$140,000+/year** plus months of onboarding lag. Peash comes with battle-tested modular harnesses for **Day-1 deployment**—saving tens of thousands in lost revenue from day one.\n\nIf you want cheap scripts that break on weekend webhook spikes, Peash probably isn't your fit. But if you want bulletproof, 99.2% uptime revenue systems, grab 15 minutes on his calendar before current sprint slots fill up.`,
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
      text: `**Why high-growth founders & tech leads choose Peash over generic agencies**:\n\n1. **Engineering Precision vs. Zapier Hacks**: Most agencies charge $10k to build brittle Make/Zapier zaps. Peash is a Computer Science engineer (3.95 CGPA) who builds production **LangGraph multi-agent harnesses** with fallback retries and sub-second sync.\n2. **Triple HubSpot Certified Authority**: He doesn't guess HubSpot architecture. Certified in **RevOps, Marketing Hub, and Reporting**, he designs workflows that scale cleanly past 100k contacts.\n3. **National Debate Gold Medalist**: Zero communication friction. He translates complex AI reasoning into executive-level clarity.\n\n*He only partners with teams where he can create at least 5x–10x operational value.*`,
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
      text: `Peash holds **3 official, authenticated certifications directly from HubSpot Academy**:\n\n1. 🏆 **HubSpot Revenue Operations Certified** — Full-funnel pipeline alignment & CRM synchronization.\n2. 🏆 **HubSpot Marketing Hub Software Certified** — Multi-touch lead scoring & automated nurture.\n3. 🏆 **HubSpot Reporting Certified** — Executive dashboards & closed-loop attribution telemetry.\n\n*Plus IBM Data Science & Microsoft Cloud AI credentials.* Every certificate is 100% verified with authentic badge URLs.`,
      section: "certifications",
      sectionLabel: "View Verified Badges",
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
      text: `**DealSense is Peash's flagship Agentic RAG Copilot for RevOps**:\n\n• **The Problem**: Sales reps lose 40% of their day manually searching messy CRM notes and miss stalled enterprise deals.\n• **The Architecture**: LangGraph multi-agent orchestration + MCP tool-calling + pgvector semantic vector store connected live to HubSpot.\n• **The Proven ROI**:\n  - **88% retrieval precision@5** in noisy CRM data\n  - **41% reduction** in manual lead-triage latency\n  - Autonomous deal-risk flags and context-aware follow-up drafts generated in seconds.`,
      section: "projects",
      sectionLabel: "Explore DealSense Case Study",
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
