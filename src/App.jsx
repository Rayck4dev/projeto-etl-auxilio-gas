import { useEffect, useState } from "react";
import Papa from "papaparse";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function App() {
  const [dados, setDados] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  useEffect(() => {
    fetch("/src/data/dados_evolucaofinanceira.csv")
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (resultado) => {
            const dadosFormatados = resultado.data
              .map((item) => ({
                mes: Number(item.mes),
                familias: Number(item.total_familias),
              }))
              .filter((item) => !isNaN(item.mes) && !isNaN(item.familias))
              .sort((a, b) => a.mes - b.mes);

            setDados(dadosFormatados);
          },
        });
      });
  }, []);

  const formatarYAxis = (valor) => {
    if (valor >= 1000000) return `${(valor / 1000000).toFixed(1)}M`;
    if (valor >= 1000) return `${(valor / 1000).toFixed(0)}k`;
    return valor;
  };

  const colors = darkMode
    ? {
      bg: "#13151a",
      grid: "#2c303b",
      text: "#94a3b8",
      tooltipBg: "#1e293b",
      tooltipBorder: "#475569",
      line: "#38bdf8",
    }
    : {
      bg: "#ffffff",
      grid: "#e5e7eb",
      text: "#334155",
      tooltipBg: "#ffffff",
      tooltipBorder: "#cbd5e1",
      line: "#2563eb",
    };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: colors.bg,
        color: colors.text,
        padding: "40px",
        boxSizing: "border-box",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Evolução do Auxílio Gás (2025)
      </h1>

      <div style={{ width: "100%", height: 400, maxWidth: "1200px", margin: "0 auto" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dados} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />

            <XAxis
              dataKey="mes"
              tickFormatter={(mes) => String(mes).padStart(2, "0")}
              stroke={colors.text}
              dy={10}
            />

            <YAxis
              stroke={colors.text}
              tickFormatter={formatarYAxis}
              domain={["dataMin - 50000", "dataMax + 50000"]}
              dx={-10}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: colors.tooltipBg,
                borderColor: colors.tooltipBorder,
                color: colors.text,
              }}
              labelFormatter={(label) =>
                `Mês: ${String(label).padStart(2, "0")}`
              }
            />

            <Line
              type="monotone"
              dataKey="familias"
              stroke={colors.line}
              strokeWidth={3}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default App;