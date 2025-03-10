import { Component, inject, Output, signal, EventEmitter } from '@angular/core';
import { ICONS } from '../../shared/ui/icons';
import { ValidateService } from '../../../application/services/validate.service';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'upload-validated',
  template: `
    <section
      class="rounded-xl border-2 border-gray-300 flex flex-col justify-center items-center col-span-2 relative w-full h-full overflow-hidden"
    >
      <div
        class="flex justify-center items-center cursor-pointer p-6 transition-all duration-300 flex-col h-full w-full"
        [ngClass]="{
          'bg-primary/80 text-white': isDragging,
          'hover:bg-primary/10': !isDragging
        }"
        (click)="fileInput.click()"
        (dragover)="onDragOver($event)"
        (dragleave)="onDragLeave()"
        (drop)="onDrop($event)"
      >
        <p
          class="ping bg-primary h-12 w-12 flex justify-center items-center text-white p-4 rounded-full"
        >
          <i [class]="ICONS.UPLOAD"></i>
        </p>
        <p class="text-xl font-medium text-center">
          <span class="text-primary">Haga clic aquí </span>
          para cargar su archivo o
          <span class="text-primary">arrástrelo</span>
        </p>
        <input
          #fileInput
          type="file"
          class="hidden"
          (change)="onFileSelected($event)"
        />
      </div>
      <div
        *ngIf="fileName()"
        [ngClass]="{
          'animate-slide-up': fileName(),
          'border-red-400': !isDragging
        }"
        class="bg-white ring-1 rounded-md absolute bottom-[10vh] p-4 text-sm text-primary flex flex-col justify-between items-center gap-4 z-50 overflow-hidden"
      >
        <span>{{ fileName() }}</span>
        <div class="flex gap-2">
          <button
            class="border border-primary rounded-md cursor-pointer px-2 py-1"
            (click)="clear()"
          >
            <i [class]="ICONS.CLOSE"></i> Cancelar
          </button>
          <button
            class="bg-primary text-white rounded-md cursor-pointer px-2 py-1"
            (click)="validarDocumento()"
          >
            <i [class]="ICONS.SEND"></i> Validar documento
          </button>
        </div>
      </div>
    </section>
  `,
  imports: [CommonModule],
})
export default class UploadValidateComponent {
  ICONS = ICONS;
  fileName = signal<string>('');
  private validateService = inject(ValidateService);
  private currentBase64File = signal<string>('');
  private toastS = inject(MessageService);
  @Output() validationComplete = new EventEmitter<any>();
  isDragging = false;
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave() {
    this.isDragging = false;
  }

  clear() {
    this.fileName.set('');
  }
  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
    this.validationComplete.emit(undefined);

    const files = event.dataTransfer?.files;
    if (files && files[0]) {
      const file = files[0];
      if (file.type === 'application/pdf') {
        this.fileName.set(file.name);
        this.convertToBase64(file);
      } else {
        console.error('Please upload a PDF file');
      }
    }
  }
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    this.validationComplete.emit(undefined);

    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.fileName.set(file.name);
      this.convertToBase64(file);
    }
  }
  private convertToBase64(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      const base64Content = base64String.split(',')[1];
      this.currentBase64File.set(base64Content);
    };
    reader.readAsDataURL(file);
  }
  validarDocumento() {
    if (this.currentBase64File()) {
      this.validateService
        .validateDocument(this.currentBase64File())
        .subscribe({
          next: (response) => {
            if (response.finalizado === true) {
              this.toastS.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Documento validado correctamente',
              });
              this.validationComplete.emit(response);
            } else {
              this.toastS.add({
                severity: 'error',
                summary: 'Error',
                detail: response.error.mensaje,
              });
            }
          },
          error: (error) => {
            console.error('Validation failed:', error);
          },
        });
    }
  }
}
