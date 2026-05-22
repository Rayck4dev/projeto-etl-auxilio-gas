import {
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";

import { scaleLinear } from "d3-scale";

interface Props {
  dados: {
    estado: string;
    total: number;
  }[];
}

const geoUrl =
  "https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson";

export default function MapaBrasil({ dados }: Props) {
  const maximo = Math.max(
    ...dados.map((item) => item.total)
  );

  const colorScale = scaleLinear<string>()
    .domain([0, maximo])
    .range(["#dbeafe", "#1e3a8a"]);

  return (
    <div
      style={{
        background: "white",
        padding: 20,
        borderRadius: 16,
      }}
    >
       <h2
  style={{
    color: "black",
    marginBottom: 10,
  }}
>
  Mapa do Brasil</h2>

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 600,
          center: [-55, -15],
        }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const estado = geo.properties.name;

              const estadoData = dados.find(
                (item) => item.estado === estado
              );

              const total =
                estadoData?.total || 0;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={colorScale(total)}
                  stroke="#FFFFFF"
                  style={{
                    default: {
                      outline: "none",
                    },
                    hover: {
                      fill: "#60a5fa",
                      outline: "none",
                    },
                    pressed: {
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}