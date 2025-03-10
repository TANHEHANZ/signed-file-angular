export interface TokenConnectedResponse {
  datos: {
    connected: boolean;
    tokens: {
      slot: number;
      serial: string;
      name: string;
      model: string;
    }[];
  };
  finalizado: boolean;
  mensaje: string;
}
