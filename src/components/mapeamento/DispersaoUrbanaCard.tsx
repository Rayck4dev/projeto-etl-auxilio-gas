import { Sliders } from "lucide-react";

export interface DispersaoUrbanaCardProps {
  taxaConcentracao: number;
}

export default function DispersaoUrbanaCard({
  taxaConcentracao,
}: DispersaoUrbanaCardProps) {
  const isCritico = taxaConcentracao > 50;
  const temDados = taxaConcentracao > 0;

  return (
    <div className="bg-slate-900/30 border border-slate-900 rounded-3xl p-5 shadow-xl flex flex-col justify-between h-[180px] relative overflow-hidden">
      <div className="flex items-center justify-between text-[11px] font-bold font-mono tracking-wider text-purple-400 uppercase">
        <div className="flex items-center gap-1.5">
          <Sliders size={13} />
          Macro Concentração
        </div>
        <span className="text-slate-700 font-mono font-black text-xs">02</span>
      </div>

      <div className="my-auto pt-1">
        <p className="text-xs text-slate-400 leading-relaxed">
          {temDados ? (
            <>
              Concentração de{" "}
              <span className="text-purple-400 font-mono font-bold">
                {taxaConcentracao.toFixed(1)}%
              </span>{" "}
              da carga total retida e centralizada nos 3 estados de maior
              volumetria.
            </>
          ) : (
            <span className="text-slate-500 italic">
              Filtro estadual ativo. Seleção de Pareto disponível apenas na
              visão global do território.
            </span>
          )}
        </p>
      </div>

      {temDados && (
        <div className="space-y-2 pt-2">
          <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
            <span>Densidade de Retenção (Pareto)</span>
            <span className="text-purple-400 font-bold">
              Nível {isCritico ? "Crítico" : "Estável"}
            </span>
          </div>
          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-900">
            <div
              className="bg-gradient-to-r from-purple-600 to-fuchsia-400 h-full rounded-full transition-all duration-700"
              style={{ width: `${taxaConcentracao}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
