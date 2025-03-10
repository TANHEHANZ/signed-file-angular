import { Component, input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ReactiveFormsModule } from '@angular/forms';
import { UploadValidateComponent } from './components/validate.token.component';
import { UploadFile } from './components/uplodad.file.component';
import { FileSigned } from './components/file-signed.component';

@Component({
  selector: 'app-upload',
  imports: [
    ToastModule,
    ReactiveFormsModule,
    UploadValidateComponent,
    UploadFile,
    FileSigned,
  ],
  template: `
    <section
      class="flex flex-col justify-center h-full relative w-full items-center"
    >
      <h1 class="text-3xl font-normal my-8">Firmar Docunentos</h1>
      <p-toast></p-toast>
      <section class="flex w-full h-full gap-4 ">
        <upload-validate
          (showJacubitusError)="showError = true"
        ></upload-validate>
        <upload-file class="w-full"></upload-file>
        <file-signed></file-signed>
      </section>
      @if(showError) {
      <div
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      >
        <div class="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-lg">
          <h3 class="text-xl font-semibold mb-4">Error de Conexión</h3>

          <div class="space-y-4 mb-6">
            <p class="text-gray-700">
              Ups! Error al conectarse con el servicio de Jacubitus, puede
              deberse a dos problemas:
            </p>

            <div class="space-y-2">
              <p class="flex gap-2">
                <span class="font-medium">1.</span>
                <span>El servicio de Jacubitus no está siendo ejecutado</span>
              </p>

              <div class="flex gap-2">
                <span class="font-medium">2.</span>
                <div>
                  <p>Debe permitir acceso a la aplicación de Jacubitus</p>
                  <div class="mt-2 bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                    <p class="font-medium">¿Cómo lo hago?</p>
                    <ol
                      class="list-decimal list-inside space-y-1 text-gray-600"
                    >
                      <li>
                        Presiona el botón de
                        <span class="text-primary font-medium">Dar acceso</span>
                      </li>
                      <li>
                        En el error del navegador, presiona
                        <span class="text-primary font-medium">Avanzado</span>
                      </li>
                      <li>
                        Haz clic en "Acceder a localhost (sitio no seguro)"
                      </li>
                      <li>Vuelve a la aplicación e intenta otra vez</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-end gap-3">
            <button
              class="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              (click)="showError = false"
            >
              Cerrar
            </button>
            <button
              class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              (click)="giveAccess()"
            >
              Dar acceso
            </button>
          </div>
        </div>
      </div>
      }
    </section>
  `,
  providers: [MessageService],
})
export class SignedComponent {
  showError = false;

  giveAccess() {
    window.open('https://localhost:9000', '_blank');
  }
}
