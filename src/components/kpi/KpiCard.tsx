import { ReactNode } from "react";

export interface KpiCardProps {
  icon: ReactNode;
  title: string;
  value: string | number;
  subtitle?: string;
}

export default function KpiCard({
  icon,
  title,
  value,
  subtitle,
}: KpiCardProps) {
  return (
    <div className="bg-slate-900/30 border border-slate-800/70 rounded-2xl p-5 relative overflow-hidden group hover:border-slate-700/50 transition-colors">
      <div className="flex items-center gap-2 text-slate-400 mb-3">
        <div className="text-teal-400/80 group-hover:text-teal-400 transition-colors">
          {icon}
        </div>
        <span className="text-[10px] uppercase tracking-wider font-semibold">
          {title}
        </span>
      </div>
      <p className="font-mono font-black text-xl text-slate-100 tracking-tight">
        {value}
      </p>
      {subtitle && (
        <span className="text-[10px] text-slate-500 mt-1 block font-medium">
          {subtitle}
        </span>
      )}
    </div>
  );
}
