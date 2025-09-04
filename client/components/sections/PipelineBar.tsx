import { useEffect } from "react";

export type Stage = {
  id: string;
  label: string;
  short: string;
};

export const STAGES: Stage[] = [
  { id: "legacy", label: "Legacy Code", short: "Legacy" },
  { id: "docs", label: "Documentation Agent", short: "Docs" },
  { id: "analysis", label: "Analysis Agent", short: "Analysis" },
  { id: "migration", label: "Migration Agent", short: "Migration" },
  { id: "review", label: "Review Agent", short: "Review" },
  { id: "tests", label: "Unit Test Agent", short: "Tests" },
  { id: "output", label: "Final Output", short: "Output" },
];

export default function PipelineBar({
  active,
  onSelect,
}: {
  active: string;
  onSelect: (id: string) => void;
}) {
  useEffect(() => {
    // subtle entrance animation class handled via Tailwind in markup
  }, []);

  return (
    <div className="w-full bg-background/60 rounded-lg p-4 border border-border/60">
      <div className="flex items-center gap-4 overflow-x-auto">
        {STAGES.map((s, idx) => {
          const isActive = s.id === active;
          const completedIndex = STAGES.findIndex((st) => st.id === active);
          const completed = idx < completedIndex;
          return (
            <button
              key={s.id}
              onClick={() => onSelect(s.id)}
              className={`flex items-center gap-3 min-w-[160px] px-4 py-3 rounded-lg transition-all duration-300 hover:scale-[1.02] whitespace-nowrap ${isActive ? "bg-gradient-to-r from-brand to-brand-2 text-white shadow-lg" : completed ? "bg-card" : "bg-background"}`}
              aria-current={isActive}
            >
              <div className={`w-3 h-3 rounded-full ${isActive ? "bg-white/80 ring-2 ring-white/20" : completed ? "bg-emerald-400" : "bg-slate-300"}`} />
              <div className="text-left">
                <div className="text-sm font-semibold">{s.label}</div>
                <div className="text-xs text-muted-foreground">{s.short}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
