import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wifi, Database, Sparkles } from "lucide-react";

import Sidebar from "@/components/layout/Sidebar";
import StatusChip from "@/components/layout/StatusChip";
import KpiGrid from "@/components/kpi/KpiGrid";

import { useDadosDashboard } from "@/hooks/useDadosDashboard"; 
import { useGeoJson } from "@/hooks/use-geojson"; 
import RenderizadorAbas from "@/components/layout/RenderizadorAbas"; 
import { TabDashboard } from "@/types/dashboard";

export default function App() {
  const [estadoSelecionado, setEstadoSelecionado] = useState<string | null>(null);
  const [abaAtiva, setAbaAtiva] = useState<TabDashboard>('dashboard');
  
  const { 
    dadosChefiaCsv, 
    dadosEvolucaoCsv, 
    dadosMapeamentoCsv, 
    carregando: carregandoCsv 
  } = useDadosDashboard();

  const geoJsonEstado = useGeoJson();

  const carregandoSistema = carregandoCsv || !geoJsonEstado;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex font-sans antialiased selection:bg-teal-500/30">
      
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none z-0" style={{ backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
      <div className="fixed top-0 left-0 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-[160px] pointer-events-none z-0" />

      <Sidebar abaAtiva={abaAtiva} onMudarAba={setAbaAtiva} />

      <main className="flex-1 p-8 overflow-y-auto relative z-10 max-w-[1600px] mx-auto w-full">
        
        <header className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent tracking-tight">
                Auxílio Gás Analytics
              </h1>
              <p className="text-slate-400 text-xs uppercase tracking-[0.3em] mt-2 font-medium">
                Business Intelligence Dashboard
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <StatusChip icon={<Wifi size={12} />} text="LIVE ENGINE" />
              <StatusChip icon={<Database size={12} />} text="HOP ETL" />
              <StatusChip icon={<Sparkles size={12} />} text="DATA MAP" />
            </div>
          </div>
        </header>

        <KpiGrid />

        <AnimatePresence>
          {estadoSelecionado && (
            <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="mb-6">
              <button onClick={() => setEstadoSelecionado(null)} className="px-4 py-2 rounded-xl bg-teal-950/30 border border-teal-500/30 text-teal-400 text-xs font-semibold flex items-center gap-2 transition-all">
                <span>Filtro Regional Ativo: <b className="text-slate-100 font-mono font-bold">{estadoSelecionado}</b></span>
                <span className="bg-teal-500/20 text-teal-300 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black">✕</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={abaAtiva}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            {carregandoSistema ? (
              <div className="w-full text-center py-20 font-mono text-xs text-slate-500 animate-pulse">
                Sincronizando pipelines de dados geográficos...
              </div>
            ) : (
              <RenderizadorAbas
                abaAtiva={abaAtiva}
                estadoSelecionado={estadoSelecionado}
                setEstadoSelecionado={setEstadoSelecionado}
                geoJsonEstado={geoJsonEstado}
                dadosChefiaCsv={dadosChefiaCsv}
                dadosEvolucaoCsv={dadosEvolucaoCsv}
                dadosMapeamentoCsv={dadosMapeamentoCsv}
              />
            )}
          </motion.div>
        </AnimatePresence>

      </main>
    </div>
  );
}