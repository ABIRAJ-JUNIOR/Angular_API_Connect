// import { Injectable } from '@angular/core';

import { inject } from "@angular/core";
import { SignupSigninService } from "../Service/signup-signin.service";
import { HttpInterceptorFn } from "@angular/common/http";

// @Injectable({
//   providedIn: 'root'
// })
// export class MyInterceptorService {

//   constructor() { }
// }
// import { HttpInterceptorFn } from '@angular/common/http';
// import { inject } from '@angular/core';
// import { AuthService } from '../../Services/auth.service';


export const AuthInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(SignupSigninService);
  if (authService.isLoggedIn()) {
    const token = localStorage.getItem('token');
    console.log(token);

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(request);
};