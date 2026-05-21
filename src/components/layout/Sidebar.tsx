import { ReactNode } from "react";
import { LayoutDashboard, BarChart3, Users, Map } from "lucide-react";
import { TabDashboard } from "@/types/dashboard";

interface SidebarProps {
  abaAtiva: TabDashboard;
  onMudarAba: (aba: TabDashboard) => void;
}

interface SidebarIconProps {
  icon: ReactNode;
  active: boolean;
  label: string;
  onClick: () => void;
}

function SidebarIcon({ icon, active, label, onClick }: SidebarIconProps) {
  return (
    <button
      onClick={onClick}
      className={`w-12 h-12 rounded-2xl border transition-all duration-200 flex items-center justify-center relative group active:scale-95
        ${
          active
            ? "bg-teal-500/10 border-teal-500/30 text-teal-400 shadow-lg shadow-teal-500/5 font-bold"
            : "bg-slate-900/60 border-slate-800/80 text-slate-400 hover:text-teal-400 hover:border-slate-700/80 hover:bg-slate-900"
        }
      `}
    >
      {icon}

      <div className="absolute left-16 bg-slate-950 border border-slate-800 text-slate-200 text-xs py-1.5 px-3 rounded-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap z-50 shadow-2xl font-medium tracking-wide">
        {label}
      </div>
    </button>
  );
}

export default function Sidebar({ abaAtiva, onMudarAba }: SidebarProps) {
  const itensMenu = [
    {
      id: "dashboard" as TabDashboard,
      icon: <LayoutDashboard size={20} />,
      label: "Visão Geral",
    },
    {
      id: "analytics" as TabDashboard,
      icon: <BarChart3 size={20} />,
      label: "Análise Temporal",
    },
    {
      id: "users" as TabDashboard,
      icon: <Users size={20} />,
      label: "Chefia Familiar",
    },
    {
      id: "map" as TabDashboard,
      icon: <Map size={20} />,
      label: "Distribuição Geográfica",
    },
  ];

  return (
    <aside className="w-24 h-screen sticky top-0 border-r border-slate-900 bg-slate-950/40 backdrop-blur-xl flex flex-col items-center py-8 gap-6 shrink-0 z-20">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-slate-950 font-black text-xl mb-4 shadow-md shadow-teal-500/10 select-none">
        Ω
      </div>

      <div className="flex flex-col gap-4">
        {itensMenu.map((item) => (
          <SidebarIcon
            key={item.id}
            icon={item.icon}
            label={item.label}
            active={abaAtiva === item.id}
            onClick={() => onMudarAba(item.id)}
          />
        ))}
      </div>
    </aside>
  );
}
