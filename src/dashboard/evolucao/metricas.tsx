interface Props {
  estadoFiltro: string | null;
}

export default function Metricas({ estadoFiltro }: Props) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <Card titulo="Pipeline" valor="2025" />

      <Card titulo="Filtro" valor={estadoFiltro || "Brasil"} />

      <Card titulo="Status" valor="Live" />
    </div>
  );
}

function Card({ titulo, valor }: any) {
  return (
    <div className="bg-slate-950/50 rounded-2xl p-4">
      <p className="text-xs text-slate-400">{titulo}</p>

      <p className="text-lg font-bold text-cyan-400 mt-1">{valor}</p>
    </div>
  );
}
