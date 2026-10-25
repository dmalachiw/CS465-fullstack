
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = sessionStorage.getItem('travlr_token');

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

      if (payload.exp && payload.exp * 1000 > Date.now()) {
        return true;
      }
    } catch (error) {
      console.error('Invalid authentication token');
    }
  }

  sessionStorage.removeItem('travlr_token');
  return router.createUrlTree(['/login']);
};
