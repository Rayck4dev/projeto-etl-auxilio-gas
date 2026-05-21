import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from "recharts";

interface EvolucaoGraficoProps {
  dados: any[];
  media: number;
  formatarNumeroCompacto: (num: number) => string;
}

export default function EvolucaoGrafico({
  dados,
  media,
  formatarNumeroCompacto,
}: EvolucaoGraficoProps) {
  return (
    <div className="h-[350px] bg-slate-950/40 rounded-3xl border border-slate-900 p-4 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={dados}
          margin={{ top: 15, right: 15, left: 10, bottom: 5 }}
        >
          <defs>
            <linearGradient id="cyanGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            stroke="#1e293b/40"
            strokeDasharray="3 3"
            vertical={false}
          />

          <XAxis
            dataKey="mes"
            stroke="#475569"
            tickLine={false}
            dy={10}
            className="text-[10px] font-mono font-medium"
          />

          <YAxis
            stroke="#475569"
            tickLine={false}
            dx={-5}
            className="text-[10px] font-mono font-medium"
            tickFormatter={formatarNumeroCompacto}
          />

          <Tooltip
            contentStyle={{
              background: "#020617",
              border: "1px solid #1e293b",
              borderRadius: 16,
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
              fontFamily: "monospace",
              fontSize: "11px",
            }}
            formatter={(val: any) => [
              Number(val).toLocaleString("pt-BR"),
              "Famílias",
            ]}
          />

          <ReferenceLine
            y={media}
            stroke="#334155"
            strokeDasharray="5 5"
            label={{
              value: `Média Baseline: ${formatarNumeroCompacto(media)}`,
              position: "bottom",
              fill: "#64748b",
              className:
                "text-[9px] font-bold font-mono tracking-wider uppercase",
            }}
          />

          <Area
            type="monotone"
            dataKey="valor"
            stroke="#22d3ee"
            strokeWidth={2.5}
            fill="url(#cyanGlow)"
            activeDot={{ r: 5, strokeWidth: 0, fill: "#22d3ee" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
