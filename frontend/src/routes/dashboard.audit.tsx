import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { runWebsiteAudit, type WebsiteAudit } from "@/lib/api";
import { Globe, Loader2, Smartphone, Gauge, ShieldCheck, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/audit")({
  component: AuditPage,
});

function AuditPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<WebsiteAudit | null>(null);

  async function run() {
    if (!url) return;
    setLoading(true);
    try {
      const result = await runWebsiteAudit(url);
      setData(result);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 md:p-6">
      <header>
        <h1 className="font-display text-2xl font-semibold tracking-tight">Website audit</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Grade any URL on SEO, mobile, performance, and security.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Run an audit</CardTitle>
          <CardDescription>Paste a full URL including https://</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
            <div className="space-y-1.5">
              <Label htmlFor="url">Website URL</Label>
              <Input
                id="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <Button onClick={run} disabled={loading || !url} className="gap-2">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Auditing…
                </>
              ) : (
                <>
                  <Globe className="h-4 w-4" /> Run audit
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ScoreCard label="SEO" icon={<Search className="h-4 w-4" />} value={data?.seoScore} loading={loading} />
        <ScoreCard label="Mobile" icon={<Smartphone className="h-4 w-4" />} value={data?.mobileScore} loading={loading} />
        <ScoreCard label="Performance" icon={<Gauge className="h-4 w-4" />} value={data?.performanceScore} loading={loading} />
        <ScoreCard label="Security" icon={<ShieldCheck className="h-4 w-4" />} value={data?.securityScore} loading={loading} />
      </div>

      {data && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Top issues</CardTitle>
            <CardDescription>{data.url}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {data.issues.map((i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-warning" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function ScoreCard({
  label,
  icon,
  value,
  loading,
}: {
  label: string;
  icon: React.ReactNode;
  value?: number;
  loading: boolean;
}) {
  const hasValue = typeof value === "number";
  const tone =
    !hasValue ? "text-muted-foreground" :
    value! >= 80 ? "text-primary" :
    value! >= 60 ? "text-warning-foreground" :
    "text-destructive";

  return (
    <Card className="border-border/70">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
          <div className="grid h-7 w-7 place-items-center rounded-md bg-accent text-primary">{icon}</div>
        </div>
        <div className="mt-3 flex items-end gap-1">
          <span className={cn("font-display text-4xl font-semibold tracking-tight", tone)}>
            {loading ? "…" : hasValue ? value : "—"}
          </span>
          {hasValue && <span className="mb-1.5 text-sm text-muted-foreground">/100</span>}
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: hasValue ? `${value}%` : "0%" }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
