import { Button } from "@/components/ui/button";
import { Play, ShieldCheck, ArrowRight } from "lucide-react";
import OrchestrationGraph from "./OrchestrationGraph";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.15),transparent_60%),radial-gradient(ellipse_at_bottom,rgba(168,85,247,0.1),transparent_60%)]"/>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-8 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-1 text-xs text-muted-foreground mb-4">
            <ShieldCheck className="size-3.5 text-brand"/>
            Enterprise-ready Agentic AI
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Agentic AI Code Migration & Processing Platform
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl">
            Orchestrate specialized agents to document legacy systems, analyze code, migrate to latest frameworks, review changes, and auto-generate unit tests — all under a master agent.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button size="lg" className="bg-gradient-to-r from-brand to-brand-2 text-white shadow-lg">
              <Play className="size-4"/> Start Orchestration
            </Button>
            <Button size="lg" variant="outline" className="border-brand text-brand hover:bg-brand/10">
              Explore Workflow <ArrowRight className="size-4"/>
            </Button>
          </div>
          <dl className="mt-8 grid grid-cols-3 gap-4 max-w-lg text-center">
            <div>
              <dt className="text-2xl font-bold">5+</dt>
              <dd className="text-xs text-muted-foreground">Specialist Agents</dd>
            </div>
            <div>
              <dt className="text-2xl font-bold">100k+</dt>
              <dd className="text-xs text-muted-foreground">Files Processed</dd>
            </div>
            <div>
              <dt className="text-2xl font-bold">99.9%</dt>
              <dd className="text-xs text-muted-foreground">Deterministic Pipelines</dd>
            </div>
          </dl>
        </div>
        <OrchestrationGraph />
      </div>
    </section>
  );
}
