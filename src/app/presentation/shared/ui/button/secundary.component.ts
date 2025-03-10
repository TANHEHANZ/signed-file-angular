import { NgIf } from '@angular/common';
import { Component, EventEmitter, input, Output, output } from '@angular/core';

@Component({
  selector: 'button-secundary',
  imports: [NgIf],

  template: `
    <button
      (click)="onClick()"
      [disabled]="disabled()"
      [class]="
        disabled() ? 'bg-gray-300 cursor-not-allowed opacity-25' : 'bg-white'
      "
      class=" text-primary   rounded-xl flex gap-2 justify-center items-center h-9  overflow-hidden border  border-secundary hover:bg-secundary/20 duration-300 transition-all cursor-pointer z-50"
    >
      <label
        *ngIf="icon()"
        class=" flex  justify-center items-center h-full w-9 bg-primary text-white  cursor-pointer "
      >
        <i [class]="icon()"></i>
      </label>
      <label class=" pl-4 pr-8 font-medium py-2" *ngIf="label()">
        {{ label() }}
      </label>
    </button>
  `,
})
export class ButtonSecundaryComponent {
  label = input<string>();
  icon = input<string>();
  disabled = input<boolean>();
  clicked = output<void>();
  onClick() {
    this.clicked.emit();
  }
}
