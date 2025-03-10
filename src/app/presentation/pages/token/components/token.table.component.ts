import { Component, inject, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ICONS } from '../../../shared/ui/icons';
import { MenuModule } from 'primeng/menu';
import { TokenService } from '../../../../application/services/token.service';
import { ResponseToken } from '../../../../application/models/interfaces/api/token/response';
import { TokenFiltersComponet } from './filers.token.component';
import { ButtonSecundaryComponent } from '../../../shared/ui/button/secundary.component';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DrawerService } from '../../../../application/global/drawer.service';
import InformacionTokenComponent from './informacion.token.component';
@Component({
  selector: 'token-table',
  imports: [
    CommonModule,
    MenuModule,
    TokenFiltersComponet,
    ButtonSecundaryComponent,
    FormsModule,
  ],
  template: `
    <token-filter (filterChanged)="applyFilters($event)"></token-filter>
    <article
      class="min-h-[55dvh] max-h-[55dvh] border border-gray-300 rounded-xl overflow-hidden w-full overflow-y-scroll  min-w-[80dvw]  "
    >
      <table class="w-full">
        <thead class="text-sm border-b border-gray-300">
          <tr>
            <th class="font-light text-start px-1 py-2 w-[5%]">#</th>
            <th class="font-light text-start px-1 py-2 w-[18%]">Titular</th>
            <th class="font-light text-start px-1 py-2 w-[10%]">Ci</th>
            <th class="font-light text-start px-1 py-2 w-[5%]">Estado</th>
            <th class="font-light text-start px-1 py-2 w-[15%]">Email</th>
            <th class="font-light text-start px-1 py-2 w-[20%]">Emisor</th>
            <th class="font-light text-start px-1 py-2 w-[15%]">
              Tipo Certificado
            </th>
            <th class="font-light text-start px-1 py-2 w-[12%]">
              Validez del Token
            </th>
            <th class="font-light text-start px-1 py-2 w-[12%]">Acciones</th>
          </tr>
        </thead>
        <tbody class=" [&>*:nth-child(odd)]:bg-primary/15">
          @for (item of token; track $index) {
          <tr class="text-sm lowercase border-b border-gray-300">
            <td class="p-2">{{ (page - 1) * limit + $index + 1 }}</td>

            <td class="px-1 py-2 truncate">
              {{ item.Certificado.titular.nombre }}
            </td>
            <td class="px-1 py-2 truncate">
              {{ item.Certificado.titular.ci }}
            </td>
            <td class="px-1 py-2 truncate">
              <p
                class="text-sm border rounded-xl text-center px-4  "
                [ngClass]="{
                  'border-signed text-signed': item.estado_token === 'ACTIVO',
                  'border-error text-error': item.estado_token === 'ELIMINADO',
                  'border-processing text-processing':
                    item.estado_token === 'EDITADO',
                  'border-gray-400 text-graborder-gray-400':
                    item.estado_token === 'DESHABILITADO'
                }"
              >
                {{ item.estado_token }}
              </p>
            </td>
            <td class="px-1 py-2 truncate">
              {{ item.Certificado.titular.email }}
            </td>
            <td class="px-1 py-2 truncate">
              {{ item.Certificado.Emisor.entidad }}
            </td>
            <td class="px-1 py-2 truncate">
              {{ item.Certificado.tipo_certificado }}
            </td>
            <td class="px-1 py-2">
              <span
                [ngClass]="getValidityClass(item.Certificado.hasta)"
                class="px-2 rounded text-sm"
              >
                {{ getValidityStatus(item.Certificado.hasta) }}
              </span>
              <div class="text-xs text-gray-600 mt-1">
                Expira: {{ item.Certificado.hasta | date : 'dd/MM/yyyy' }}
              </div>
            </td>

            <td class=" text-center">
              <button (click)="menu.toggle($event)" class="w-full ">
                <i [ngClass]="ICONS.MENU_VERTICAL"></i>
              </button>
            </td>
            <p-menu [model]="getMenuItems(item)" [popup]="true" #menu></p-menu>
          </tr>
          }@empty {
          <td colspan="1000" class="text-center h-full">
            No hay registros de los tokens
          </td>
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
export class TokenTable implements OnInit {
  toast = inject(MessageService);
  token: ResponseToken[] = [];
  tokenS = inject(TokenService);
  drawerService = inject(DrawerService);

  subscription!: Subscription;
  page = 1;
  limit = 10;
  lastPage = 1;
  total = 0;
  filters = {
    nombreTitular: '',
    ciTitular: '',
    entidadEmisora: '',
    fechaExpiracion: '',
    page: 1,
    limit: 10,
  };
  ICONS = ICONS;
  getMenuItems(item: any) {
    return [
      {
        label: 'Informacion del Token',
        command: () => this.informacion(item),
      },
      {
        label: item.estado_token === 'ACTIVO' ? 'Inhabilitar' : 'Habilitar',
        command: () => this.deshabilitar(item),
      },
    ];
  }
  applyFilters(filters: {
    nombreTitular?: string;
    ciTitular?: string;
    entidadEmisora?: string;
    fechaExpiracion?: string;
  }) {
    this.page = 1;
    this.filters = {
      ...this.filters,
      ...filters,
      page: this.page,
      limit: this.limit,
    };
    this.getToken();
  }
  getValidityStatus(expiryDate: string): string {
    const now = new Date();
    const expiry = new Date(expiryDate);
    return now <= expiry ? 'Válido' : 'Expirado';
  }

  getValidityClass(expiryDate: string): string {
    const now = new Date();
    const expiry = new Date(expiryDate);
    return now <= expiry
      ? 'border border-signed rounded-full text-signed '
      : 'border border-error rounded-full text-error';
  }
  ngOnInit(): void {
    this.getToken();
  }
  getToken() {
    this.tokenS
      .getAllToken({
        nombreTitular: this.filters.nombreTitular,
        ciTitular: this.filters.ciTitular,
        entidadEmisora: this.filters.entidadEmisora,
        fechaExpiracion: this.filters.fechaExpiracion,
        page: this.page,
        limit: this.limit,
      })
      .subscribe({
        next: (value) => {
          this.token = value.data;
          this.total = value.pagination.total;
          this.lastPage = value.pagination.lastPage;
          this.page = value.pagination.page;
        },
        error: (err) => {
          this.toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al cargar los tokens',
            life: 3000,
          });
        },
      });
  }
  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.getToken();
    }
  }

  nextPage() {
    if (this.page < this.lastPage) {
      this.page++;
      this.getToken();
    }
  }

  changeLimit() {
    this.page = 1;
    this.getToken();
  }

  informacion(item: any) {
    this.drawerService.openDrawer(
      'Informacion del Token',
      InformacionTokenComponent,
      item
    );
  }
  deshabilitar(item: any) {
    const newState =
      item.estado_token === 'ACTIVO' ? 'DESHABILITADO' : 'ACTIVO';
    this.tokenS.unsubscribe(item.id, newState).subscribe({
      next: (value) => {
        this.toast.add({
          severity: 'success',
          summary: 'Éxito',
          detail: value.message,
          life: 3000,
        });
        item.estado_token = newState;
      },
      error: (err) => {
        this.toast.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.message || 'Ocurrió un error inesperado',
          life: 3000,
        });
      },
    });
  }
}
