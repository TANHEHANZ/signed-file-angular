import { FormsModule } from '@angular/forms';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../../../application/services/user.service';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ICONS } from '../../../shared/ui/icons';
import { MenuModule } from 'primeng/menu';
import { SwichService } from '../../../../application/global/swich.service';
import { DrawerService } from '../../../../application/global/drawer.service';
import { DrawerComponent } from '../../../shared/drawer/drawer.component';
import { InformacionUserComponent } from './informacion-user.component';
import { state } from '@angular/animations';
import { ButtonSecundaryComponent } from '../../../shared/ui/button/secundary.component';
import { Subscription } from 'rxjs';
import { UserFilterComponent } from './filters.component';
@Component({
  selector: 'user-table',
  imports: [
    CommonModule,
    MenuModule,
    ButtonSecundaryComponent,
    FormsModule,
    UserFilterComponent,
  ],
  template: `
    <user-filter (filterChanged)="applyFilters($event)"></user-filter>
    <article
      class="min-h-[55dvh] max-h-[55dvh] border border-gray-300 rounded-xl overflow-hidden w-full overflow-y-scroll  min-w-[80dvw]  "
    >
      <table class="w-full">
        <thead class="text-sm border-b border-gray-300 sticky top-0 bg-white ">
          <tr class="">
            <th>#</th>
            <th class="font-light text-start p-2">Nombre</th>
            <th class="font-light text-start p-2">Ci</th>
            <th class="font-light text-start p-2">Tipo</th>
            <th class="font-light text-start p-2">Unidad</th>
            <th class="font-light text-start p-2">Institucion</th>
            <th class="font-light text-start p-2">Cargo</th>
            <th class="font-light text-start p-2">Estado</th>
            <th class="font-light text-start p-2">Rol</th>
            <th class="font-light text-start p-2">Acciones</th>
          </tr>
        </thead>
        <tbody
          class=" [&>*:nth-child(odd)]:bg-primary/10 [&>*:nth-child(even)]:bg-primary/2"
        >
          @for (item of user; track $index) {
          <tr class="text-sm lowercase border-b border-gray-300 ">
            <td class="p-2">{{ (page - 1) * limit + $index + 1 }}</td>

            <td class="p-2 ">{{ item.name }}</td>
            <td class="p-2 ">{{ item.ci }}</td>
            <td class="p-2 ">{{ item.tipo_user }}</td>
            <td class="p-2 ">{{ item.unidad }}</td>
            <td class="p-2 ">{{ item.institucion }}</td>
            <td class="p-2 ">{{ item.cargo }}</td>
            <td class="p-2 flex justify-center items-center">
              <p
                class="text-sm border rounded-xl text-center px-4  "
                [ngClass]="{
                  'border-primary text-primary': item.estado_user === 'ACTIVO',
                  'border-error text-error': item.estado_user === 'ELIMINADO',
                  'border-processing text-processing':
                    item.estado_user === 'EDITADO',
                  'border-gray-400 text-graborder-gray-400':
                    item.estado_user === 'DESHABILITADO'
                }"
              >
                {{ item.estado_user }}
              </p>
            </td>
            <td class="p-2 ">{{ item.rol }}</td>
            <td class="p-2 text-center">
              <button (click)="menu.toggle($event)" class="w-full ">
                <i [ngClass]="ICONS.MENU_VERTICAL"></i>
              </button>
            </td>
            <p-menu [model]="getMenuItems(item)" [popup]="true" #menu></p-menu>
          </tr>
          }@empty {
          <tr>
            No hay Datos de usuarios
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
export class UserTable implements OnInit, OnDestroy {
  userS = inject(UserService);
  toast = inject(MessageService);
  modalS = inject(SwichService);
  drawerService = inject(DrawerService);
  user: any[] = [];
  ICONS = ICONS;
  subscription!: Subscription;
  page = 1;
  limit = 10;
  lastPage = 1;
  total = 0;
  filters = {
    nameFilter: '',
    TipoFilter: '',
    state: '',
    page: 1,
    limit: 10,
  };
  getMenuItems(user: any) {
    return [
      {
        label: 'Asignar Token',
        command: () => this.asignarToken(user),
      },
      {
        label: 'Informacion del usuario',
        command: () => this.iformacion(user),
      },
      {
        label: 'Editar usuario',
        command: () => this.editarUsuario(user),
      },
      {
        label: user.estado_user === 'ACTIVO' ? 'Inhabilitar' : 'Habilitar',
        command: () => this.cambiarEstadoUsuario(user),
      },
    ];
  }
  applyFilters(filters: {
    nameFilter?: string;
    TipoFilter?: string;
    state?: string;
  }) {
    this.page = 1;
    this.filters = {
      ...this.filters,
      ...filters,
      page: this.page,
      limit: this.limit,
    };
    if (!filters.nameFilter && !filters.TipoFilter && !filters.state) {
      this.filters = {
        nameFilter: '',
        TipoFilter: '',
        state: '',
        page: 1,
        limit: this.limit,
      };
    }
    this.loadUsers();
  }
  ngOnInit(): void {
    this.loadUsers();

    this.subscription = this.userS.refresh$.subscribe(() => {
      this.loadUsers();
    });
  }
  loadUsers() {
    this.userS
      .getAllUser({
        nameFilter: this.filters.nameFilter,
        TipoFilter: this.filters.TipoFilter,
        state: this.filters.state,
        page: this.page,
        limit: this.limit,
      })
      .subscribe((response) => {
        this.user = response.data;
        this.total = response.pagination.total;
        this.lastPage = response.pagination.lastPage;
      });
  }

  asignarToken(selectedUser: any) {
    this.modalS.$modal.emit('assign-token');
    this.modalS.setData(selectedUser);
  }
  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.loadUsers();
    }
  }

  nextPage() {
    if (this.page < this.lastPage) {
      this.page++;
      this.loadUsers();
    }
  }

  changeLimit() {
    this.page = 1;
    this.loadUsers();
  }
  editarUsuario(user: any) {
    this.modalS.$modal.emit('register');
    this.modalS.setData(user);
  }

  iformacion(selectedUser: any) {
    console.log(selectedUser);
    this.drawerService.openDrawer(
      'Informacion del usuario',
      InformacionUserComponent,
      selectedUser
    );
  }

  cambiarEstadoUsuario(selectedUser: any) {
    const newState =
      selectedUser.estado_user === 'ACTIVO' ? 'DESHABILITADO' : 'ACTIVO';
    this.userS.unsubscribe(selectedUser.id, newState).subscribe({
      next: (value) => {
        this.toast.add({
          severity: 'success',
          summary: 'Éxito',
          detail: value.message,
          life: 3000,
        });
        selectedUser.estado_user = newState;
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

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
