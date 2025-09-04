import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RunKPIs() {
  const [stats, setStats] = useState({ filesUpdated: 0, successes: 0, failures: 0, coverage: 0 });

  useEffect(() => {
    function handler(e: any) {
      const payload = e.detail || {};
      setStats((s) => ({ ...s, ...payload }));
    }
    window.addEventListener("run-stats", handler as EventListener);
    return () => window.removeEventListener("run-stats", handler as EventListener);
  }, []);

  return (
    <Card className="border-border/60 bg-gradient-to-br from-background to-muted/40 mb-4">
      <CardHeader>
        <CardTitle className="text-lg">Current run KPIs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Files Updated</div>
            <div className="text-xl font-semibold">{stats.filesUpdated}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Successes</div>
            <div className="text-xl font-semibold text-emerald-600">{stats.successes}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Failures</div>
            <div className="text-xl font-semibold text-red-600">{stats.failures}</div>
          </div>
        </div>
        <div className="mt-4 text-center">
          <div className="text-sm text-muted-foreground">Coverage</div>
          <div className="text-lg font-semibold">{stats.coverage}%</div>
        </div>
      </CardContent>
    </Card>
  );
}
