import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignIn, SignUp } from '../Models/models';

@Injectable({
  providedIn: 'root'
})
export class SignupSigninService {

  constructor(private http:HttpClient) { }

  UserURL:string = 'http://localhost:5185/api/Authentication' 

  UserSignUp(UserSignUp:SignUp){
   return this.http.post(this.UserURL + '/add-user' , UserSignUp)
  }

  UserSignIn(UserSignIn:SignIn){
    return this.http.post(this.UserURL + '/login' , UserSignIn)
  }
}
