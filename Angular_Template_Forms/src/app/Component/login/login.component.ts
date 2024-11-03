import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignupSigninService } from '../../Service/signup-signin.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';
import { SignUp } from '../../Models/models';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  signinForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private signInService: SignupSigninService,
    private toastr: ToastrService,
    private rout:Router
  ) {
      this.signinForm = this.formBuilder.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(8)]],
          rememberMe:['']
      });
  }

  onSubmit() {
    this.signInService.UserSignIn(this.signinForm.value).subscribe({
      next:(response:any) => {
        this.toastr.success("User Login Successfully.." , "" , {
          positionClass:"toast-top-right",
          progressBar:true,
          timeOut:4000
        })
      },complete:()=>{
        this.rout.navigate(['/home'])
      },error:(error:any)=>{
        this.toastr.warning( error.error, "" , {
          positionClass:"toast-top-right",
          progressBar:true,
          timeOut:4000
        })
      }
    })
  }
}
