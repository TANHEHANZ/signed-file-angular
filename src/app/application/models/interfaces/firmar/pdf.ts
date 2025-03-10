export interface FirmarPdfRequest {
  slot: number;
  pin: string;
  alias: string;
  pdf: string;

  nombre: string;
  tipo_documento: string;
  bloquear?: boolean;
  point?: {
    x: number;
    y: number;
  };
  image?: string;
}
export interface FirmarPdfResponse {
  datos: {
    pdf_firmado: string;
  };
  finalizado: boolean;
  mensaje: string;
}
