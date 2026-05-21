import { TrendingUp, TrendingDown } from "lucide-react";

interface BadgePorcentagemProps {
  value: string | number;
}

export default function BadgePorcentagem({ value }: BadgePorcentagemProps) {
  const numValue = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(numValue)) return <span className="text-slate-400">0%</span>;

  const isPositivo = numValue > 0;
  const isNeutro = numValue === 0;

  if (isNeutro) {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full border border-slate-700/50">
        0%
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1 text-[11px] font-mono font-black px-2 py-0.5 rounded-full border transition-all ${
        isPositivo
          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,0.05)]"
          : "bg-rose-500/10 text-rose-400 border-rose-500/20 shadow-[0_0_12px_rgba(244,63,94,0.05)]"
      }`}
    >
      {isPositivo ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
      {isPositivo ? "+" : ""}
      {numValue.toFixed(1).replace(".", ",")}%
    </span>
  );
}
