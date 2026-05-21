import { ReactNode } from "react";

interface SectionTitleProps {
  icon: ReactNode;
  title: string;
}

export default function SectionTitle({ icon, title }: SectionTitleProps) {
  return (
    <div className="flex items-center gap-3 mb-6 dynamic-title-fade">
      <div className="text-teal-400 p-1.5 bg-teal-950/30 border border-teal-500/10 rounded-lg">
        {icon}
      </div>
      <h2 className="font-bold text-lg text-slate-100 tracking-tight">
        {title}
      </h2>
    </div>
  );
}
