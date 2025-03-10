import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
export interface propsInfoSigned {
  count: number;
  title: string;
  icon: string;
}
@Component({
  selector: 'count-component',
  imports: [CommonModule],
  template: `
    <section class="grid grid-cols-4 w-full gap-4">
      @for( item of data() ; track item.title) {
      <div
        [ngClass]=" {
        'bg-primary text-white': item?.count! > 10,
        'bg-terteary': item?.count! <= 10,
      }"
        class="bg-primary flex flex-col justify-start items-start p-4 rounded-xl  w-full gap-2"
      >
        <div class="flex justify-center items-center gap-4">
          <i
            [class]="'fa ' + item?.icon"
            [ngClass]=" {
              'bg-terteary/50': item?.count! > 10,
              'bg-primary/50 text-white': item?.count! <= 10,
            }   "
            class="p-4  rounded-full"
          ></i>
          <strong class="text-2xl"> Nº{{ item?.count }}</strong>
        </div>
        <small class="">{{ item?.title }}</small>
      </div>
      }@empty {
      <p>No hay Datos de usuarios</p>
      }
    </section>
  `,
})
export default class CountComponent {
  data = input<propsInfoSigned[]>();
}
