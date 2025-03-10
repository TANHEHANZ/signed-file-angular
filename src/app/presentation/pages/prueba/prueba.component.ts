import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'Prueba',
  imports: [CommonModule],
  template: `
    <div *ngIf="error; else mostrarIframe" class="error">
      ❌ No se pudo cargar la página: {{ url }}<br />
      Motivo: {{ errorMessage }}
    </div>
    <ng-template #mostrarIframe>
      <iframe [src]="safeUrl" width="100%" height="600px"></iframe>
    </ng-template>
  `,
  styles: [
    `
      .error {
        color: red;
        font-weight: bold;
        text-align: center;
        padding: 20px;
      }
    `,
  ],
})
export default class PruebaComponent {
  url: string = 'https://localhost:9000/';
  safeUrl: SafeResourceUrl | null = null;
  error: boolean = false;
  errorMessage: string = '';

  constructor(private sanitizer: DomSanitizer) {
    this.verificarURL();
  }

  async verificarURL() {
    try {
      const response = await fetch(this.url, { mode: 'no-cors' });
      if (response) {
        this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
      } else {
        this.mostrarError('No se pudo acceder al servidor.');
      }
    } catch (e) {
      this.mostrarError('Error SSL o servidor no disponible.');
    }
  }

  mostrarError(mensaje: string) {
    this.error = true;
    this.errorMessage = mensaje;
  }
}
