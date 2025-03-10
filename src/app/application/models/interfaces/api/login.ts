export interface loginPeyload {
  ci: string;
  password: string;
}
export interface RegisterPeyload {
  estado_user: string;
  name: string;
  password: string;
  ci: string;
  institucion: string;
  unidad: string;
  cargo: string;
  tipo_user: string;
  rol: string | null;
}
