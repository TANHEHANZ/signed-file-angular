import { Component, inject } from '@angular/core';
import { SwichService } from '../../../application/global/swich.service';
import { ICONS } from './icons';

@Component({
  selector: 'modal',
  imports: [],
  template: `
    <section
      class=" absolute left-0 bg-gray-400/50 w-screen h-full top-0 flex justify-center items-center z-10 overflow-hidden"
    >
      <article class="bg-white p-8 relative rounded-md z-50 max-h-[95dvh]">
        <ng-content></ng-content>
        <button
          (click)="closeModal()"
          class=" absolute top-4 right-4 bg-primary/20 w-8 h-8 rounded-full hover:bg-primary cursor-pointer hover:text-white"
        >
          <i [class]="ICONS.CLOSE"></i>
        </button>
      </article>
    </section>
  `,
})
export class ModalComponent {
  modalS = inject(SwichService);
  ICONS = ICONS;
  closeModal() {
    this.modalS.$modal.emit(null);
  }
}
