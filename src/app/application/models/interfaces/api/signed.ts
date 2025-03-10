export interface responceSigned {
  id: string;
  fecha: string;
  idUser: string;
  idDocumento: string;
  idToken: string;
  Documento: peyloadDocumento;
  User: peyloadUser;
  Token: peyloadToken;
}

export interface peyloadDocumento {
  id: string;
  nombre: string;
  tipo_documento: string;
  documento_blob: string;
  estado: any;
  fecha_creacion: string;
  id_historial: string;
  fecha_modificacion?: string | null;
  fecha_eliminacion?: string | null;
  is_deleted: string | null;
  isUpdate: string | null;
}
export interface peyloadUser {
  email: string;
  name: string;
  ci: string;
  tipo_user: string;
}
export interface peyloadToken {
  id: string;
  tipo: string;
  id_token_provedor: string;
  ci_titual: string;
  email_titular: string;
  descripcion_titular: string;
  id_certificado: string;
  is_active: string;
  is_deleted: string;
  isUpdate: string;
  Certificado: peyloadCertificado;
}
export interface peyloadCertificado {
  id: string;
  tipo_certificado: string;
  desde: string;
  hasta: string;
  emisor: string;
}
