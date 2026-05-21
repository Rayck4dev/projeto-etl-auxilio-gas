export const GEOJSON_URL =
  "https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson";

export const MAPA_ESTADOS = {
  RO: { nome: "Rondônia" },
  AC: { nome: "Acre" },
  AM: { nome: "Amazonas" },
  RR: { nome: "Roraima" },
  PA: { nome: "Pará" },
  AP: { nome: "Amapá" },
  TO: { nome: "Tocantins" },

  MA: { nome: "Maranhão" },
  PI: { nome: "Piauí" },
  CE: { nome: "Ceará" },
  RN: { nome: "Rio Grande do Norte" },
  PB: { nome: "Paraíba" },
  PE: { nome: "Pernambuco" },
  AL: { nome: "Alagoas" },
  SE: { nome: "Sergipe" },
  BA: { nome: "Bahia" },

  MG: { nome: "Minas Gerais" },
  ES: { nome: "Espírito Santo" },
  RJ: { nome: "Rio de Janeiro" },
  SP: { nome: "São Paulo" },

  PR: { nome: "Paraná" },
  SC: { nome: "Santa Catarina" },
  RS: { nome: "Rio Grande do Sul" },

  MS: { nome: "Mato Grosso do Sul" },
  MT: { nome: "Mato Grosso" },
  GO: { nome: "Goiás" },
  DF: { nome: "Distrito Federal" },
} as const;

export type SiglaEstado = keyof typeof MAPA_ESTADOS;
