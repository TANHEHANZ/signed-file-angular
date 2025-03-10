import { ICONS } from './../ui/icons';
import { Component, inject } from '@angular/core';
import { LinkComponent } from '../ui/link.component';
import { PATH_ROUTES } from '../../../application/models/route.enum';
import { SidebarService } from '../../../application/global/sidebar.service';
import { NgClass } from '@angular/common';
import { WrapperlinkComponent } from './components/wrapperlink';
import { AuthService } from '../../../application/services/login.service';
import { TokenStateService } from '../../../application/services/token-state.service';
import { Route, Router } from '@angular/router';
import { ButtonPrimaryComponent } from '../ui/button/primary.component';

@Component({
  selector: 'app-sidebar',
  imports: [
    LinkComponent,
    NgClass,
    WrapperlinkComponent,
    ButtonPrimaryComponent,
  ],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  PATH_ROUTES = PATH_ROUTES;
  ICONS = ICONS;
  readonly sidebarService = inject(SidebarService);

  constructor(
    private authService: AuthService,
    private tokenStateService: TokenStateService
  ) {}

  private router = inject(Router);

  get isAdmin() {
    return this.authService.getUserRole() === 'ADMINISTRADOR';
  }

  get userMenuItems() {
    return [
      {
        title: 'Gestionar Documentos',
        items: [
          {
            label: 'Documentos Firmados',
            route: this.PATH_ROUTES.DASHBOARD_SIGNED,
            icon: this.ICONS.SHIELD,
          },
          {
            label: 'Validar Documentos',
            route: this.PATH_ROUTES.DASHBOARD_VALIDATE,
            icon: this.ICONS.VALIDATE,
          },
        ],
      },
    ];
  }

  get adminMenuItems() {
    return [
      {
        title: 'Gestionar Tokens',
        items: [
          {
            label: 'Tokens',
            route: this.PATH_ROUTES.DASHBOARD_TOKEN,
            icon: this.ICONS.TOKEN,
          },
        ],
      },
      {
        title: 'Configuración',
        items: [
          {
            label: 'Usuarios',
            route: this.PATH_ROUTES.DASHBOARD_USERS,
            icon: this.ICONS.USER,
          },
        ],
      },
    ];
  }

  get menuItems() {
    return this.isAdmin ? [...this.adminMenuItems] : this.userMenuItems;
  }

  handleLogout() {
    this.authService.logout();
    this.tokenStateService.clearState();
    this.router.navigate(['/login']);
  }
}
