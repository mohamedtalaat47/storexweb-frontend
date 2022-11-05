import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class TokenStorageService implements HttpInterceptor{

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let tokenizedReq = req.clone({
      setHeaders: {
      Authorization: `Bearer ${this.getToken()}`,
      },
      })
      return next.handle(tokenizedReq)
  }

    getToken(): string | null {
    return localStorage.getItem('token');
  }
}