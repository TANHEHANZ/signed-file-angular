import { TokenDataResponse } from '../interfaces/validate.token';

export const tokenDataValidate: TokenDataResponse = {
  datos: {
    data_token: {
      certificates: 1,
      data: [
        {
          tipo: 'PRIMARY_KEY',
          tipo_desc: 'Clave Privada',
          alias: 'Alias de Token',
          id: '12345',
          tiene_certificado: true,
          adsib: false,
          serialNumber: '203531650003002A',
          pem: '-----BEGIN PRIVATE KEY-----...',
          validez: { desde: '2023-01-01', hasta: '2024-01-01' },
          titular: {
            dnQualifier: 'qualifier',
            CN: 'John Doe',
            OU: 'Unit Name',
            O: 'Organization',
            uidNumber: '1001',
          },
          emisor: {
            CN: 'CA Name',
            O: 'Issuer Organization',
          },
        },
      ],
      private_keys: 1,
    },
  },
  finalizado: true,
  mensaje: 'Token Validado Correctamente',
};
