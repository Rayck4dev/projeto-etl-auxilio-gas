import Papa from "papaparse";
import { useEffect, useState } from "react";

import MapaBrasil from "./components/ChefiaCards";
import GraficoRegiao from "./components/GraficoRegiao";

import type { DadosMapeamento } from "./types/dados";
import csvFile from "./data/dados_mapeamento.csv?url";


export default function App() {
  const [dadosEstados, setDadosEstados] = useState<{ estado: string; total: number }[]>([]);
  const [dadosRegiao, setDadosRegiao] = useState<{ regiao: string; total: number }[]>([]);

  useEffect(() => {
    Papa.parse<DadosMapeamento>(csvFile, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (resultado) => {
        const estadosMap = new Map<string, number>();
        const regioesMap = new Map<string, number>();

        resultado.data.forEach((item) => {
          const estado = item.estado?.trim();
          const regiao = item.regiao?.trim();
          const total = Number(item.total_familias);

          if (!estado || !regiao || isNaN(total)) return;

          estadosMap.set(estado, (estadosMap.get(estado) || 0) + total);
          regioesMap.set(regiao, (regioesMap.get(regiao) || 0) + total);
        });

        setDadosEstados(
          Array.from(estadosMap.entries()).map(([estado, total]) => ({
            estado,
            total,
          }))
        );

        setDadosRegiao(
          Array.from(regioesMap.entries()).map(([regiao, total]) => ({
            regiao,
            total,
          }))
        );
      },
    });
  }, []);

  return (

      <div className="dashboard-grid">
        <MapaBrasil dados={dadosEstados} />
        <GraficoRegiao dados={dadosRegiao} />
      </div>
  
  );
}