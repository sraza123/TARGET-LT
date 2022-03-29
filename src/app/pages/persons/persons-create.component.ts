import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {first} from 'rxjs/operators';
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import { PersonsService} from "./persons.service";


@Component({
  selector: 'app-persons-create',
  templateUrl: './persons-create.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsCreateComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  inputForm!: FormGroup;
  submitted = false;
  edit = false;
  roles = [];
  error = '';
  users: any;
  id: any = null;
  constructor(private activeRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private router:Router,
              private service:PersonsService,
              private http: HttpClient)
  {
  }


  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Dashboard' },
      { label: 'Persons', },
      { label: this.edit ? 'Update' : 'Create', active: true }
    ];
    this.inputForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      taxId: ['', Validators.required],
      email: ['', Validators.required],
      code: ['', Validators.required],
      phone: ['', Validators.required],
      publicKey: ['', Validators.required],
      uuid: ['', Validators.required],
    });
  }

  get f() { return this.inputForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.inputForm.invalid) {
      return;
    } else {
      this.service.createPersons(this.inputForm.value)
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
