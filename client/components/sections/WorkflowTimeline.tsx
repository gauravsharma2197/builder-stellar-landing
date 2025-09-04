import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Settings2, GitBranch, ShieldCheck, TestTube } from "lucide-react";
import { useEffect, useState } from "react";

const steps = [
  { title: "Documentation", icon: BookOpen, detail: "Dependency graph + call tree synthesis" },
  { title: "Analysis", icon: Settings2, detail: "Strengths, weaknesses, hotspots" },
  { title: "Migration", icon: GitBranch, detail: "Refactors + framework upgrades" },
  { title: "Review", icon: ShieldCheck, detail: "Automated PR review and gating" },
  { title: "Unit Tests", icon: TestTube, detail: "Test generation + coverage" },
];

export default function WorkflowTimeline() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % steps.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="workflow" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16">
      <Card className="border-border/60 bg-gradient-to-br from-background to-muted/40">
        <CardHeader>
          <CardTitle>Orchestrated workflow</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="relative border-l border-border/60 ml-3">
            {steps.map(({ title, icon: Icon, detail }, i) => (
              <li key={title} className="mb-8 ml-6">
                <span className={`absolute -left-3.5 flex size-6 items-center justify-center rounded-full ring-4 ring-background ${i === active ? "bg-gradient-to-r from-brand to-brand-2" : "bg-muted"}`}>
                  <Icon className="size-3.5 text-white" />
                </span>
                <h3 className="flex items-center gap-2 font-medium">
                  {title}
                  {i === active && (
                    <Badge className="bg-brand text-white border-none animate-pulse">In progress</Badge>
                  )}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{detail}</p>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </section>
  );
}
