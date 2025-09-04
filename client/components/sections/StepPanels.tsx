import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StepPanels({ active }: { active: string }) {
  const coverage = useMemo(() => {
    if (active === "tests") return 91;
    if (active === "migration") return 78;
    return 64;
  }, [active]);

  return (
    <div className="flex-1">
      <Card className="border-border/60 bg-gradient-to-br from-background to-muted/40">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="text-lg">{active === "legacy" ? "Legacy Code" : active === "docs" ? "Documentation Agent" : active === "analysis" ? "Analysis Agent" : active === "migration" ? "Migration Agent" : active === "review" ? "Review Agent" : active === "tests" ? "Unit Test Agent" : "Final Output"}</span>
            <span className="text-xs text-muted-foreground">Stage details</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {active === "docs" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="col-span-1">
                <p className="text-sm text-muted-foreground">Automatic dependency graph generation</p>
                <svg viewBox="0 0 400 260" className="w-full h-[240px] mt-4 rounded border border-border/40 bg-white/6">
                  <defs>
                    <linearGradient id="nodeGrad" x1="0" x2="1">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                  <g>
                    <line x1="200" y1="40" x2="320" y2="90" stroke="#e6eefb" strokeWidth="2" />
                    <line x1="200" y1="40" x2="80" y2="90" stroke="#e6eefb" strokeWidth="2" />
                    <line x1="80" y1="90" x2="120" y2="180" stroke="#e6eefb" strokeWidth="2" />
                    <circle cx="200" cy="40" r="18" fill="url(#nodeGrad)" className="animate-pulse" />
                    <circle cx="320" cy="90" r="12" fill="#06b6d4" />
                    <circle cx="80" cy="90" r="12" fill="#8b5cf6" />
                    <circle cx="120" cy="180" r="10" fill="#60a5fa" />
                  </g>
                </svg>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Call tree highlights</p>
                <div className="mt-4 text-xs font-mono bg-[#0b1220] text-emerald-200 p-3 rounded h-[240px] overflow-auto">
                  <div>app.start()</div>
                  <div className="pl-4">→ server.init()</div>
                  <div className="pl-8">→ routes.load()</div>
                  <div className="pl-12">→ controllers.processRequest()</div>
                  <div className="pl-16">→ utils.validate()</div>
                  <div className="pl-16">→ db.query()</div>
                </div>
              </div>
            </div>
          )}

          {active === "analysis" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Strengths & Risks</p>
                <ul className="mt-3 space-y-3">
                  <li className="flex items-center justify-between"><span>Modular architecture</span><span className="text-emerald-600 font-semibold">+8</span></li>
                  <li className="flex items-center justify-between"><span>Test coverage</span><span className="text-amber-500 font-semibold">63%</span></li>
                  <li className="flex items-center justify-between"><span>Outdated deps</span><span className="text-red-500 font-semibold">7 critical</span></li>
                </ul>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Scorecard</p>
                <div className="mt-4 space-y-3">
                  <div>
                    <div className="flex justify-between text-xs"><span>Maintainability</span><span>72</span></div>
                    <div className="w-full bg-border h-2 rounded mt-1 overflow-hidden"><div style={{width: '72%'}} className="h-2 bg-emerald-400"/></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs"><span>Security</span><span>61</span></div>
                    <div className="w-full bg-border h-2 rounded mt-1 overflow-hidden"><div style={{width: '61%'}} className="h-2 bg-amber-400"/></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs"><span>Tech Debt</span><span>78</span></div>
                    <div className="w-full bg-border h-2 rounded mt-1 overflow-hidden"><div style={{width: '78%'}} className="h-2 bg-red-400"/></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {active === "migration" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Old Code</p>
                <pre className="mt-3 p-3 rounded bg-slate-900 text-slate-200 text-sm h-[280px] overflow-auto">
{`class OldComponent extends React.Component {
  render() {
    return <div className=\"old\">Hello</div>
  }
}

module.exports = OldComponent;`}
                </pre>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Migrated Code</p>
                <pre className="mt-3 p-3 rounded bg-slate-950 text-slate-100 text-sm h-[280px] overflow-auto">
{`import React from 'react';

export function NewComponent() {
  return <div className=\"new\">Hello</div>
}

export default NewComponent;`}
                </pre>
              </div>
            </div>
          )}

          {active === "review" && (
            <div>
              <p className="text-sm text-muted-foreground">AI Review Comments</p>
              <ul className="mt-4 space-y-3">
                <li className="p-3 rounded border border-border/40 bg-background">
                  <div className="text-sm font-medium">Security: sanitize user input</div>
                  <div className="text-xs text-muted-foreground mt-1">Recommendation: Use a strict schema & escape outputs. (Senior Eng)</div>
                </li>
                <li className="p-3 rounded border border-border/40 bg-background">
                  <div className="text-sm font-medium">Performance: reduce re-renders</div>
                  <div className="text-xs text-muted-foreground mt-1">Recommendation: memoize heavy subcomponents and consider pagination.</div>
                </li>
                <li className="p-3 rounded border border-border/40 bg-background">
                  <div className="text-sm font-medium">Style: migrate to hooks</div>
                  <div className="text-xs text-muted-foreground mt-1">Recommendation: Replace legacy lifecycle usage with hooks for readability.</div>
                </li>
              </ul>
            </div>
          )}

          {active === "tests" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
              <div>
                <p className="text-sm text-muted-foreground">Generated Tests</p>
                <pre className="mt-3 p-3 rounded bg-slate-900 text-slate-200 text-sm h-[280px] overflow-auto">
{`import { render } from '@testing-library/react';
import NewComponent from './NewComponent';

test('renders hello', () => {
  const { getByText } = render(<NewComponent />);
  expect(getByText('Hello')).toBeTruthy();
});`}
                </pre>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-sm text-muted-foreground">Coverage</p>
                <div className="relative w-36 h-36 mt-4">
                  <div className="absolute inset-0 rounded-full bg-border/20" />
                  <div className="absolute inset-0 rounded-full" style={{ background: `conic-gradient(#60a5fa ${coverage * 3.6}deg, rgba(0,0,0,0.06) 0deg)` }} />
                  <div className="absolute inset-4 rounded-full bg-background flex items-center justify-center text-lg font-semibold">{coverage}%</div>
                </div>
                <div className="text-xs text-muted-foreground mt-3">Auto-generated with fixtures</div>
              </div>
            </div>
          )}

          {active === "legacy" && (
            <div>
              <p className="text-sm text-muted-foreground">Repository snapshot</p>
              <div className="mt-3 p-4 rounded bg-gradient-to-br from-white/5 to-white/3 border border-border/30">
                <div className="text-sm">Files: 12,342</div>
                <div className="text-sm">Languages: JavaScript, Java, Python</div>
                <div className="text-sm">Size: 1.2GB</div>
              </div>
            </div>
          )}

          {active === "output" && (
            <div>
              <p className="text-sm text-muted-foreground">Final Output</p>
              <div className="mt-3 p-4 rounded bg-emerald-50 border border-emerald-200">
                <div className="text-sm font-medium">Migration complete</div>
                <div className="text-xs text-muted-foreground mt-1">Artifacts: docs.zip, migrated-repo.tar.gz, tests-report.html</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
