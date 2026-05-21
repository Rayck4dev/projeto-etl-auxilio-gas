import { ReactNode } from "react";

export interface StatusChipProps {
  icon: ReactNode;
  text: string;
}

export default function StatusChip({ icon, text }: StatusChipProps) {
  return (
    <div className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800/60 flex items-center gap-2 text-xs font-mono font-medium text-teal-400/90 backdrop-blur-md shadow-sm">
      <span className="relative flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-teal-500"></span>
      </span>
      {icon}
      <span>{text}</span>
    </div>
  );
}
