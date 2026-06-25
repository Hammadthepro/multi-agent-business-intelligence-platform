import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchMarketOpportunities, type MarketOpportunity } from "@/lib/api";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export const Route = createFileRoute("/dashboard/market-research")({
  component: MarketResearchPage,
});

function MarketResearchPage() {
  const [data, setData] = useState<MarketOpportunity[] | null>(null);
  useEffect(() => {
    fetchMarketOpportunities().then(setData);
  }, []);

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 md:p-6">
      <header>
        <h1 className="font-display text-2xl font-semibold tracking-tight">Market research</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Opportunities surfaced by the Market Research Agent.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Opportunity scores</CardTitle>
          <CardDescription>Weighted by addressable market and competition.</CardDescription>
        </CardHeader>
        <CardContent className="h-[280px] pl-0">
          {!data ? (
            <div className="grid h-full place-items-center"><Skeleton className="h-32 w-full" /></div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="title" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} width={32} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="score" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {!data &&
          Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="space-y-3 p-5">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-2/3" />
              </CardContent>
            </Card>
          ))}
        {data?.map((o) => (
          <Card key={o.title}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-sm">{o.title}</CardTitle>
                <Badge variant="secondary" className="font-mono">{o.score}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{o.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
