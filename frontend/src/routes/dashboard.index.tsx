import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { StatCard } from "@/components/stat-card";
import { AgentPipeline, type AgentNode } from "@/components/agent-pipeline";
import {
  Target,
  Users,
  Globe,
  Sparkles,
  Play,
  Loader2,
  TrendingUp,
  Mail,
  FileText,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardHome,
});

const initialAgents: AgentNode[] = [
  { id: "market", name: "Market Research Agent", status: "idle" },
  { id: "competitor", name: "Competitor Agent", status: "idle" },
  { id: "leads", name: "Lead Generation Agent", status: "idle" },
  { id: "audit", name: "Website Audit Agent", status: "idle" },
  { id: "score", name: "Opportunity Scoring Agent", status: "idle" },
  { id: "outreach", name: "Outreach Agent", status: "idle" },
  { id: "report", name: "Reporting Agent", status: "idle" },
];

const chartData = [
  { day: "Mon", leads: 12, score: 71 },
  { day: "Tue", leads: 19, score: 74 },
  { day: "Wed", leads: 14, score: 70 },
  { day: "Thu", leads: 28, score: 78 },
  { day: "Fri", leads: 32, score: 81 },
  { day: "Sat", leads: 22, score: 79 },
  { day: "Sun", leads: 36, score: 84 },
];

