interface User {
  name: string;
  ci: string;
  fecha_creacion: string;
  tipo_user: string;
  estado_user: string;
  unidad: string;
  institucion: string;
  cargo: string;
}

interface Emisor {
  entidad: string;
}

interface Titular {
  ci: string;
  descripcion?: string;
  email?: string;
  nombre?: string;
}

interface Certificado {
  id: string;
  tipo_certificado: string;
  id_certificado_token: string;
  id_emisor: string;
  id_titular: string;
  desde: string;
  hasta: string;
  Emisor: Emisor;
  titular: Titular;
}

export interface ResponseToken {
  id: string;
  cantidad_certificados: number;
  cantidad_priv_key: number;
  alias: string;
  tipo_token: string;
  token_id: string;
  validate_certificado: boolean;
  estado_token: string;
  Certificado: Certificado;
}
