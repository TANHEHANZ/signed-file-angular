import { Component, input } from '@angular/core';

@Component({
  selector: 'table-thead',
  standalone: true,
  template: `
    <thead [class]="customClass()">
      <ng-content></ng-content>
    </thead>
  `,
})
export default class TableTheadComponent {
  variant = input<'default' | 'bordered'>('default');
  size = input<'sm' | 'md' | 'lg'>('sm');

  customClass = () => {
    const baseClasses = 'text-sm';
    const variantClasses =
      this.variant() === 'bordered' ? 'border-b border-gray-300' : '';
    const sizeClasses = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    }[this.size()];

    return `${baseClasses} ${variantClasses} ${sizeClasses}`.trim();
  };
}
