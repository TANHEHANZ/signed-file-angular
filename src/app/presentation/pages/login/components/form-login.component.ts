import { Component, inject, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonPrimaryComponent } from '../../../shared/ui/button/primary.component';
import { ButtonSecundaryComponent } from '../../../shared/ui/button/secundary.component';
import {
  AuthService,
  res_data,
} from '../../../../application/services/login.service';
import { res } from '../../../../application/models/api.response';
import { CustomInputComponent } from '../../../shared/ui/input.component';
import { Toast } from 'primeng/toast';
import { Router } from '@angular/router';
import { PATH_ROUTES } from '../../../../application/models/route.enum';
import { ICONS } from '../../../shared/ui/icons';

@Component({
  selector: 'form-login',
  standalone: true,
  imports: [
    ButtonPrimaryComponent,
    ReactiveFormsModule,
    CustomInputComponent,
    Toast,
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

      <form
        class="w-1/2 flex justify-center items-center flex-col gap-2"
        [formGroup]="form"
      >
        <custom-input
          class="w-full"
          label="CI"
          type="text"
          [control]="form.controls.ci"
        ></custom-input>
        <custom-input
          class="w-full"
          label="Contraseña"
          type="password"
          [control]="form.controls.password"
        ></custom-input>

        <p class="self-end my-2">¿Has olvidado tu contraseña?</p>
        <button-primary
          class="w-full"
          label="Iniciar sesión"
          (clicked)="logout()"
          [icon]="ICONS.LOGOUT"
        />
      </form>
    </section>
  `,
  providers: [MessageService],
})
export class FormLoginComponent {
  readonly loginService = inject(AuthService);
  readonly messageService = inject(MessageService);
  private router = inject(Router);
  ICONS = ICONS;
  visible = output();
  form = new FormGroup({
    ci: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(150),
    ]),
  });

  logout() {
    this.sendData();
  }

  sendData() {
    if (this.form.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor, corrige los errores en el formulario.',
        life: 3000,
      });
      return;
    }

    this.loginService
      .login({
        ci: this.form.value.ci ?? '',
        password: this.form.value.password ?? '',
      })
      .subscribe({
        next: (response: res<res_data>) => {
          console.log(response);
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: response.message,
            life: 3000,
          });
          console.log(response.data);
          this.router.navigate([PATH_ROUTES.DASHBOARD_SIGNED]);
        },
        error: (error: any) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error?.message,
            life: 3000,
          });
        },
      });
  }

  register() {
    this.router.navigate(['/login/register']);
  }
}
