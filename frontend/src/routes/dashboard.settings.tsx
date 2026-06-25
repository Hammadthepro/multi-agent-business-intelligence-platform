import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/dashboard/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 p-4 md:p-6">
      <header>
        <h1 className="font-display text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Workspace and agent preferences.</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Workspace</CardTitle>
          <CardDescription>Visible to your team.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2 sm:grid-cols-[200px_1fr] sm:items-center">
            <Label htmlFor="ws">Workspace name</Label>
            <Input id="ws" defaultValue="Acme Inc." />
          </div>
          <div className="grid gap-2 sm:grid-cols-[200px_1fr] sm:items-center">
            <Label htmlFor="email">Contact email</Label>
            <Input id="email" type="email" defaultValue="ops@acme.com" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Agent defaults</CardTitle>
          <CardDescription>Controls how the agents behave.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ToggleRow label="Aggressive lead scoring" desc="Weight intent signals more heavily." defaultChecked />
          <Separator />
          <ToggleRow label="Auto-generate outreach" desc="Run the Outreach Agent on every pipeline completion." />
          <Separator />
          <ToggleRow label="Daily summary email" desc="Send a digest at 8am local time." defaultChecked />
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>Save changes</Button>
      </div>
    </div>
  );
}

function ToggleRow({ label, desc, defaultChecked }: { label: string; desc: string; defaultChecked?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}
