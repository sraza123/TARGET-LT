import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import {UsercreateComponent } from "./user/usercreate/usercreate.component";
import {PersonsComponent } from "./persons/persons.component";
import {PersonsCreateComponent} from "./persons/persons-create.component";

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'users', component:UserComponent },
  { path: 'users/create', component:UsercreateComponent },
  { path: 'users/:id/edit', component:UsercreateComponent },
  { path: 'persons', component:PersonsComponent },
  { path: 'persons/create', component:PersonsCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
