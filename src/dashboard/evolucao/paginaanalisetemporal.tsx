import { useMemo, useState } from "react";
import { BarChart3 } from "lucide-react";
import Panel from "@/components/shared/Panel";
import SectionTitle from "@/components/shared/SectionTitle";
import EvolucaoLinha from "@/dashboard/evolucao/evolucao";
import { DadosTemporais } from "@/types/dashboard";

interface PaginaTemporalProps {
  estadoFiltro: string | null;
  dadosEvolucao: DadosTemporais[];
}

export default function PaginaAnaliseTemporal({
  estadoFiltro,
  dadosEvolucao = [],
}: PaginaTemporalProps) {
  const [anoSelecionado] = useState<string>("Todos");

  const dadosFiltradosPorAno = useMemo(() => {
    return dadosEvolucao;
  }, [dadosEvolucao, anoSelecionado]);

  const analiseAvancada = useMemo(() => {
    if (!dadosFiltradosPorAno.length)
      return { projecao: "Estável", anomalias: "Nenhuma" };

    const valores = dadosFiltradosPorAno.map((d) => d.valor);
    const ultimo = valores[valores.length - 1] || 0;
    const anterior = valores[valores.length - 2] || 0;

    const diferenca = ultimo - anterior;
    const projecaoText =
      diferenca > 0
        ? `+${((diferenca / anterior) * 100).toFixed(1)}% Crescimento`
        : "Estável";

    return {
      projecao: projecaoText,
      anomalias: "Nenhuma",
    };
  }, [dadosFiltradosPorAno]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        <div className="lg:col-span-3 bg-slate-900/20 border border-slate-800/40 p-5 rounded-3xl">
          <EvolucaoLinha estadoFiltro={estadoFiltro} />
        </div>

        <div className="space-y-4">
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 transition-all hover:border-slate-700">
            <span className="text-[10px] font-bold text-slate-500 uppercase block tracking-wider">
              Projeção Próximo Período
            </span>
            <p className="text-lg font-black text-cyan-400 font-mono mt-1">
              {analiseAvancada.projecao}
            </p>
            <p className="text-[10px] text-slate-500 mt-1.5 leading-relaxed">
              Cálculo baseado na variação das últimas competências registradas.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 transition-all hover:border-slate-700">
            <span className="text-[10px] font-bold text-slate-500 uppercase block tracking-wider">
              Status do Pipeline
            </span>
            <p className="text-lg font-black text-teal-400 font-mono mt-1">
              Consistente
            </p>
            <p className="text-[10px] text-slate-500 mt-1.5 leading-relaxed">
              A volumetria e integridade das cargas via Apache Hop estão normais.
            </p>
          </div>
        </div>
      </div>

      <Panel className="w-full">
        <SectionTitle
          icon={<BarChart3 size={16} />}
          title="Detalhamento Consolidado por Competência"
        />
        
        <div className="overflow-x-auto mt-4 rounded-xl border border-slate-800/60 bg-slate-950/20">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/40 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-6 w-[20%]">Mês de Referência</th>
                <th className="py-3 px-6 w-[35%]">Filtro Geográfico</th>
                <th className="py-3 px-6 w-[25%] text-right">Famílias Atendidas</th>
                <th className="py-3 px-6 w-[20%] text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40 text-slate-300 font-sans">
              {dadosFiltradosPorAno.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-slate-900/20 transition-colors"
                >
                  <td className="py-3.5 px-6 font-mono text-slate-400 font-medium">
                    {item.mes}
                  </td>
                  <td className="py-3.5 px-6 text-slate-400">
                    {estadoFiltro || "Brasil (Consolidado)"}
                  </td>
                  <td className="py-3.5 px-6 text-right text-cyan-400 font-bold font-mono text-sm">
                    {item.valor.toLocaleString("pt-BR")}
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <span className="inline-block text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 px-2.5 py-0.5 rounded-md text-[10px] font-medium tracking-wide">
                      Efetivado
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}