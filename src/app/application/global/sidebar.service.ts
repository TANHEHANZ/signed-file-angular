import { inject, Injectable, signal } from '@angular/core';
import { NAV_KEY } from '../constants/CONSTANTS';
import { LocalStorageService } from '../utils/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private storage = inject(LocalStorageService);
  isCollapsed = signal<boolean>(false);

  constructor() {
    if (typeof window !== 'undefined') {
      this.isCollapsed.set(this.storage.getItem<boolean>(NAV_KEY) || true);
    }
  }

  changeValue() {
    const newState = !this.isCollapsed();
    this.isCollapsed.set(newState);
    this.storage.setItem(NAV_KEY, newState);
  }

  setSidebarState(state: boolean) {
    this.storage.setItem(NAV_KEY, state);
  }
}
