import { Component, Input, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'custom-select',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgIf, NgFor],
  template: `
    <div class="flex flex-col gap-1 my-2 items-start w-full flex-1">
      <label [for]="id" class="block">
        {{ label }}
        <span *ngIf="isRequired()" class="text-red-500">*</span>
      </label>
      <select
        [id]="controlName"
        class="border flex-1 rounded-md p-1.5 px-2 w-full outline-none border-gray-300"
        [ngClass]="getValidationClass()"
        [formControl]="control"
        (blur)="onTouched()"
      >
        <option *ngFor="let option of options" [value]="option.value">
          {{ option.label }}
        </option>
      </select>
      <p
        *ngIf="control.invalid && control.touched"
        class="text-red-500 text-sm"
      >
        {{ getErrorMessage() }}
      </p>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectComponent),
      multi: true,
    },
  ],
})
export class CustomSelectComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() control: FormControl = new FormControl();
  @Input() controlName: string = '';
  @Input() options: { label: string; value: any }[] = [];

  id = Math.random().toString(36).substr(2, 9);

  onTouched: () => void = () => {};

  writeValue(value: any): void {
    this.control.setValue(value, { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.control.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  isRequired(): boolean {
    return this.control?.hasValidator(Validators.required) ?? false;
  }

  getValidationClass(): Record<string, boolean> {
    return {
      'ring-1 ring-red-500': this.control.invalid && this.control.touched,
      'ring-1 ring-green-500': this.control.valid && this.control.touched,
    };
  }

  getErrorMessage(): string {
    if (this.control.hasError('required')) return 'Este campo es obligatorio.';
    return '';
  }
}
