import { Activity, Users, Map } from "lucide-react";
import Panel from "@/components/shared/Panel";
import SectionTitle from "@/components/shared/SectionTitle";
import EvolucaoLinha from "@/dashboard/evolucao/evolucao";
import ChefiaCards from "@/components/chefia/ChefiaCards";
import PaginaAnaliseTemporal from "@/dashboard/evolucao/paginaanalisetemporal";
import PaginaChefiaFamiliar from "@/dashboard/chefia/pagina-chefia";
import { RenderizadorAbasProps } from "@/types/dashboard";
import MapaRegioes from "@/dashboard/mapa-regioes/mapa-regioes";
import MapeamentoCards from "@/components/mapeamento/MapeamentoCards";

interface PropsEstendidas extends RenderizadorAbasProps {
  dadosMapeamentoCsv?: any[];
}

export default function RenderizadorAbas({
  abaAtiva,
  estadoSelecionado,
  setEstadoSelecionado,
  dadosChefiaCsv,
  dadosEvolucaoCsv,
  dadosMapeamentoCsv = [],
}: PropsEstendidas) {
  switch (abaAtiva) {
    case "dashboard":
      return (
        <div className="flex flex-col gap-6">
          <Panel>
            <SectionTitle
              icon={<Activity size={16} />}
              title="Análise Temporal"
            />
            <EvolucaoLinha estadoFiltro={estadoSelecionado} />
          </Panel>

          <Panel>
            <SectionTitle icon={<Users size={16} />} title="Chefia Familiar" />
            <PaginaChefiaFamiliar
              estadoFiltro={null}
              dadosCsv={dadosChefiaCsv}
            />
          </Panel>

          <Panel className="w-full max-w-none min-h-[900px] px-2 sm:px-6">
            <SectionTitle
              icon={<Map size={16} />}
              title="Distribuição Geográfica"
            />
            <div className="mt-4 w-full">
              <MapaRegioes
                key={`home-map-root-${dadosMapeamentoCsv?.length || 0}`}
                estadoSelecionado={estadoSelecionado}
                onSelecionarEstado={setEstadoSelecionado}
              />
            </div>
          </Panel>
        </div>
      );

    case "analytics":
      return (
        <PaginaAnaliseTemporal
          estadoFiltro={estadoSelecionado}
          dadosEvolucao={dadosEvolucaoCsv}
        />
      );

    case "users":
      return (
        <ChefiaCards
          estadoFiltro={estadoSelecionado}
          dadosCsv={dadosChefiaCsv}
        />
      );

    case "map":
      return (
        <Panel className="w-full max-w-none min-h-[900px] px-2 sm:px-6">
          <SectionTitle
            icon={<Map size={16} />}
            title="Painel Cartográfico Expandido"
          />
          <div className="mt-4 w-full">
            {" "}
            <MapeamentoCards
              key={`home-map-root-${dadosMapeamentoCsv?.length || 0}`}
              estadoSelecionado={estadoSelecionado}
              onSelecionarEstado={setEstadoSelecionado}
            />
          </div>
        </Panel>
      );

    default:
      return null;
  }
}
