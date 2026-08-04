"use client";

import type { ReactNode } from "react";

type Accent = "slate" | "emerald" | "sky" | "violet";

interface AdminStatCardProps {
  label: string;
  value: string | number;
  description: string;
  accent?: Accent;
  icon?: ReactNode;
}

const accentClasses: Record<Accent, string> = {
  slate: "border-slate-800 bg-slate-900/80 text-slate-100",
  emerald: "border-emerald-800/70 bg-emerald-950/50 text-emerald-100",
  sky: "border-sky-800/70 bg-sky-950/50 text-sky-100",
  violet: "border-violet-800/70 bg-violet-950/50 text-violet-100",
};

export function AdminStatCard({ label, value, description, accent = "slate", icon }: AdminStatCardProps) {
  return (
    <div className={`rounded-3xl border p-5 shadow-lg shadow-black/10 ${accentClasses[accent]}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-slate-400">{label}</p>
          <p className="mt-3 text-2xl font-semibold">{value}</p>
        </div>
        {icon ? <div className="rounded-2xl border border-white/10 bg-white/10 p-2 text-lg">{icon}</div> : null}
      </div>
      <p className="mt-4 text-sm text-slate-400">{description}</p>
    </div>
  );
}
