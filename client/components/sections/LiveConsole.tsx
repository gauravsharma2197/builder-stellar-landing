import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";

export default function LiveConsole() {
  const [lines, setLines] = useState<string[]>([]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: any) {
      const msg = e.detail as string;
      setLines((l) => [...l, msg]);
    }
    window.addEventListener("console-log", handler as EventListener);
    return () => window.removeEventListener("console-log", handler as EventListener);
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  return (
    <section id="insights" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16">
      <Card className="border-border/60 bg-gradient-to-br from-background to-muted/40">
        <CardHeader>
          <CardTitle>Live orchestration console</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="font-mono text-xs bg-black/90 text-emerald-200 rounded-lg p-4 h-64 overflow-auto border border-emerald-500/20">
            {lines.map((l, i) => (
              <div key={i} className="whitespace-pre-wrap">{"> "}{l}</div>
            ))}
            <div ref={endRef} />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
