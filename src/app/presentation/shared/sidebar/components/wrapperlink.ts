import { Component, inject, input } from '@angular/core';
import { SidebarService } from '../../../../application/global/sidebar.service';

@Component({
  selector: 'app-wrapperlink',
  standalone: true,
  imports: [],
  template: `
    <section
      class="w-full flex flex-col items-start gap-2  rounded-md py-4 px-2"
    >
      <p class="text-[10px]  text-gray-500 uppercase  ">
        {{ title() }}
      </p>
      <ng-content></ng-content>
    </section>
  `,
})
export class WrapperlinkComponent {
  title = input<string>();
  service = inject(SidebarService);
  collapsed = this.service.isCollapsed();
}