function DashboardHome() {
  const [businessType, setBusinessType] = useState("");
  const [targetMarket, setTargetMarket] = useState("");
  const [industry, setIndustry] = useState("");
  const [agents, setAgents] = useState<AgentNode[]>(initialAgents);
  const [running, setRunning] = useState(false);
  const [hasResults, setHasResults] = useState(false);

  const progress = useMemo(() => {
    const done = agents.filter((a) => a.status === "complete").length;
    return Math.round((done / agents.length) * 100);
  }, [agents]);

  async function runAnalysis() {
    if (!businessType || !targetMarket || !industry) {
      toast.error("Please fill in business type, target market, and industry.");
      return;
    }
    setRunning(true);
    setHasResults(false);
    setAgents(initialAgents.map((a) => ({ ...a, status: "idle" })));

    for (let i = 0; i < initialAgents.length; i++) {
      setAgents((prev) =>
        prev.map((a, idx) =>
          idx === i ? { ...a, status: "running" } : idx < i ? { ...a, status: "complete" } : a,
        ),
      );
      await new Promise((r) => setTimeout(r, 650));
      setAgents((prev) => prev.map((a, idx) => (idx === i ? { ...a, status: "complete" } : a)));
    }
    setRunning(false);
    setHasResults(true);
    toast.success("Analysis complete. Results are ready below.");
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 md:p-6">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
          Welcome back, Alex
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Kick off a new multi-agent analysis or pick up where you left off.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Leads Found" value="1,284" delta={12} icon={<Target className="h-4 w-4" />} />
        <StatCard label="Competitors Analyzed" value={47} delta={6} icon={<Users className="h-4 w-4" />} />
        <StatCard label="Audits Completed" value={132} delta={-3} icon={<Globe className="h-4 w-4" />} />
        <StatCard label="Avg. Opportunity" value="78.4" delta={4} icon={<Sparkles className="h-4 w-4" />} />
      </div>

      {/* Analysis form + chart */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">New analysis</CardTitle>
            <CardDescription>Tell the agents what to research.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="business">Business type</Label>
                <Input
                  id="business"
                  placeholder="B2B SaaS, Marketplace, Agency…"
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="market">Target market</Label>
                <Input
                  id="market"
                  placeholder="Mid-market EU, US SMB…"
                  value={targetMarket}
                  onChange={(e) => setTargetMarket(e.target.value)}
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <Label>Industry</Label>
                <Select value={industry} onValueChange={setIndustry}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Software & SaaS",
                      "Financial Services",
                      "Healthcare",
                      "E-commerce & Retail",
                      "Manufacturing",
                      "Logistics",
                      "Media & Entertainment",
                      "Education",
                    ].map((i) => (
                      <SelectItem key={i} value={i}>{i}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <p className="text-xs text-muted-foreground">
                The pipeline runs 7 agents. Typical run-time: 3–5 minutes.
              </p>
              <Button onClick={runAnalysis} disabled={running} className="gap-2">
                {running ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Running…
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" /> Analyze
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Pipeline volume</CardTitle>
            <CardDescription>Last 7 days</CardDescription>
          </CardHeader>
          <CardContent className="h-[220px] pl-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="day" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} width={28} />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Area type="monotone" dataKey="leads" stroke="var(--color-primary)" strokeWidth={2} fill="url(#g1)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Pipeline */}
      <Card>
        <CardHeader>
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:items-end sm:justify-between">
            <div className="min-w-0">
              <CardTitle className="text-base">Agent pipeline</CardTitle>
              <CardDescription>Live status of the 7-agent workflow.</CardDescription>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <Badge variant="secondary" className="font-mono">{progress}%</Badge>
              <div className="hidden w-40 sm:block">
                <Progress value={progress} />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <AgentPipeline agents={agents} />
        </CardContent>
      </Card>

      {/* Results */}
      <section className="space-y-3">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-display text-xl font-semibold tracking-tight">Results</h2>
            <p className="text-sm text-muted-foreground">
              {hasResults
                ? "Latest synthesis from the agent team."
                : "Run an analysis to populate insights."}
            </p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <ResultCard
            title="Market Opportunities"
            icon={<TrendingUp className="h-4 w-4" />}
            empty={!hasResults}
            items={[
              "Underserved EU mid-market — 34% YoY",
              "Onboarding automation gap in top 5 incumbents",
              "Vertical opening in HealthTech",
            ]}
          />
          <ResultCard
            title="Competitor Insights"
            icon={<Users className="h-4 w-4" />}
            empty={!hasResults}
            items={[
              "Apex Analytics losing NPS in enterprise",
              "Northwind raising prices in Q4",
              "QuantaIQ shipping integrations rapidly",
            ]}
          />
          <ResultCard
            title="Lead Recommendations"
            icon={<Target className="h-4 w-4" />}
            empty={!hasResults}
            items={[
              "Helios Robotics — fit 92",
              "Lumen Health — fit 88",
              "Atlas Fintech — fit 84",
            ]}
          />
          <ResultCard
            title="Website Audit Summary"
            icon={<Globe className="h-4 w-4" />}
            empty={!hasResults}
            items={[
              "Avg SEO score: 78",
              "Performance regressions on /pricing",
              "Mobile UX strong (91)",
            ]}
          />
          <ResultCard
            title="Opportunity Score"
            icon={<Sparkles className="h-4 w-4" />}
            empty={!hasResults}
            items={[
              "Weighted average: 81.2",
              "Top quartile fit: 24 accounts",
              "12 accounts ready for outreach",
            ]}
          />
          <ResultCard
            title="Outreach Recommendations"
            icon={<Mail className="h-4 w-4" />}
            empty={!hasResults}
            items={[
              "3 cold-email drafts ready",
              "LinkedIn sequence: 5 touches",
              "Best send window: Tue 9am local",
            ]}
          />
        </div>
        <div className="pt-2">
          <Button variant="outline" className="gap-2" disabled={!hasResults}>
            <FileText className="h-4 w-4" /> Open full report
          </Button>
        </div>
      </section>
    </div>
  );
}

function ResultCard({
  title,
  icon,
  items,
  empty,
}: {
  title: string;
  icon: React.ReactNode;
  items: string[];
  empty: boolean;
}) {
  return (
    <Card className="border-border/70">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="grid h-7 w-7 place-items-center rounded-md bg-accent text-primary">
            {icon}
          </div>
          <CardTitle className="text-sm font-semibold">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {empty ? (
          <div className="space-y-2">
            <div className="h-3 w-3/4 animate-pulse rounded bg-muted" />
            <div className="h-3 w-2/3 animate-pulse rounded bg-muted" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
          </div>
        ) : (
          <ul className="space-y-2 text-sm text-muted-foreground">
            {items.map((it) => (
              <li key={it} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>{it}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
