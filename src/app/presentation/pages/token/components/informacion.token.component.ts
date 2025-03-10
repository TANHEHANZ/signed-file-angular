import { Component, inject, OnInit } from '@angular/core';
import { DrawerService } from '../../../../application/global/drawer.service';
import { TokenService } from '../../../../application/services/token.service';
import { CommonModule } from '@angular/common';
import CardComponenr from '../../../shared/ui/card..component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'informacion-token',
  standalone: true,
  imports: [CommonModule, CardComponenr, CalendarModule, FormsModule],
  template: `
    <section class="p-4">
      <h2 class="text-xl mb-4">Información del Token</h2>
      <div class="grid grid-cols-3 gap-4">
        <!-- Token Information -->
        <h3 class="font-medium col-span-3 mb-2">Información General</h3>
        <app-card title="Alias">
          <p class="text-sm">{{ infoToken?.alias }}</p>
        </app-card>
        <app-card title="Token ID">
          <p class="text-sm">{{ infoToken?.token_id }}</p>
        </app-card>
        <app-card title="Tipo de Token">
          <p class="text-sm">{{ infoToken?.tipo_token }}</p>
        </app-card>
        <app-card title="Cantidad de Certificados">
          <p class="text-sm">{{ infoToken?.cantidad_certificados }}</p>
        </app-card>
        <app-card title="Cantidad de Llaves Privadas">
          <p class="text-sm">{{ infoToken?.cantidad_priv_key }}</p>
        </app-card>
        <app-card title="Estado">
          <p
            class="text-sm border rounded-xl text-center px-4"
            [ngClass]="{
              'border-signed text-signed': infoToken?.estado_token === 'ACTIVO',
              'border-error text-error':
                infoToken?.estado_token === 'ELIMINADO',
              'border-processing text-processing':
                infoToken?.estado_token === 'EDITADO',
              'border-gray-400': infoToken?.estado_token === 'DESHABILITADO'
            }"
          >
            {{ infoToken?.estado_token }}
          </p>
        </app-card>

        <!-- Certificate Information -->
        <h3 class="font-medium col-span-3 mt-4 mb-2">
          Información del Certificado
        </h3>
        <app-card title="Tipo de Certificado">
          <p class="text-sm">{{ infoToken?.Certificado?.tipo_certificado }}</p>
        </app-card>
        <app-card title="ID Certificado">
          <p class="text-sm">
            {{ infoToken?.Certificado?.id_certificado_token }}
          </p>
        </app-card>
        <app-card title="Vigencia">
          <div class="flex flex-col gap-1 text-sm">
            <p>
              Desde: {{ infoToken?.Certificado?.desde | date : 'dd/MM/yyyy' }}
            </p>
            <p>
              Hasta: {{ infoToken?.Certificado?.hasta | date : 'dd/MM/yyyy' }}
            </p>
          </div>
        </app-card>

        <!-- Titular Information -->
        <h3 class="font-medium col-span-3 mt-4 mb-2">
          Información del Titular
        </h3>
        <app-card title="Nombre">
          <p class="text-sm">{{ infoToken?.Certificado?.titular?.nombre }}</p>
        </app-card>
        <app-card title="CI">
          <p class="text-sm">{{ infoToken?.Certificado?.titular?.ci }}</p>
        </app-card>
        <app-card title="Email">
          <p class="text-sm">{{ infoToken?.Certificado?.titular?.email }}</p>
        </app-card>
        <app-card title="Descripción" class="col-span-3">
          <p class="text-sm">
            {{ infoToken?.Certificado?.titular?.descripcion }}
          </p>
        </app-card>

        <!-- Emisor Information -->
        <h3 class="font-medium col-span-3 mt-4 mb-2">Información del Emisor</h3>
        <app-card title="Entidad" class="col-span-3">
          <p class="text-sm">{{ infoToken?.Certificado?.Emisor?.entidad }}</p>
        </app-card>
      </div>
    </section>
  `,
})
export default class InformacionTokenComponent implements OnInit {
  drawerS = inject(DrawerService);
  tokenS = inject(TokenService);
  infoToken: any;

  ngOnInit(): void {
    this.drawerS.getData().subscribe((data) => {
      this.infoToken = data;
      console.log(data);
    });
  }
}
