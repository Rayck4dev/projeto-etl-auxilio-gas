interface Props {
  estadoFiltro: string | null;
}

export default function Insight({ estadoFiltro }: Props) {
  return (
    <div className="text-xs text-slate-400 border-t border-slate-800 pt-4">
      {estadoFiltro || "Brasil"} apresentou crescimento de 12,5% no último período, com pico em Novembro.
    </div>
  );
}
