import { useState } from "react";
import PipelineBar from "@/components/sections/PipelineBar";
import AgentNetwork from "@/components/sections/AgentNetwork";
import StepPanels from "@/components/sections/StepPanels";

export default function WorkflowTimeline() {
  const [active, setActive] = useState<string>("legacy");

  return (
    <section id="workflow" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16">
      <div className="mb-6">
        <PipelineBar active={active} onSelect={setActive} />
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
