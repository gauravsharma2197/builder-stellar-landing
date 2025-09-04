import React from "react";

export default function Modal({ open, onClose, children, title }: { open: boolean; onClose: () => void; children: React.ReactNode; title?: string }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-2xl mx-4 bg-card text-card-foreground rounded-lg shadow-lg border border-border/60 overflow-hidden">
        <div className="p-4 border-b border-border/40 flex items-center justify-between">
          <div className="text-lg font-semibold">{title}</div>
          <button onClick={onClose} className="text-muted-foreground">Close</button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
