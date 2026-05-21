interface Props {
  dadosCsv?: any[];
  estadoSelecionado: string | null;
}

export default function PainelInfo({
  dadosCsv = [],
  estadoSelecionado,
}: Props) {
  const brasilSelecionado = !estadoSelecionado;

  const normalizar = (valor: string) => valor?.trim().toUpperCase();

  const dadosEstado = brasilSelecionado
    ? []
    : dadosCsv.filter(
        (item) => normalizar(item.estado) === normalizar(estadoSelecionado!),
      );

  const totalBrasil = dadosCsv.reduce(
    (acc, item) => acc + Number(item.total_familias),

    0,
  );

  const totalEstado = brasilSelecionado
    ? totalBrasil
    : dadosEstado.reduce(
        (acc, item) => acc + Number(item.total_familias),

        0,
      );

  const participacao = ((totalEstado / totalBrasil) * 100).toFixed(2);

  const rankingEstados = Object.entries(
    dadosCsv.reduce(
      (acc, item) => {
        const nome = normalizar(item.estado);

        if (!nome) {
          return acc;
        }

        acc[nome] = (acc[nome] || 0) + Number(item.total_familias);

        return acc;
      },

      {} as Record<string, number>,
    ),
  ) as [string, number][];

  rankingEstados.sort((a, b) => b[1] - a[1]);

  const indiceRanking = brasilSelecionado
    ? -1
    : rankingEstados.findIndex(
        ([nome]) => nome === normalizar(estadoSelecionado!),
      );

  const ranking = indiceRanking >= 0 ? indiceRanking + 1 : null;
  console.log("TOP 5:", rankingEstados.slice(0, 5));

  const regiao = brasilSelecionado
    ? "Nacional"
    : dadosEstado[0]?.regiao?.trim() || "--";

  const ultimoRegistro = brasilSelecionado
    ? null
    : dadosEstado[dadosEstado.length - 1];

  const competencia = brasilSelecionado
    ? "27 estados"
    : ultimoRegistro
      ? `${ultimoRegistro.mes?.trim()}/${ultimoRegistro.ano?.trim()}`
      : "--";

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
      <div>
        <span className="text-[11px] uppercase tracking-widest text-slate-500">
          Coordenadas Ativas
        </span>

        <h3 className="text-2xl font-black mt-2 text-slate-100">
          {estadoSelecionado || "Brasil"}
        </h3>

        <p className="text-teal-400 text-sm mt-1">● Dados sincronizados</p>
      </div>

      <div className="border-y border-slate-800 py-5">
        <p className="text-slate-400 text-xs">Famílias Atendidas</p>

        <p className="text-3xl font-black text-teal-400 mt-1 font-mono">
          {totalEstado.toLocaleString("pt-BR")}
        </p>
      </div>

      <div className="space-y-4">
        <Linha label="Região" value={regiao} />

        <Linha label="Participação" value={`${participacao}%`} />

        <Linha label="Competência" value={competencia} />

        {ranking && <Linha label="Ranking" value={`#${ranking}`} />}
      </div>
    </div>
  );
}

function Linha({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-slate-400">{label}</span>

      <span className="text-slate-100 font-semibold">{value}</span>
    </div>
  );
}
