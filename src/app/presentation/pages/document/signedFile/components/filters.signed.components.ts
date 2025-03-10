import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { CustomInputComponent } from '../../../../shared/ui/input.component';
import { ButtonSecundaryComponent } from '../../../../shared/ui/button/secundary.component';
import { ButtonPrimaryComponent } from '../../../../shared/ui/button/primary.component';
import { ICONS } from '../../../../shared/ui/icons';
import { CustomSelectComponent } from '../../../../shared/ui/select.component';

@Component({
  selector: 'signed-filter',
  template: `
    <div class="flex gap-4 w-full justify-between items-center my-4">
      <div class="grid grid-cols-2 gap-2">
        <section class=" grid grid-cols-2 gap-2">
          <custom-input
            type="search"
            label="Nombre"
            [(ngModel)]="nombreTitular"
          ></custom-input>
          <custom-input
            type="search"
            label="Ci"
            [(ngModel)]="ciTitular"
          ></custom-input>
        </section>
        <section class=" grid grid-cols-2 gap-2">
          <div>
            <p class="my-1  ">Fecha de creacion</p>
            <p-calendar
              class="max-w-full"
              [(ngModel)]="documentDate"
              [showWeek]="true"
              [showIcon]="true"
            ></p-calendar>
          </div>
          <custom-select
            label="Estado del documento :"
            [(ngModel)]="state"
            [options]="[
              { label: 'ACTIVO', value: 'ACTIVO' },
              { label: 'ARCHIVADO', value: 'ARCHIVADO' },
              { label: 'MODIFICADO', value: 'MODIFICADO' },
              { label: 'REMPLAZADO', value: 'REMPLAZADO' },
              { label: 'ELIMINADO', value: 'ELIMINADO' }
            ]"
          />
        </section>
      </div>
      <div class="flex gap-4 justify-center items-center">
        <button-secundary
          (clicked)="limpiarFiltros()"
          [icon]="ICONS.CLEAR"
          label="limpiar filtro"
        />
        <button-primary
          class="text-md"
          label="Aplicar filtro"
          (clicked)="filtrar()"
          [icon]="ICONS.FILTER"
        />
      </div>
    </div>
  `,
  imports: [
    CustomInputComponent,
    ButtonSecundaryComponent,
    ButtonPrimaryComponent,
    FormsModule,
    CalendarModule,
    CustomSelectComponent,
  ],
})
export class SignedFiltersComponet {
  @Output() filterChanged = new EventEmitter<{
    nombreFirmador?: string;
    Cifirmador?: string;
    FechaCreacion?: string;
    estadoDocumento?: string;
  }>();

  ICONS = ICONS;
  nombreTitular: string = '';
  ciTitular: string = '';
  documentDate = signal<Date | null>(null);
  state: string | undefined;

  filtrar() {
    this.filterChanged.emit({
      nombreFirmador: this.nombreTitular || undefined,
      Cifirmador: this.ciTitular || undefined,
      FechaCreacion: this.documentDate()
        ? this.documentDate()?.toISOString().split('T')[0]
        : undefined,
      estadoDocumento: this.state,
    });
  }

  limpiarFiltros() {
    this.nombreTitular = '';
    this.ciTitular = '';
    this.documentDate.set(null);
    this.state = undefined;
    this.filterChanged.emit({});
  }
}
