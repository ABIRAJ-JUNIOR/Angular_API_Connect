import { Component } from '@angular/core';
import { User, UserService } from '../../../Service/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchUsersPipe } from '../../../Pipes/search-users.pipe';
import { HomeComponent } from '../../home/home.component';
import { Task, TaskService } from '../../../Service/task.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule,FormsModule,SearchUsersPipe,HomeComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  Users:User[] = [];
  SearchText:string = "";
  Tasks:Task[] = [];

  constructor(private userservice:UserService , private router:Router ,private toastr: ToastrService , private taskservice:TaskService){
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

  DeleteUser(id:number){
    const task = this.Tasks.find(t => t.userId == id);
    if(task){
      this.toastr.warning("you can't delete this User." , "" , {
        positionClass:"toast-top-right",
        progressBar:true,
        timeOut:2000
      })
    }else{
      if(confirm("Do you want to delete?")){
        this.userservice.deleteUser(id).subscribe((data) => {
          this.toastr.success("User Deleted Successfully.." , "" , {
            positionClass:"toast-top-right",
            progressBar:true,
            timeOut:2000
          })
          this.listUsers();
        })
      }
    }
  }

  listUsers(){
    this.userservice.getUser().subscribe((data) => {
      this.Users = data;
    })
  }

}
