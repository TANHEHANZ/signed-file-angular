import { Component, inject } from '@angular/core';
import { ModalComponent } from '../../shared/ui/modal.component';
import { SwichService } from '../../../application/global/swich.service';
import { Toast } from 'primeng/toast';
import { ButtonPrimaryComponent } from '../../shared/ui/button/primary.component';
import { TokenFiltersComponet } from './components/filers.token.component';
import { TokenTable } from './components/token.table.component';
import { FormTokenComponet } from './components/form.component';

@Component({
  selector: 'app-token',
  imports: [
    FormTokenComponet,
    ModalComponent,
    Toast,
    ButtonPrimaryComponent,
    TokenTable,
  ],
  template: `
    <p-toast></p-toast>
    <section class="flex flex-col gap-2">
      <h1 class="text-2xl font-light my-8">Administrar Tokens</h1>
      <section class="w-full flex flex-col justify-center items-start">
        <button-primary
          (clicked)="openModal('register')"
          label="Nuevo Token"
        ></button-primary>

        <token-table></token-table>
      </section>
    </section>
    @if(currentModal !== null) {
    <modal>
      @if(currentModal === 'register') {
      <form-token></form-token>

      }
    </modal>
    }
  `,
})
export class TokenComponent {
  modalS = inject(SwichService);
  currentModal: string | null = null;

  ngOnInit(): void {
    this.modalS.$modal.subscribe((valor) => (this.currentModal = valor));
  }
  openModal(type: string) {
    this.modalS.$modal.emit(type);
  }
}
