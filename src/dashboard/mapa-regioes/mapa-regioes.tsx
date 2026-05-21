import { useMemo } from "react";
import { MapaRegioesProps } from "@/types/dashboard";
import HeaderMapa from "@/dashboard/mapa-regioes/header-mapa";
import MapaBrasil from "@/dashboard/mapa-regioes/mapa-brasil";
import PainelInfoExpandido from "@/dashboard/mapa-regioes/painel-info-expandido";
import { useDadosDashboard } from "@/hooks/useDadosDashboard";
import { useGeoJson } from "@/hooks/use-geojson";

export default function MapaRegioes({
  onSelecionarEstado,
  estadoSelecionado,
}: MapaRegioesProps) {
  const { dadosMapeamentoCsv, carregando: carregandoCsv } = useDadosDashboard();
  const geoJson = useGeoJson();

  const dadosProntos = useMemo(() => {
    return dadosMapeamentoCsv || [];
  }, [dadosMapeamentoCsv]);

  const carregandoGeral = carregandoCsv || !geoJson;

  if (carregandoGeral) {
    return (
      <div className="h-[580px] w-full flex items-center justify-center text-slate-400 text-xs font-mono bg-slate-950 rounded-3xl border border-slate-900">
        <span className="w-4 h-4 border-2 border-teal-500 border-t-transparent rounded-full animate-spin mr-2" />
        Sincronizando Malha Cartográfica...
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="bg-slate-900/20 p-5 rounded-3xl border border-slate-900/60">
        <HeaderMapa />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 items-stretch w-full">
        <div className="lg:col-span-7 h-[630px] rounded-3xl overflow-hidden border border-slate-900 shadow-2xl relative bg-[#0f172a]">
          <MapaBrasil
            key={`mapa-core-${estadoSelecionado}`}
            geoJsonData={geoJson}
            dadosCsv={dadosProntos}
            estadoSelecionado={estadoSelecionado}
            onSelecionarEstado={onSelecionarEstado}
          />
        </div>

        <div className="lg:col-span-3 h-[630px]">
          <PainelInfoExpandido
            dadosCsv={dadosProntos}
            estadoSelecionado={estadoSelecionado}
            mesFiltro="Todos"
          />
        </div>
      </div>
    </div>
  );
}
