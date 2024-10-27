import { Component, OnInit, TemplateRef } from '@angular/core';
import { Task, TaskService } from '../../../Service/task.service';
import { CommonModule } from '@angular/common';
import { Router} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchTasksPipe } from '../../../Pipes/search-tasks.pipe';
import { ToastrService } from 'ngx-toastr';
import { HomeComponent } from '../../home/home.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule,FormsModule,SearchTasksPipe,HomeComponent],
  providers :[BsModalService],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {

  Tasks:Task[] = [];
  SearchText:string = "";
  taskId:number = 0
  modalRef?: BsModalRef;

  constructor(private taskservice:TaskService , private router:Router ,private toastr: ToastrService,private modalService: BsModalService){}

  ngOnInit(): void {
    this.listTasks();
  }

  GoToAddTask(){
    this.router.navigate(['/task-add']);
  }
  
  GoToEdit(id:number){
    this.router.navigate(['/task-edit',id]);
  }


  listTasks(){
    this.taskservice.getTask().subscribe((data) => {
      this.Tasks = data;
    })
  }


  openModalWithClass(template: TemplateRef<void> , taskId:number) {
      this.taskId = taskId
      this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
 
  confirm(): void {
    this.taskservice.deleteTask(this.taskId).subscribe((data) => {
      this.toastr.success("Task Deleted Successfully.." , "" , {
        positionClass:"toast-top-right",
        progressBar:true,
        timeOut:2000
      })
      this.listTasks();
    })

    this.modalRef?.hide();  
  }
 
  decline(): void {
    this.modalRef?.hide();
  }

  
}
