import { Injectable , Injector} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class TokenService implements HttpInterceptor{
  constructor(private inject:Injector) { }
  intercept(req:HttpRequest<any>, next: HttpHandler): Observable<any>{
    let authservice = this.inject.get(AuthService)
    let Token= req.clone({
      setHeaders:{
        Authorization:'Bearer ' + authservice.getToken()
      }
    });
    return next.handle(Token)
  }

}
