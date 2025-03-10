import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/login.service';

export const RoleGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const allowedRole = route.data['userRole'];

  if (authService.getUserRole() === allowedRole) {
    return true;
  }

  router.navigate(['/dashboard']);
  return false;
};
