import {
  Component,
  inject,
  PLATFORM_ID,
  Inject,
  OnInit,
  signal,
} from '@angular/core';
import { DrawerService } from '../../../../../application/global/drawer.service';
import { SignedService } from '../../../../../application/services/signed.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ButtonPrimaryComponent } from '../../../../shared/ui/button/primary.component';
import { ICONS } from '../../../../shared/ui/icons';
import CardComponenr from '../../../../shared/ui/card..component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'informationFile',
  standalone: true,
  imports: [CommonModule, CardComponenr, CalendarModule, FormsModule],
  template: `
    <section class="p-4">
      <div class="mb-8">
        <h2 class="text-xl font-semibold mb-6">Información Principal</h2>
        <div class="bg-white rounded-lg p-6 shadow-sm">
          <!-- Document Information -->
          <div class="border-b pb-4 mb-4">
            <h3 class="font-medium text-lg mb-4">Información del documento</h3>
            <div class="grid grid-cols-2 gap-4">
              <app-card title="Nombre del documento">
                <p class="text-sm">
                  {{ infoHistory?.principal?.Documento?.nombre }}
                </p>
              </app-card>
              <app-card title="Fecha de creación">
                <p-calendar
                  [(ngModel)]="documentCreationDate"
                  [showIcon]="true"
                  [showTime]="true"
                  disabled="true"
                  dateFormat="dd/mm/yy"
                ></p-calendar>
              </app-card>
              <app-card title="Estado">
                <p
                  class="text-sm border rounded-xl text-center px-4 py-1"
                  [ngClass]="{
                    'border-signed text-signed bg-signed/10':
                      infoHistory?.principal?.Documento?.estado === 'ACTIVO',
                    'border-error text-error bg-error/10':
                      infoHistory?.principal?.Documento?.estado === 'ELIMINADO',
                    'border-processing text-processing bg-processing/10':
                      infoHistory?.principal?.Documento?.estado === 'EDITADO',
                    'border-gray-400':
                      infoHistory?.principal?.Documento?.estado ===
                      'DESHABILITADO'
                  }"
                >
                  {{
                    infoHistory?.principal?.Documento?.estado === 'ACTIVO'
                      ? 'FIRMADO'
                      : infoHistory?.principal?.Documento?.estado
                  }}
                </p>
              </app-card>
            </div>
          </div>

          <!-- Signer Information -->
          <div class="border-b pb-4 mb-4">
            <h3 class="font-medium text-lg mb-4">Información del firmante</h3>
            <div class="grid grid-cols-2 gap-4">
              <app-card title="Nombre">
                <p class="text-sm">{{ infoHistory?.principal?.User?.name }}</p>
              </app-card>
              <app-card title="CI">
                <p class="text-sm">{{ infoHistory?.principal?.User?.ci }}</p>
              </app-card>
            </div>
          </div>

          <!-- Token Information -->
          @for(asig of infoHistory?.principal?.User?.AsignacionToken; track
          $index) {
          <div class="border-b pb-4 mb-4 last:border-0">
            <h3 class="font-medium text-lg mb-4">Información del Token</h3>
            <div class="grid grid-cols-2 gap-4">
              <app-card title="Fecha de asignación">
                <p-calendar
                  [(ngModel)]="asig.fecha_asignacion"
                  [showIcon]="true"
                  [showTime]="true"
                  disabled="true"
                  dateFormat="dd/mm/yy"
                ></p-calendar>
              </app-card>
              <app-card title="Estado del token">
                <p
                  class="text-sm px-3 py-1 rounded-full"
                  [ngClass]="{
                    'bg-green-100 text-green-800':
                      asig.token.estado_token === 'ACTIVO',
                    'bg-red-100 text-red-800':
                      asig.token.estado_token === 'INACTIVO'
                  }"
                >
                  {{ asig.token.estado_token }}
                </p>
              </app-card>
              <app-card title="Tipo de token">
                <p class="text-sm">{{ asig.token.tipo_token }}</p>
              </app-card>
              <app-card title="Cantidad de certificados">
                <p class="text-sm">{{ asig.token.cantidad_certificados }}</p>
              </app-card>
            </div>

            <!-- Certificate Information -->
            <div class="mt-4">
              <h4 class="font-medium text-md mb-3">
                Información del Certificado
              </h4>
              <div class="grid grid-cols-2 gap-4">
                <app-card title="Titular">
                  <p class="text-sm">
                    {{ asig.token.Certificado?.titular?.nombre }}
                  </p>
                </app-card>
                <app-card title="CI Titular">
                  <p class="text-sm">
                    {{ asig.token.Certificado?.titular?.ci }}
                  </p>
                </app-card>
                <app-card title="Email">
                  <p class="text-sm">
                    {{ asig.token.Certificado?.titular?.email }}
                  </p>
                </app-card>
                <app-card title="Emisor">
                  <p class="text-sm">
                    {{ asig.token.Certificado?.Emisor?.entidad }}
                  </p>
                </app-card>
                <app-card title="Vigencia" class="col-span-2">
                  <div class="flex gap-2 items-center">
                    <p-calendar
                      [(ngModel)]="certificateStartDate"
                      [showIcon]="true"
                      disabled="true"
                      dateFormat="dd/mm/yy"
                    ></p-calendar>
                    <span>hasta</span>
                    <p-calendar
                      [(ngModel)]="certificateEndDate"
                      [showIcon]="true"
                      disabled="true"
                      dateFormat="dd/mm/yy"
                    ></p-calendar>
                  </div>
                </app-card>
              </div>
            </div>
          </div>
          }
        </div>
      </div>

      <!-- History Section -->
      <div class="mt-8">
        <h2 class="text-xl font-semibold mb-6">Historial de Modificaciones</h2>
        @if(infoHistory?.history?.length) {
        <div class="space-y-4">
          @for(item of infoHistory.history; track item.id) {
          <div class="bg-white rounded-lg p-6 shadow-sm">
            <div class="grid grid-cols-2 gap-4">
              <app-card title="Fecha de modificación">
                <p-calendar
                  [(ngModel)]="item.fecha"
                  [showIcon]="true"
                  [showTime]="true"
                  disabled="true"
                  dateFormat="dd/mm/yy"
                ></p-calendar>
              </app-card>
              <app-card title="Usuario">
                <p class="text-sm">{{ item.User?.name }}</p>
              </app-card>
              <app-card title="Estado">
                <p
                  class="text-sm border rounded-xl text-center px-4 py-1"
                  [ngClass]="{
                    'border-signed text-signed bg-signed/10':
                      item.Documento?.estado === 'ACTIVO',
                    'border-error text-error bg-error/10':
                      item.Documento?.estado === 'ELIMINADO',
                    'border-processing text-processing bg-processing/10':
                      item.Documento?.estado === 'EDITADO'
                  }"
                >
                  {{ item.Documento?.estado }}
                </p>
              </app-card>
            </div>
          </div>
          }
        </div>
        } @else {
        <p class="text-gray-500 text-center py-4">
          No hay historial de modificaciones
        </p>
        }
      </div>
    </section>
  `,
})
export default class InformationFile implements OnInit {
  drawerService = inject(DrawerService);
  historyS = inject(SignedService);
  ICONS = ICONS;
  sanitizer = inject(DomSanitizer);
  documentDate = signal<Date | null>(null);
  infoHistory: any;
  documentCreationDate = signal<Date | null>(null);
  certificateStartDate = signal<Date | null>(null);
  certificateEndDate = signal<Date | null>(null);
  ngOnInit() {
    this.drawerService.getData().subscribe((data) => {
      if (data && data.idDocumento) {
        this.historyS.signedHistory(data.idDocumento).subscribe({
          next: (res: any) => {
            if (res.data?.principal?.User?.AsignacionToken) {
              res.data.principal.User.AsignacionToken =
                res.data.principal.User.AsignacionToken.map((asig: any) => ({
                  ...asig,
                  fecha_asignacion: new Date(asig.fecha_asignacion),
                }));
            }

            if (this.infoHistory?.principal?.Documento?.fecha_creacion) {
              this.documentCreationDate.set(
                new Date(this.infoHistory.principal.Documento.fecha_creacion)
              );
            }
            if (res.data?.history) {
              res.data.history = res.data.history.map((item: any) => ({
                ...item,
                fecha: new Date(item.fecha),
              }));
            }
            this.infoHistory = res.data;

            const certificado =
              this.infoHistory?.principal?.User?.AsignacionToken?.[0]?.token
                ?.Certificado;
            if (certificado) {
              this.certificateStartDate.set(new Date(certificado.desde));
              this.certificateEndDate.set(new Date(certificado.hasta));
            }
          },
          error: (err) => {
            console.error('Error fetching document data:', err);
          },
        });
      }
    });
  }
  descargar(documentId: string) {
    if (documentId) {
      this.historyS.getPdfBlobUrl(documentId).subscribe({
        next: (url: string) => {
          const link = document.createElement('a');
          link.href = url;
          link.download =
            this.infoHistory?.principal[0]?.Documento?.nombre ||
            'documento.pdf';
          link.click();
          URL.revokeObjectURL(url);
        },
        error: (err) => {
          console.error('Error downloading document:', err);
        },
      });
    }
  }
}
