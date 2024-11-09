import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SignupSigninService } from '../../../Service/signup-signin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule,RouterModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
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
        localStorage.setItem("token" , JSON.stringify(response))
        this.toastr.success("User Login Successfully.." , "" , {
          positionClass:"toast-top-right",
          progressBar:true,
          timeOut:4000
        })
      },complete:()=>{
        this.rout.navigate(['/admin/user-list'])
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
