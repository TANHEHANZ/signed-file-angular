import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  imports: [ReactiveFormsModule, NgFor, NgIf],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div *ngFor="let field of fields">
        <label [for]="field.name">{{ field.label }}</label>
        <input
          *ngIf="field.type === 'text' || field.type === 'email'"
          [type]="field.type"
          [formControlName]="field.name"
          [placeholder]="field.label"
        />
      </div>
      <button type="submit" [disabled]="form.invalid">Enviar</button>
    </form>
  `,
})
export class DynamicFormComponent implements OnInit {
  @Input() fields: any[] = [];
  form: FormGroup = new FormGroup({});

  ngOnInit() {
    this.initialForm();
  }
  initialForm() {}

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
