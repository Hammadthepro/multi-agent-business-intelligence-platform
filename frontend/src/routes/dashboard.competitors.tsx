import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchCompetitors, type Competitor } from "@/lib/api";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export const Route = createFileRoute("/dashboard/competitors")({
  component: CompetitorsPage,
});

const palette = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)", "var(--color-chart-4)", "var(--color-chart-5)"];

function CompetitorsPage() {
  const [data, setData] = useState<Competitor[] | null>(null);
  useEffect(() => {
    fetchCompetitors().then(setData);
  }, []);

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 md:p-6">
      <header>
        <h1 className="font-display text-2xl font-semibold tracking-tight">Competitor analysis</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Positioning, share, and weakness signals across the landscape.
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Market share</CardTitle>
            <CardDescription>Estimated, last 90 days.</CardDescription>
          </CardHeader>
          <CardContent className="h-[280px]">
            {!data ? <Skeleton className="h-full w-full" /> : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={data} dataKey="marketShare" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={2}>
                    {data.map((_, i) => <Cell key={i} fill={palette[i % palette.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <div className="grid gap-4 lg:col-span-2">
          {!data && Array.from({ length: 3 }).map((_, i) => <Card key={i}><CardContent className="p-5"><Skeleton className="h-20 w-full" /></CardContent></Card>)}
          {data?.map((c) => (
            <Card key={c.name}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="text-sm">{c.name}</CardTitle>
                  <Badge variant="secondary" className="font-mono">{c.marketShare}% share</Badge>
                </div>
              </CardHeader>
              <CardContent className="grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Strengths</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {c.strengths.map((s) => <Badge key={s} className="bg-success/15 text-success-foreground" variant="secondary">{s}</Badge>)}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Weaknesses</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {c.weaknesses.map((s) => <Badge key={s} className="bg-destructive/10 text-destructive" variant="secondary">{s}</Badge>)}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
