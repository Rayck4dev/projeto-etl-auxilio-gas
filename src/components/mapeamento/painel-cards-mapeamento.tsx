import { useMemo } from "react";
import MassaRelativaCard from "@/components/mapeamento/MassaRelativaCard";
import DispersaoUrbanaCard from "@/components/mapeamento/DispersaoUrbanaCard";
import BalancoRegioesCard from "@/components/mapeamento/BalançoRegioesCard";

export interface PainelCardsMapeamentoProps {
  dadosCsv: any[];
  estadoSelecionado: string | null;
}

export default function PainelCardsMapeamento({
  dadosCsv = [],
  estadoSelecionado,
}: PainelCardsMapeamentoProps) {
  const brasilSelecionado = !estadoSelecionado;
  const normalizar = (valor: string) => valor?.trim().toUpperCase() || "";

  const metrics = useMemo(() => {
    const totalBrasil = dadosCsv.reduce(
      (acc, item) => acc + Number(item?.total_familias || 0),
      0,
    );
    const dadosEstado = brasilSelecionado
      ? []
      : dadosCsv.filter(
          (item) =>
            item && normalizar(item.estado) === normalizar(estadoSelecionado!),
        );
    const totalLocal = brasilSelecionado
      ? totalBrasil
      : dadosEstado.reduce(
          (acc, item) => acc + Number(item?.total_familias || 0),
          0,
        );

    const pctParticipacao =
      totalBrasil > 0 ? (totalLocal / totalBrasil) * 100 : 0;

    let taxaConcentracao = 0;

    if (brasilSelecionado) {
      const maioresEstadosVol = [...dadosCsv]
        .sort(
          (a, b) =>
            Number(b.total_familias || 0) - Number(a.total_familias || 0),
        )
        .slice(0, 3)
        .reduce((acc, curr) => acc + Number(curr.total_familias || 0), 0);

      taxaConcentracao =
        totalBrasil > 0 ? (maioresEstadosVol / totalBrasil) * 100 : 0;
    } else {
      taxaConcentracao = 0;
    }

    const regioesMapeadasRaw = dadosCsv.reduce<Record<string, number>>(
      (acc, item) => {
        const reg = item?.regiao?.trim().toUpperCase() || "";
        if (reg) acc[reg] = (acc[reg] || 0) + Number(item?.total_familias || 0);
        return acc;
      },
      {},
    );

    const mapaSiglas: Record<string, string> = {
      NORDESTE: "NE",
      SUDESTE: "SE",
      SUL: "SU",
      NORTE: "NO",
      "CENTRO-OESTE": "CO",
    };

    const regioesOrd = ["NORDESTE", "SUDESTE", "SUL", "NORTE", "CENTRO-OESTE"];
    const maxRegiao = Math.max(...Object.values(regioesMapeadasRaw), 1);

    return {
      totalLocal,
      pctParticipacao,
      taxaConcentracao,
      regioesMapeadasRaw,
      regioesOrd,
      mapaSiglas,
      maxRegiao,
    };
  }, [dadosCsv, estadoSelecionado, brasilSelecionado]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 w-full">
      <MassaRelativaCard
        totalLocal={metrics.totalLocal}
        pctParticipacao={metrics.pctParticipacao}
      />

      <DispersaoUrbanaCard taxaConcentracao={metrics.taxaConcentracao} />

      <BalancoRegioesCard
        regioesOrd={metrics.regioesOrd}
        regioesMapeadasRaw={metrics.regioesMapeadasRaw}
        mapaSiglas={metrics.mapaSiglas}
        maxRegiao={metrics.maxRegiao}
      />
    </div>
  );
}
