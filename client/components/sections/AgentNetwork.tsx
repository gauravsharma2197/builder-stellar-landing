import { useEffect, useState } from "react";
import { BookOpen, Settings2, GitBranch, ShieldCheck, TestTube } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const AGENTS = [
  { id: "docs", label: "Documentation", icon: BookOpen },
  { id: "analysis", label: "Analysis", icon: Settings2 },
  { id: "migration", label: "Migration", icon: GitBranch },
  { id: "review", label: "Review", icon: ShieldCheck },
  { id: "tests", label: "Tests", icon: TestTube },
];

export default function AgentNetwork({ active }: { active: string }) {
  const [events, setEvents] = useState<string[]>([]);
  const [agentStatus, setAgentStatus] = useState<Record<string, string>>(() => {
    const m: Record<string, string> = {};
    AGENTS.forEach((a) => (m[a.id] = "idle"));
    return m;
  });

  useEffect(() => {
    function onConsole(e: any) {
      const msg = e.detail as string;
      setEvents((s) => {
        const next = [...s, msg].slice(-20);
        return next;
      });
    }

    function onSelect(e: any) {
      const stage = e.detail?.stage as string;
      if (!stage) return;
      // set all to idle then mark active running
      setAgentStatus((prev) => {
        const next = { ...prev };
        Object.keys(next).forEach((k) => (next[k] = "idle"));
        if (next[stage] !== undefined) next[stage] = "running";
        return next;
      });
      setEvents((s) => [...s, `[UI] Focused ${stage}`].slice(-20));
    }

    function onStart(e: any) {
      setEvents((s) => [...s, `[MASTER] Orchestration initiated`].slice(-20));
    }

    function onRunStats(e: any) {
      const payload = e.detail || {};
      setEvents((s) => [...s, `[STATS] ${JSON.stringify(payload)}`].slice(-20));
    }

    window.addEventListener("console-log", onConsole as EventListener);
    window.addEventListener("select-stage", onSelect as EventListener);
    window.addEventListener("orchestration-start", onStart as EventListener);
    window.addEventListener("run-stats", onRunStats as EventListener);

    return () => {
      window.removeEventListener("console-log", onConsole as EventListener);
      window.removeEventListener("select-stage", onSelect as EventListener);
      window.removeEventListener("orchestration-start", onStart as EventListener);
      window.removeEventListener("run-stats", onRunStats as EventListener);
    };
  }, []);

  useEffect(() => {
    // When external 'active' prop changes, mirror it to statuses
    setAgentStatus((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((k) => (next[k] = k === active ? "running" : next[k] === "running" ? "completed" : next[k]));
      return next;
    });
  }, [active]);

  const handleViewLogs = () => {
    const el = document.getElementById("insights");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFocus = (id: string) => {
    window.dispatchEvent(new CustomEvent("select-stage", { detail: { stage: id } }));
    const el = document.getElementById("workflow");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full lg:w-[320px]">
      <div className="rounded-lg border border-border/60 bg-gradient-to-br from-background to-muted/40 p-4 h-[420px] flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-medium">Agent Activity Feed</div>
          <button onClick={handleViewLogs} className="text-xs text-muted-foreground underline">View logs</button>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="space-y-3 mb-4">
            {AGENTS.map((a) => {
              const StatusIcon = a.icon;
              const status = agentStatus[a.id] || "idle";
              return (
                <div key={a.id} className="flex items-center justify-between gap-2 p-2 rounded hover:bg-background/50">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-md flex items-center justify-center ${status === "running" ? "bg-gradient-to-br from-brand to-brand-2 text-white shadow" : "bg-white/60"}`}>
                      <StatusIcon className={`${status === "running" ? "text-white" : "text-muted-foreground"} size-5`} />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{a.label}</div>
                      <div className="text-xs text-muted-foreground">{status === "running" ? "Running" : status === "completed" ? "Completed" : "Idle"}</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge variant={status === "running" ? "default" : "outline"} className={status === "running" ? "bg-brand text-white" : ""}>{status === "running" ? "Active" : status === "completed" ? "Done" : "Idle"}</Badge>
                    <button onClick={() => handleFocus(a.id)} className="text-xs text-muted-foreground underline">Focus</button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-2">
            <div className="text-xs text-muted-foreground mb-2">Recent events</div>
            <div className="bg-black/90 text-emerald-200 p-3 rounded h-36 overflow-auto text-xs font-mono">
              {events.length === 0 ? <div className="text-muted-foreground">No events yet.</div> : events.map((ev, i) => <div key={i} className="whitespace-pre-wrap">{ev}</div>)}
            </div>
          </div>
        </div>

        <div className="mt-3 text-xs text-muted-foreground">Quick actions: focus an agent or view full logs</div>
      </div>
    </div>
  );
}
