import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { SidebarService } from '../../../application/global/sidebar.service';
import { NgClass } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { LoginInformacionComponent } from '../../pages/login/components/information.component';

@Component({
  selector: 'app-public',
  imports: [RouterOutlet, ToastModule, LoginInformacionComponent],
  providers: [MessageService],
  template: `
    <main class="flex ">
      <p-toast position="bottom-right"></p-toast>
      <login-informacion />
      <router-outlet />
    </main>
  `,
})
export class PublicComponent {
  readonly sidebarService = inject(SidebarService);
  isCollapsed = this.sidebarService.isCollapsed;
}
