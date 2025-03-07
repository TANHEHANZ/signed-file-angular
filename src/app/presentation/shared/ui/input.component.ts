import { Component, Input, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { ICONS } from './icons';

@Component({
  selector: 'custom-input',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgIf],
  template: `
    <div class="flex flex-col gap-1 my-2 items-start w-full flex-1">
      <label [for]="id" class="block">
        {{ label }}
        <span *ngIf="isRequired()" class="text-red-500">*</span>
      </label>
      <div class="relative w-full">
        <input
          [id]="controlName"
          [type]="isPassword ? 'text' : type"
          class="border flex-1 rounded-md p-1 px-2 w-full outline-none border-gray-300 pr-10"
          [ngClass]="getValidationClass()"
          [formControl]="control"
          (blur)="onTouched()"
        />
        <button
          *ngIf="type === 'password'"
          type="button"
          (click)="togglePassword()"
          class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
        >
          <i
            [class]="isPassword ? ICONS.EYE : ICONS.EYE_SLASH"
            class="text-xl"
          ></i>
        </button>
      </div>
      <p
        *ngIf="control.invalid && control.touched"
        class="text-secundary text-sm"
      >
        {{ getErrorMessage() }}
      </p>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true,
    },
  ],
})
export class CustomInputComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() control: FormControl = new FormControl();
  @Input() controlName: string = '';

  ICONS = ICONS;
  id = Math.random().toString(36).substring(2, 9);
  isPassword = false;
  private _isDisabled: boolean = false;

  @Input() set isDisabled(value: boolean) {
    this._isDisabled = value;
    if (this.control) {
      value ? this.control.disable() : this.control.enable();
    }
  }
  get isDisabled(): boolean {
    return this._isDisabled;
  }
  togglePassword() {
    this.isPassword = !this.isPassword;
  }

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
      'ring-1 ring-secundary': this.control.invalid && this.control.touched,
      'ring-1 ring-green-500': this.control.valid && this.control.touched,
    };
  }

  getErrorMessage(): string {
    if (this.control.hasError('required')) return 'Este campo es obligatorio.';
    if (this.control.hasError('email')) return 'Ingrese un email válido.';
    if (this.control.hasError('minlength'))
      return `Mínimo ${
        this.control.getError('minlength').requiredLength
      } caracteres.`;
    if (this.control.hasError('maxlength'))
      return `Máximo ${
        this.control.getError('maxlength').requiredLength
      } caracteres.`;
    if (this.control.hasError('pattern')) {
      if (this.control.errors?.['pattern'].requiredPattern.includes('[A-Z]'))
        return 'Debe contener al menos una letra mayúscula.';
      if (this.control.errors?.['pattern'].requiredPattern.includes('[a-z]'))
        return 'Debe contener al menos una letra minúscula.';
      if (this.control.errors?.['pattern'].requiredPattern.includes('[0-9]'))
        return 'Debe contener al menos un número.';
      if (this.control.errors?.['pattern'].requiredPattern.includes('[\\W_]'))
        return 'Debe contener al menos un carácter especial.';
    }
    return '';
  }
}
