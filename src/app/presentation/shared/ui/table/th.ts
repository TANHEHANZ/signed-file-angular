import { Component, input } from '@angular/core';

@Component({
  selector: 'table-th',
  standalone: true,
  template: `
    <th [class]="customClass()" [attr.colspan]="colspan()">
      <ng-content></ng-content>
    </th>
  `,
})
export default class ThComponent {
  variant = input<'default' | 'secondary'>('default');
  colspan = input<number>();
  align = input<'start' | 'center' | 'end'>('start');

  customClass = () => {
    const baseClasses = 'p-2 font-light ';
    const variantClasses =
      this.variant() === 'secondary' ? 'bg-secundary text-white' : '';
    const alignClass = `text-${this.align()}`;

    return `${baseClasses} ${variantClasses} ${alignClass}`.trim();
  };
}
