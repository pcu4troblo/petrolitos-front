import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { ServicesService } from './services.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private service: ServicesService) { }

  intercept(req, next){
   let tokenizedReq = req.clone({
     setHeaders : {
       Authorization: `Bearer ${this.service.token}`
     }
   });
   return next.handle(tokenizedReq);
  }

  
}
