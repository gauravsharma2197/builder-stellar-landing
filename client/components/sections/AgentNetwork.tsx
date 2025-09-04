import { useMemo } from "react";
import { BookOpen, Settings2, GitBranch, ShieldCheck, TestTube } from "lucide-react";

const AGENTS = [
  { id: "docs", label: "Documentation", icon: BookOpen },
  { id: "analysis", label: "Analysis", icon: Settings2 },
  { id: "migration", label: "Migration", icon: GitBranch },
  { id: "review", label: "Review", icon: ShieldCheck },
  { id: "tests", label: "Tests", icon: TestTube },
];

export default function AgentNetwork({ active }: { active: string }) {
  const positions = useMemo(() => {
    const base = [
      { x: 40, y: 18 },
      { x: 80, y: 40 },
      { x: 64, y: 78 },
      { x: 24, y: 82 },
      { x: 6, y: 48 },
    ];
    return base;
  }, []);

  return (
    <div className="w-[300px] hidden lg:block">
      <div className="relative rounded-lg border border-border/60 bg-gradient-to-br from-background to-muted/40 p-4 h-[420px]">
        <svg className="absolute inset-0 w-full h-full">
          {/* subtle background grid */}
          <defs>
            <linearGradient id="gline" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(99,102,241,0.06)" />
              <stop offset="100%" stopColor="rgba(56,189,248,0.04)" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="size-20 rounded-full bg-gradient-to-br from-brand to-brand-2 flex items-center justify-center shadow-lg ring-4 ring-white/5">
            <div className="size-8 rounded-full bg-white/6 flex items-center justify-center text-white font-semibold">MA</div>
          </div>
          <div className="mt-2 text-sm font-medium">Master Agent</div>
        </div>

        {AGENTS.map((a, i) => {
          const Icon = a.icon;
          const pos = positions[i];
          const isActive = a.id === active;
          return (
            <div
              key={a.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            >
              <div className={`flex flex-col items-center gap-2 ${isActive ? "animate-pulse" : ""}`}>
                <div className={`size-12 rounded-full flex items-center justify-center border border-border/40 ${isActive ? "bg-gradient-to-br from-brand to-brand-2 text-white shadow-xl" : "bg-white/60"}`}>
                  <Icon className={`${isActive ? "text-white" : "text-muted-foreground"} size-5`} />
                </div>
                <div className="text-xs text-center">{a.label}</div>
              </div>
            </div>
          );
        })}

        {/* glowing connections */}
        {AGENTS.map((a, i) => {
          const pos = positions[i];
          const x1 = 50; // center percent
          const y1 = 50;
          const x2 = pos.x;
          const y2 = pos.y;
          const isActive = a.id === active;
          return (
            <svg key={`conn-${a.id}`} className="absolute inset-0 pointer-events-none">
              <line
                x1={`${x1}%`}
                y1={`${y1}%`}
                x2={`${x2}%`}
                y2={`${y2}%`}
                stroke={isActive ? "url(#connGradient)" : "rgba(120,120,120,0.06)"}
                strokeWidth={isActive ? 3 : 1}
                strokeLinecap="round"
                style={{ transition: "stroke 300ms, stroke-width 300ms" }}
              />
              <defs>
                <linearGradient id="connGradient">
                  <stop offset="0%" stopColor="hsl(var(--brand))" />
                  <stop offset="100%" stopColor="hsl(var(--brand-2))" />
                </linearGradient>
              </defs>
            </svg>
          );
        })}
      </div>
    </div>
  );
}
