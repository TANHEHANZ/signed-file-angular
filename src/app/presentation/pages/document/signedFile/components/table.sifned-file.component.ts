import { Component, inject } from '@angular/core';
import { DrawerComponent } from '../../../../shared/drawer/drawer.component';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../../application/services/user.service';
import { SwichService } from '../../../../../application/global/swich.service';
import { MenuItem, MessageService } from 'primeng/api';
import { DrawerService } from '../../../../../application/global/drawer.service';
import { ICONS } from '../../../../shared/ui/icons';
import { MenuModule } from 'primeng/menu';
import InformationFile from './informacion-file.component';
import { SignedService } from '../../../../../application/services/signed.service';
import { responceSigned } from '../../../../../application/models/interfaces/api/signed';
import { ButtonSecundaryComponent } from '../../../../shared/ui/button/secundary.component';
import StatusBadgeComponent from '../../../../shared/ui/status';
import { SignedFiltersComponet } from './filters.signed.components';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  imports: [
    CommonModule,
    MenuModule,
    ButtonSecundaryComponent,
    StatusBadgeComponent,
    SignedFiltersComponet,
    FormsModule,
  ],
  selector: 'table-signed-file',
  template: `
    <signed-filter (filterChanged)="applyFilters($event)"></signed-filter>
    <article
      class="min-h-[55dvh] max-h-[55dvh] border border-gray-300 rounded-xl overflow-hidden w-full overflow-y-auto  min-w-[80dvw]  "
    >
      <table class="w-full">
        <thead class="text-sm border-b border-gray-300">
          <th colspan="3" class="bg-secundary p-2 text-white font-light ">
            Usuario firmador
          </th>
          <th colspan="6" class="bg-terteary p-2 font-light ">
            informacion del documento firmado
          </th>
          <tr class="">
            <th class="font-light text-start p-2">Nombre</th>
            <th class="font-light text-start p-2">Ci</th>
            <th class="font-light text-start p-2">Persona</th>
            <th class="font-light text-start p-2">Nombre</th>
            <th class="font-light text-start p-2">Tipo</th>
            <th class="font-light text-start p-2">Fecha</th>
            <th class="font-light text-start p-2">Estado</th>
          </tr>
        </thead>
        <tbody
          class=" [&>*:nth-child(odd)]:bg-terteary/15 [&>*:nth-child(even)]:bg-secundary/2"
        >
          @for (item of data; track $index) {
          <tr class="text-sm lowercase border-b border-gray-300 ">
            <td class="py-3 ">{{ item.User.name }}</td>
            <td class="py-3 ">{{ item.User.ci }}</td>
            <td class="py-3 ">{{ item.User.tipo_user }}</td>
            <td class="py-3 ">{{ item.Documento.nombre }}</td>
            <td class="py-3 ">{{ item.Documento.tipo_documento }}</td>
            <td class="py-3 ">{{ item.fecha | date : 'short' }}</td>
            <td class="py-3">
              <status-badge [estado]="item.Documento.estado" />
            </td>

            <td class="p-2 text-center">
              <p-menu
                [model]="getMenuItems(item)"
                [popup]="true"
                #menu
              ></p-menu>
              <button (click)="menu.toggle($event)" class="w-full h-full px-3">
                <i [ngClass]="ICONS.MENU_VERTICAL"></i>
              </button>
            </td>
          </tr>
          }@empty {
          <tr class="h-[45dvh]">
            <td colspan="8" class="text-center text-xl align-middle">
              No
              <span class="text-primary ">hay documentos</span> firmados
            </td>
          </tr>
          }
        </tbody>
      </table>
    </article>
    <div class="flex justify-end items-center gap-4 my-2">
      <div class="flex justify-center items-center gap-4">
        <p class="text-sm">Filas por página</p>
        <select
          class="border border-primary p-2 rounded-md"
          [(ngModel)]="limit"
          (change)="changeLimit()"
        >
          <option *ngFor="let opt of [5, 10, 20, 30]" [value]="opt">
            {{ opt }}
          </option>
        </select>
      </div>

      <button-secundary
        [icon]="ICONS.LEFT"
        (click)="prevPage()"
        [disabled]="page === 1"
      ></button-secundary>
      <p class="text-sm">Página {{ page }} de {{ lastPage }}</p>
      <button-secundary
        [icon]="ICONS.RIGHT"
        (click)="nextPage()"
        [disabled]="page >= lastPage"
      ></button-secundary>
    </div>
  `,
})
export default class TableSignedFile {
  signedService = inject(SignedService);
  toast = inject(MessageService);
  modalS = inject(SwichService);
  drawerService = inject(DrawerService);
  user: any[] = [];
  ICONS = ICONS;
  data: responceSigned[] = [];
  subscription!: Subscription;
  page = 1;
  limit = 10;
  lastPage = 1;
  total = 0;
  filters = {
    nombreFirmador: '',
    Cifirmador: '',
    FechaCreacion: '',
    estadoDocumento: '',
    page: 1,
    limit: 10,
  };
  applyFilters(filters: {
    nombreFirmador?: string;
    Cifirmador?: string;
    FechaCreacion?: string;
    estadoDocumento?: string;
  }) {
    this.page = 1;
    this.filters = {
      ...this.filters,
      ...filters,
      page: this.page,
      limit: this.limit,
    };
    this.signed();
  }
  getMenuItems(item: any): MenuItem[] {
    return [
      {
        label: 'Ver Historial',
        icon: 'ri-history-line',
        command: () => this.Historial(item),
      },
      {
        label: 'Actualizar y firmar',
        icon: 'ri-file-edit-line',
        tooltipOptions: {
          tooltipLabel: 'Subir nueva versión del documento y firmar',
          tooltipPosition: 'left' as const,
        },
        command: () => this.actualizarYFirmar(item),
      },
    ];
  }

  ngOnInit(): void {
    this.signed();
  }
  signed() {
    this.signedService
      .docuemntsSigned({
        page: this.page,
        limit: this.limit,
        nombreFirmador: this.filters.nombreFirmador,
        Cifirmador: this.filters.Cifirmador,
        FechaCreacion: this.filters.FechaCreacion,
        estadoDocumento: this.filters.estadoDocumento,
      })
      .subscribe({
        next: (response) => {
          this.data = response.data;
          this.total = response.pagination.total;
          this.lastPage = response.pagination.lastPage;
        },
        error: (err) => {
          this.toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al cargar los documentos firmados',
            life: 3000,
          });
        },
      });
  }

  editarUsuario() {
    this.modalS.$modal.emit('register');
  }

  Historial(signed: any) {
    this.drawerService.openDrawer(
      'Historial del documento',
      InformationFile,
      signed
    );
  }
  actualizarYFirmar(documento: any) {
    this.modalS.$modal.emit('actualizar');
    this.modalS.setData({
      originalDocument: documento,
      type: 'update',
    });
  }
  darDeBajaUsuario() {
    console.log('Dando de baja usuario...');
  }
  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.signed();
    }
  }

  nextPage() {
    if (this.page < this.lastPage) {
      this.page++;
      this.signed();
    }
  }

  changeLimit() {
    this.page = 1;
    this.signed();
  }
}
