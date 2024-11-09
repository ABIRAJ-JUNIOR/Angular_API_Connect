import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {  FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../../Service/task.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { UserService } from '../../../Service/user.service';
import { User } from '../../../Models/models';

@Component({
  selector: 'app-task-add',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule,BsDatepickerModule,RouterLink],
  templateUrl: './task-add.component.html',
  styleUrl: './task-add.component.css'
})
export class TaskAddComponent implements OnInit{

  public TaskForm!:FormGroup;
  public TID:number;
  public Users:User[] = [];
  


  constructor(private fb:FormBuilder , private taskService:TaskService , private router:Router ,private rout:ActivatedRoute, private toastr: ToastrService ,private userservice:UserService ){
    this.taskFormInit();
    this.TID = Number(rout.snapshot.paramMap.get('id'));

    this.userservice.getUser().subscribe((data) => {
      this.Users = data;
    })

  }

  private taskFormInit(){
    this.TaskForm = this.fb.group({
      title:['',Validators.required],
      description:['',Validators.required],
      dueDate:['',Validators.required],
      priority:['',Validators.required],
      userId:[''],
      checkLists:this.fb.array([])
    })
  }
  
  get title() { return this.TaskForm.get('title'); }
  get description() { return this.TaskForm.get('description'); }
  get dueDate() { return this.TaskForm.get('dueDate'); }
  get priority() { return this.TaskForm.get('priority'); }
  get userId() { return this.TaskForm.get('userId'); }

  ngOnInit(): void {
    if(this.TID){
      this.taskService.getTaskById(this.TID).subscribe((data) => {
        data.dueDate = new Date(data.dueDate).toLocaleDateString();
        this.TaskForm.patchValue(data);

        this.myCheckLists.clear();
        data.checkLists.forEach((c:any) => {
        
          const group =  this.fb.group({
          id:[''],
          name:[''],
          taskId:[data.id],
          isDone:[false]
        });
        group.patchValue(c);

        this.myCheckLists.controls.push(group);
      });
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

  addTask(){
    this.taskService.addTask(this.TaskForm.value).subscribe(data => {
      this.toastr.success("Task Added Successfully.." , "" , {
        positionClass:"toast-top-right",
        progressBar:true,
        timeOut:4000
      })
      this.router.navigate(['/admin/task-list'])
    },error => {
      this.toastr.warning("Task : " + error.error.title , "" , {
        positionClass:"toast-top-right",
        progressBar:true,
        timeOut:4000
      })
    })
  }

  updateTask(){
    let Task = this.TaskForm.value;
    Task.checkLists = this.myCheckLists.getRawValue();
    Task.id = this.TID;
    this.taskService.updateTask(this.TID,Task).subscribe((data) => {
      this.toastr.success("Task Update Successfully.." , "" , {
        positionClass:"toast-top-right",
        progressBar:true,
        timeOut:4000
      })
      this.router.navigate(['/admin/task-list']);
    },error => {
      this.toastr.warning("Task : " + error.error.title , "" , {
        positionClass:"toast-top-right",
        progressBar:true,
        timeOut:4000
      })
    })

  }


  

}
