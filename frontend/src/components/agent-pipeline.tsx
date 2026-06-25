import type { AgentStatus } from "@/lib/api";
import { Check, Loader2, AlertCircle, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AgentNode {
  id: string;
  name: string;
  status: AgentStatus;
}

export function AgentPipeline({ agents }: { agents: AgentNode[] }) {
  return (
    <ol className="space-y-2">
      {agents.map((a, i) => (
        <li key={a.id} className="relative">
          <div
            className={cn(
              "flex items-center gap-3 rounded-lg border bg-card p-3 transition",
              a.status === "running" && "border-primary/50 shadow-[var(--shadow-card)]",
              a.status === "complete" && "border-border",
              a.status === "error" && "border-destructive/50",
              a.status === "idle" && "border-border opacity-70",
            )}
          >
            <StatusIcon status={a.status} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{a.name}</p>
              <p className="truncate text-xs text-muted-foreground">{labelFor(a.status)}</p>
            </div>
            <span className="hidden text-xs font-mono text-muted-foreground sm:inline">
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>
          {i < agents.length - 1 && (
            <div className="ml-5 h-3 w-px bg-border" aria-hidden />
          )}
        </li>
      ))}
    </ol>
  );
}

function StatusIcon({ status }: { status: AgentStatus }) {
  const base = "grid h-7 w-7 shrink-0 place-items-center rounded-full";
  if (status === "running")
    return (
      <div className={cn(base, "bg-primary/10 text-primary")}>
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      </div>
    );
  if (status === "complete")
    return (
      <div className={cn(base, "bg-success/15 text-success-foreground")}>
        <Check className="h-3.5 w-3.5" />
      </div>
    );
  if (status === "error")
    return (
      <div className={cn(base, "bg-destructive/10 text-destructive")}>
        <AlertCircle className="h-3.5 w-3.5" />
      </div>
    );
  return (
    <div className={cn(base, "bg-muted text-muted-foreground")}>
      <Circle className="h-3 w-3" />
    </div>
  );
}

function labelFor(s: AgentStatus) {
  switch (s) {
    case "running":
      return "Running…";
    case "complete":
      return "Complete";
    case "error":
      return "Failed";
    default:
      return "Queued";
  }
}
