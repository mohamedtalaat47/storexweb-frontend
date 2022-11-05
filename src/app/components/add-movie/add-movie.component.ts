import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { MoviesService } from 'src/app/services/movies.service';


@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent implements OnInit {

  constructor(private moviesService: MoviesService, private cat: CategoriesService, public router: Router) { }

  formGroup: any;
  responseData: any;
  err: any;
  catData: any;
  categories: any;
  selectedImage: any;

  ngOnInit(): void {
    this.initForm();
    this.getCategories();
  }

  initForm() {
    this.formGroup = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('^[a-zA-Z].*[\s\.]*$')]),
      category_id: new FormControl("", [Validators.required, Validators.pattern("^[0-9]*$")]),
      description: new FormControl("", [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z].*[\s\.]*$')]),
      image: new FormControl("",[Validators.required])
    });
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

  addMovie() {
    if (this.formGroup.valid) {
      const fg:FormData = new FormData;
      fg.append('name', this.formGroup.value.name);
      fg.append('category_id', this.formGroup.value.category_id);
      fg.append('description', this.formGroup.value.description);
      fg.append('image', this.formGroup.value.image);

      this.moviesService.create(fg).subscribe({
        next: (data) => {
          this.responseData = data;
          console.log(this.responseData);
          alert('movie added succesfully!')
          this.router.navigate(['/']);
        },
        error: (e) => this.err = e.error.message
      });
    }else {
      this.err ="please fill all fields";
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
