import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../Models/models';

@Pipe({
  name: 'searchUsers',
  standalone: true
})
export class SearchUsersPipe implements PipeTransform {

  transform(value: User[], searchText: string): User[] {
    if(!value) return [];
    if(!searchText) return value;
    

    return value.filter((user:User) => {
      return user.name.toString().toLowerCase().includes(searchText.toString().toLowerCase()) || user.email.toString().toLowerCase().includes(searchText.toString().toLowerCase())
     })
  }

}
