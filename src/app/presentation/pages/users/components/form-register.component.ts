import { Toast } from 'primeng/toast';
import { Component, inject, NgModule, OnInit } from '@angular/core';
import { CustomInputComponent } from '../../../shared/ui/input.component';
import { ButtonSecundaryComponent } from '../../../shared/ui/button/secundary.component';
import { ButtonPrimaryComponent } from '../../../shared/ui/button/primary.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from '../../../../application/services/login.service';
import { CustomSelectComponent } from '../../../shared/ui/select.component';
import { UserService } from '../../../../application/services/user.service';
import { CommonModule } from '@angular/common';
import { ICONS } from '../../../shared/ui/icons';
import { SwichService } from '../../../../application/global/swich.service';
interface Role {
  label: string;
  value: string;
}
@Component({
  selector: 'form-register',

  template: `
    <form
      [formGroup]="form"
      class="w-full flex justify-center items-center  gap-2"
    >
      <section class="flex flex-col justify-center items-center gap-2">
        <p class="text-2xl font-bold mb-4">
          {{ isEditing ? 'Editar Usuario' : 'Registro de Usuarios' }}
        </p>
        <p class="self-start">Busca a un funcionario por el ci</p>
        <div class=" flex justify-center items-end  gap-2  w-full">
          <custom-input
            label="Ci"
            type="text"
            [control]="form.controls.ci"
            class=" w-[50%]"
          />
          <button-primary
            label="Buscar Usuario"
            (clicked)="validar()"
            class="w-[50%]"
          />
        </div>
        @if(informacion ){
        <section class=" flex w-full flex-col justify-center items-center">
          <section class=" grid grid-cols-3 gap-2">
            <custom-input
              [isDisabled]="true"
              class="w-full"
              label="Nombre"
              type="text"
              [control]="form.controls.name"
            />
            <custom-input
              [isDisabled]="true"
              class="w-full"
              label="Ci"
              type="text"
              [control]="form.controls.ci"
            />
            <custom-input
              [isDisabled]="true"
              class="w-full"
              label="Unidad"
              type="text"
              [control]="form.controls.unidad"
            />
            <custom-input
              [isDisabled]="true"
              class="w-full"
              label="Institucion"
              type="text"
              [control]="form.controls.institucion"
            />
            <custom-input
              [isDisabled]="true"
              class="w-full"
              label="Cargo"
              type="text"
              [control]="form.controls.cargo"
            />
            <custom-select
              label="Tipo persona:"
              [options]="[
                { label: 'Juridica', value: 'Juridica' },
                { label: 'Natural', value: 'Natural' }
              ]"
              [control]="form.controls.tipo_user"
            />

            <custom-input
              class="w-full"
              label="Contraseña"
              type="text"
              [control]="form.controls.password"
            />
            <custom-select
              label="Estado usuario:"
              [options]="[
                { label: 'Activo', value: 'ACTIVO' },
                { label: 'Deshabilitado', value: 'DESHABILITADO' }
              ]"
              [control]="form.controls.estado_user"
            />
            <custom-select
              label="Rol usuario"
              [options]="[
                {
                  label: 'Administrador',
                  value: 'ADMINISTRADOR'
                },
                {
                  label: 'Usuario',
                  value: 'USUARIO'
                }
              ]"
              [control]="form.controls.rol"
            />
          </section>
          <button-secundary
            class="self-end mt-4"
            [icon]="ICONS.SAVE"
            [label]="isEditing ? 'Actualizar usuario' : 'Registrar usuario'"
            (clicked)="registerUser()"
          />
        </section>
        }
      </section>
    </form>
    <div class="flex gap-2"></div>
  `,
  imports: [
    ButtonPrimaryComponent,
    CustomInputComponent,
    ReactiveFormsModule,
    CommonModule,
    CustomSelectComponent,
    ButtonSecundaryComponent,
  ],
})
export class FormRegisterComponent implements OnInit {
  private userService = inject(UserService);
  readonly messageService = inject(MessageService);
  modalS = inject(SwichService);
  ICONS = ICONS;
  informacion: any;
  roles: Role[] = [];
  isEditing = false;
  userId: string = '';

  ngOnInit(): void {
    this.modalS.$data.subscribe((user) => {
      if (user) {
        this.isEditing = true;
        this.userId = user.id;
        this.informacion = user;
        this.form.patchValue({
          name: user.name || '',
          ci: user.ci || '',
          institucion: user.institucion || '',
          unidad: user.unidad || '',
          cargo: user.cargo || '',
          tipo_user: user.tipo_user || '',
          estado_user: user.estado_user || '',
          rol: user.rol?.id || '',
          password: user.password || '',
        });
      } else {
        this.isEditing = false;
        this.userId = '';
        this.informacion = null;
        this.form.reset();
      }
    });
  }
  form = new FormGroup({
    ci: new FormControl('', [
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(9),
    ]),
    rol: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    institucion: new FormControl('', [Validators.required]),
    unidad: new FormControl('', [Validators.required]),
    cargo: new FormControl('', [Validators.required]),
    tipo_user: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    estado_user: new FormControl('', [Validators.required]),
  });
  validar() {
    if (!this.form.value.ci) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El campo CI no puede estar vacio.',
        life: 3000,
      });
      return;
    }
    this.userService.infoUser(this.form.value.ci ?? '').subscribe({
      next: (response) => {
        if (response.status === 200 && response.data) {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: response.message,
            life: 3000,
          });
        }
        this.informacion = response.data[0];
        console.log(this.informacion);
        this.form.patchValue({
          name: this.informacion.empleado || '',
          ci: this.informacion.ci || '',
          institucion: this.informacion.institucion || '',
          unidad: this.informacion.unidad || '',
          cargo: this.informacion.cargo || '',
          password: this.informacion.ci || '',
        });
      },
      error: (err) => {
        console.log(err);

        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error?.message || 'Ocurrió un error inesperado',

          life: 3000,
        });
      },
    });
  }

  registerUser() {
    if (this.form.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail:
          'Por favor, llene todos los campos o corrija los errores del formulario.',
        life: 3000,
      });
      return;
    }

    const userData = {
      password: this.form.value.password ?? '',
      ci: this.form.value.ci ?? '',
      name: this.form.value.name ?? '',
      rol: this.form.value.rol ?? '',
      tipo_user: this.form.value.tipo_user ?? '',
      estado_user: this.form.value.estado_user ?? '',
      cargo: this.form.value.cargo ?? '',
      institucion: this.form.value.institucion ?? '',
      unidad: this.form.value.unidad ?? '',
    };

    const request = this.isEditing
      ? this.userService.updateUser(this.userId, userData)
      : this.userService.register(userData);

    request.subscribe({
      next: (response) => {
        if (response.status === 200 && response.data) {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: response.message,
            life: 3000,
          });
        }
        this.modalS.$modal.emit(null);
      },
      error: (error: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error?.errors || 'Ocurrió un error inesperado',
          life: 3000,
        });
      },
    });
  }
}
