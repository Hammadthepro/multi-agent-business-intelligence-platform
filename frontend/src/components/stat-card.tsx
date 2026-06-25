import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export function StatCard({
  label,
  value,
  delta,
  icon,
}: {
  label: string;
  value: string | number;
  delta?: number;
  icon: ReactNode;
}) {
  const up = (delta ?? 0) >= 0;
  return (
    <Card className="border-border/70">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="min-w-0">
            <p className="truncate text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {label}
            </p>
            <p className="mt-2 font-display text-3xl font-semibold tracking-tight">{value}</p>
          </div>
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent text-primary">
            {icon}
          </div>
        </div>
        {typeof delta === "number" && (
          <div
            className={cn(
              "mt-3 inline-flex items-center gap-1 text-xs font-medium",
              up ? "text-primary" : "text-destructive",
            )}
          >
            {up ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
            {up ? "+" : ""}
            {delta}% vs last week
          </div>
        )}
      </CardContent>
    </Card>
  );
}
