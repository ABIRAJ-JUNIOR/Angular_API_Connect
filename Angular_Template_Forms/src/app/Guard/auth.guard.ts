import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { SignupSigninService } from '../Service/signup-signin.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn:'root'
})
export class AuthGuard implements CanActivate {
  constructor(private signinService: SignupSigninService, private router: Router) {}
  canActivate(): boolean {
    if (this.signinService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
