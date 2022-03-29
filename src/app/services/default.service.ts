import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DefaultService {

  constructor() { }
  roles(){
    return [
      { role: 'ROLE_OP', name:'OP' },
      { role: 'ROLE_ADMIN', name:'ADMIN' },
    ]
  }
}
