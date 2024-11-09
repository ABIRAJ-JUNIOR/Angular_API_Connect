import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignIn, SignUp } from '../Models/models';
import { jwtDecode } from 'jwt-decode';

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
    return this.http.post(this.UserURL + '/login', UserSignIn ,{
      responseType:'text'
    });
  }
  isLoggedIn():boolean{
    const token:string = localStorage.getItem("token")!;
    const decode:any = jwtDecode(token)
    console.log(decode.Role)
    if(decode.Role == "Admin"){  
      return true
    }else{
      return false
    }
  }
}
