import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {  FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../../Service/task.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { User, UserService } from '../../../Service/user.service';
import { HomeComponent } from '../../home/home.component';

@Component({
  selector: 'app-task-add',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule,BsDatepickerModule,RouterLink,HomeComponent],
  templateUrl: './task-add.component.html',
  styleUrl: './task-add.component.css'
})
export class TaskAddComponent implements OnInit{

  TaskForm:FormGroup;
  isEditMode:boolean = false
  UID:number;
  Users:User[] = [];
  


  constructor(private fb:FormBuilder , private taskService:TaskService , private router:Router ,private rout:ActivatedRoute, private toastr: ToastrService ,private userservice:UserService){
    this.TaskForm = this.fb.group({
      title:['',Validators.required],
      description:[''],
      dueDate:[''],
      priority:['',Validators.required],
      userId:[''],
      checkLists:this.fb.array([])
    })

    this.UID = Number(rout.snapshot.paramMap.get('id'));
    if(this.UID){
      this.isEditMode = true;
    }else{
      this.isEditMode = false;
    }


    this.userservice.getUser().subscribe((data) => {
      this.Users = data;
    })

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

  get myCheckLists():FormArray{
    return this.TaskForm.get('checkLists') as FormArray
  }

  addCheckList(){
    this.myCheckLists.push(
      this.fb.group({
        name:[''],
        isDone:[false]
      })
    )
  }

  removeCheckList(index:number){
    this.myCheckLists.removeAt(index)
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
