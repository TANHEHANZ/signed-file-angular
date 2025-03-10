import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import CardComponenr from '../../shared/ui/card..component';

interface ValidatedResponse {
  finalizado: boolean;
  mensaje: string;
  datos: {
    firmas: Array<{
      noModificado: boolean;
      cadenaConfianza: boolean;
      firmadoDuranteVigencia: boolean;
      firmadoAntesRevocacion: boolean;
      versionado: boolean;
      timeStamp: boolean;
      fechaFirma: string;
      certificado: {
        ci: string;
        nombreSignatario: string;
        cargoSignatario: string;
        organizacionSignatario: string;
        emailSignatario: string;
        nombreECA: string;
        descripcionECA: string;
        inicioValidez: string;
        finValidez: string;
        revocado: string | null;
        numeroSerie: string;
      };
    }>;
  };
}

@Component({
  selector: 'info-validated',
  standalone: true,
  imports: [CommonModule, CalendarModule, FormsModule, CardComponenr],
  template: `
    <section class=" max-h-[80vh] overflow-y-scroll h-full">
      @if (validationData) {
      <div class="grid grid-cols-2 gap-4 ">
        <h2 class="text-xl mb-4">Información de validación del documento</h2>
        <h3 class="font-medium col-span-2 mb-4">Estado de validación</h3>
        <app-card title="Estado">
          <p
            class="text-sm border rounded-xl text-center px-4"
            [ngClass]="{
              'border-signed text-signed': validationData.finalizado === true,
              'border-error text-error': validationData.finalizado !== true
            }"
          >
            {{ validationData.mensaje || 'Documento Anallizado por jacubitus' }}
          </p>
        </app-card>
        @if(validationData.datos.firmas.length === 0){
        <div
          class="flex flex-col items-center justify-center p-8 text-gray-200 border-2 border-gray-300 rounded-xl h-full bg-primary col-span-2"
        >
          <i
            class="pi pi-file-pdf text-4xl mb-4 p-4 rounded-full bg-white text-black"
          ></i>
          <p class="text-center text-white text-xl">
            El documento no ha sido firmado digitalmente
          </p>
        </div>
        } @for (firma of validationData.datos.firmas; track $index) {
        <h3 class="font-medium col-span-2 mt-4">
          Firma {{ $index + 1 }} de {{ validationData.datos.firmas.length }}
        </h3>

        <app-card title="Estado de la firma">
          <div class="flex flex-col gap-2">
            <p class="text-sm">
              <span class="font-medium">Integridad:</span>
              {{ firma.noModificado ? '✓ No modificado' : '✗ Modificado' }}
            </p>
            <p class="text-sm">
              <span class="font-medium">Cadena de confianza:</span>
              {{ firma.cadenaConfianza ? '✓ Válida' : '✗ Inválida' }}
            </p>
            <p class="text-sm">
              <span class="font-medium">Vigencia:</span>
              {{ firma.firmadoDuranteVigencia ? '✓ Vigente' : '✗ No vigente' }}
            </p>
          </div>
        </app-card>

        <app-card title="Fecha de firma">
          <p class="text-sm">
            {{ firma.fechaFirma | date : 'dd/MM/yyyy HH:mm:ss' }}
          </p>
        </app-card>

        <app-card title="Información del firmante">
          <div class="flex flex-col gap-2">
            <p class="text-sm">
              <span class="font-medium">Nombre:</span>
              {{ firma.certificado.nombreSignatario }}
            </p>
            <p class="text-sm">
              <span class="font-medium">CI:</span>
              {{ firma.certificado.ci }}
            </p>
            <p class="text-sm">
              <span class="font-medium">Email:</span>
              {{ firma.certificado.emailSignatario }}
            </p>
          </div>
        </app-card>

        <app-card title="Información del certificado">
          <div class="flex flex-col gap-2">
            <p class="text-sm">
              <span class="font-medium">Entidad:</span>
              {{ firma.certificado.nombreECA }}
            </p>
            <p class="text-sm">
              <span class="font-medium">Tipo:</span>
              {{ firma.certificado.descripcionECA }}
            </p>
            <p class="text-sm">
              <span class="font-medium">Vigencia:</span>
              {{ firma.certificado.inicioValidez | date : 'dd/MM/yyyy' }} -
              {{ firma.certificado.finValidez | date : 'dd/MM/yyyy' }}
            </p>
          </div>
        </app-card>

        }
      </div>
      } @else {
      <div
        class="flex flex-col items-center justify-center p-8 text-gray-100 border-2 border-gray-300 rounded-xl h-full bg-primary "
      >
        <i class="pi pi-file-pdf text-4xl mb-4"></i>
        <p class="text-center">
          Suba un documento PDF firmado digitalmente para visualizar su
          información de validación
        </p>
      </div>
      }
    </section>
  `,
})
export class InfoValidatedComponent {
  @Input() validationData?: ValidatedResponse;
}
