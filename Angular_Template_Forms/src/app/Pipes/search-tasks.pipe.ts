import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../Models/models';

@Pipe({
  name: 'searchTasks',
  standalone: true
})
export class SearchTasksPipe implements PipeTransform {

  transform(value: Task[], searchText: string): Task[] {
    if(!value) return [];
    if(!searchText) return value;
    

    return value.filter((task:Task) => {
      return task.title.toString().toLowerCase().includes(searchText.toString().toLowerCase()) || task.description.toString().toLowerCase().includes(searchText.toString().toLowerCase())
     })
  }

}
