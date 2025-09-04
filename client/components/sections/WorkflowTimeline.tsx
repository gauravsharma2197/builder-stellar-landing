import { useState, useEffect, useRef } from "react";
import PipelineBar from "@/components/sections/PipelineBar";
import AgentNetwork from "@/components/sections/AgentNetwork";
import StepPanels from "@/components/sections/StepPanels";

const SEQUENCE = ["legacy", "docs", "analysis", "migration", "review", "tests", "output"];

export default function WorkflowTimeline() {
  const [active, setActive] = useState<string>("legacy");
  const orchestrating = useRef(false);

  useEffect(() => {
    function onSelect(e: any) {
      const stage = e.detail?.stage as string;
      if (stage) setActive(stage);
    }
    function onStart(e: any) {
      const payload = e.detail || {};
      // begin orchestration simulation
      if (orchestrating.current) return;
      orchestrating.current = true;
      setActive("legacy");
      // clear console
      window.dispatchEvent(new CustomEvent("console-log", { detail: `[MASTER] Orchestration started` }));
      let idx = 0;
      const t = setInterval(() => {
        const stage = SEQUENCE[idx];
        setActive(stage);
        window.dispatchEvent(new CustomEvent("console-log", { detail: `[MASTER] Stage: ${stage}` }));
        // stage specific message
        if (stage === "docs") window.dispatchEvent(new CustomEvent("console-log", { detail: `[DOCS] Extracting dependency graph...` }));
        if (stage === "analysis") window.dispatchEvent(new CustomEvent("console-log", { detail: `[ANALYZE] Generating scorecard...` }));
        if (stage === "migration") window.dispatchEvent(new CustomEvent("console-log", { detail: `[MIGRATE] Applying migration transforms...` }));
        if (stage === "review") window.dispatchEvent(new CustomEvent("console-log", { detail: `[REVIEW] Running policy checks...` }));
        if (stage === "tests") window.dispatchEvent(new CustomEvent("console-log", { detail: `[TEST] Synthesizing unit tests...` }));
        if (stage === "output") window.dispatchEvent(new CustomEvent("console-log", { detail: `[MASTER] Pipeline complete ✅` }));
        idx += 1;
        if (idx >= SEQUENCE.length) {
          clearInterval(t);
          orchestrating.current = false;
        }
      }, 1600);
    }

    window.addEventListener("select-stage", onSelect as EventListener);
    window.addEventListener("orchestration-start", onStart as EventListener);

    return () => {
      window.removeEventListener("select-stage", onSelect as EventListener);
      window.removeEventListener("orchestration-start", onStart as EventListener);
    };
  }, []);

  return (
    <section id="workflow" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
      <div className="mb-6">
        <PipelineBar active={active} onSelect={(s) => window.dispatchEvent(new CustomEvent("select-stage", { detail: { stage: s } }))} />
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-3">
          <AgentNetwork active={active} />
        </div>
        <div className="lg:col-span-9">
          <StepPanels active={active} />
        </div>
      </div>
    </section>
  );
}
