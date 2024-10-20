import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-loginform',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './loginform.component.html',
  styleUrl: './loginform.component.css'
})
export class LoginformComponent {
  user:any = {emailAddress: "" , password: ""}

  onSubmit(loginForm:any){
    console.log(loginForm.value)
  }
}
