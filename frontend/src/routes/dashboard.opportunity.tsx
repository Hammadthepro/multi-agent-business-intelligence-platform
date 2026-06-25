import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from "recharts";

export const Route = createFileRoute("/dashboard/opportunity")({
  component: OpportunityPage,
});

const data = [
  { axis: "Fit", value: 88 },
  { axis: "Intent", value: 74 },
  { axis: "Budget", value: 81 },
  { axis: "Timing", value: 68 },
  { axis: "Engagement", value: 79 },
  { axis: "Reach", value: 85 },
];

function OpportunityPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 md:p-6">
      <header>
        <h1 className="font-display text-2xl font-semibold tracking-tight">Opportunity scoring</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Composite signal across fit, intent, budget, timing, engagement, and reach.
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Signal radar</CardTitle>
            <CardDescription>Aggregated across the current portfolio.</CardDescription>
          </CardHeader>
          <CardContent className="h-[340px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={data}>
                <PolarGrid stroke="var(--color-border)" />
                <PolarAngleAxis dataKey="axis" tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} />
                <PolarRadiusAxis tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }} angle={30} domain={[0, 100]} />
                <Radar dataKey="value" stroke="var(--color-primary)" fill="var(--color-primary)" fillOpacity={0.3} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Average score</CardTitle>
            <CardDescription>Across 124 accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-1">
              <span className="font-display text-6xl font-semibold tracking-tight text-primary">79.2</span>
              <span className="mb-2 text-sm text-muted-foreground">/100</span>
            </div>
            <div className="mt-6 space-y-3">
              {data.map((d) => (
                <div key={d.axis}>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{d.axis}</span>
                    <span className="font-mono">{d.value}</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className="h-full bg-primary" style={{ width: `${d.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
