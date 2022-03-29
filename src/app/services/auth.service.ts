import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,private route: Router) { }
  processLogin(usercred:any){
    return this.http.post(environment.API_URL+'auth/token', usercred)
  }
  IsLogedIn(){
    return localStorage.getItem('token') != null
  }
  getToken(){
    return localStorage.getItem('token') || ''
  }
  getUser(){
    let user = localStorage.getItem('user') || ''
    if(user) {
      return JSON.parse(user);
    }
  }
  haveAccess(){
    let user = this.getUser()
    let role = user ? user.role : null
    if(role == 'ROLE_ADMIN'){
      return true;
    }else{
      return false
    }
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    this.route.navigate(['/account/login']);
  }
 }
