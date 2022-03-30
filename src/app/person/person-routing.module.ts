import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import {PersonsComponent } from "./persons/persons.component";
import {PersonsCreateComponent} from "./persons/persons-create.component";

const routes: Routes = [
  { path: '', component: PersonsComponent },
  { path: 'persons/create', component:PersonsCreateComponent },
  { path: 'persons/:id/edit', component:PersonsCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonsRoutingModule { }
