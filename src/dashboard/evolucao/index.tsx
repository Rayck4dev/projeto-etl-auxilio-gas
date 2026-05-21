import GraficoLinha from "@/dashboard/evolucao/evolucao";
import Metricas from "@/dashboard/evolucao/metricas";
import Insight from "@/dashboard/evolucao/insight";

export interface Props {
  estadoFiltro: string | null;
}

export default function Evolucao({ estadoFiltro }: Props) {
  return (
    <div className="space-y-5">
      <Metricas estadoFiltro={estadoFiltro} />

      <GraficoLinha estadoFiltro={estadoFiltro} />

      <Insight estadoFiltro={estadoFiltro} />
    </div>
  );
}
