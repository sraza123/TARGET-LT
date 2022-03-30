import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Observable} from "rxjs";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpClient} from "@angular/common/http";
import {PersonsService} from "./persons.service";
import {Person} from "./persons.model";
import {dataTableSortableDirective2} from "./table-sorable.directive";
import {SortEvent} from "../persons/table-sorable.directive";
import {DecimalPipe} from "@angular/common";

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss'],
  providers: [PersonsService, DecimalPipe]
})
export class PersonsComponent implements OnInit{
  breadCrumbItems!: Array<{}>;
  @ViewChildren(dataTableSortableDirective2)
  headers!: QueryList<dataTableSortableDirective2>;
  hideme: boolean[] = [];
  tables$: Observable<Person[]>;
  total$: Observable<number>;
  constructor(
    public service: PersonsService,
    private modalService: NgbModal,
    private http:HttpClient
  ) {
    this.tables$ = service.tables$;
    this.total$ = service.total$;
  }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Dashboard' },
      { label: 'Users', active: true }
    ];
  }
  onSort({ column, direction }: SortEvent) {
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
  deleteUser(id:any){
    this.service.deleteUser(id);
  }

}
