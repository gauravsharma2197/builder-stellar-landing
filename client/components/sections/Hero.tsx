import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, ShieldCheck, ArrowRight } from "lucide-react";
import OrchestrationGraph from "./OrchestrationGraph";
import Modal from "@/components/ui/Modal";

export default function Hero() {
  const [open, setOpen] = useState(false);

  function openSetup() {
    setOpen(true);
  }

  function handleExplore() {
    const el = document.getElementById("workflow");
    el?.scrollIntoView({ behavior: "smooth" });
    window.dispatchEvent(new CustomEvent("select-stage", { detail: { stage: "legacy" } }));
  }

  function startOrchestration(payload?: any) {
    const data = payload || {};
    window.dispatchEvent(new CustomEvent("orchestration-start", { detail: data }));
    const el = document.getElementById("workflow");
    el?.scrollIntoView({ behavior: "smooth" });
  }

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

          {/* Platform totals (simplified hero) */}
          <div className="mt-6">
            <div className="text-xs text-muted-foreground mb-2">Platform totals</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-gradient-to-br from-white/5 to-white/3 border border-border/30 text-center">
                <div className="text-sm text-muted-foreground">Files Processed</div>
                <div className="text-lg font-semibold">100k+</div>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-br from-white/5 to-white/3 border border-border/30 text-center">
                <div className="text-sm text-muted-foreground">Avg Pipeline Time</div>
                <div className="text-lg font-semibold">6m 42s</div>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-br from-white/5 to-white/3 border border-border/30 text-center">
                <div className="text-sm text-muted-foreground">Success Rate</div>
                <div className="text-lg font-semibold">99.9%</div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button size="lg" className="bg-gradient-to-r from-brand to-brand-2 text-white shadow-lg" onClick={openSetup}>
              <Play className="size-4"/> Start Orchestration
            </Button>
            <Button size="lg" variant="outline" className="border-brand text-brand hover:bg-brand/10" onClick={handleExplore}>
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

      <Modal open={open} onClose={() => setOpen(false)} title="Orchestration Setup">
        <form onSubmit={(e) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const data = new FormData(form);
          const payload = {
            gitUrl: data.get('gitUrl'),
            upload: (data.get('upload') as File) || null,
            language: data.get('language'),
            target: data.get('target'),
            safety: data.get('safety'),
          };
          // dispatch orchestration start
          window.dispatchEvent(new CustomEvent('orchestration-start', { detail: payload }));
          setOpen(false);
          // scroll to workflow
          const el = document.getElementById('workflow');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}>
          <div className="grid gap-3">
            <label className="text-sm">Git URL</label>
            <input name="gitUrl" className="input w-full px-3 py-2 border border-border/30 rounded" placeholder="https://github.com/owner/repo" />

            <label className="text-sm">Or upload a ZIP</label>
            <input name="upload" type="file" accept=".zip" />

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm">Primary Language</label>
                <select name="language" className="w-full p-2 border border-border/30 rounded">
                  <option value="javascript">JavaScript</option>
                  <option value="typescript">TypeScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                </select>
              </div>
              <div>
                <label className="text-sm">Target</label>
                <select name="target" className="w-full p-2 border border-border/30 rounded">
                  <option value="react18">React 18</option>
                  <option value="vite">Vite</option>
                  <option value="node16">Node 16+</option>
                </select>
              </div>
            </div>

            <label className="text-sm">Safety Rules</label>
            <select name="safety" className="w-full p-2 border border-border/30 rounded">
              <option value="default">Default (recommended)</option>
              <option value="strict">Strict (no breaking changes)</option>
            </select>

            <div className="mt-3 flex justify-end gap-2">
              <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 rounded border">Cancel</button>
              <button type="submit" className="px-4 py-2 rounded bg-gradient-to-r from-brand to-brand-2 text-white">Start</button>
            </div>
          </div>
        </form>
      </Modal>
    </section>
  );
}
