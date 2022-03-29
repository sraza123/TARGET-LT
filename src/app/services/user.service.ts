import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { User } from '../pages/user/user.model';
import {environment} from "../../environments/environment";
import {debounceTime, delay, switchMap, tap} from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class UserService {
  response: any;
  tableData: any;
  tableDataList: any[] = [];
  constructor(private http: HttpClient) { }
  /**
   * Get All User
   */
  getAll() {
    console.log(environment.API_URL)
    this.http.get(environment.API_URL+'v1/users').subscribe(response=>{
      console.log('bara')
      if(response != null){
        this.response = response
        let contentall =  this.response.content
        this.tableData = this.response.content
        if(contentall.length) {
          contentall.forEach((data: any) => {
            let row = {
              id: data.id,
              username: data.username,
              role: data.role,
              name: data.person ? data.person.firstName + ' '+ data.person.lastName : '',
              taxid: data.person ? data.person.taxId : '',
              email: data.person ? data.person.email : '',
              phone: data.person ? data.person.phone : ''
            }
            this.tableDataList.push(row)
          });
        }
      }
    })
  return this.tableDataList;
  }

  /**
   * Facked User Register
   */
  register(user: User) {
    return this.http.post(environment.API_URL+`v1/users`, user);
  }
}
