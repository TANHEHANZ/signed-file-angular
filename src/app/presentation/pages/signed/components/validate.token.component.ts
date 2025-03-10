import { NgClass } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  input,
  OnInit,
  Output,
} from '@angular/core';
import { UploadService } from '../../../../application/services/upload.service';
import { MessageService } from 'primeng/api';
import { ButtonPrimaryComponent } from '../../../shared/ui/button/primary.component';
import { ICONS } from '../../../shared/ui/icons';
import { Toast } from 'primeng/toast';
import { CustomInputComponent } from '../../../shared/ui/input.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TokenService } from '../../../../application/services/token.service';
import { TokenStateService } from '../../../../application/services/token-state.service';

@Component({
  selector: 'upload-validate',
  imports: [
    NgClass,
    ButtonPrimaryComponent,
    Toast,
    CustomInputComponent,
    ReactiveFormsModule,
  ],
  providers: [MessageService],
  template: `
    <section
      [ngClass]="{
        'border-primary/50 ': !tokenData?.connected,
        'border-gray-300': tokenData?.connected
      }"
      class="rounded-xl p-4 flex flex-col gap-4 border-2 border-gray-300 relative overflow-auto w-[350px] h-full"
    >
      <p
        class=" bg-secundary rounded-full w-6 h-6 flex justify-center items-center text-white absolute top-2 left-2 text-xs"
      >
        1
      </p>
      <div class="h-full">
        <p-toast></p-toast>
        <section class="flex flex-col flex-1 gap-2 justify-center p-2">
          <h3 class="text-2xl font-normal">¿Ya conectaste tu token?</h3>
          <p>
            Recuerda que debes tener instalado
            <span class="bg-primary  text-white rounded-md text-sm px-2"
              >Jacubitus</span
            >
          </p>
          <button-primary
            [icon]="ICONS.VALIDATE"
            (clicked)="tokenConected()"
            label="Validar Token"
          />
        </section>
        @if(tokenData?.connected){
        <section class="bg-primary/10 p-4 rounded-lg mt-4">
          <h3 class="text-xl font-normal mb-4">Token Conectado</h3>
          @for(token of tokenData.tokens; track token.slot){
          <div
            class="bg-white p-4 rounded-lg mb-2 shadow-sm cursor-pointer"
            (click)="seleccionar(token)"
            [ngClass]="{
              'border-2 border-primary': selectToken?.slot === token.slot
            }"
          >
            <p class="font-medium mb-2">Información del Token:</p>
            <div class="grid gap-2">
              <p>
                <span class="font-medium">Modelo:</span>
                <span class="ml-2">{{ token.model }}</span>
              </p>
              <p>
                <span class="font-medium">Slot:</span>
                <span class="ml-2">{{ token.slot }}</span>
              </p>
              <p>
                <span class="font-medium">Serial:</span>
                <span class="ml-2">{{ token.serial }}</span>
              </p>
            </div>
            @if(selectToken?.slot === token.slot ) {
            <form class="mt-4 border-t pt-4" [formGroup]="form">
              <custom-input
                label="Ingrese el PIN"
                type="password"
                [control]="form.controls.pin"
              />
              <button-primary
                label="Validar PIN"
                (clicked)="validatePin()"
                class="mt-2"
              />
            </form>
            }
          </div>
          }
        </section>
        }
      </div>
    </section>
  `,
})
export class UploadValidateComponent {
  readonly conectToken = inject(UploadService);
  readonly messageService = inject(MessageService);
  readonly tokenService = inject(TokenService);
  private tokenStateService = inject(TokenStateService);
  @Output() showJacubitusError = new EventEmitter<boolean>();
  ICONS = ICONS;
  tokenData: any = null;
  selectToken: any = null;
  alias = '';

  form = new FormGroup({
    pin: new FormControl('', Validators.required),
    slot: new FormControl('', Validators.required),
  });

  tokenConected() {
    this.conectToken.getListToken().subscribe({
      next: (data) => {
        if (data.datos.connected) {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: data.mensaje,
            life: 3000,
          });
          this.tokenData = data.datos;
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: data.mensaje,
            life: 3000,
          });
        }
      },
      error: (e) => {
        this.showJacubitusError.emit(true);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: e.error.message,
          life: 3000,
        });
      },
    });
  }

  seleccionar(token: any) {
    this.selectToken = token;
    this.form.patchValue({ slot: token.slot });
  }

  validatePin() {
    if (!this.form.value.pin) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El campo PIN no puede estar vacío.',
        life: 3000,
      });
      return;
    }

    this.tokenService
      .dataToken({
        slot: this.form.value.slot!,
        pin: this.form.value.pin!,
      })
      .subscribe({
        next: (value) => {
          if (!value.finalizado) {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: value.mensaje,
              life: 3000,
            });
            return;
          }
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: value.mensaje,
            life: 3000,
          });
          console.log(value.datos);
          this.alias = value.datos.data_token.data[0].alias;
          this.tokenStateService.updateState({
            token_id: value.datos.data_token.data[0].id,
            slot: this.form.value.slot!,
            alias: this.alias,
            pin: this.form.value.pin!,
          });
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err,
            life: 3000,
          });
        },
      });
  }
}
