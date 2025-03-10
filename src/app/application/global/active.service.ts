import { inject, Injectable, signal } from '@angular/core';
import { ACTIVE_KEY } from '../constants/CONSTANTS';
import { LocalStorageService } from '../utils/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ActiveService {
  private storage = inject(LocalStorageService);
  active = signal<boolean>(false);

  private viewStep = signal<number>(0);

  get step() {
    return this.viewStep();
  }

  nextViewStep() {
    this.viewStep.set(this.viewStep() + 1);
    this.storage.setItem(ACTIVE_KEY, this.viewStep);
  }

  previousViewStep() {
    this.viewStep.set(this.viewStep() - 1);
    this.storage.setItem(ACTIVE_KEY, this.viewStep);
  }

  setViewStep(step: number) {
    this.viewStep.set(step);
  }

  constructor() {
    if (typeof window !== 'undefined') {
      this.viewStep.set(this.storage.getItem<number>(ACTIVE_KEY) || 0);
    }
  }
}
