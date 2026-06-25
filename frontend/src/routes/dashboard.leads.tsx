import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { fetchLeads, type Lead } from "@/lib/api";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/leads")({
  component: LeadsPage,
});

const statusStyle: Record<Lead["status"], string> = {
  new: "bg-accent text-primary",
  contacted: "bg-warning/15 text-warning-foreground",
  qualified: "bg-primary/10 text-primary",
  converted: "bg-success/20 text-success-foreground",
};

function LeadsPage() {
  const [data, setData] = useState<Lead[] | null>(null);
  const [q, setQ] = useState("");

  useEffect(() => {
    fetchLeads().then(setData);
  }, []);

  const filtered = useMemo(() => {
    if (!data) return null;
    if (!q) return data;
    const s = q.toLowerCase();
    return data.filter((l) =>
      [l.company, l.website, l.industry, l.location].some((v) => v.toLowerCase().includes(s)),
    );
  }, [data, q]);

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 md:p-6">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:justify-between">
        <div className="min-w-0">
          <h1 className="font-display text-2xl font-semibold tracking-tight">Lead management</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Accounts surfaced by the Lead Generation Agent.
          </p>
        </div>
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search leads…"
            className="pl-8"
          />
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Leads</CardTitle>
          <CardDescription>{filtered ? `${filtered.length} accounts` : "Loading…"}</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Website</TableHead>
                  <TableHead>Industry</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Opportunity</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {!filtered &&
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      {Array.from({ length: 6 }).map((_, j) => (
                        <TableCell key={j}>
                          <Skeleton className="h-4 w-24" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                {filtered?.map((l) => (
                  <TableRow key={l.id}>
                    <TableCell className="font-medium">{l.company}</TableCell>
                    <TableCell className="text-muted-foreground">{l.website}</TableCell>
                    <TableCell>{l.industry}</TableCell>
                    <TableCell className="text-muted-foreground">{l.location}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full bg-primary"
                            style={{ width: `${l.opportunityScore}%` }}
                          />
                        </div>
                        <span className="font-mono text-xs">{l.opportunityScore}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("capitalize", statusStyle[l.status])} variant="secondary">
                        {l.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
