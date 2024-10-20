import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registerfrom',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './registerfrom.component.html',
  styleUrl: './registerfrom.component.css'
})
export class RegisterfromComponent {

  user:any = {fullName :"",gender:"",country:""}
  onSubmit(registerForm:any){
    console.log(registerForm.value)
  }
}
