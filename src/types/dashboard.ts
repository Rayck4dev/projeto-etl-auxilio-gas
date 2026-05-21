export interface EvolucaoFinanceira {
  ano: string;
  mes: string;
  total_familias: number;
}

export interface MapeamentoGeografico {
  ano: string;
  mes: string;
  estado: string;
  regiao: string;
  total_familias: number;
}

export interface MapaRegioesProps {
  onSelecionarEstado: (estado: string | null) => void;
  estadoSelecionado: string | null;
}

export interface DensidadeChefia {
  ano: string;
  mes: string;
  cod_estado: string;
  media_chefia_feminina: number;
  valor_medio_recebido: number;
}

export type TabDashboard =
  | "dashboard"
  | "analytics"
  | "users"
  | "map"
  | "database";

export interface DadosTemporais {
  mes: string;
  valor: number;
  rawMes: string;
}

export interface DadosTemporais {
  ano: string;
  mes: string;
  valor: number;
  rawMes: string;
}

export interface DadosChefia {
  ano: string;
  mes: string;
  cod_estado: string;
  media_chefia_feminina: number;
  valor_medio_recebido: number
}

export const deCodigoParaSigla: Record<string, string> = {
  "11": "RO",
  "12": "AC",
  "13": "AM",
  "14": "RR",
  "15": "PA",
  "16": "AP",
  "17": "TO",
  "21": "MA",
  "22": "PI",
  "23": "CE",
  "24": "RN",
  "25": "PB",
  "26": "PE",
  "27": "AL",
  "28": "SE",
  "29": "BA",
  "31": "MG",
  "32": "ES",
  "33": "RJ",
  "35": "SP",
  "41": "PR",
  "42": "SC",
  "43": "RS",
  "50": "MS",
  "51": "MT",
  "52": "GO",
  "53": "DF",
};

export const nomesOficiais: Record<string, string> = {
  "11": "Rondônia",
  "12": "Acre",
  "13": "Amazonas",
  "14": "Roraima",
  "15": "Pará",
  "16": "Amapá",
  "17": "Tocantins",
  "21": "Maranhão",
  "22": "Piauí",
  "23": "Ceará",
  "24": "Rio Grande do Norte",
  "25": "Paraíba",
  "26": "Pernambuco",
  "27": "Alagoas",
  "28": "Sergipe",
  "29": "Bahia",
  "31": "Minas Gerais",
  "32": "Espírito Santo",
  "33": "Rio de Janeiro",
  "35": "São Paulo",
  "41": "Paraná",
  "42": "Santa Catarina",
  "43": "Rio Grande do Sul",
  "50": "Mato Grosso do Sul",
  "51": "Mato Grosso",
  "52": "Goiás",
  "53": "Distrito Federal",
};

export interface PaginaChefiaProps {
  estadoFiltro: string | null;
  dadosCsv: DadosChefia[];
}

export interface DadosGraficoUf {
  uf: string;
  total: number;
}

export interface DropdownMesProps {
  mesFiltro: string;
  setMesFiltro: (mes: string) => void;
}

export interface DadosTemporais {
  ano: string;
  mes: string;
  valor: number;
  rawMes: string;
}

export interface DadosChefia {
  ano: string;
  mes: string;
  cod_estado: string;
  media_chefia_feminina: number;
  valor_medio_recebido: number;
}

export const opcoesMes = [
  { valor: "Todos", label: "Todos os Meses" },
  { valor: "12", label: "Dezembro (12)" },
  { valor: "10", label: "Outubro (10)" },
  { valor: "08", label: "Agosto (08)" },
  { valor: "06", label: "Junho (06)" },
  { valor: "04", label: "Abril (04)" },
  { valor: "02", label: "Fevereiro (02)" },
];

export interface DadosMapeamento {
  ano: string;
  mes: string;
  estado: string;
  regiao: string;
  total_familias: number;
}

export interface RenderizadorAbasProps {
  abaAtiva: TabDashboard;
  estadoSelecionado: string | null;
  setEstadoSelecionado: (estado: string | null) => void;
  geoJsonEstado: any;
  dadosChefiaCsv: any[];
  dadosEvolucaoCsv: any[];
}

export interface Props {
  dadosCsv: any[];
  estadoSelecionado: string | null;
  mesFiltro: string;
}
