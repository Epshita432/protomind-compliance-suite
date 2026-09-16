import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Building2, FileCheck2, Loader2, ScanLine, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Brand } from "@/components/Brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/services/authService";
import type { UserRole } from "@/types";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — ProtoMind Tender Compliance" },
      {
        name: "description",
        content:
          "Sign in to ProtoMind, the AI-powered tender compliance and risk intelligence platform for government procurement teams.",
      },
      { property: "og:title", content: "Sign in — ProtoMind Tender Compliance" },
      {
        property: "og:description",
        content:
          "From unstructured tender documents to explainable, auditable compliance intelligence.",
      },
    ],
  }),
  component: LoginPage,
});

const highlights = [
  {
    icon: ScanLine,
    title: "Document intelligence",
    text: "Extraction and classification of tender and bid documents.",
  },
  {
    icon: FileCheck2,
    title: "Rule-based validation",
    text: "Deterministic checks against every mandatory tender requirement.",
  },
  {
    icon: ShieldCheck,
    title: "Explainable outcomes",
    text: "Every finding traced to source document, page and rule applied.",
  },
];

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("officer@protomind.gov.in");
  const [password, setPassword] = useState("demo1234");
  const [pending, setPending] = useState<string | null>(null);

  const signIn = async (role: UserRole, key: string) => {
    setPending(key);
    await login(role);
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
      <div className="hidden flex-col justify-between border-r border-border bg-card px-12 py-10 lg:flex">
        <Brand size="md" />
        <div className="max-w-lg">
          <h2 className="text-3xl font-semibold leading-tight text-foreground">
            From unstructured tender documents to explainable, auditable compliance
            intelligence.
          </h2>
          <p className="mt-4 text-sm text-muted-foreground">
            ProtoMind reads bid submissions, matches them against tender requirements,
            applies validation rules and presents evidence-backed findings for
            procurement officer review.
          </p>
          <div className="mt-8 space-y-4">
            {highlights.map((h) => (
              <div key={h.title} className="flex gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-secondary">
                  <h.icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{h.title}</p>
                  <p className="text-sm text-muted-foreground">{h.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          AI assists. Rules validate. Human decides.
        </p>
      </div>

      <div className="flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-sm">
          <div className="lg:hidden">
            <Brand size="md" />
          </div>
          <div className="mt-8 lg:mt-0">
            <h1 className="text-2xl font-semibold tracking-[0.14em] text-foreground">
              PROTOMIND
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              AI-Powered Tender Compliance &amp; Risk Intelligence
            </p>
          </div>

          <form
            className="mt-8 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              void signIn("procurement_officer", "form");
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={pending !== null}>
              {pending === "form" && <Loader2 className="h-4 w-4 animate-spin" />}
              Sign In
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-wider text-muted-foreground">
            <span className="h-px flex-1 bg-border" />
            Demo access
            <span className="h-px flex-1 bg-border" />
          </div>

          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start"
              disabled={pending !== null}
              onClick={() => void signIn("procurement_officer", "officer")}
            >
              <ShieldCheck className="h-4 w-4" />
              Login as Procurement Officer
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              disabled={pending !== null}
              onClick={() => void signIn("bidder", "bidder")}
            >
              <Building2 className="h-4 w-4" />
              Login as Bidder
            </Button>
          </div>

          <p className="mt-6 text-xs text-muted-foreground">
            Demo Mode — authentication is mocked and all data is fictional.
          </p>
        </div>
      </div>
    </div>
  );
}
