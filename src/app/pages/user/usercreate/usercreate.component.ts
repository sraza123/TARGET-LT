import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
// import {UserService} from "../../../services/user.service";
import {DefaultService} from "../../../services/default.service";
import { DataTableService } from '../user.service';
import {first} from 'rxjs/operators';
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {DecimalPipe} from "@angular/common";


@Component({
  selector: 'app-usercreate',
  templateUrl: './usercreate.component.html',
  styleUrls: ['./usercreate.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [DataTableService, DecimalPipe]
})
export class UsercreateComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  signupForm!: FormGroup;
  submitted = false;
  edit = false;
  roles = [];
  error = '';
  users: any;
  id: any = null;
  selectValue = this.defautService.roles()
  constructor(private activeRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private router:Router,
              private userService: DataTableService,
              private defautService: DefaultService,
              private http: HttpClient)
  {
    this.getUsers();
  }

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.params.id;
    if(this.id){
      this.edit = true
       this.http.get(environment.API_URL+'v1/users/'+this.id).subscribe((response:any)=>{
        if(response != null){
          console.log(response)
          this.signupForm = this.formBuilder.group({
            username: response ? response.username : '',
            role:  response ? response.role : '',
            personId: response ? response.id : '',
          });
        }
      })
    }else {
      this.edit = false
    }
    this.breadCrumbItems = [
      { label: 'Dashboard' },
      { label: 'Users', },
      { label: this.edit ? 'Update' : 'Create', active: true }
    ];

    if(!this.edit) {
      this.signupForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
        role: ['', Validators.required],
        personId: ['', Validators.required],
      });
    } else{
      this.signupForm = this.formBuilder.group({
        username: ['', Validators.required],
        role: ['', Validators.required],
        personId: ['', Validators.required],
      });
    }

  }
  getUsers(){
    this.http.get(environment.API_URL+'v1/users').subscribe(response=>{
      if(response != null){
        this.users = response
        this.users =  this.users.content
      }
    })
  }
  get f() { return this.signupForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.signupForm.invalid) {
      return;
    } else {
      if(!this.edit) {
        this.userService.register(this.signupForm.value)
          .pipe(first())
          .subscribe(
            (data: any) => {
              this.router.navigate(['/users']);
            },
            (error: any) => {
              this.error = error ? error : '';
            });
      } else {
        this.userService.updateUser(this.id, this.signupForm.value)
          .pipe(first())
          .subscribe(
            (data: any) => {
              this.router.navigate(['/users']);
            },
            (error: any) => {
              this.error = error ? error : '';
            });
      }
    }
  }

}
