import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonPrimaryComponent } from './button/primary.component';
import { ButtonSecundaryComponent } from './button/secundary.component';

@Component({
  selector: 'custom-stepper',
  standalone: true,
  imports: [CommonModule, ButtonPrimaryComponent, ButtonSecundaryComponent],
  template: `
    <div class="w-[60vw]">
      <div class="flex justify-around mb-4">
        @for(step of steps; track $index) {
        <div
          class="flex flex-col items-center"
          [class.text-primary]="currentStep >= $index"
        >
          <div
            class="w-8 h-8 rounded-full flex items-center justify-center mb-2"
            [class.bg-primary]="currentStep >= $index"
            [class.bg-gray-200]="currentStep < $index"
            [class.text-white]="currentStep >= $index"
          >
            {{ $index + 1 }}
          </div>
          <span class="text-sm">{{ step.title }}</span>
        </div>
        }
      </div>

      <div class="my-4">
        <ng-container
          *ngTemplateOutlet="steps[currentStep].content"
        ></ng-container>
      </div>
      <div class="flex justify-between mt-4">
        <button-secundary
          [ngClass]="{
            'bg-gray-200 text-gray-500 cursor-not-allowed': currentStep === 0
          }"
          [disabled]="currentStep === 0"
          (click)="previous()"
          label="Anterior"
        >
        </button-secundary>
        <button-primary
          *ngIf="currentStep < steps.length - 1"
          (click)="next()"
          label="Siguiente"
        >
        </button-primary>
        <button-primary
          *ngIf="currentStep === steps.length - 1"
          (click)="complete()"
          label="Finalizar"
        >
        </button-primary>
      </div>
    </div>
  `,
})
export class CustomStepperComponent {
  @Input() steps: { title: string; content: any }[] = [];
  @Output() stepChange = new EventEmitter<number>();
  @Output() completed = new EventEmitter<void>();

  currentStep = 0;

  next() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      this.stepChange.emit(this.currentStep);
    }
  }

  previous() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.stepChange.emit(this.currentStep);
    }
  }

  complete() {
    this.completed.emit();
  }
}
