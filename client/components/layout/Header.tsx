import { Button } from "@/components/ui/button";
import { Sparkles, Workflow, LineChart, Rocket } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 w-full backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b border-border/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <div className="size-8 rounded-md bg-gradient-to-br from-brand to-brand-2 shadow ring-1 ring-white/10" />
          <span className="text-lg font-semibold tracking-tight">Axiom Agents</span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#platform" className="hover:text-primary transition-colors flex items-center gap-2"><Sparkles className="size-4"/> Platform</a>
          <a href="#workflow" className="hover:text-primary transition-colors flex items-center gap-2"><Workflow className="size-4"/> Workflow</a>
          <a href="#insights" className="hover:text-primary transition-colors flex items-center gap-2"><LineChart className="size-4"/> Insights</a>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="hidden sm:inline-flex">Docs</Button>
          <Button className="bg-gradient-to-r from-brand to-brand-2 text-white shadow hover:opacity-90"><Rocket className="size-4"/> Request Demo</Button>
        </div>
      </div>
    </header>
  );
}
