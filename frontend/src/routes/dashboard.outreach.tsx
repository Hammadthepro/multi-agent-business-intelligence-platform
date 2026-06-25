import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { generateOutreach } from "@/lib/api";
import { Loader2, Mail, Linkedin, Repeat, Copy, Sparkles } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/outreach")({
  component: OutreachPage,
});

interface OutreachState {
  coldEmail: string;
  linkedinMessage: string;
  followUp: string;
}

function OutreachPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<OutreachState | null>(null);

  async function generate() {
    setLoading(true);
    try {
      const r = await generateOutreach({
        businessType: "B2B SaaS",
        targetMarket: "EU mid-market",
        industry: "Software & SaaS",
      });
      setData(r);
    } finally {
      setLoading(false);
    }
  }

  function copy(s: string) {
    navigator.clipboard.writeText(s);
    toast.success("Copied to clipboard");
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 md:p-6">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:justify-between">
        <div className="min-w-0">
          <h1 className="font-display text-2xl font-semibold tracking-tight">Outreach generator</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Cold email, LinkedIn message, and follow-up — all editable.
          </p>
        </div>
        <Button onClick={generate} disabled={loading} className="gap-2">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          Generate
        </Button>
      </header>

      <div className="grid gap-4 lg:grid-cols-3">
        <OutreachCard
          title="Cold email"
          icon={<Mail className="h-4 w-4" />}
          value={data?.coldEmail ?? ""}
          loading={loading}
          onChange={(v) => setData((d) => (d ? { ...d, coldEmail: v } : d))}
          onCopy={copy}
        />
        <OutreachCard
          title="LinkedIn message"
          icon={<Linkedin className="h-4 w-4" />}
          value={data?.linkedinMessage ?? ""}
          loading={loading}
          onChange={(v) => setData((d) => (d ? { ...d, linkedinMessage: v } : d))}
          onCopy={copy}
        />
        <OutreachCard
          title="Follow-up email"
          icon={<Repeat className="h-4 w-4" />}
          value={data?.followUp ?? ""}
          loading={loading}
          onChange={(v) => setData((d) => (d ? { ...d, followUp: v } : d))}
          onCopy={copy}
        />
      </div>
    </div>
  );
}

function OutreachCard({
  title,
  icon,
  value,
  loading,
  onChange,
  onCopy,
}: {
  title: string;
  icon: React.ReactNode;
  value: string;
  loading: boolean;
  onChange: (v: string) => void;
  onCopy: (v: string) => void;
}) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="grid h-7 w-7 place-items-center rounded-md bg-accent text-primary">{icon}</div>
          <CardTitle className="text-sm font-semibold">{title}</CardTitle>
        </div>
        <CardDescription>Editable draft</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3">
        {loading ? (
          <div className="space-y-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-3 w-full animate-pulse rounded bg-muted" />
            ))}
          </div>
        ) : (
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Click Generate to draft a message…"
            className="min-h-[260px] font-mono text-xs leading-relaxed"
          />
        )}
        <div className="flex justify-end">
          <Button size="sm" variant="outline" onClick={() => onCopy(value)} disabled={!value} className="gap-1.5">
            <Copy className="h-3.5 w-3.5" /> Copy
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
