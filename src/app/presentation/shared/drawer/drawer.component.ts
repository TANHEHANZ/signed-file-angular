import { ICONS } from './../ui/icons';
import { NgClass, NgIf } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { DrawerService } from '../../../application/global/drawer.service';

@Component({
  selector: 'app-drawer',
  imports: [NgClass, NgIf],
  template: `
    <div
      *ngIf="drawerService.isCollapsed()"
      class="fixed inset-0 bg-gray-800/20 z-40"
      (click)="drawerService.changeDrawer()"
    ></div>
    <section
      [ngClass]="{
        'opacity-100 translate-x-0': drawerService.isCollapsed(),
        'opacity-0 translate-x-full': !drawerService.isCollapsed()
      }"
      class="w-[800px] bg-white fixed top-0 right-0 h-[100dvh] z-50 shadow-md 
         transition-all duration-700 ease-in-out p-8"
    >
      <button class="btn-folder " (click)="drawerService.changeDrawer()">
        <i [class]="ICONS.CLOSE"></i>
      </button>
      <h4 class="text-xl font-bold text-black">{{ title() }}</h4>

      <div class="py-2 overflow-y-auto h-full  ">
        <ng-content />
      </div>
    </section>
  `,
})
export class DrawerComponent {
  title = input<string>('');
  content = input<any>(null);
  drawerService = inject(DrawerService);
  ICONS = ICONS;

  isEmptyContent() {
    return !this.content();
  }

  closeDrawer() {
    this.drawerService.changeDrawer();
  }
}
