import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  Brain,
  Search,
  Users,
  Globe,
  Target,
  Mail,
  FileBarChart,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
});

const features = [
  { icon: Search, title: "Market Research", desc: "Continuously scans markets for emerging opportunities and demand signals." },
  { icon: Users, title: "Competitor Intelligence", desc: "Benchmarks competitors across pricing, positioning, and customer sentiment." },
  { icon: Target, title: "Lead Generation", desc: "Surfaces high-intent accounts ranked by fit and timing." },
  { icon: Globe, title: "Website Audit", desc: "Grades any URL on SEO, performance, mobile, and security." },
  { icon: Sparkles, title: "Opportunity Scoring", desc: "Combines signals into a single, defensible priority score." },
  { icon: Mail, title: "Outreach Generator", desc: "Drafts cold email, LinkedIn, and follow-ups tuned to each account." },
];

const steps = [
  { n: "01", title: "Describe your business", desc: "Tell the platform what you sell and who you sell to." },
  { n: "02", title: "Agents go to work", desc: "Seven specialised agents coordinate research, scoring, and outreach." },
  { n: "03", title: "Act on the report", desc: "Get a prioritised plan, ready-to-send messages, and a downloadable PDF." },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Brain className="h-4 w-4" />
            </div>
            <span className="font-display text-lg font-semibold tracking-tight">Sentient</span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#features" className="hover:text-foreground">Features</a>
            <a href="#how" className="hover:text-foreground">How it works</a>
            <a href="#pricing" className="hover:text-foreground">Pricing</a>
          </nav>
          <Link to="/dashboard">
            <Button size="sm" className="gap-1.5">
              Open dashboard <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{ background: "var(--gradient-subtle)" }}
        />
        <div
          aria-hidden
          className="absolute -top-40 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
          style={{ background: "var(--gradient-hero)" }}
        />
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Seven specialised agents. One coordinated workflow.
            </div>
            <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              Business intelligence,{" "}
              <span className="text-primary">orchestrated</span> by agents.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Sentient runs market research, competitor analysis, lead scoring, audits, and outreach
              end-to-end — so your team ships strategy, not spreadsheets.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/dashboard">
                <Button size="lg" className="gap-2 shadow-[var(--shadow-elegant)]">
                  Start Analysis <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a href="#how">
                <Button size="lg" variant="outline">See how it works</Button>
              </a>
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-muted-foreground">
              {["SOC 2 ready", "EU data residency", "Human-in-the-loop"].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-primary" /> {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-border/60 bg-background py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-primary">Capabilities</p>
            <h2 className="mt-2 font-display text-3xl font-semibold md:text-4xl">
              A team of agents, each an expert.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Every agent owns a slice of the pipeline and hands off context to the next — no prompt
              gymnastics required.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Card key={f.title} className="group border-border/70 p-6 transition hover:border-primary/40 hover:shadow-[var(--shadow-card)]">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent text-primary">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-t border-border/60 bg-secondary/40 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-primary">How it works</p>
            <h2 className="mt-2 font-display text-3xl font-semibold md:text-4xl">
              From prompt to plan in minutes.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="rounded-xl border border-border bg-card p-6">
                <div className="font-display text-3xl font-semibold text-primary">{s.n}</div>
                <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/60 py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div
            className="overflow-hidden rounded-3xl p-12 text-center text-primary-foreground md:p-16"
            style={{ background: "var(--gradient-hero)" }}
          >
            <FileBarChart className="mx-auto h-10 w-10 opacity-90" />
            <h2 className="mt-4 font-display text-3xl font-semibold md:text-4xl">
              Ready to put your pipeline on autopilot?
            </h2>
            <p className="mx-auto mt-3 max-w-xl opacity-90">
              Launch your first multi-agent analysis. No credit card required.
            </p>
            <div className="mt-8">
              <Link to="/dashboard">
                <Button size="lg" variant="secondary" className="gap-2">
                  Start Analysis <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/60 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 text-sm text-muted-foreground md:flex-row">
          <span>© {new Date().getFullYear()} Sentient AI</span>
          <span>Built for go-to-market teams.</span>
        </div>
      </footer>
    </div>
  );
}
