import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";

const logLines = [
  "[MASTER] Spawning DocumentationAgent:v2...",
  "[DOCS] Extracting dependency graph (2,143 nodes)...",
  "[DOCS] Building call trees for 431 entrypoints...",
  "[MASTER] Spawning AnalysisAgent:v3...",
  "[ANALYZE] Hotspots: 17 | Cycles: 3 | TechDebtScore: 72",
  "[MASTER] Spawning MigrationAgent:v1...",
  "[MIGRATE] Upgrading React 16 -> 18, Webpack -> Vite, ESLint -> Biome...",
  "[MASTER] Spawning ReviewAgent:v2...",
  "[REVIEW] 12 suggestions | 3 blockers | 9 auto-fixes applied",
  "[MASTER] Spawning TestGenAgent:v4...",
  "[TEST] Generated 126 tests | Coverage: 81% -> 91%",
  "[MASTER] Pipeline complete in 07m:42s ✅",
];

export default function LiveConsole() {
  const [lines, setLines] = useState<string[]>([]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setLines((l) => (i < logLines.length ? [...l, logLines[i++]] : l));
    }, 600);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  return (
    <section id="insights" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16">
      <Card className="border-border/60 bg-gradient-to-br from-background to-muted/40">
        <CardHeader>
          <CardTitle>Live orchestration console</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="font-mono text-xs bg-black/90 text-emerald-200 rounded-lg p-4 h-64 overflow-auto border border-emerald-500/20">
            {lines.map((l, i) => (
              <div key={i} className="whitespace-pre-wrap">{"> "}{l}</div>
            ))}
            <div ref={endRef} />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
