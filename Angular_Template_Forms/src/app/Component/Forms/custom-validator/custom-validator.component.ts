import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-custom-validator',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './custom-validator.component.html',
  styleUrl: './custom-validator.component.css'
})
export class CustomValidatorComponent {
  
  loginform:FormGroup
  space:boolean = false

  user:any = {username: "" , password: ""}

  constructor(private fb:FormBuilder){
    this.loginform = this.fb.group({
      username: ['', Validators.required],
      password:['',Validators.required]
    })
  }
  
  checkSpace(){
    if(this.loginform.value.username.trim().slice(this.loginform.value.username) == this.loginform.value.username.slice(this.loginform.value.username) || this.loginform.value.username.trim() == ''){
      this.space = false
    }else{
      this.space = true
    }
  }

  get name() {
    return this.loginform.get('username');
  }
  get skill() {
    return this.loginform.get('password');
  }
  

}
