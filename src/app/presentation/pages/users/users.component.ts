import { Component, inject, OnInit } from '@angular/core';
import { ButtonPrimaryComponent } from '../../shared/ui/button/primary.component';
import { Toast } from 'primeng/toast';
import { FormRegisterComponent } from './components/form-register.component';
import { ModalComponent } from '../../shared/ui/modal.component';
import { SwichService } from '../../../application/global/swich.service';
import { UserTable } from './components/table.component';
import { TokenAssignComponent } from './components/token-assign.component';

@Component({
  selector: 'app-users',
  imports: [
    Toast,
    FormRegisterComponent,
    ModalComponent,
    ButtonPrimaryComponent,
    UserTable,
    TokenAssignComponent,
  ],
  template: `
    <p-toast></p-toast>
    <section class="flex flex-col gap-2">
      <h1 class="text-2xl font-light my-8">Administrar usuarios</h1>
      <section class="w-full flex flex-col justify-center items-start">
        <button-primary
          (clicked)="openModal('register')"
          label="Registrar usuario"
          label="Registrar usuario"
        ></button-primary>

        <user-table></user-table>
      </section>
    </section>
    @if(currentModal !== null) {
    <modal>
      @if(currentModal === 'register') {
      <form-register></form-register>
      } @if(currentModal === 'assign-token') {
      <token-assign></token-assign>
      }
    </modal>
    }
  `,
})
export class UsersComponent implements OnInit {
  modalS = inject(SwichService);
  currentModal: string | null = null;

  ngOnInit(): void {
    this.modalS.$modal.subscribe((valor) => (this.currentModal = valor));
  }
  openModal(type: string) {
    this.modalS.$modal.emit(type);
    this.modalS.setData(null);
  }
}
