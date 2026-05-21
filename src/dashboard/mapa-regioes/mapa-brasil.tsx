import { GeoJSON, MapContainer } from "react-leaflet";
import { extrairSigla, obterEstado } from "@/constants/helpers";
import { SiglaEstado } from "@/constants/mapaBrasil";

interface Props {
  geoJsonData: any;
  dadosCsv: any[];
  estadoSelecionado: string | null;
  onSelecionarEstado: (estado: string | null) => void;
}

export default function MapaBrasil({
  geoJsonData,
  dadosCsv = [],
  estadoSelecionado,
  onSelecionarEstado,
}: Props) {
  const obterVolume = (sigla: SiglaEstado) => {
    const estado = obterEstado(sigla);
    if (!estado || !estado.nome) return 0;

    return dadosCsv
      .filter((item) => {
        if (!item || !item.estado) return false;
          const valorCsv = String(item.estado).trim().toUpperCase();
          const valorGeo = String(estado.nome).trim().toUpperCase();
          return valorCsv === valorGeo;
      })
      .reduce((acc, item) => acc + Number(item.total_familias || 0), 0);
  };

  const style = (feature: any) => {
    const sigla = extrairSigla(feature);

    if (!sigla) {
      return {
        fillColor: "#1e293b",
        fillOpacity: 0.35,
        color: "#334155",
        weight: 1,
      };
    }

    const estado = obterEstado(sigla);
    if (!estado) {
      return {
        fillColor: "#1e293b",
        fillOpacity: 0.35,
        color: "#334155",
        weight: 1,
      };
    }

    const volume = obterVolume(sigla);
    const selecionado = estado.nome === estadoSelecionado;

    if (selecionado) {
      return {
        fillColor: "#a855f7",
        fillOpacity: 0.9,
        color: "#d8b4fe",
        weight: 2,
      };
    }

    if (volume <= 0) {
      return {
        fillColor: "#1e293b",
        fillOpacity: 0.2,
        color: "#1e293b",
        weight: 1,
      };
    }

    return {
      fillColor: "#2dd4bf",
      fillOpacity: 0.7,
      color: "#334155",
      weight: 1,
    };
  };

  const onEachFeature = (feature: any, layer: any) => {
    const sigla = extrairSigla(feature);
    if (!sigla) return;

    const estado = obterEstado(sigla);
    if (!estado) return;

    const volume = obterVolume(sigla);

    layer.on({
      mouseover: function () {
        if (!volume) return;
        const el = this.getElement();
        this.setStyle({
          weight: 2,
          color: "#5eead4",
          fillOpacity: 0.95,
        });
        if (el) {
          el.style.transition = "all 160ms ease";
          el.style.filter = "drop-shadow(0 0 10px rgba(45,212,191,.45))";
        }
      },

      mouseout: function () {
        this.setStyle(style(feature));
        const el = this.getElement();
        if (el) {
          el.style.filter = "none";
        }
      },

      click: function () {
        if (!volume) return;
        onSelecionarEstado(
          estadoSelecionado === estado.nome ? null : estado.nome,
        );
      },
    });
  };

  if (!geoJsonData) {
    return (
      <div className="w-full h-full flex items-center justify-center text-xs font-mono text-slate-500">
        A carregar polígonos geográficos...
      </div>
    );
  }

  return (
    <MapContainer
      center={[-13.8, -53.0]}
      zoom={4.3}
      dragging={false}
      scrollWheelZoom={false}
      doubleClickZoom={false}
      touchZoom={false}
      zoomControl={false}
      attributionControl={false}
      preferCanvas={true}
      style={{
        backgroundColor: "#0f172a",
      }}
      className="h-full w-full"
    >
      <GeoJSON
        key={`${estadoSelecionado}-${dadosCsv.length}`}
        data={geoJsonData}
        style={style}
        onEachFeature={onEachFeature}
      />
    </MapContainer>
  );
}
