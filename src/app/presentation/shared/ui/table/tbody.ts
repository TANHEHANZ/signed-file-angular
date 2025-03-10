import { Component, input } from '@angular/core';

@Component({
  selector: 'table-tbody',
  standalone: true,
  template: `
    <tbody
      class="[&>*:nth-child(odd)]:bg-terteary/15 [&>*:nth-child(even)]:bg-secundary/2"
    >
      <ng-content></ng-content>
      @if (isEmpty()) {
      <tr>
        <td [attr.colspan]="colSpan()" class="text-center py-8 text-gray-500">
          <p>{{ emptyMessage() }}</p>
        </td>
      </tr>
      }
    </tbody>
  `,
})
export default class TbodyComponent {
  variant = input<'striped' | 'hover' | 'plain'>('striped');
  colSpan = input<number>();
  isEmpty = input<boolean>(false);
  emptyMessage = input<string>('No hay datos disponibles');

  customClass = () => {
    const baseClasses = 'w-full';
    const variantClasses = {
      striped:
        '[&>*:nth-child(odd)]:bg-terteary/15 [&>*:nth-child(even)]:bg-secundary/2',
      hover: '[&>tr:hover]:bg-gray-100',
      plain: '',
    }[this.variant()];

    return `${baseClasses} ${variantClasses}`.trim();
  };
}
