import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CustomInputComponent } from '../../../shared/ui/input.component';
import { CustomSelectComponent } from '../../../shared/ui/select.component';
import { ButtonSecundaryComponent } from '../../../shared/ui/button/secundary.component';
import { ButtonPrimaryComponent } from '../../../shared/ui/button/primary.component';
import { FormsModule } from '@angular/forms';
import { ICONS } from '../../../shared/ui/icons';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'token-filter',
  template: `
    <div class="flex gap-4 w-full justify-between items-center my-4">
      <div class="grid grid-cols-2 gap-2">
        <section class=" grid grid-cols-2 gap-2">
          <custom-input
            type="search"
            label="Filtrar por nombre"
            [(ngModel)]="nombreTitular"
          ></custom-input>
          <custom-input
            type="search"
            label="Filtrar por ci"
            [(ngModel)]="ciTitular"
          ></custom-input>
        </section>
        <section class=" grid grid-cols-2 gap-2">
          <div>
            <p class="my-1  ">Expiracion token</p>
            <p-calendar
              class="max-w-full"
              [(ngModel)]="documentDate"
              [showWeek]="true"
              [showIcon]="true"
            ></p-calendar>
          </div>
          <custom-input
            type="search"
            label="Filtrar Emisor"
            [(ngModel)]="entidadEmisora"
          ></custom-input>
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
  ],
})
export class TokenFiltersComponet {
  @Output() filterChanged = new EventEmitter<{
    nombreTitular?: string;
    ciTitular?: string;
    entidadEmisora?: string;
    fechaExpiracion?: string;
  }>();
  ICONS = ICONS;
  nombreTitular: string = '';
  ciTitular: string = '';
  entidadEmisora: string = '';
  documentDate = signal<Date | null>(null);

  filtrar() {
    this.filterChanged.emit({
      nombreTitular: this.nombreTitular || undefined,
      ciTitular: this.ciTitular || undefined,
      entidadEmisora: this.entidadEmisora || undefined,
      fechaExpiracion: this.documentDate()
        ? this.documentDate()?.toISOString().split('T')[0]
        : undefined,
    });
  }
  limpiarFiltros() {
    this.nombreTitular = '';
    this.ciTitular = '';
    this.entidadEmisora = '';
    this.documentDate.set(null);
    this.filterChanged.emit({});
  }
}
