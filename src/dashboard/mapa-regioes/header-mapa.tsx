import { Globe } from "lucide-react";

export default function HeaderMapa() {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-teal-400 mb-4" />

        <div>
          <h2 className="text-xl font-bold text-slate-100">
            Distribuição Cartográfica Real
          </h2>

          <p className="text-slate-400 text-xs">Filtragem dinâmica via IBGE</p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs bg-teal-950/40 px-3 py-2 rounded-xl">
        <Globe size={14} />
        IBGE Vinculado
      </div>
    </div>
  );
}
