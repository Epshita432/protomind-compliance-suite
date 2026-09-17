import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { AppLayout } from "@/layouts/AppLayout";
import { getCurrentUser } from "@/services/authService";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — ProtoMind" },
      {
        name: "description",
        content:
          "Profile, organization, notification and analysis preferences including risk threshold information.",
      },
      { property: "og:title", content: "Settings — ProtoMind" },
      {
        property: "og:description",
        content: "Profile, organization, notification and analysis preferences.",
      },
    ],
  }),
  component: SettingsPage,
});

const thresholds = [
  { label: "Low risk", range: "0 – 29", tone: "text-success" },
  { label: "Medium risk", range: "30 – 59", tone: "text-warning" },
  { label: "High risk", range: "60 – 100", tone: "text-danger" },
];

function SettingsPage() {
  const user = getCurrentUser();
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [reviewAlerts, setReviewAlerts] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [autoFlag, setAutoFlag] = useState(true);
  const [strictNumeric, setStrictNumeric] = useState(true);

  return (
    <AppLayout>
      <PageHeader
        eyebrow="Workspace"
        title="Settings"
        subtitle="Profile, organization and analysis preferences."
        actions={
          <Button onClick={() => toast.success("Preferences saved for this session.")}>
            Save changes
          </Button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="card-surface p-5">
          <h2 className="text-sm font-semibold text-foreground">Profile</h2>
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" defaultValue={user.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={user.email} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input id="role" defaultValue={user.roleLabel} readOnly />
            </div>
          </div>
        </section>

        <section className="card-surface p-5">
          <h2 className="text-sm font-semibold text-foreground">Organization</h2>
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="org">Organization</Label>
              <Input id="org" defaultValue={user.organization} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dept">Procurement unit</Label>
              <Input id="dept" defaultValue="IT Hardware Procurement Cell" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tz">Time zone</Label>
              <Input id="tz" defaultValue="Asia/Kolkata (IST)" />
            </div>
          </div>
        </section>

        <section className="card-surface p-5">
          <h2 className="text-sm font-semibold text-foreground">
            Notification preferences
          </h2>
          <div className="mt-4 space-y-4">
            {[
              {
                id: "alerts",
                label: "Email me when an analysis completes",
                state: emailAlerts,
                set: setEmailAlerts,
              },
              {
                id: "review",
                label: "Alert me on review-required findings",
                state: reviewAlerts,
                set: setReviewAlerts,
              },
              {
                id: "digest",
                label: "Weekly compliance digest",
                state: weeklyDigest,
                set: setWeeklyDigest,
              },
            ].map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-4">
                <Label htmlFor={item.id} className="font-normal text-muted-foreground">
                  {item.label}
                </Label>
                <Switch id={item.id} checked={item.state} onCheckedChange={item.set} />
              </div>
            ))}
          </div>
        </section>

        <section className="card-surface p-5">
          <h2 className="text-sm font-semibold text-foreground">Analysis preferences</h2>
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <Label htmlFor="autoflag" className="font-normal text-muted-foreground">
                Flag semantic findings below 80% confidence for human review
              </Label>
              <Switch id="autoflag" checked={autoFlag} onCheckedChange={setAutoFlag} />
            </div>
            <div className="flex items-center justify-between gap-4">
              <Label htmlFor="strict" className="font-normal text-muted-foreground">
                Strict numeric validation (no tolerance margin)
              </Label>
              <Switch
                id="strict"
                checked={strictNumeric}
                onCheckedChange={setStrictNumeric}
              />
            </div>
          </div>

          <div className="mt-6 border-t border-border pt-4">
            <h3 className="text-sm font-semibold text-foreground">Risk thresholds</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Composite risk scores are banded as follows. Thresholds are fixed in Demo
              Mode.
            </p>
            <ul className="mt-3 space-y-2">
              {thresholds.map((t) => (
                <li
                  key={t.label}
                  className="flex items-center justify-between rounded-md border border-border px-3 py-2 text-sm"
                >
                  <span className={t.tone}>{t.label}</span>
                  <span className="num text-muted-foreground">{t.range}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        AI assists. Rules validate. Human decides — final procurement determinations are
        always recorded against a named officer.
      </p>
    </AppLayout>
  );
}
