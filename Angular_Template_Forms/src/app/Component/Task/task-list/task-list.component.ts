import { Component, OnInit } from '@angular/core';
import { Task, TaskService } from '../../../Service/task.service';
import { CommonModule } from '@angular/common';
import { Router} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchTasksPipe } from '../../../Pipes/search-tasks.pipe';
import { ToastrService } from 'ngx-toastr';
import { HomeComponent } from '../../home/home.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule,FormsModule,SearchTasksPipe,HomeComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {

  Tasks:Task[] = [];
  SearchText:string = "";

  constructor(private taskservice:TaskService , private router:Router ,private toastr: ToastrService){}

  ngOnInit(): void {
    this.listTasks();
  }

  GoToAddTask(){
    this.router.navigate(['/task-add']);
  }
  
  GoToEdit(id:number){
    this.router.navigate(['/task-edit',id]);
  }

  DeleteTask(id:number){
    if(confirm("Do you want to delete?")){
      this.taskservice.deleteTask(id).subscribe((data) => {
        this.toastr.success("Task Deleted Successfully.." , "" , {
          positionClass:"toast-top-right",
          progressBar:true,
          timeOut:2000
        })
        this.listTasks();
      })
    }
  }

  listTasks(){
    this.taskservice.getTask().subscribe((data) => {
      this.Tasks = data;
    })
  }

  
}
