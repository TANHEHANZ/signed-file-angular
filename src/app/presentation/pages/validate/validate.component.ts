import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import UploadValidateComponent from './upload.component';
import { InfoValidatedComponent } from './info.validated.component';

@Component({
  selector: 'validate-component',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ToastModule,
    UploadValidateComponent,
    InfoValidatedComponent,
  ],
  templateUrl: './validate.component.html',
})
export class ValidateComponent {
  validationData?: any;

  onValidationComplete(data: any) {
    this.validationData = data;
  }
}
