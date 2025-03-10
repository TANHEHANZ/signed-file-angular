import {
  Component,
  inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { CustomInputComponent } from '../../../shared/ui/input.component';
import { ButtonPrimaryComponent } from '../../../shared/ui/button/primary.component';
import { ICONS } from '../../../shared/ui/icons';
import { CommonModule, DatePipe } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { TokenService } from '../../../../application/services/token.service';
import { CustomStepperComponent } from '../../../shared/ui/stepper.component';
import { CustomSelectComponent } from '../../../shared/ui/select.component';
import { SwichService } from '../../../../application/global/swich.service';

@Component({
  selector: 'form-token',
  imports: [
    CustomInputComponent,
    ButtonPrimaryComponent,
    CommonModule,
    ReactiveFormsModule,
    CustomStepperComponent,
    CustomSelectComponent,
  ],
  template: `<Form class="p-4 flex flex-col gap-4" [formGroup]="form">
    <h2 class="text-2xl font-bold text-center">
      Formulario registro de tokens
    </h2>
    <section class="grid grid-cols-2">
      <div class="col-span-2">
        <p>
          <i [ngClass]="ICONS.INFO"></i>
          Debes tener instalado
          <span class="text-primary border-b cursor-pointer">Jacubitus</span>
        </p>
        <p>
          <i [ngClass]="ICONS.INFO"></i>
          Debes tener
          <span class="text-primary border-b cursor-pointer">Jacubitus</span>
          funcionando
        </p>
      </div>
      @if(!validated) {
      <div class="col-span-2">
        <custom-input
          label="Ingresa el ping"
          type="text"
          [control]="form.controls.ping"
        />
        <button-primary
          label="Validar Token"
          (clicked)="validarToken()"
          class="w-[50%]"
        />
      </div>
      } @else {
      <div class="col-span-2 p-4">
        <custom-stepper
          [steps]="steps"
          (stepChange)="onStepChange($event)"
          (completed)="onComplete()"
        >
        </custom-stepper>
      </div>
      }
      <ng-template #tokenInfo>
        <div class="grid grid-cols-4 gap-4">
          <p class=" col-span-4 text-xl font-bold">Informacion del Token</p>

          <custom-input
            label="Cantidad de certificados"
            type="text"
            [control]="form.controls.cantidad_certificados"
          />
          <custom-input
            label="Cantidad de llaves privadas"
            type="text"
            [control]="form.controls.cantidad_priv_key"
          />
          <custom-input
            label="Alias"
            type="text"
            [control]="form.controls.alias"
          />
          <custom-input
            label="Tipo de Token"
            type="text"
            [control]="form.controls.tipo_token"
          />
          <custom-input
            label="Token ID"
            type="text"
            [control]="form.controls.token_id"
          />
        </div>
      </ng-template>
      <ng-template #certificadoInfo>
        <div class="grid grid-cols-4 gap-4">
          <p class=" col-span-4 text-xl font-bold">
            Informacion del Certificado del token
          </p>

          <custom-input
            label="Tipo de Certificado"
            type="text"
            [control]="form.controls.tipo_certificado"
          />
          <custom-input
            label="ID Certificado"
            type="text"
            [control]="form.controls.id_certificado_token"
          />
          <custom-input
            label="Válido Desde"
            type="date"
            [control]="form.controls.desde"
          />
          <custom-input
            label="Válido Hasta"
            type="date"
            [control]="form.controls.hasta"
          />
          <custom-input
            class="col-span-4"
            label="Entidad Certificadora"
            type="text"
            [control]="form.controls.entidad"
          />
        </div>
      </ng-template>

      <ng-template #userInfo>
        <div class="grid grid-cols-4 gap-4">
          <p class=" col-span-4 text-xl font-bold">Titular del Certificado</p>
          <custom-input label="CI" type="text" [control]="form.controls.ci" />
          <custom-input
            class="col-span-3"
            label="Descripción"
            type="text"
            [control]="form.controls.descripcion"
          />
          <custom-input
            class="col-span-2"
            label="Email"
            type="text"
            [control]="form.controls.email"
          />
          <custom-input
            class="col-span-2"
            label="Nombre Completo"
            type="text"
            [control]="form.controls.nombre"
          />
        </div>
        <p class=" col-span-4 text-xl font-bold">Estado del token</p>
        <custom-select
          label="Estado usuario:"
          [options]="[
            { label: 'Activo', value: 'ACTIVO' },
            { label: 'Deshabilitado', value: 'DESHABILITADO' }
          ]"
          [control]="form.controls.estado_token"
        />
      </ng-template>
    </section>
  </Form>`,
})
export class FormTokenComponet implements OnInit {
  ICONS = ICONS;
  toast = inject(MessageService);
  tokenS = inject(TokenService);
  modalS = inject(SwichService);
  validated = false;
  slot = null;
  @ViewChild('tokenInfo') tokenInfoTpl!: TemplateRef<any>;
  @ViewChild('userInfo') userInfoTpl!: TemplateRef<any>;
  @ViewChild('certificadoInfo') certificadoTpl!: TemplateRef<any>;
  @ViewChild('assignmentInfo') assignmentInfoTpl!: TemplateRef<any>;

  steps: { title: string; content: TemplateRef<any> }[] = [];

  ngAfterViewInit() {
    this.steps = [
      { title: 'Token', content: this.tokenInfoTpl },
      { title: 'Certificado ', content: this.certificadoTpl },
      { title: 'Titular', content: this.userInfoTpl },
    ];
  }

  onStepChange(step: number) {
    console.log('Current step:', step);
    // Add your step validation logic here
  }

  onComplete() {
    console.log('Form completed');
    console.log(this.form.value);

    const formData = {
      cantidad_certificados: Number(this.form.value.cantidad_certificados),
      cantidad_priv_key: Number(this.form.value.cantidad_priv_key),
      validate_certificado: Boolean(this.form.value.validate_certificado),
      alias: this.form.value.alias || '',
      tipo_token: this.form.value.tipo_token || '',
      token_id: this.form.value.token_id || '',
      id_user_create: this.form.value.id_user_create || '',
      tipo_certificado: this.form.value.tipo_certificado || '',
      id_certificado_token: this.form.value.id_certificado_token || '',
      desde: this.form.value.desde || '',
      hasta: this.form.value.hasta || '',
      entidad: this.form.value.entidad || '',
      ci: this.form.value.ci || '',
      descripcion: this.form.value.descripcion || '',
      email: this.form.value.email || '',
      nombre: this.form.value.nombre || '',
      estado_token: this.form.value.estado_token || 'ACTIVO',
    };

    this.tokenS.saveToken(formData).subscribe({
      next: (value) => {
        this.toast.add({
          severity: 'success',
          summary: 'Exito',
          detail: value.message,
          life: 3000,
        });
        this.modalS.$modal.emit(null);
      },
    });
  }
  form = new FormGroup({
    ping: new FormControl('', [Validators.required, Validators.min(7)]),
    cantidad_certificados: new FormControl('', [Validators.required]),
    cantidad_priv_key: new FormControl('', [Validators.required]),
    alias: new FormControl('', [Validators.required]),
    tipo_token: new FormControl('', [Validators.required]),
    token_id: new FormControl('', [Validators.required]),
    validate_certificado: new FormControl('', [Validators.required]),
    id_user_create: new FormControl('', [Validators.required]),
    tipo_certificado: new FormControl('', [Validators.required]),
    id_certificado_token: new FormControl('', [Validators.required]),
    desde: new FormControl('', [Validators.required]),
    hasta: new FormControl('', [Validators.required]),
    entidad: new FormControl('', [Validators.required]),
    ci: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    nombre: new FormControl('', [Validators.required]),
    estado_token: new FormControl('', [Validators.required]),
  });
  infoToken: any = null;
  ngOnInit(): void {
    this.tokenS.getListToken().subscribe({
      next: (value) => {
        console.log(value);
        if (!value.data.connected) {
          this.toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error Token  no conectado',
            life: 3000,
          });
        }
        this.slot = value.data.tokens[0].slot;
      },
      error: (err) => {
        this.toast.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.message,
          life: 3000,
        });
      },
    });
  }
  validarToken() {
    if (!this.form.value.ping) {
      this.toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El campo ping no puede estar vacio.',
        life: 3000,
      });
      return;
    }
    if (!this.slot) {
      this.toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se ha detectado ningún token.',
        life: 3000,
      });
      return;
    }

    this.tokenS
      .dataToken({
        slot: this.slot,
        pin: this.form.value.ping,
      })
      .subscribe({
        next: (value) => {
          this.validated = true;
          this.infoToken = value.datos.data_token;
          console.log(this.infoToken);
          const certificateData = this.infoToken.data[1];
          this.form.patchValue({
            cantidad_certificados: this.infoToken.certificates || '',
            cantidad_priv_key: this.infoToken.private_keys || '',
            alias: certificateData.alias || '',
            tipo_token: this.infoToken.data[0].tipo_desc || '',
            token_id: this.infoToken.data[0].id || '',
            validate_certificado:
              this.infoToken.data[0].tiene_certificado || '',
            tipo_certificado: certificateData.tipo || '',
            id_certificado_token: certificateData.id || '',
            desde: certificateData.validez.desde || '',
            hasta: certificateData.validez.hasta || '',
            entidad: certificateData.emisor.CN || '',
            ci: certificateData.titular.uidNumber || '',
            descripcion: certificateData.titular.description || '',
            email: certificateData.titular.emailAddress || '',
            nombre: certificateData.titular.CN || '',
          });
          console.log(this.form.value);
        },

        error: (err) => {
          console.log(err);
          this.toast.add({
            severity: 'error',
            summary: 'Error',
            detail: err,
            life: 3000,
          });
        },
      });
  }
}
