import {Injectable, PipeTransform} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Person} from "./persons.model";
import {SortColumn, SortDirection} from "../persons/table-sorable.directive";
import {BehaviorSubject, Observable, of, Subject} from "rxjs";
import { DecimalPipe } from '@angular/common';
import {debounceTime, delay, switchMap, tap} from "rxjs/operators";


interface SearchResult {
  tables: Person[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  startIndex: number;
  endIndex: number;
  totalRecords: number;
}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(tables: Person[], column: SortColumn, direction: string): Person[] {
  if (direction === '' || column === '') {
    return tables;
  } else {
    return [...tables].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(table: Person, term: string, pipe: PipeTransform) {
  return table.firstName.toLowerCase().includes(term) || table.lastName.toLowerCase().includes(term)
    || table.taxId.toLowerCase().includes(term)
    || table.email.toLowerCase().includes(term)
    || table.code.toLowerCase().includes(term)
    || table.phone.toLowerCase().includes(term)
    || table.publicKey.toLowerCase().includes(term)
    || table.uuid.toLowerCase().includes(term)
}
@Injectable({
  providedIn: 'root'
})
export class PersonsService {
  response: any;
  tableData: any;
  tableDataList: any[] = [];
  // tslint:disable-next-line: variable-name
  private _loading$ = new BehaviorSubject<boolean>(true);
  // tslint:disable-next-line: variable-name
  private _search$ = new Subject<void>();
  // tslint:disable-next-line: variable-name
  private _tables$ = new BehaviorSubject<Person[]>([]);
  // tslint:disable-next-line: variable-name
  private _total$ = new BehaviorSubject<number>(0);
  // tslint:disable-next-line: variable-name
  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
    startIndex: 0,
    endIndex: 9,
    totalRecords: 0
  };

  constructor(private pipe: DecimalPipe, private http:HttpClient, private router:Router) {
    this.tableData = this.tables$
    this.tableDataList = []
    this.getUsers()
  }

  getUsers(){
    this.tableDataList = [];
    this.http.get(environment.API_URL+'v1/persons').subscribe(response=>{
      if(response != null){
        this.response = response
        let contentall =  this.response.content
        this.tableData = this.response.content
        this.tableDataList = this.response.content

        this._search$.pipe(
          tap(() => this._loading$.next(true)),
          debounceTime(200),
          switchMap(() => this._search()),
          delay(200),
          tap(() => this._loading$.next(false))
        ).subscribe(result => {
          this._tables$.next(result.tables);
          this._total$.next(result.total);
        });
        this._search$.next();
      }
    })
  }

  createPersons(Person: Person) {
    return this.http.post(environment.API_URL+`v1/persons`, Person);
  }
  updatePerson(id:number, person: Person) {
    return this.http.put(environment.API_URL+'v1/persons/'+id, person);
  }
  updateUser(id:number, user: Person) {
    return this.http.put(environment.API_URL+'v1/persons/'+id, user);
  }
  deleteUser(id:number){
    return this.http.delete(environment.API_URL+'v1/persons/'+id)
      .subscribe((data:any)=>console.log(''))
  }
  getUserById(id:number){
    return this.http.get(environment.API_URL+'v1/persons/'+id)
  }


  /**
   * Returns the value
   */
  get tables$() { return this._tables$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  get startIndex() { return this._state.startIndex; }
  get endIndex() { return this._state.endIndex; }
  get totalRecords() { return this._state.totalRecords; }

  /**
   * set the value
   */
  // tslint:disable-next-line: adjacent-overload-signatures
  set page(page: number) { this._set({ page }); }
  // tslint:disable-next-line: adjacent-overload-signatures
  set pageSize(pageSize: number) { this._set({ pageSize }); }
  // tslint:disable-next-line: adjacent-overload-signatures
  // tslint:disable-next-line: adjacent-overload-signatures
  set startIndex(startIndex: number) { this._set({ startIndex }); }
  // tslint:disable-next-line: adjacent-overload-signatures
  set endIndex(endIndex: number) { this._set({ endIndex }); }
  // tslint:disable-next-line: adjacent-overload-signatures
  set totalRecords(totalRecords: number) { this._set({ totalRecords }); }
  // tslint:disable-next-line: adjacent-overload-signatures
  set searchTerm(searchTerm: string) { this._set({ searchTerm }); }
  set sortColumn(sortColumn: SortColumn) { this._set({ sortColumn }); }
  set sortDirection(sortDirection: SortDirection) { this._set({ sortDirection }); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  /**
   * Search Method
   */
  private _search(): Observable<SearchResult> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

    // 1. sort
    let tables = sort(this.tableDataList, sortColumn, sortDirection);
    // 2. filter
    tables = tables.filter(table => matches(table, searchTerm, this.pipe));
    const total = tables.length;

    // 3. paginate
    this.totalRecords = tables.length;
    this._state.startIndex = (page - 1) * this.pageSize + 1;
    this._state.endIndex = (page - 1) * this.pageSize + this.pageSize;
    if (this.endIndex > this.totalRecords) {
      this.endIndex = this.totalRecords;
    }
    tables = tables.slice(this._state.startIndex - 1, this._state.endIndex);
    return of(
      { tables, total }
    );
  }
}
