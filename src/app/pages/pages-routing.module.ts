import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import {UsercreateComponent } from "./user/usercreate/usercreate.component";

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'users', component:UserComponent },
  { path: 'users/create', component:UsercreateComponent },
  { path: 'users/:id/edit', component:UsercreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
