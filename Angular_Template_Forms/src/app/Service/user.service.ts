import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Models/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  userurl:string = 'http://localhost:5185/api/Users'
  getUser(){
    const token = localStorage.getItem('token');
    return this.http.get<User[]>(this.userurl,{
      headers:{'Authorization' : 'Bearer' + token}
    });
  }

  getUserById(id:number){
    return this.http.get<User>(this.userurl + '/' + id);
  }

  addUser(addUser:User){
    return this.http.post(this.userurl,addUser);
  }

  updateUser(id:number, updateUser:User){
    return this.http.put(this.userurl+ '/' +id,updateUser);
  }

  deleteUser(id:number){
    return this.http.delete(this.userurl +'/'+ id);
  }
}

