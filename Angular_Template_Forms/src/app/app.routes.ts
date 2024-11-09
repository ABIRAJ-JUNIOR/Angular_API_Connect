import { Routes } from '@angular/router';
import { TaskListComponent } from './Component/Task/task-list/task-list.component';
import { TaskAddComponent } from './Component/Task/task-add/task-add.component';
import { UserListComponent } from './Component/User/user-list/user-list.component';
import { UserAddComponent } from './Component/User/user-add/user-add.component';
import { LoginPageComponent } from './Component/Auth/login-page/login-page.component';
import { SignupPageComponent } from './Component/Auth/signup-page/signup-page.component';
import { AdminPageComponent } from './Component/Admin/admin-page/admin-page.component';
import { AuthGuard } from './Guard/auth.guard';

export const routes: Routes = [
    {path:'' , component:LoginPageComponent},
    {path:'register' , component:SignupPageComponent},
    {path:'login' , component:LoginPageComponent},

    {
        path:'admin' , component:AdminPageComponent , 
        canActivate:[AuthGuard],
        children:[
            {path:'task-list' , component:TaskListComponent},
            {path:'task-add' , component:TaskAddComponent},
            {path:'task-edit/:id' , component:TaskAddComponent},

            {path:'user-list' , component:UserListComponent},
            {path:'user-add' , component:UserAddComponent},
            {path:'user-edit/:id' , component:UserAddComponent},
            {path:'**' , redirectTo:'login' ,pathMatch:'full'}

        ]
    }

];
