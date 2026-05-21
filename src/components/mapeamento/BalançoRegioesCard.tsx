import { BarChart3 } from "lucide-react";

export interface BalancoRegioesCardProps {
  regioesOrd: string[];
  regioesMapeadasRaw: Record<string, number>;
  mapaSiglas: Record<string, string>;
  maxRegiao: number;
}

export default function BalancoRegioesCard({
  regioesOrd,
  regioesMapeadasRaw,
  mapaSiglas,
  maxRegiao,
}: BalancoRegioesCardProps) {
  return (
    <div className="bg-slate-900/30 border border-slate-900 rounded-3xl p-5 shadow-xl flex flex-col justify-between h-[180px] relative overflow-hidden">
      <div className="flex items-center justify-between text-[11px] font-bold font-mono tracking-wider text-amber-500 uppercase">
        <div className="flex items-center gap-1.5">
          <BarChart3 size={13} />
          Balanço Inter-Regiões
        </div>
        <span className="text-slate-700 font-mono font-black text-xs">03</span>
      </div>

      <div className="grid grid-cols-5 items-end gap-2 h-20 mt-3 px-2 pb-1.5 bg-slate-950/40 border border-slate-900/60 rounded-2xl relative group/chart">
        {regioesOrd.map((nome) => {
          const total = regioesMapeadasRaw[nome] || 0;
          const alturaBarra = (total / maxRegiao) * 100;
          const sigla = mapaSiglas[nome] || nome.substring(0, 2);

          return (
            <div
              key={nome}
              className="flex flex-col items-center justify-end h-full group/bar relative"
            >
              <span className="absolute -top-5 text-[8px] font-mono text-amber-400 opacity-0 group-hover/bar:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap bg-slate-950 px-1 rounded border border-slate-900">
                {total > 1000000
                  ? `${(total / 1000000).toFixed(1)}M`
                  : `${Math.round(total / 1000)}k`}
              </span>

              <div
                className="w-full bg-gradient-to-t from-amber-600/80 to-amber-400 group-hover/bar:from-amber-500 group-hover/bar:to-yellow-300 rounded-t-[3px] transition-all duration-500 min-h-[3px] shadow-[0_0_4px_rgba(245,158,11,0.15)]"
                style={{ height: `${Math.max(alturaBarra, 4)}%` }}
              />

              <span className="text-[9px] font-bold font-mono text-slate-500 mt-1.5 transition-colors group-hover/bar:text-amber-400">
                {sigla}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
