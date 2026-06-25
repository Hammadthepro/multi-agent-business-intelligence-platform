// Placeholder API integration functions for the Multi-Agent BI Platform.
// Replace these stubs with real backend calls when connecting your agents.

export type AgentStatus = "idle" | "running" | "complete" | "error";

export interface AnalysisInput {
  businessType: string;
  targetMarket: string;
  industry: string;
}

export interface MarketOpportunity {
  title: string;
  description: string;
  score: number;
}

export interface Competitor {
  name: string;
  marketShare: number;
  strengths: string[];
  weaknesses: string[];
}

export interface Lead {
  id: string;
  company: string;
  website: string;
  industry: string;
  location: string;
  opportunityScore: number;
  status: "new" | "contacted" | "qualified" | "converted";
}

export interface WebsiteAudit {
  url: string;
  seoScore: number;
  mobileScore: number;
  performanceScore: number;
  securityScore: number;
  issues: string[];
}

export interface Report {
  id: string;
  title: string;
  type: string;
  createdAt: string;
  pages: number;
}

// Simulated network latency
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function runFullAnalysis(input: AnalysisInput) {
  await wait(800);
  return { ok: true, input };
}

export async function fetchMarketOpportunities(): Promise<MarketOpportunity[]> {
  await wait(400);
  return [
    { title: "Emerging SMB segment in EU", description: "Underserved 50-200 employee companies show 34% YoY growth.", score: 87 },
    { title: "AI-assisted onboarding gap", description: "Competitors lack guided automation flows for first-time users.", score: 79 },
    { title: "Vertical: HealthTech expansion", description: "Regulatory shifts opened a $1.2B addressable market.", score: 72 },
  ];
}

export async function fetchCompetitors(): Promise<Competitor[]> {
  await wait(400);
  return [
    { name: "Apex Analytics", marketShare: 28, strengths: ["Brand", "Enterprise"], weaknesses: ["Slow product"] },
    { name: "Northwind AI", marketShare: 17, strengths: ["Pricing"], weaknesses: ["Support"] },
    { name: "QuantaIQ", marketShare: 11, strengths: ["UX"], weaknesses: ["Integrations"] },
  ];
}

export async function fetchLeads(): Promise<Lead[]> {
  await wait(400);
  return [
    { id: "l1", company: "Helios Robotics", website: "helios.io", industry: "Robotics", location: "Berlin, DE", opportunityScore: 92, status: "new" },
    { id: "l2", company: "Lumen Health", website: "lumenhealth.com", industry: "HealthTech", location: "Austin, US", opportunityScore: 88, status: "contacted" },
    { id: "l3", company: "Northstar Logistics", website: "northstar.co", industry: "Logistics", location: "Rotterdam, NL", opportunityScore: 81, status: "qualified" },
    { id: "l4", company: "Vertex Foods", website: "vertexfoods.com", industry: "FMCG", location: "London, UK", opportunityScore: 76, status: "new" },
    { id: "l5", company: "Atlas Fintech", website: "atlasfin.com", industry: "Fintech", location: "Singapore", opportunityScore: 84, status: "qualified" },
  ];
}

export async function runWebsiteAudit(url: string): Promise<WebsiteAudit> {
  await wait(1200);
  return {
    url,
    seoScore: 78,
    mobileScore: 91,
    performanceScore: 64,
    securityScore: 88,
    issues: ["Missing meta description on 4 pages", "Largest contentful paint > 2.5s", "Mixed content warnings on /pricing"],
  };
}

export async function fetchReports(): Promise<Report[]> {
  await wait(400);
  return [
    { id: "r1", title: "Q3 Market Landscape", type: "Market Research", createdAt: "2026-06-12", pages: 24 },
    { id: "r2", title: "Top 20 Competitors Brief", type: "Competitor", createdAt: "2026-06-10", pages: 18 },
    { id: "r3", title: "Lead Scoring Cohort A", type: "Leads", createdAt: "2026-06-08", pages: 12 },
    { id: "r4", title: "helios.io Website Audit", type: "Audit", createdAt: "2026-06-05", pages: 9 },
  ];
}

export async function generateOutreach(input: AnalysisInput) {
  await wait(900);
  return {
    coldEmail: `Subject: Helping ${input.businessType || "your team"} unlock ${input.targetMarket || "new markets"}\n\nHi {{firstName}},\n\nI noticed your work in ${input.industry || "your industry"} and wanted to share how teams like yours are accelerating pipeline with our multi-agent platform...\n\nOpen to a 15-min call next week?\n\nBest,\nAlex`,
    linkedinMessage: `Hi {{firstName}} — really enjoyed your recent post on ${input.industry || "the space"}. We help ${input.businessType || "companies"} like yours surface high-intent leads in ${input.targetMarket || "target markets"}. Worth a quick chat?`,
    followUp: `Subject: Following up\n\nHi {{firstName}},\n\nCircling back on my note — happy to send over a tailored opportunity report for ${input.businessType || "your team"} before we connect. Just say the word.\n\nThanks,\nAlex`,
  };
}
