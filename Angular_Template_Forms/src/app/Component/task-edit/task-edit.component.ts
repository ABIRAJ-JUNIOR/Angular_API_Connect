import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Task, TaskService } from '../../Service/task.service';
import { ToastrService } from 'ngx-toastr';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule,BsDatepickerModule],
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.css'
})
export class TaskEditComponent implements OnInit {
  updateForm:FormGroup;

  constructor(private fb:FormBuilder , private taskService:TaskService , private router:Router ,private param:ActivatedRoute,private toastr: ToastrService){
    this.updateForm = this.fb.group({
      id:[''],
      title:['',Validators.required],
      description:[''],
      dueDate:[''],
      priority:['',Validators.required]
    })
  }

  ngOnInit(): void {
    const id = Number(this.param.snapshot.paramMap.get('id'))
    this.taskService.getTaskById(id).subscribe((data) => {
      data.dueDate = data.dueDate.toString();
      this.setFormValues(data)
    })
  }

  private setFormValues(value:Task){
    this.updateForm.setValue(value)
  }

  public onSubmit(){
    const id = Number(this.param.snapshot.paramMap.get('id'))
    console.log(id)
    console.log(this.updateForm.value)

    const updateTask = {
      id:this.updateForm.value.id,
      title:this.updateForm.value.title,
      description:this.updateForm.value.description,
      dueDate:this.updateForm.value.dueDate,
      priority:this.updateForm.value.priority
    }

    this.taskService.updateTask(id,updateTask).subscribe((data) => {
      this.toastr.success("Task Update Successfully.." , "" , {
        positionClass:"toast-top-right",
        progressBar:true,
        timeOut:2000
      })
      this.router.navigate(['']);
    })
  }
}
