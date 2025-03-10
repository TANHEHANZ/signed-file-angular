import { NgIf } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'button-primary',
  imports: [NgIf],

  template: `
    <button
      (click)="onClick()"
      class="bg-primary text-white  rounded-xl flex gap-2 justify-center items-center py-[6px] px-4 overflow-hidden  hover:bg-primary/80 duration-300 transition-all cursor-pointer z-2 border border-gray-300 w-full"
    >
      <label
        *ngIf="icon()"
        class=" flex  justify-center items-center h-full  z-1 cursor-pointer"
      >
        <i [class]="icon()"></i>
      </label>
      <label class="  font-normal  cursor-pointer">
        {{ label() }}
      </label>
    </button>
  `,
})
export class ButtonPrimaryComponent {
  label = input<string>();
  icon = input<string>();
  clicked = output<void>();
  onClick() {
    this.clicked.emit();
  }
}
