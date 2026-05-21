import { BarChart3 } from "lucide-react";
import Panel from "@/components/shared/Panel";
import SectionTitle from "@/components/shared/SectionTitle";
import { deCodigoParaSigla } from "@/types/dashboard";

export interface TabelaCompetenciasProps {
  dados: any[];
}

export default function TabelaCompetenciasHop({
  dados,
}: TabelaCompetenciasProps) {
  return (
    <Panel className="w-full">
      <SectionTitle
        icon={<BarChart3 size={16} />}
        title="Dados Consolidados via Apache Hop (Visão por Competência e UF)"
      />

      <div className="overflow-x-auto mt-4 rounded-xl border border-slate-800/60 bg-slate-950/20">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/40 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <th className="py-3 px-6 w-[20%]">Competência</th>
              <th className="py-3 px-6 w-[30%]">Localidade (UF)</th>
              <th className="py-3 px-6 w-[25%] text-right">
                Média Chefia Feminina
              </th>
              <th className="py-3 px-6 w-[25%] text-right">
                Valor Médio Recebido
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/40 text-slate-300 font-sans">
            {dados.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="py-8 text-center text-slate-500 font-mono"
                >
                  Nenhum registro correspondente encontrado na carga do banco.
                </td>
              </tr>
            ) : (
              dados.map((item, index) => {
                const siglaEstado =
                  deCodigoParaSigla[item.cod_estado?.trim()] ||
                  `UF ${item.cod_estado}`;
                const mediaChefia = Number(item.media_chefia_feminina) || 0;
                const valorMedio = Number(item.valor_medio_recebido) || 0;

                return (
                  <tr
                    key={index}
                    className="hover:bg-slate-900/20 transition-colors"
                  >
                    <td className="py-3.5 px-6 font-mono text-slate-400">
                      {String(item.mes).padStart(2, "0")}/{item.ano}
                    </td>
                    <td className="py-3.5 px-6 text-slate-200 font-medium">
                      {siglaEstado}{" "}
                      <span className="text-[10px] text-slate-500 font-mono font-normal">
                        ({item.cod_estado})
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-right text-purple-400 font-bold font-mono text-sm">
                      {mediaChefia.toLocaleString("pt-BR", {
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="py-3.5 px-6 text-right text-emerald-400 font-bold font-mono text-sm">
                      {valorMedio.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}
