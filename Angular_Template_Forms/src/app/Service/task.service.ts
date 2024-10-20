import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http:HttpClient) { }

  getTask(){
    return this.http.get<Task[]>('http://localhost:5185/api/TaskItems');
  }

  getTaskById(id:number){
    return this.http.get<Task>('http://localhost:5185/api/TaskItems/' + id);
  }

  addTask(addTask:Task){
    return this.http.post('http://localhost:5185/api/TaskItems',addTask);
  }

  updateTask(id:number, updateTask:Task){
    return this.http.put('http://localhost:5185/api/TaskItems/'+id,updateTask);
  }

  deleteTask(id:number){
    return this.http.delete('http://localhost:5185/api/TaskItems/'+ id);
  }
}

export interface Task{
  id:number,
  title:string,
  description:string,
  dueDate:string,
  priority:string
}