import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignupSigninService } from '../../Service/signup-signin.service';
import { SignUp } from '../../Models/models';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  signupForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private signUpService: SignupSigninService,
    private toastr: ToastrService,
    private rout:Router
  ) {
      this.signupForm = this.formBuilder.group({
          fullName: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', Validators.required],
          role: ['', Validators.required],
          terms: [false, Validators.requiredTrue]
      })
  }

  get fullName() { return this.signupForm.get('fullName'); }
  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }
  get confirmPassword() { return this.signupForm.get('confirmPassword'); }
  get role() { return this.signupForm.get('role'); }
  get terms() { return this.signupForm.get('terms'); }


  onSubmit() {
    var User = this.signupForm.value

    var isPasswordMatch:boolean = this.passwordMatch(User.password ,  this.signupForm.value.confirmPassword) 
    if(isPasswordMatch){
      const AddUser:SignUp = {
        fullName:User.fullName,
        email:User.email,
        password:User.password,
        role:Number(User.role)
      }
      this.signUpService.UserSignUp(AddUser).subscribe({
        next:(response) =>{
          this.toastr.success("User SignUp Successfully.." , "" , {
            positionClass:"toast-top-right",
            progressBar:true,
            timeOut:4000
          })
        },complete:()=>{
          this.rout.navigate(['/login'])
        },error:(error)=>{
          console.log(error)
          this.toastr.warning(error.error , "" , {
            positionClass:"toast-top-right",
            progressBar:true,
            timeOut:4000
          })
        }
      })
    }else{
      this.toastr.warning("password not match.." , "" , {
        positionClass:"toast-top-right",
        progressBar:true,
        timeOut:4000
      })
    }
    
  }

  passwordMatch(password:string , confirmPassword:string):boolean{
    if(password != confirmPassword){
      return false
    }else{
      return true
    }
  }

}
