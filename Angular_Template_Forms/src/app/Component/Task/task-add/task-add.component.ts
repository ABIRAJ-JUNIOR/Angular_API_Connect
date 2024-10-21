import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../../Service/task.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-task-add',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule,BsDatepickerModule,RouterLink],
  templateUrl: './task-add.component.html',
  styleUrl: './task-add.component.css'
})
export class TaskAddComponent implements OnInit{

  TaskForm:FormGroup;
  isEditMode:boolean = false
  UID:number;


  constructor(private fb:FormBuilder , private taskService:TaskService , private router:Router ,private rout:ActivatedRoute, private toastr: ToastrService){
    this.TaskForm = this.fb.group({
      title:['',Validators.required],
      description:[''],
      dueDate:[''],
      priority:['',Validators.required]
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
      this.taskService.getTaskById(this.UID).subscribe((data) => {
        data.dueDate = new Date(data.dueDate).toLocaleDateString();
        this.TaskForm.patchValue(data);
      }, error => {
        this.toastr.warning("Task : " + error.error.title , "" , {
          positionClass:"toast-top-right",
          progressBar:true,
          timeOut:4000
        })
      });
    }
  }

  onSubmit(){
    if(this.isEditMode != true){
      this.taskService.addTask(this.TaskForm.value).subscribe(data => {
        this.toastr.success("Task Added Successfully.." , "" , {
          positionClass:"toast-top-right",
          progressBar:true,
          timeOut:4000
        })
        this.router.navigate(['/task-list'])
      })
    }else{
      let Task = this.TaskForm.value;
      Task.id = this.UID;
      this.taskService.updateTask(this.UID,Task).subscribe((data) => {
        this.toastr.success("Task Update Successfully.." , "" , {
          positionClass:"toast-top-right",
          progressBar:true,
          timeOut:4000
        })
        this.router.navigate(['/task-list']);
      })
    }
    
  }

}
