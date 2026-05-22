import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface Props {
  dados: {
    regiao: string;
    total: number;
  }[];
}

export default function GraficoRegiao({ dados }: Props) {
  return (
    <div className="card-grafico">
      <h2>Total por Região</h2>

      <ResponsiveContainer width="100%" height={330}>
        <BarChart
          data={dados}
          margin={{
            top: 20,
            right: 30,
            left: 40,
            bottom: 30,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="regiao"
            tick={{ fontSize: 13 }}
          />

          <YAxis
            tickFormatter={(valor) =>
              Number(valor).toLocaleString("pt-BR")
            }
            tick={{ fontSize: 12 }}
            width={90}
          />

          <Tooltip
            formatter={(valor) =>
              Number(valor).toLocaleString("pt-BR")
            }
          />

          <Bar
            dataKey="total"
            fill="#2563eb"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}