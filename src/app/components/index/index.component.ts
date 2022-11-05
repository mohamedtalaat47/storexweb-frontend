import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(private mov: MoviesService, private cat: CategoriesService, public router: Router) { }

  ngOnInit(): void {
    this.getMovies();
    this.getCategories();
  }

  movies: any;
  categories: any;
  movData: any;
  catData: any;

  getMovies() {
    this.mov.index().subscribe({
      next: (data) => {
        this.movData = data;
        this.movies = this.movData.message;
      },
      error: (e) => console.error(e)
    });
  }

  getCategories() {
    this.cat.index().subscribe({
      next: (data) => {
        this.catData = data;
        this.categories = this.catData.message;
      },
      error: (e) => console.error(e)
    });
  }

  getCatName(id: string) {
    return this.categories.find((item: { id: string; }) => item.id == id).name
  }

  deleteMovie(id: number) {
    let confirmed = confirm('are you sure you ant to delete this movie?');

    if (confirmed) {
      this.mov.delete(id).subscribe({
        next: (data) => {
          console.log(data);
          this.getMovies();
          this.router.navigate(['/']);
        },
        error: (e) => console.error(e)
      });
    }
    
  }

  getFiltered(catID:number){
    this.mov.filtered(catID).subscribe({
      next: (data) => {
        this.movData = data;
        this.movies = this.movData.message;
      },
      error: (e) => console.error(e)
    });
  }

}
