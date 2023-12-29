import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { StorageService } from '../service/storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(AuthService);
  const storageService = inject(StorageService);
  const router = inject(Router);

  if (!loginService.isLoggedIn()) {
    router.navigate(['/login'], { replaceUrl: true });
  }

  storageService.setRoute(
    route.routeConfig?.path !== undefined ? route.routeConfig.path : null
  );

  return loginService.isLoggedIn();
};
