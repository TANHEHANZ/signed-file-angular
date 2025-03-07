import { Component, inject, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';

import { Toast } from 'primeng/toast';
import { CustomInputComponent } from '../../../../../shared/ui/input.component';
import { ButtonPrimaryComponent } from '../../../../../shared/ui/button/primary.component';
import { ICONS } from '../../../../../shared/ui/icons';

@Component({
  selector: 'form-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    Toast,
    CustomInputComponent,
    ButtonPrimaryComponent,
  ],
  template: `
    <p-toast position="bottom-right"></p-toast>
    <section
      class="h-full flex flex-col justify-center items-center text-center relative gap-2 w-[50dvw]"
    >
      <h1 class="font-normal text-4xl">
        Sistema de <span class="text-primary">Firmas</span>
        <p>Digitales</p>
      </h1>

      <form class="w-1/2 flex justify-center items-center flex-col gap-2">
        <custom-input class="w-full" label="CI" type="text"></custom-input>
        <custom-input
          class="w-full"
          label="Contraseña"
          type="password"
        ></custom-input>

        <p class="self-end my-2">¿Has olvidado tu contraseña?</p>
        <button-primary
          class="w-full"
          label="Iniciar sesión"
          [icon]="ICONS.LOGOUT"
        />
      </form>
    </section>
  `,
  providers: [MessageService],
})
export class FormLoginComponent {
  ICONS = ICONS;
}
