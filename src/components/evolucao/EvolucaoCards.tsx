import { LucideIcon, TrendingUp, Flame, BarChart3, Trophy } from "lucide-react";

interface CardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  colorClass: string;
}

function Card({ icon: Icon, label, value, colorClass }: CardProps) {
  return (
    <div className="bg-slate-900/30 border border-slate-900 rounded-2xl p-4 flex flex-col justify-between hover:border-slate-800 transition-all">
      <div className="flex items-center justify-between mb-2">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">
          {label}
        </p>
        <Icon className={`w-4 h-4 ${colorClass}`} />
      </div>
      <p className="text-2xl font-black text-slate-100 font-mono tracking-tight">
        {value}
      </p>
    </div>
  );
}

interface EvolucaoCardsProps {
  crescimento: string;
  picoMes: string;
  mediaFormatada: string;
}

export default function EvolucaoCards({
  crescimento,
  picoMes,
  mediaFormatada,
}: EvolucaoCardsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 w-full">
      <Card
        icon={TrendingUp}
        label="Crescimento"
        value={`${crescimento}%`}
        colorClass="text-cyan-400"
      />
      <Card
        icon={Flame}
        label="Pico Registrado"
        value={picoMes}
        colorClass="text-amber-400"
      />
      <Card
        icon={BarChart3}
        label="Média Mensal"
        value={mediaFormatada}
        colorClass="text-teal-400"
      />
      <Card
        icon={Trophy}
        label="Melhor Mês"
        value={picoMes}
        colorClass="text-emerald-400"
      />
    </div>
  );
}
