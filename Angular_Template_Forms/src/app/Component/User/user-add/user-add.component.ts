import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../Service/user.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-add',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './user-add.component.html',
  styleUrl: './user-add.component.css'
})
export class UserAddComponent {
  UserForm:FormGroup;
  isEditMode:boolean = false
  UID:number;


  constructor(private fb:FormBuilder , private userService:UserService , private router:Router ,private rout:ActivatedRoute, private toastr: ToastrService){
    this.UserForm = this.fb.group({
      name:['',Validators.required],
      email:[''],
      gender:[''],
      address:['',Validators.required]
    })

    this.UID = Number(rout.snapshot.paramMap.get('id'));
    if(this.UID){
      this.isEditMode = true;
    }else{
      this.isEditMode = false;
    }
  }

  ngOnInit(): void {
    if(this.isEditMode){
      this.userService.getUserById(this.UID).subscribe((data) => {
        this.UserForm.patchValue(data);
      }, error => {
        this.toastr.warning("User : " + error.error.title , "" , {
          positionClass:"toast-top-right",
          progressBar:true,
          timeOut:4000
        })
      });
    }
  }

  onSubmit(){
    if(this.isEditMode != true){
      this.userService.addUser(this.UserForm.value).subscribe(data => {
        this.toastr.success("User Added Successfully.." , "" , {
          positionClass:"toast-top-right",
          progressBar:true,
          timeOut:4000
        })
        this.router.navigate(['/user-list'])
      })
    }else{
      let User = this.UserForm.value;
      User.id = this.UID;
      this.userService.updateUser(this.UID,User).subscribe((data) => {
        this.toastr.success("User Update Successfully.." , "" , {
          positionClass:"toast-top-right",
          progressBar:true,
          timeOut:4000
        })
        this.router.navigate(['/user-list']);
      })
    }
    
  }
}
