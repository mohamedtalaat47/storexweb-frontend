import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.scss']
})
export class EditMovieComponent implements OnInit {

  constructor(private moviesService: MoviesService, private cat: CategoriesService, public router: Router, private activeRoute: ActivatedRoute) { }

  id: any;
  formGroup: any;
  responseData: any;
  err: any;
  movieData: any;
  movie: any;
  catData: any;
  categories: any;
  selectedImage: any;

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.params['id'];
    this.getMovie(this.id);
    this.getCategories();
  }

  getMovie(id: number) {
    this.moviesService.show(id).subscribe({
      next: (data) => {
        this.movieData = data;
        this.movie = this.movieData.message;

        this.formGroup = new FormGroup({
          name: new FormControl(this.movie.name, [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('^[a-zA-Z].*[\s\.]*$')]),
          category_id: new FormControl(this.movie.category_id, [Validators.required, Validators.pattern("^[0-9]*$")]),
          description: new FormControl(this.movie.description, [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z].*[\s\.]*$')]),
          image: new FormControl(this.movie.image || File)
        });

      },
      error: (e) => console.error(e)
    })
  }

  getCategories() {
    this.cat.index().subscribe({
      next: (data) => {
        this.catData = data;
        this.categories = this.catData.message
      },
      error: (e) => console.error(e)
    });
  }

  updateMovie() {
    if (this.formGroup.valid) {
      const fg:FormData = new FormData;
      fg.append('name', this.formGroup.value.name);
      fg.append('category_id', this.formGroup.value.category_id);
      fg.append('description', this.formGroup.value.description);
      fg.append('image', this.formGroup.value.image);
      fg.append('_method', 'PUT');
      this.moviesService.update(this.id, fg).subscribe({
        next: (data) => {
          this.responseData = data;
          alert('movie updated succesfully!')
          this.router.navigate(['/']);
        },
        error: (e) => this.err = e.error.message
      });
    }
  }

  get f() {
    return this.formGroup.controls;
  }

  onFileChange(event: any) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formGroup.patchValue({
        image: file
      });
    }
  }
}
