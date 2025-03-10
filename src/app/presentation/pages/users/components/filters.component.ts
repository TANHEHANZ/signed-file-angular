import { Component, EventEmitter, Output } from '@angular/core';
import { CustomInputComponent } from '../../../shared/ui/input.component';
import { CustomSelectComponent } from '../../../shared/ui/select.component';
import { ButtonSecundaryComponent } from '../../../shared/ui/button/secundary.component';
import { ICONS } from '../../../shared/ui/icons';
import { FormsModule } from '@angular/forms';
import { ButtonPrimaryComponent } from '../../../shared/ui/button/primary.component';

@Component({
  selector: 'user-filter',
  template: `
    <div class="flex gap-4 w-full justify-between items-center my-4">
      <div class="flex gap-4">
        <custom-input
          type="search"
          label="Filtrar por nombre"
          [(ngModel)]="nameFilter"
        ></custom-input>
        <custom-select
          label="Filtrar por tipo:"
          [(ngModel)]="tipoFilter"
          [options]="[
            { label: 'Juridica', value: 'Juridica' },
            { label: 'Natural', value: 'Natural' }
          ]"
        />
        <custom-select
          label="Filtrar por estado usuario :"
          [(ngModel)]="state"
          [options]="[
            { label: 'ACTIVO', value: 'ACTIVO' },
            { label: 'DESHABILITADO', value: 'DESHABILITADO' }
          ]"
        />
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
    CustomSelectComponent,
    ButtonSecundaryComponent,
    FormsModule,
    ButtonPrimaryComponent,
  ],
})
export class UserFilterComponent {
  @Output() filterChanged = new EventEmitter<{
    nameFilter?: string;
    TipoFilter?: string;
    state?: string;
  }>();

  ICONS = ICONS;
  nameFilter: string = '';
  tipoFilter: string = '';
  state: string = '';

  filtrar() {
    this.filterChanged.emit({
      nameFilter: this.nameFilter || undefined,
      TipoFilter: this.tipoFilter || undefined,
      state: this.state || undefined,
    });
  }
  limpiarFiltros() {
    this.nameFilter = '';
    this.tipoFilter = '';
    this.state = '';
    this.filterChanged.emit({});
  }
}
