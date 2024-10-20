import { Routes } from '@angular/router';
import { TaskListComponent } from './Component/task-list/task-list.component';
import { TaskAddComponent } from './Component/task-add/task-add.component';
import { TaskEditComponent } from './Component/task-edit/task-edit.component';

export const routes: Routes = [
    {path:'' , component:TaskListComponent},
    {path:'add' , component:TaskAddComponent},
    {path:'edit/:id' , component:TaskEditComponent}
];
