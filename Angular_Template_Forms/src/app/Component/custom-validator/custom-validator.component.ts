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
export class CustomValidatorComponent  implements OnInit {
  
  form:any

  user:any = {username: "" , password: ""}

  
  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(this.user.username , [
        Validators.required
      ]),
      password: new FormControl(this.user.password , [
        Validators.required
      ])
    });
  }

  get name() {
    return this.form.get('username');
  }
  get skill() {
    return this.form.get('password');
  }
  

}
