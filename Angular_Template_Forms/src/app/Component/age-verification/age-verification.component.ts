import { CommonModule } from '@angular/common';
import { Component, HostListener, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-age-verification',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './age-verification.component.html',
  styleUrl: './age-verification.component.css'
})
export class AgeVerificationComponent{
  user:any = {fullName:"",DOB:"",age:""}
  age:number  = 0;

  calculateAge(){
    this.age = new Date().getFullYear() - new Date(this.user.DOB).getFullYear() 
    this.user.age = this.age
  }
  onSubmit(ageForm:any){
    console.log(ageForm.value)  
  }
}
