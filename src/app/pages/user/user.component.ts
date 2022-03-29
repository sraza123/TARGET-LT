import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import { Observable } from 'rxjs';
import { dataTableSortableDirective, SortEvent } from './user-sorable.directive';
import { DataTableService } from './user.service';
import { DecimalPipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


import { Table } from './table.model';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [DataTableService, DecimalPipe]
})

export class UserComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  @ViewChildren(dataTableSortableDirective)
  headers!: QueryList<dataTableSortableDirective>;
  hideme: boolean[] = [];
  tables$: Observable<Table[]>;
  total$: Observable<number>;
  constructor(
    public service: DataTableService,
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
  deleteUser(id:any){
    this.service.deleteUser(id);
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


}
