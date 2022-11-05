import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDayTemplateData } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-view-model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {



  constructor(private authService: AuthService,public router: Router) { }

  formGroup: any;
  responseData: any;
  err: any;

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(5)]),
    });
  }

  loginProcess() {
    if (this.formGroup.valid) {
      this.authService.login(this.formGroup.value).subscribe({
          next: (data) => {
            this.responseData = data;
            localStorage.setItem('token', this.responseData.authorisation.token)
            this.router.navigate(['/']);
          },
          error: (e) => this.err = e.error.message
        });
    }
  }
}
