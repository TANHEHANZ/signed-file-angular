interface ValidarPdfRequest {
  pdf: string;
}
export interface ValidarPdfResponse {
  datos: {
    firmas: {
      noModificado: boolean; // Indica si el documento ha sido modificado después de la firma
      cadenaConfianza: boolean; // Indica si el certificado pertenece a la infraestructura de clave pública del Estado Plurinacional de Bolivia
      firmadoDuranteVigencia: boolean; // Indica si la firma se realizó durante la vigencia del certificado
      firmadoAntesRevocacion: boolean; // Indica si la firma se realizó antes de la revocación del certificado
      timeStamp: boolean; // Indica si se utilizó un sello de tiempo
      fechaFirma: string; // Fecha de la firma
      certificado: {
        ci: string; // Número de cédula de identidad del firmante
        nombreSignatario: string; // Nombre del firmante
        cargoSignatario: string; // Cargo del firmante
        organizacionSignatario: string; // Organización del firmante
        emailSignatario: string; // Correo electrónico del firmante
        nombreECA: string; // Nombre de la Entidad Certificadora Autorizada (ECA)
        descripcionECA: string; // Descripción de la ECA
        inicioValidez: string; // Fecha de inicio de validez del certificado
        finValidez: string; // Fecha de fin de validez del certificado
        revocado?: string; // Fecha de revocación del certificado (si está revocado)
      };
    }[];
  };
  finalizado: boolean; // Indica si la validación se completó correctamente
  mensaje: string; // Mensaje descriptivo del resultado
}
