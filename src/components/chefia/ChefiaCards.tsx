import { useMemo, useState } from "react";
import {
  Users,
  DollarSign,
  ArrowUpRight,
  Percent,
  SlidersHorizontal,
} from "lucide-react";
import ValorAnimado from "@/components/shared/ValorAnimado";
import BadgePorcentagem from "@/components/shared/BadgePorcentagem";
import { deCodigoParaSigla, PaginaChefiaProps } from "@/types/dashboard";
import DropdownMes from "@/components/shared/Selector";

import TabelaCompetenciasHop from "@/components/shared/TabelaCompetenciasHop";

export default function PaginaChefiaFamiliar({
  estadoFiltro,
  dadosCsv = [],
}: PaginaChefiaProps) {
  const [mesFiltro, setMesFiltro] = useState<string>("Todos");

  const dadosFiltrados = useMemo(() => {
    let resultado = dadosCsv;

    if (estadoFiltro) {
      resultado = resultado.filter((item) => {
        const sigla = deCodigoParaSigla[item.cod_estado?.trim()];
        return sigla === estadoFiltro;
      });
    }

    if (mesFiltro !== "Todos") {
      const mesAlvo = String(parseInt(mesFiltro, 10));
      resultado = resultado.filter((item) => Number(item.mes) === Number(mesAlvo));
    }

    return resultado;
  }, [dadosCsv, estadoFiltro, mesFiltro]);

  const metricas = useMemo(() => {
    if (!dadosFiltrados.length) {
      return {
        totalChefes: 0,
        investimentoTotal: 0,
        maiorMedia: 0,
        valorMedioRepasse: 0,
        variacao: 0,
      };
    }

    const totalChefes = dadosFiltrados.reduce(
      (acc, item) => acc + Number(item.media_chefia_feminina),
      0,
    );
    
    const investimentoTotal = dadosFiltrados.reduce(
      (acc, item) =>
        acc + Number(item.media_chefia_feminina) * Number(item.valor_medio_recebido),
      0,
    );

    const maiorMedia = Math.max(
      ...dadosFiltrados.map((item) => Number(item.media_chefia_feminina)),
    );

    const somaRepasse = dadosFiltrados.reduce((acc, item) => acc + Number(item.valor_medio_recebido), 0);
    const valorMedioRepasse = somaRepasse / dadosFiltrados.length;

    const variacao = estadoFiltro ? 3.4 : 1.9;

    return {
      totalChefes,
      investimentoTotal,
      maiorMedia,
      valorMedioRepasse,
      variacao,
    };
  }, [dadosFiltrados, estadoFiltro]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/40 p-4 rounded-2xl border border-slate-800/60">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-teal-400" />
          <div>
            <h3 className="text-sm font-bold text-slate-200">
              Painel de Filtros Demográficos
            </h3>
            <p className="text-xs text-slate-400">
              Restrinja a análise de chefia por mês de referência
            </p>
          </div>
        </div>
        <DropdownMes mesFiltro={mesFiltro} setMesFiltro={setMesFiltro} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <CardChefia
          icon={Users}
          label="Mães Chefe de Família"
          value={<ValorAnimado value={metricas.totalChefes} precision={0} />}
          badge={<BadgePorcentagem value={metricas.variacao} />}
          subtext="Volume bruto processado"
          colorClass="text-teal-400"
        />
        <CardChefia
          icon={DollarSign}
          label="Volume Injetado"
          value={<ValorAnimado value={metricas.investimentoTotal} isCurrency={true} precision={2} />}
          badge={<BadgePorcentagem value={metricas.variacao + 0.6} />}
          subtext="Cruzamento: Atendimentos × Benefício"
          colorClass="text-emerald-400"
        />
        <CardChefia
          icon={ArrowUpRight}
          label="Maior Concentração"
          value={<ValorAnimado value={metricas.maiorMedia} precision={0} />}
          subtext="Pico registrado em lote"
          colorClass="text-cyan-400"
        />
        <CardChefia
          icon={Percent}
          label="Cota do Benefício"
          value={<ValorAnimado value={metricas.valorMedioRepasse} isCurrency={true} precision={2} />}
          subtext="Valor médio extraído do Hop"
          colorClass="text-purple-400"
        />
      </div>

      <div className="pt-2">
        <TabelaCompetenciasHop dados={dadosFiltrados} />
      </div>

    </div>
  );
}

function CardChefia({ icon: Icon, label, value, badge, subtext, colorClass }: any) {
  return (
    <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between hover:border-slate-700/50 transition-all shadow-xl">
      <div className="flex items-center justify-between mb-2">
        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{label}</p>
        <div className={`p-1.5 rounded-lg bg-slate-950/60 border border-slate-800/60 ${colorClass}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="mt-2 flex items-baseline justify-between gap-2">
        <div className="text-2xl font-black text-slate-100 font-mono tracking-tight">{value}</div>
        {badge && <div className="transform translate-y-[-2px]">{badge}</div>}
      </div>
      <p className="text-[10px] text-slate-500 mt-1">{subtext}</p>
    </div>
  );
}