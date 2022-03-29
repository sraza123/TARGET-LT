import { Injectable } from '@angular/core';
import {User} from "../user/user.model";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Person} from "./persons.model";

@Injectable({
  providedIn: 'root'
})
export class PersonsService {

  constructor( private http:HttpClient, private router:Router) { }

  createPersons(Person: Person) {
    return this.http.post(environment.API_URL+`v1/persons`, Person);
  }
}
