import { useMemo } from "react";
import { MapaRegioesProps } from "@/types/dashboard";
import MapaBrasil from "@/dashboard/mapa-regioes/mapa-brasil";
import PainelInfoExpandido from "@/dashboard/mapa-regioes/painel-info-expandido";
import PainelCardsMapeamento from "@/components/mapeamento/painel-cards-mapeamento";
import { useDadosDashboard } from "@/hooks/useDadosDashboard";
import { useGeoJson } from "@/hooks/use-geojson";
import { Radio, ShieldCheck } from "lucide-react";

export default function MapeamentoCards({
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
      <div className="h-[620px] w-full flex flex-col items-center justify-center bg-slate-950 rounded-3xl border border-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.05),transparent)] animate-pulse" />
        <span className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mb-3 relative z-10" />
        <span className="text-slate-400 text-[10px] font-mono uppercase tracking-widest relative z-10 animate-pulse">
          Decodificando Vetores de Malha...
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300 w-full max-w-none text-slate-100 p-1">
      <div className="bg-slate-950 border border-slate-900 rounded-3xl p-5 shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="absolute top-0 left-0 w-24 h-[1px] bg-gradient-to-r from-purple-500 to-transparent" />

        <div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-ping" />
            <h2 className="text-md font-black tracking-wider uppercase font-mono text-slate-200">
              Terminal Cartográfico de Volumetria
            </h2>
          </div>
          <p className="text-[11px] text-slate-500 font-mono mt-1">
            Análise computacional e distribuição estatística de famílias
            registradas
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-[9px] bg-slate-900/40 p-2 border border-slate-900 rounded-xl">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <Radio size={12} className="animate-pulse" />
            <span>STREAM ATIVO</span>
          </div>
          <div className="w-[1px] h-3 bg-slate-800" />
          <div className="text-slate-400 flex items-center gap-1">
            <ShieldCheck size={11} className="text-purple-400" />{" "}
            {dadosProntos.length} CLUSTERS
          </div>
        </div>
      </div>

      <PainelCardsMapeamento
        dadosCsv={dadosProntos}
        estadoSelecionado={estadoSelecionado}
      />

      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 items-stretch w-full">
        <div className="lg:col-span-7 h-[630px] rounded-3xl overflow-hidden border border-slate-900 shadow-2xl relative bg-[#0f172a]">
          <MapaBrasil
            key={`mapa-core-${estadoSelecionado}`}
            geoJsonData={geoJson}
            dadosCsv={dadosProntos}
            estadoSelecionado={estadoSelecionado}
            onSelecionarEstado={onSelecionarEstado}
          />

          <div className="absolute bottom-5 left-5 bg-slate-950/80 border border-slate-900/60 backdrop-blur-md px-3 py-2.5 rounded-2xl pointer-events-none font-mono text-[11px] text-slate-400 space-y-1 z-10 shadow-2xl">
            <div className="text-slate-200 font-bold uppercase tracking-wide flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-teal-400" />
              Foco Atual: {estadoSelecionado || "MALHA NACIONAL COMPLETE"}
            </div>
            <p className="text-slate-600">
              Interação via clique habilitada sobre vetores SVG
            </p>
          </div>
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
