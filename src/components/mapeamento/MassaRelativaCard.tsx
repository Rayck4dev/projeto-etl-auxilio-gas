import { Layers3 } from "lucide-react";

interface MassaRelativaCardProps {
  totalLocal: number;
  pctParticipacao: number;
}

export default function MassaRelativaCard({
  totalLocal,
  pctParticipacao,
}: MassaRelativaCardProps) {
  return (
    <div className="bg-slate-900/30 border border-slate-900 rounded-3xl p-5 shadow-xl flex flex-col justify-between h-[180px] relative overflow-hidden">
      <div className="flex items-center justify-between text-[11px] font-bold font-mono tracking-wider text-teal-400 uppercase">
        <div className="flex items-center gap-1.5">
          <Layers3 size={13} />
          Massa Relativa
        </div>
        <span className="text-slate-700 font-mono font-black text-xs">01</span>
      </div>

      <div className="my-auto pt-2">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black text-slate-100 font-mono tracking-tighter">
            {totalLocal.toLocaleString("pt-BR")}
          </span>
          <span className="text-[10px] font-bold text-slate-500 font-mono">
            UF/FAMÍLIAS
          </span>
        </div>
      </div>

      <div className="space-y-2 pt-2">
        <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
          <span>Quota de Ocupação Nacional</span>
          <span className="text-teal-400 font-bold">
            {pctParticipacao.toFixed(2)}%
          </span>
        </div>
        <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-900">
          <div
            className="bg-gradient-to-r from-teal-500 to-cyan-400 h-full rounded-full transition-all duration-700"
            style={{
              width: `${Math.min(Math.max(pctParticipacao, 2), 100)}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
