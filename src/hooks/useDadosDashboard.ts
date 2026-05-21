import { useState, useEffect } from "react";
import {
  DadosTemporais,
  DadosChefia,
  DadosMapeamento,
  nomesOficiais,
} from "@/types/dashboard";

export function useDadosDashboard() {
  const [dadosChefiaCsv, setDadosChefiaCsv] = useState<DadosChefia[]>([]);
  const [dadosEvolucaoCsv, setDadosEvolucaoCsv] = useState<DadosTemporais[]>(
    [],
  );
  const [dadosMapeamentoCsv, setDadosMapeamentoCsv] = useState<
    DadosMapeamento[]
  >([]);
  const [carregando, setCarregando] = useState<boolean>(true);

  useEffect(() => {
    const carregarChefia = fetch("/dados_chefia.csv")
      .then((res) => res.text())
      .then((text) => {
        const linhas = text
          .split(/\r?\n/)
          .map((l) => l.trim())
          .filter(Boolean);

        const formatados = linhas
          .slice(1)
          .map((linha) => {
            const valores = linha.replace(/"/g, "").split(",");

            const ano = valores[0] ? valores[0].trim() : "";
            const mesBruto = valores[1] ? valores[1].trim() : "";
            const mesTratado = mesBruto ? String(parseInt(mesBruto, 10)) : "";

            const codEstado = valores[2] ? valores[2].trim() : "";
            const mediaChefia = valores[3] ? valores[3].trim() : "0";
            const valorMedio = valores[4] ? valores[4].trim() : "108";

            return {
              ano,
              mes: mesTratado,
              cod_estado: codEstado,
              media_chefia_feminina: parseFloat(mediaChefia) || 0,
              valor_medio_recebido: parseFloat(valorMedio) || 108,
            };
          })
          .filter((item) => item.mes !== "NaN" && item.mes !== "");

        setDadosChefiaCsv(formatados);
      });

    const carregarEvolucao = fetch("/dados_evolucaofinanceira.csv")
      .then((res) => res.text())
      .then((text) => {
        const lines = text
          .split(/\r?\n/)
          .map((l) => l.trim())
          .filter(Boolean);

        const formatados = lines
          .slice(1)
          .map((linha) => {
            const c = linha.replace(/"/g, "").split(",");
            const ano = c[0] ? c[0].trim() : "";
            const rawMes = c[1] ? c[1].trim() : "";
            const valor = c[2] ? c[2].trim() : "0";

            const mesNumerico = String(parseInt(rawMes, 10));

            return {
              ano,
              mes: mesNumerico,
              valor: Number(valor) || 0,
              rawMes: mesNumerico,
            };
          })
          .sort((a, b) => Number(a.rawMes) - Number(b.rawMes));

        setDadosEvolucaoCsv(formatados);
      });

    const carregarMapeamento = fetch("/dados_ibge_map.csv")
      .then((res) => res.text())
      .then((text) => {
        const linhas = text
          .split(/\r?\n/)
          .map((l) => l.trim())
          .filter(Boolean);

        const formatados = linhas.slice(1).map((linha) => {
          const valores = linha.replace(/"/g, "").split(",");

          const codEstado = valores[0] ? valores[0].trim() : "";
          let estadoOriginal = valores[1] ? valores[1].trim() : "";
          let regiaoOriginal = valores[2] ? valores[2].trim() : "";
          const totalFamilias = valores[3] ? valores[3].trim() : "0";

          if (
            regiaoOriginal.startsWith("Norde") ||
            regiaoOriginal.startsWith("Nord")
          )
            regiaoOriginal = "Nordeste";
          if (
            regiaoOriginal.startsWith("Sudes") ||
            regiaoOriginal.startsWith("Sude")
          )
            regiaoOriginal = "Sudeste";
          if (
            regiaoOriginal.startsWith("Centr") ||
            regiaoOriginal.startsWith("Cent")
          )
            regiaoOriginal = "Centro-Oeste";
          if (regiaoOriginal.startsWith("Sul")) regiaoOriginal = "Sul";
          if (regiaoOriginal.startsWith("Norte")) regiaoOriginal = "Norte";

          const nomeEstadoCompleto = nomesOficiais[codEstado] || estadoOriginal;

          return {
            ano: "",
            mes: "",
            cod_estado: codEstado,
            estado: nomeEstadoCompleto,
            regiao: regiaoOriginal,
            total_familias: parseInt(totalFamilias, 10) || 0,
          };
        });

        setDadosMapeamentoCsv(formatados);
      });

    Promise.all([carregarChefia, carregarEvolucao, carregarMapeamento])
      .catch((err) => {
        console.error("Erro no ETL Engine dos arquivos:", err);
      })
      .finally(() => {
        setCarregando(false);
      });
  }, []);

  return { dadosChefiaCsv, dadosEvolucaoCsv, dadosMapeamentoCsv, carregando };
}
