import { CustomSelectComponent } from './../../../shared/ui/select.component';
import { ResponseToken } from './../../../../application/models/interfaces/api/token/response';
import { Component, inject } from '@angular/core';
import { CustomInputComponent } from '../../../shared/ui/input.component';
import { ButtonPrimaryComponent } from '../../../shared/ui/button/primary.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { TokenService } from '../../../../application/services/token.service';
import { ICONS } from '../../../shared/ui/icons';
import { SwichService } from '../../../../application/global/swich.service';

@Component({
  selector: 'token-assign',
  template: `
    <Form class="p-4 flex flex-col gap-4" [formGroup]="validar">
      <h2 class="text-2xl font-bold text-center">
        Formulario asignacion de token
      </h2>
      <section>
        <custom-select
          [options]="data"
          label="Seleccione un token"
          [control]="validar.controls.token"
        />
        <button-primary
          label="Validar Token"
          (clicked)="asignar()"
          class="w-[50%]"
        />
      </section>
    </Form>
  `,
  imports: [
    ButtonPrimaryComponent,
    ReactiveFormsModule,
    CommonModule,
    CustomSelectComponent,
  ],
})
export class TokenAssignComponent {
  ICONS = ICONS;
  toast = inject(MessageService);
  tokenS = inject(TokenService);
  modalS = inject(SwichService);
  data: any[] = [];
  userData: any;

  validar = new FormGroup({
    token: new FormControl('', [Validators.required, Validators.min(7)]),
  });
  ngOnInit(): void {
    this.tokenS.getAllToken({}).subscribe({
      next: (value) => {
        if (!value.data) {
          this.toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error Token  no conectado',
            life: 3000,
          });
        }

        const tokenData = Array.isArray(value.data) ? value.data : [value.data];
        console.log(tokenData);
        this.data = tokenData.map((token) => ({
          label: token.Certificado.titular.nombre,
          value: token.id,
        }));
      },
      error: (err) => {
        this.toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error jacubitus no esta siendo ejecutado ',
          life: 3000,
        });
      },
    });
    this.modalS.$data.subscribe((data) => {
      this.userData = data;
    });
    console.log('userData', this.userData);
  }
  asignar() {
    console.log('Data llegando al asignar', this.userData);
    if (!this.userData) {
      this.toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se ha seleccionado un usuario',
        life: 3000,
      });
      return;
    }
    this.tokenS
      .asignarToken({
        id_token: this.validar.value.token,
        id_usuario: this.userData.id,
        estado: 'ACTIVO',
      })
      .subscribe({
        next: (value) => {
          if (!value.data) {
            this.toast.add({
              severity: 'error',
              summary: 'Error',
              detail: value.message,
              life: 3000,
            });
          }
          this.toast.add({
            severity: 'success',
            summary: 'Exito',
            detail: 'Token asignado correctamente',
            life: 3000,
          });
          this.modalS.$modal.emit(null);
        },
        error: (err) => {
          console.log(err);
          this.toast.add({
            severity: 'error',
            summary: 'Error',
            detail: err.message,
            life: 3000,
          });
        },
      });
  }
}
