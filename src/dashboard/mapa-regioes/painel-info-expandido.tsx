import { useMemo } from "react";
import { ShieldCheck, TrendingUp, Award, Layers } from "lucide-react";
import { Props } from "@/types/dashboard";

export default function PainelInfoExpandido({
  dadosCsv = [],
  estadoSelecionado,
}: Props) {
  const brasilSelecionado = !estadoSelecionado;

  const normalizar = (valor: string) => valor?.trim().toUpperCase() || "";

  const { totalEstado, participacao, regiao, rankingPosicao, topEstados } =
    useMemo(() => {
      const dadosEstado = brasilSelecionado
        ? []
        : dadosCsv.filter(
            (item) =>
              item &&
              normalizar(item.estado) === normalizar(estadoSelecionado!),
          );

      const totalBrasil = dadosCsv.reduce(
        (acc, item) => acc + Number(item?.total_familias || 0),
        0,
      );

      const totalDoEstado = brasilSelecionado
        ? totalBrasil
        : dadosEstado.reduce(
            (acc, item) => acc + Number(item?.total_familias || 0),
            0,
          );

      const percentualCarga =
        totalBrasil > 0
          ? ((totalDoEstado / totalBrasil) * 100).toFixed(2)
          : "0.00";

      const regiaoNome = brasilSelecionado
        ? "Território Nacional"
        : dadosEstado[0]?.regiao?.trim() || "Não Informado";

      const acumuladoEstados = dadosCsv.reduce<Record<string, number>>(
        (acc, item) => {
          const nome = item?.estado ? String(item.estado).trim() : "";
          if (!nome) return acc;
          acc[nome] = (acc[nome] || 0) + Number(item?.total_familias || 0);
          return acc;
        },
        {},
      );

      const rankingOrdenado = Object.entries(acumuladoEstados).sort(
        (a, b) => b[1] - a[1],
      );

      const indiceRanking = brasilSelecionado
        ? -1
        : rankingOrdenado.findIndex(
            ([nome]) => normalizar(nome) === normalizar(estadoSelecionado!),
          );

      return {
        totalEstado: totalDoEstado,
        participacao: percentualCarga,
        regiao: regiaoNome,
        rankingPosicao: indiceRanking >= 0 ? indiceRanking + 1 : null,
        topEstados: rankingOrdenado.slice(0, 3),
      };
    }, [dadosCsv, estadoSelecionado, brasilSelecionado]);

  return (
    <div className="bg-slate-950 border border-slate-900 rounded-3xl p-5 shadow-2xl space-y-5 flex flex-col justify-between h-full backdrop-blur-xl">
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 font-mono">
              Foco de Escopo Geral
            </span>
            <h3 className="text-2xl font-black mt-1 text-slate-100 tracking-tight">
              {estadoSelecionado || "Brasil"}
            </h3>
          </div>
          <span
            className={`text-[10px] font-bold px-2.5 py-1 rounded-full font-mono border ${
              brasilSelecionado
                ? "bg-teal-500/10 text-teal-400 border-teal-500/20"
                : "bg-purple-500/10 text-purple-400 border-purple-500/20"
            }`}
          >
            {brasilSelecionado ? "GLOBAL" : "SUB-FILTRO"}
          </span>
        </div>

        <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-4 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 text-slate-800 group-hover:text-teal-500/20 transition-colors pointer-events-none">
            <Layers size={40} />
          </div>
          <p className="text-[11px] font-medium text-slate-400">
            Famílias Beneficiárias
          </p>
          <div className="text-3xl font-black text-teal-400 mt-1.5 font-mono tracking-tight">
            {totalEstado.toLocaleString("pt-BR")}
          </div>
          <p className="text-[10px] text-slate-500 mt-2 flex items-center gap-1.5">
            <ShieldCheck size={12} className="text-teal-500" />
            Mapeamento Bimestral Homologado
          </p>
        </div>

        <div className="space-y-3.5 pt-2 min-h-[160px]">
          <div className="flex justify-between items-center text-xs border-b border-slate-900/60 pb-3">
            <span className="text-slate-400 font-medium">
              Região Macroeconômica
            </span>
            <span className="text-slate-200 font-semibold bg-slate-900 px-2 py-1 rounded-lg border border-slate-800">
              {regiao}
            </span>
          </div>

          <div className="flex justify-between items-center text-xs border-b border-slate-900/60 pb-3">
            <span className="text-slate-400 font-medium">
              Participação na Carga
            </span>
            <span className="text-cyan-400 font-bold font-mono text-sm">
              {participacao}%
            </span>
          </div>

          <div className="flex justify-between items-center text-xs border-b border-slate-900/60 pb-3">
            <span className="text-slate-400 font-medium">
              Competência Ativa
            </span>
            <span className="text-teal-400 font-semibold font-mono bg-teal-500/5 px-2 py-0.5 rounded-md border border-teal-500/10">
              Histórico Consolidado
            </span>
          </div>

          <div
            className={`flex justify-between items-center text-xs pb-1 transition-opacity duration-200 ${rankingPosicao ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          >
            <span className="text-slate-400 font-medium">
              Posição no Ranking
            </span>
            <span className="text-purple-400 font-bold font-mono bg-purple-500/10 px-2.5 py-1 rounded-lg border border-purple-500/20 flex items-center gap-1">
              <Award size={12} />#{rankingPosicao || 0}º lugar
            </span>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-4 mt-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono mb-2.5 flex items-center gap-1">
            <TrendingUp size={12} className="text-slate-400" />
            Maiores Volumetrias Gerais
          </p>

          <div className="space-y-2 min-h-[116px]">
            {topEstados.map(([nome, total], idx) => (
              <div
                key={nome}
                className="flex items-center justify-between text-xs bg-slate-900/20 p-2 rounded-xl border border-slate-900/50 animate-in fade-in duration-150"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold text-slate-600">
                    0{idx + 1}
                  </span>
                  <span className="text-slate-300 font-medium truncate max-w-[120px]">
                    {nome}
                  </span>
                </div>
                <span className="text-slate-400 font-mono font-semibold text-[11px]">
                  {total >= 1000000
                    ? `${(total / 1000000).toFixed(1)}M`
                    : `${Math.round(total / 1000)}k`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
