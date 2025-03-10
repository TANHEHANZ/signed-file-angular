import { Component, inject, OnInit } from '@angular/core';
import { DrawerService } from '../../../../application/global/drawer.service';
import { UserService } from '../../../../application/services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-informacion-user',
  imports: [CommonModule],
  template: `
    <section
      class=" p-4 h-full flex justify-start items-start flex-col overflow-y-auto "
    >
      <h4 class="text-2xl font-bold ">Informacion del usuario</h4>
      <div class="h-full">
        @if (userData) {
        <div
          class="grid grid-cols-2 gap-2 my-4 w-full border border-gray-300 rounded-md p-4"
        >
          <p class="font-medium">Nombre:</p>
          <p>{{ userData.name }}</p>

          <p class="font-medium">CI:</p>
          <p>{{ userData.ci }}</p>

          <p class="font-medium">Tipo:</p>
          <p>{{ userData.tipo_user }}</p>

          <p class="font-medium">Estado:</p>
          <p>{{ userData.estado_user }}</p>

          <p class="font-medium">Unidad:</p>
          <p>{{ userData.unidad }}</p>

          <p class="font-medium">Institución:</p>
          <p>{{ userData.institucion }}</p>

          <p class="font-medium">Cargo:</p>
          <p>{{ userData.cargo }}</p>

          <p class="font-medium">Fecha Creación:</p>
          <p>{{ userData.fecha_creacion | date : 'dd/MM/yyyy' }}</p>
        </div>
        <h4 class="text-2xl font-bold">Token Asignado</h4>
        @for(asignacion of userData.AsignacionToken; track $index) {
        <div
          class="grid grid-cols-2 gap-2 my-4 w-full border border-gray-300 rounded-md p-4"
        >
          <div class="col-span-2 bg-primary/10 p-2 mb-2 rounded">
            <p class="font-bold">Token #{{ $index + 1 }}</p>
          </div>

          <p class="font-medium">Alias:</p>
          <p>{{ asignacion.token.alias }}</p>

          <p class="font-medium">Tipo Token:</p>
          <p>{{ asignacion.token.tipo_token }}</p>

          <p class="font-medium">Token ID:</p>
          <p>{{ asignacion.token.token_id }}</p>

          <p class="font-medium">Estado:</p>
          <p>{{ asignacion.token.estado_token }}</p>

          <p class="font-medium">Certificados:</p>
          <p>{{ asignacion.token.cantidad_certificados }}</p>

          <p class="font-medium">Llaves Privadas:</p>
          <p>{{ asignacion.token.cantidad_priv_key }}</p>
        </div>
        } @empty {
        <p class="col-span-2 text-center text-gray-500 mt-4">
          No hay tokens asignados
        </p>
        } }
      </div>
    </section>
  `,
})
export class InformacionUserComponent implements OnInit {
  drawerService = inject(DrawerService);
  userS = inject(UserService);
  userData: any;

  ngOnInit() {
    this.drawerService.getData().subscribe((data) => {
      if (data && data.id) {
        this.userS.getById(data.id).subscribe({
          next: (res: any) => {
            console.log(res.data);

            this.userData = res.data;
          },
          error: (err) => {
            console.error('Error fetching user data:', err);
          },
        });
      }
    });
  }
}
