import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProcessService {
  private currentStep = signal<number>(0);

  get step() {
    return this.currentStep();
  }

  nextStep() {
    this.currentStep.set(this.currentStep() + 1);
  }

  previousStep() {
    this.currentStep.set(this.currentStep() - 1);
  }

  setStep(step: number) {
    this.currentStep.set(step);
  }
}
