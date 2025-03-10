import { ValidarPdfResponse } from '../interfaces/validar_pdf';

export const validatePdf: ValidarPdfResponse = {
  finalizado: true,
  mensaje: '1 firma(s) digital(es) identificada(s).',
  datos: {
    firmas: [
      {
        noModificado: true,
        cadenaConfianza: true,
        firmadoDuranteVigencia: true,
        firmadoAntesRevocacion: true,
        timeStamp: false,
        fechaFirma: '2025-02-04T11:54:23.000-04:00',
        certificado: {
          ci: '5305712',
          nombreSignatario: 'LUIS FERNANDO ARGANDOÑA ESPADA',
          cargoSignatario: '',
          organizacionSignatario: '',
          emailSignatario: 'largandona.cocha@gmail.com',
          nombreECA: 'Entidad Certificadora Publica ADSIB',
          descripcionECA: 'ADSIB',
          inicioValidez: '2024-12-03T18:17:47.000+00:00',
          finValidez: '2025-12-03T18:17:47.000+00:00',
          revocado: undefined,
        },
      },
    ],
  },
};
