import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { GitBranch, BookOpen, Settings2, ShieldCheck, TestTube } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const steps = [
  { icon: BookOpen, label: "Docs: Graphs & Call Trees", color: "from-sky-400/30 to-sky-500/10" },
  { icon: Settings2, label: "Analysis: Strengths & Risks", color: "from-amber-400/30 to-amber-500/10" },
  { icon: GitBranch, label: "Migration: Latest Frameworks", color: "from-violet-400/30 to-violet-500/10" },
  { icon: ShieldCheck, label: "Review: Automated PR Checks", color: "from-emerald-400/30 to-emerald-500/10" },
  { icon: TestTube, label: "Unit Tests: Coverage Boost", color: "from-fuchsia-400/30 to-fuchsia-500/10" },
];

export default function OrchestrationGraph() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % steps.length), 1800);
    return () => clearInterval(t);
  }, []);

  const positions = useMemo(() => [
    { top: "8%", left: "55%" },
    { top: "20%", left: "82%" },
    { top: "50%", left: "88%" },
    { top: "75%", left: "62%" },
    { top: "35%", left: "60%" },
  ], []);

  return (
    <div className="relative">
      <Card className="bg-gradient-to-br from-background to-muted/40 border-border/60">
        <CardContent className="p-6">
          <div className="relative h-[380px]">
            <div className="absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.15),transparent_40%),radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.15),transparent_45%)]"/>

            <div className="absolute left-8 top-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="size-16 rounded-xl bg-gradient-to-br from-brand to-brand-2 shadow-lg ring-1 ring-white/10 animate-pulse" />
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">Master Agent</span>
              </div>
            </div>

            {steps.map((s, i) => {
              const Icon = s.icon;
              const pos = positions[i];
              const isActive = i === active;
              return (
                <div key={s.label} className="absolute" style={pos as any}>
                  <div className={`relative rounded-xl border bg-background/70 backdrop-blur px-3 py-2 shadow-sm ${isActive ? "ring-2 ring-brand/60" : ""}`}>
                    <div className="flex items-center gap-2">
                      <span className={`size-8 rounded-md bg-gradient-to-br ${s.color} flex items-center justify-center`}>
                        <Icon className="size-4 text-foreground" />
                      </span>
                      <span className="text-xs font-medium whitespace-nowrap">{s.label}</span>
                    </div>
                    {isActive && (
                      <Badge className="absolute -top-3 -right-3 bg-brand text-white border-none">Active</Badge>
                    )}
                  </div>
                </div>
              );
            })}

            {steps.map((_, i) => (
              <svg key={i} className="absolute inset-0">
                <defs>
                  <linearGradient id={`g-${i}`} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="hsl(var(--brand))" />
                    <stop offset="100%" stopColor="hsl(var(--brand-2))" />
                  </linearGradient>
                </defs>
                <line x1="88" y1="50%" x2="62%" y2="50%" stroke={`url(#g-${i})`} strokeWidth="1" opacity="0.35" />
              </svg>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
