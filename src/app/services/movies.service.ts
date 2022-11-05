import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  index() {
    return this.http.get(`${baseUrl}api/movies`);
  }

  create(data: any) {
    return this.http.post(`${baseUrl}api/movies`, data);
  }

  show(id: number) {
    return this.http.get(`${baseUrl}api/movies/${id}`);
  }

  update(id: number, data: any) {
    return this.http.post(`${baseUrl}api/movies/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`${baseUrl}api/movies/${id}`);
  }

  filtered(catID: number) {
    return this.http.get(`${baseUrl}api/moviesByCategory/${catID}`);
  }

}
