import { useEffect, useState } from "react";
import Papa from "papaparse";

import csvChefia from "../data/dados_chefia.csv?url";

type LinhaChefia = {
  ano: string;
  mes: string;
  cod_estado: string;
  media_chefia_feminina: string;
  valor_medio_recebido: string;
};

type EstadoResumo = {
  cod_estado: string;
  mediaChefia: number;
  valorMedio: number;
};

export default function DensidadeChefiaFeminina() {
  const [dados, setDados] = useState<EstadoResumo[]>([]);

  useEffect(() => {
    Papa.parse<LinhaChefia>(csvChefia, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (resultado) => {
        const agrupado: Record<
          string,
          { somaChefia: number; somaValor: number; qtd: number }
        > = {};

        resultado.data.forEach((linha) => {
          const estado = linha.cod_estado?.trim();
          const chefia = Number(linha.media_chefia_feminina);
          const valor = Number(linha.valor_medio_recebido);

          if (!estado || isNaN(chefia) || isNaN(valor)) return;

          if (!agrupado[estado]) {
            agrupado[estado] = { somaChefia: 0, somaValor: 0, qtd: 0 };
          }

          agrupado[estado].somaChefia += chefia;
          agrupado[estado].somaValor += valor;
          agrupado[estado].qtd += 1;
        });

        const resumo = Object.entries(agrupado)
          .map(([cod_estado, item]) => ({
            cod_estado,
            mediaChefia: item.somaChefia / item.qtd,
            valorMedio: item.somaValor / item.qtd,
          }))
          .sort((a, b) => b.mediaChefia - a.mediaChefia);

        setDados(resumo);
      },
    });
  }, []);

  const maiorChefia = dados[0];
  const maiorValor = [...dados].sort((a, b) => b.valorMedio - a.valorMedio)[0];

  return (
    <section
      style={{
        background: "white",
        color: "black",
        padding: 24,
        borderRadius: 16,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <h2
  style={{
    color: "black",
    marginBottom: 10,
  }}
>
  Densidade de Chefia Feminina
</h2>

      <p>
        Estados com maior média de mulheres chefes de família e valor médio
        recebido.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          marginBottom: 30,
        }}
      >
        <div
          style={{
            background: "#ede9fe",
            padding: 20,
            borderRadius: 12,
          }}
        >
          <p>Maior média de chefia feminina</p>
          <h3>Estado {maiorChefia?.cod_estado}</h3>
          <strong>{maiorChefia?.mediaChefia.toFixed(2)}</strong>
        </div>

        <div
          style={{
            background: "#dcfce7",
            padding: 20,
            borderRadius: 12,
          }}
        >
          <p>Maior valor médio recebido</p>
          <h3>Estado {maiorValor?.cod_estado}</h3>
          <strong>R$ {maiorValor?.valorMedio.toFixed(2)}</strong>
        </div>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "white",
        }}
      >
        <thead>
          <tr style={{ background: "#7c3aed", color: "white" }}>
            <th style={{ padding: 12, textAlign: "left" }}>
              Código do Estado
            </th>
            <th style={{ padding: 12, textAlign: "left" }}>
              Média Chefia Feminina
            </th>
            <th style={{ padding: 12, textAlign: "left" }}>
              Valor Médio Recebido
            </th>
          </tr>
        </thead>

        <tbody>
          {dados.map((item) => (
            <tr key={item.cod_estado} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: 12 }}>{item.cod_estado}</td>
              <td style={{ padding: 12 }}>{item.mediaChefia.toFixed(2)}</td>
              <td style={{ padding: 12 }}>R$ {item.valorMedio.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}