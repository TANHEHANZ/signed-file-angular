export interface TokenPayload {
  cantidad_certificados: number;
  cantidad_priv_key: number;
  alias: string;
  tipo_token: string;
  token_id: string;
  validate_certificado: boolean;
  tipo_certificado: string;
  id_certificado_token: string;
  desde: string;
  hasta: string;
  entidad: string;
  ci: string;
  descripcion?: string;
  email?: string;
  nombre?: string;
  estado_token: string;
}
