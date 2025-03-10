export interface TokenDataRequest {
  slot: number;
  pin: string;
}

export interface TokenDataResponse {
  datos: {
    data_token: {
      certificates: number;
      data: {
        tipo: 'PRIMARY_KEY' | 'X509_CERTIFICATE';
        tipo_desc: 'Certificado' | 'Clave Privada';
        alias: string;
        id: string;
        tiene_certificado: boolean;
        adsib: boolean;
        serialNumber: string;
        pem: string;
        validez: {
          desde: string;
          hasta: string;
        };
        titular: {
          dnQualifier: string;
          CN: string;
          OU: string;
          O: string;
          uidNumber: string;
        };
        emisor: {
          CN: string;
          O: string;
        };
      }[];
      private_keys: number;
    };
  };
  finalizado: boolean;
  mensaje: string;
}
