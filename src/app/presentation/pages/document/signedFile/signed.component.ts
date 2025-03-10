import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Toast } from 'primeng/toast';
import { SignedService } from '../../../../application/services/signed.service';
import { responceSigned } from '../../../../application/models/interfaces/api/signed';
import TableSignedFile from './components/table.sifned-file.component';
import { DrawerService } from '../../../../application/global/drawer.service';
import { ModalComponent } from '../../../shared/ui/modal.component';
import { SwichService } from '../../../../application/global/swich.service';
import { SignedComponent } from '../../signed/signed.component';
import { ButtonPrimaryComponent } from '../../../shared/ui/button/primary.component';
import CountComponent, { propsInfoSigned } from './components/count.component';
import { ICONS } from '../../../shared/ui/icons';
import { pruebaService } from '../../../../application/services/prueva.service';

@Component({
  selector: 'app-signed',
  imports: [
    Toast,
    CommonModule,
    TableSignedFile,
    ModalComponent,
    SignedComponent,
    ButtonPrimaryComponent,
  ],
  templateUrl: './signed.component.html',
})
export class SignedFileComponent implements OnInit {
  signedService = inject(SignedService);
  drawerService = inject(DrawerService);
  modalS = inject(SwichService);
  currentModal: string | null = null;
  data: responceSigned[] = [];
  pdfUrl: string | null = null;
  ICONS = ICONS;
  pruebaS = inject(pruebaService);
  infoTop: propsInfoSigned[] = [
    {
      count: 15,
      icon: ICONS.SAVE,
      title: 'Documentos Firmados',
    },
    {
      count: 10,
      icon: ICONS.VALIDATE,
      title: 'Documentos activos',
    },
  ];

  ngOnInit(): void {
    this.signed();
    this.modalS.$modal.subscribe((valor) => (this.currentModal = valor));
  }
  today: number = Date.now();

  openModal(type: string) {
    this.modalS.$modal.emit(type);
  }
  signed() {
    this.signedService.docuemntsSigned({}).subscribe({
      next: (response) => {
        console.log(response);
        this.data = response.data as responceSigned[];
      },

      error: (err) => {
        console.log(err);
      },
    });
  }
}
