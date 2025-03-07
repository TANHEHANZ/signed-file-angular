import { Component, input } from '@angular/core';

type EstadoDocumento = 'ACTIVO' | 'ELIMINADO' | 'EDITADO' | 'DESHABILITADO';

@Component({
  selector: 'status-badge',
  standalone: true,
  template: `
    <p [class]="obtenerClases()">
      {{ estado() }}
    </p>
  `,
})
export default class StatusBadgeComponent {
  estado = input.required<EstadoDocumento>();

  private configuracionEstados: Record<EstadoDocumento, string> = {
    ACTIVO: 'border-primary text-primary',
    ELIMINADO: 'border-error text-error',
    EDITADO: 'border-processing text-processing',
    DESHABILITADO: 'border-gray-400 text-gray-400',
  };

  obtenerClases(): string {
    const clasesBase = 'text-sm border rounded-xl text-center px-4';
    const claseEstado = this.configuracionEstados[this.estado()] || '';
    return `${clasesBase} ${claseEstado}`;
  }
}
