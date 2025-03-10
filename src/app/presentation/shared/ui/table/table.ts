import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import TableThComponent from './th';
import TableTdComponent from './td';
import TableTheadComponent from './thead';
import TbodyComponent from './tbody';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

export interface TableColumn {
  header: string;
  field: string;
  colspan?: number;
}

export interface TableConfig {
  headers: TableColumn[];
  groupHeaders?: {
    title: string;
    colspan: number;
    variant?: 'default' | 'secondary';
  }[];
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    TableThComponent,
    TableTdComponent,
    TableTheadComponent,
    TbodyComponent,
    MenuModule,
  ],
  template: `
    <div class="overflow-y-scroll h-[50dvh]">
      <table class="w-full h-full rounded-md ">
        <thead class="w-full">
          @for (col of config().headers; track $index) {
          <table-th>{{ col.header }}</table-th>
          } @if (actions().length) {
          <table-th>Acciones</table-th>
          }
        </thead>
        <tbody>
          @for (item of data(); track $index) { @for (col of config().headers;
          track $index) {
          <table-td>
            {{ getValue(item, col.field) }}
          </table-td>
          } @if (actions().length) {
          <table-td [align]="'center'">
            <p-menu [model]="actions()" [popup]="true" #menu></p-menu>
            <button (click)="menu.toggle($event)" class="px-3">
              <i class="ri-more-2-fill"></i>
            </button>
          </table-td>
          } }
        </tbody>
        <!-- <table-tbody [isEmpty]="!data().length" [colSpan]="getTotalColumns()">
         
        </table-tbody> -->
      </table>
    </div>
  `,
})
export default class TableComponent {
  config = input.required<TableConfig>();
  data = input.required<any[]>();
  actions = input<MenuItem[]>([]);

  getTotalColumns(): number {
    return this.config().headers.length + (this.actions().length ? 1 : 0);
  }

  getValue(item: any, field: string): any {
    return field.split('.').reduce((obj, key) => obj?.[key], item);
  }
}
