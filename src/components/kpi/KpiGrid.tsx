import { Activity, Users, Map, Clock3 } from "lucide-react";
import KpiCard from "./KpiCard";

export default function KpiGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <KpiCard
        icon={<Activity size={15} />}
        title="Pipeline Ativo"
        value="Evolução Temporal"
        subtitle="Mapeamento histórico consolidado"
      />
      <KpiCard
        icon={<Users size={15} />}
        title="Filtro de Demanda"
        value="Chefia Familiar"
        subtitle="Corte por arranjo de dependentes"
      />
      <KpiCard
        icon={<Map size={15} />}
        title="Malha Cartográfica"
        value="Filtro Geográfico"
        subtitle="Cruzamento via Polígonos SVG"
      />
      <KpiCard
        icon={<Clock3 size={15} />}
        title="Sincronia Engine"
        value="Exercício 2025"
        subtitle="Carga de dados via Apache Hop"
      />
    </div>
  );
}
