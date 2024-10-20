import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {  FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../Service/task.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-add',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './task-add.component.html',
  styleUrl: './task-add.component.css'
})
export class TaskAddComponent {

  profileForm:FormGroup;

  constructor(private fb:FormBuilder , private taskService:TaskService , private router:Router , private toastr: ToastrService){
    this.profileForm = this.fb.group({
      title:['',Validators.required],
      description:[''],
      dueDate:[''],
      priority:['',Validators.required]
    })
  }

  onSubmit(){
    console.log(this.profileForm.value)
    this.taskService.addTask(this.profileForm.value).subscribe(data => {
      this.toastr.success("Task Added Successfully.." , "" , {
        positionClass:"toast-top-right",
        progressBar:true,
        timeOut:2000
      })
      this.router.navigate([''])
    })
  }

}
