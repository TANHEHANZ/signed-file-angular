import { Component, input } from '@angular/core';

@Component({
  selector: 'app-wrapper',
  standalone: true,
  template: `
    <main
      class="h-screen bg-white p-8 flex justify-center items-center w-full flex-col"
    >
      <section class="flex gap-2 h-[80%]">
        <ng-content></ng-content>
      </section>
    </main>
  `,
})
export class WrapperComponent {
  title = input<string>();
}
