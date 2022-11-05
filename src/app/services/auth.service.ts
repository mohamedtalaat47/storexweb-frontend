import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  login(data: any){
    return this.http.post(`${baseUrl}api/login`,data);
  }

  register(data: any){
    return this.http.post(`${baseUrl}api/register`, data);
  }

  signOut() {
    return localStorage.clear();
  }

  isLogged(){
    return (localStorage.getItem('token') ? true : false)
  }
}
