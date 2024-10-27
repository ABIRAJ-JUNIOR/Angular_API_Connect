import { Routes } from '@angular/router';
import { TaskListComponent } from './Component/Task/task-list/task-list.component';
import { TaskAddComponent } from './Component/Task/task-add/task-add.component';
import { HomeComponent } from './Component/home/home.component';
import { UserListComponent } from './Component/User/user-list/user-list.component';
import { UserAddComponent } from './Component/User/user-add/user-add.component';

export const routes: Routes = [
    {path:'' , component:HomeComponent},
    {path:'home' , component:HomeComponent},

    {path:'task-list' , component:TaskListComponent},
    {path:'task-add' , component:TaskAddComponent},
    {path:'task-edit/:id' , component:TaskAddComponent},

    {path:'user-list' , component:UserListComponent},
    {path:'user-add' , component:UserAddComponent},
    {path:'user-edit/:id' , component:UserAddComponent}
];
