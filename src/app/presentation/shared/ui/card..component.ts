import { Component, input, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-card',
  template: ` <section class="flex flex-col font-light h-full gap-2 ">
    <i [class]="icon()"></i>
    <strong class="text-xs text-primary/70 ">{{ title() }}</strong>
    <div class="flex flex-col gap-2 ">
      <ng-content></ng-content>
    </div>
  </section>`,
})
export default class CardComponenr {
  title = input<string>();
  icon = input<string>();
  content = input<string>();
  action = output<void>();

  onClick() {
    this.action.emit();
  }
}
