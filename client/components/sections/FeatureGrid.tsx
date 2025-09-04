import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, GitBranch, Settings2, ShieldCheck, TestTube, Workflow } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Documentation Generation",
    desc: "Dependency graphs, call trees, architectural blueprints extracted from legacy codebases.",
    color: "from-sky-500/15 to-sky-600/10",
  },
  {
    icon: Settings2,
    title: "Code Analysis",
    desc: "Strengths, anti-patterns, risks and modernization recommendations with clear rationale.",
    color: "from-amber-500/15 to-amber-600/10",
  },
  {
    icon: GitBranch,
    title: "Automated Migration",
    desc: "Upgrade to latest frameworks and SDKs with guided refactors and safety checks.",
    color: "from-violet-500/15 to-violet-600/10",
  },
  {
    icon: ShieldCheck,
    title: "AI Code Review",
    desc: "Policy-aware reviews with security, performance and style guards baked-in.",
    color: "from-emerald-500/15 to-emerald-600/10",
  },
  {
    icon: TestTube,
    title: "Unit Test Synthesis",
    desc: "Deterministic test generation with fixtures and coverage tracking.",
    color: "from-fuchsia-500/15 to-fuchsia-600/10",
  },
  {
    icon: Workflow,
    title: "Master Agent Orchestration",
    desc: "Composable pipelines coordinating specialist agents with retries and guards.",
    color: "from-cyan-500/15 to-cyan-600/10",
  },
];

export default function FeatureGrid() {
  return (
    <section id="platform" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tight">Built for enterprise-scale modernization</h2>
        <p className="mt-3 text-muted-foreground">Demonstrate end-to-end capabilities at your CXO conference with a clear, visual narrative.</p>
      </div>
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map(({ icon: Icon, title, desc, color }) => {
          // map feature titles to pipeline stage ids
          const stageMap: Record<string, string> = {
            "Documentation Generation": "docs",
            "Code Analysis": "analysis",
            "Automated Migration": "migration",
            "AI Code Review": "review",
            "Unit Test Synthesis": "tests",
            "Master Agent Orchestration": "output",
          };
          const stage = stageMap[title] ?? "legacy";
          return (
            <button
              key={title}
              onClick={() => window.dispatchEvent(new CustomEvent("select-stage", { detail: { stage } }))}
              className="text-left"
            >
              <Card className="border-border/60 bg-gradient-to-br from-background to-muted/40 hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className={`size-10 rounded-md bg-gradient-to-br ${color} flex items-center justify-center mb-4`}>
                    <Icon className="size-5" />
                  </div>
                  <CardTitle className="text-lg">{title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0 text-sm text-muted-foreground">{desc}</CardContent>
              </Card>
            </button>
          );
        })}
      </div>
    </section>
  );
}
