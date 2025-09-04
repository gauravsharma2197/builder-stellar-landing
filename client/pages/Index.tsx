import Hero from "@/components/sections/Hero";
import WorkflowTimeline from "@/components/sections/WorkflowTimeline";
import FeatureGrid from "@/components/sections/FeatureGrid";
import LiveConsole from "@/components/sections/LiveConsole";

export default function Index() {
  return (
    <div>
      <Hero />
      <WorkflowTimeline />
      <FeatureGrid />
      <LiveConsole />
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-20 text-center">
        <h3 className="text-2xl font-semibold">Showcase agentic competence</h3>
        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
          Designed for CXO presentations: clear visuals, live logs, and a crisp narrative that highlights how a master agent orchestrates specialist agents to transform legacy codebases with confidence.
        </p>
      </section>
    </div>
  );
}
