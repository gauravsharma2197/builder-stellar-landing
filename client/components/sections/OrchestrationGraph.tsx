import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { GitBranch, BookOpen, Settings2, ShieldCheck, TestTube } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const steps = [
  { id: 'docs', icon: BookOpen, label: "Documentation" },
  { id: 'analysis', icon: Settings2, label: "Analysis" },
  { id: 'migration', icon: GitBranch, label: "Migration" },
  { id: 'review', icon: ShieldCheck, label: "Review" },
  { id: 'tests', icon: TestTube, label: "Tests" },
];

export default function OrchestrationGraph() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % steps.length), 2000);
    function onSelect(e: any) {
      const s = e.detail?.stage as string;
      if (!s) return;
      const idx = steps.findIndex((p) => p.id === s);
      if (idx >= 0) setActive(idx);
    }
    window.addEventListener('select-stage', onSelect as EventListener);
    return () => { clearInterval(t); window.removeEventListener('select-stage', onSelect as EventListener); };
  }, []);

  const center = { x: 200, y: 200 };
  const radius = 120;
  const N = steps.length;

  const points = useMemo(() => {
    return steps.map((_, i) => {
      const angle = (Math.PI * 2 * i) / N - Math.PI / 2; // start at top
      return {
        x: center.x + Math.cos(angle) * radius,
        y: center.y + Math.sin(angle) * radius,
        angle,
      };
    });
  }, []);

  return (
    <div className="relative">
      <Card className="bg-gradient-to-br from-background to-muted/40 border-border/60">
        <CardContent className="p-6">
          <div className="relative w-[420px] h-[420px] mx-auto">
            <svg viewBox="0 0 400 400" className="w-full h-full">
              <defs>
                <linearGradient id="segGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--brand))" />
                  <stop offset="100%" stopColor="hsl(var(--brand-2))" />
                </linearGradient>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* outer tick marks */}
              {points.map((p, i) => (
                <line key={i} x1={center.x} y1={center.y} x2={p.x} y2={p.y} stroke={i === active ? "url(#segGrad)" : "#e6eefb"} strokeWidth={i === active ? 3 : 1} strokeLinecap="round" />
              ))}

              {/* segment arcs (visual only) */}
              {points.map((p, i) => {
                const start = points[i];
                const end = points[(i + 1) % N];
                const large = 0;
                const path = `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${large} 1 ${end.x} ${end.y}`;
                return (
                  <path key={`seg-${i}`} d={path} fill="none" stroke={i === active ? "url(#segGrad)" : "rgba(120,130,150,0.06)"} strokeWidth={i === active ? 6 : 2} strokeLinecap="round" filter={i === active ? "url(#glow)" : undefined} />
                );
              })}

              {/* center master agent */}
              <circle cx={center.x} cy={center.y} r={34} fill="url(#segGrad)" className="shadow-lg" />
              <text x={center.x} y={center.y + 6} textAnchor="middle" fontSize={18} fill="#fff" fontWeight={700}>MA</text>

              {/* agent icons */}
              {points.map((p, i) => {
                const Icon = steps[i].icon;
                const groupX = p.x;
                const groupY = p.y;
                return (
                  <g key={i} transform={`translate(${groupX - 18}, ${groupY - 18})`}>
                    <rect x={0} y={0} width={36} height={36} rx={8} fill={i === active ? "url(#segGrad)" : "#fff"} stroke={i === active ? "none" : "#eef3fb"} />
                    {/* Using foreignObject for rendering svg icon not straightforward; instead use simple circle and label */}
                    <text x={18} y={22} textAnchor="middle" fontSize={12} fill={i === active ? "#fff" : "#111827"}>{steps[i].label}</text>
                  </g>
                );
              })}
            </svg>

            {/* labels under center */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-[92%] text-center">
              <div className="text-xs text-muted-foreground">Master Agent</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
