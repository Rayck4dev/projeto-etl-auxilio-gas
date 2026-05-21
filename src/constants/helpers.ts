import {
  MAPA_ESTADOS,
  SiglaEstado,
} from "@/constants/mapaBrasil";

export const extrairSigla = (
  feature: any,
): SiglaEstado => {

  const sigla = String(
    feature?.properties?.sigla ||
    feature?.properties?.id ||
    feature?.id ||
    "",
  ).trim();

  return sigla as SiglaEstado;
};

export const obterEstado = (
  sigla: SiglaEstado | null,
) => {

  if (!sigla)
    return null;

  return MAPA_ESTADOS[sigla];
};