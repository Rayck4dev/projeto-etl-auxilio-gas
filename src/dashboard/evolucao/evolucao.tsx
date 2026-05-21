import { useEffect, useMemo, useState } from "react";
import EvolucaoCards from "@/components/evolucao/EvolucaoCards";
import EvolucaoGrafico from "@/components/evolucao/EvolucaoGrafico";

export interface PropsEvolucaoLinha {
  estadoFiltro: string | null;
}

const meses: Record<string, string> = {
  "01": "Jan",
  "02": "Fev",
  "03": "Mar",
  "04": "Abr",
  "05": "Mai",
  "06": "Jun",
  "07": "Jul",
  "08": "Ago",
  "09": "Set",
  "10": "Out",
  "11": "Nov",
  "12": "Dez",
};

const formatarNumeroCompacto = (num: number) => {
  if (num >= 1_000_000)
    return (num / 1_000_000).toFixed(1).replace(".", ",") + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1).replace(".", ",") + "K";
  return num.toString();
};

export default function EvolucaoLinha({ estadoFiltro }: PropsEvolucaoLinha) {
  const [dados, setDados] = useState<any[]>([]);

  useEffect(() => {
    fetch("/dados_evolucaofinanceira.csv")
      .then((res) => res.text())
      .then((text) => {
        const linhas = text.split("\n");
        const temp: any[] = [];

        for (let i = 1; i < linhas.length; i++) {
          if (!linhas[i]?.trim()) continue;
          const c = linhas[i].split(",");
          temp.push({
            ano: c[0]?.trim(),
            mes: c[1]?.trim(),
            total: Number(c[2]) || 0,
          });
        }

        temp.sort((a, b) => Number(a.mes) - Number(b.mes));

        setDados(
          temp.map((item) => ({
            mes: meses[item.mes] || item.mes,
            valor: item.total,
            rawMes: item.mes,
          })),
        );
      });
  }, [estadoFiltro]);

  const analytics = useMemo(() => {
    if (!dados.length) return null;

    const valores = dados.map((x) => x.valor);
    const ultimo = valores[valores.length - 1];
    const anterior = valores[valores.length - 2] || 0;

    const crescimento = anterior
      ? (((ultimo - anterior) / anterior) * 100).toFixed(1)
      : "0";

    const media = valores.reduce((a, b) => a + b, 0) / valores.length;
    const pico = dados.reduce(
      (maior, atual) => (atual.valor > maior.valor ? atual : maior),
      dados[0],
    );

    return { crescimento, media, pico };
  }, [dados]);

  if (!analytics) return null;

  const insight = `📈 ${estadoFiltro || "Brasil"} apresentou crescimento de ${
    analytics.crescimento
  }% no último período, com pico operacional mapeado em ${analytics.pico.mes}.`;

  return (
    <div className="space-y-5 w-full">
      <div>
        <h2 className="text-xl font-black text-slate-100 tracking-tight uppercase font-mono">
          Série Temporal de Famílias
        </h2>
        <p className="text-xs text-slate-500 font-mono mt-0.5">
          Escopo de Análise: {estadoFiltro || "Brasil (Visão Geral)"}
        </p>
      </div>

      <EvolucaoCards
        crescimento={analytics.crescimento}
        picoMes={analytics.pico.mes}
        mediaFormatada={formatarNumeroCompacto(analytics.media)}
      />

      <EvolucaoGrafico
        dados={dados}
        media={analytics.media}
        formatarNumeroCompacto={formatarNumeroCompacto}
      />

      <div className="bg-cyan-500/5 border border-cyan-500/10 rounded-2xl p-4 backdrop-blur-sm">
        <p className="text-xs text-cyan-400/90 font-mono font-medium">
          {insight}
        </p>
      </div>
    </div>
  );
}
