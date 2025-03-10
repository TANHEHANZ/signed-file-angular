import { Component, input } from '@angular/core';

@Component({
  selector: 'table-td',
  standalone: true,
  template: `
    <td [class]="customClass()">
      <ng-content></ng-content>
    </td>
  `,
})
export default class TdComponent {
  padding = input<'none' | 'sm' | 'md' | 'lg'>('md');
  align = input<'start' | 'center' | 'end'>('start');

  customClass = () => {
    const paddingClasses = {
      none: '',
      sm: 'py-2',
      md: 'py-3',
      lg: 'py-4',
    }[this.padding()];

    const alignClass = `text-${this.align()}`;

    return `${paddingClasses} ${alignClass}`.trim();
  };
}
