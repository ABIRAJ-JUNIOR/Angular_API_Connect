import { Component, TemplateRef } from '@angular/core';
import { User, UserService } from '../../../Service/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchUsersPipe } from '../../../Pipes/search-users.pipe';
import { HomeComponent } from '../../home/home.component';
import { Task, TaskService } from '../../../Service/task.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule,FormsModule,SearchUsersPipe,HomeComponent],
  providers :[BsModalService],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  Users:User[] = [];
  SearchText:string = "";
  Tasks:Task[] = [];
  modalRef?: BsModalRef;
  userId:number = 0

  constructor(private userservice:UserService , private router:Router ,private toastr: ToastrService , private taskservice:TaskService, private modalService: BsModalService){
    this.taskservice.getTask().subscribe((data) => {
      this.Tasks = data;
    })
  }

  ngOnInit(): void {
    this.listUsers();
  }

  GoToAddUser(){
    this.router.navigate(['/user-add']);
  }
  
  GoToEdit(id:number){
    this.router.navigate(['/user-edit',id]);
  }

  listUsers(){
    this.userservice.getUser().subscribe((data) => {
      this.Users = data;
    })
  }

  openModalWithClass(template: TemplateRef<void> , userId:number) {
    this.userId = userId
    const task = this.Tasks.find(t => t.userId == this.userId);
    if(task){
      this.toastr.warning("you can't delete this User." , "" , {
        positionClass:"toast-top-right",
        progressBar:true,
        timeOut:2000
      })
    }else{
      this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    }
  }
 
  confirm(): void {
    this.userservice.deleteUser(this.userId).subscribe((data) => {
      this.toastr.success("User Deleted Successfully.." , "" , {
        positionClass:"toast-top-right",
        progressBar:true,
        timeOut:2000
      })
      this.listUsers();
    })

    this.modalRef?.hide();  
  }
 
  decline(): void {
    this.modalRef?.hide();
  }

}
