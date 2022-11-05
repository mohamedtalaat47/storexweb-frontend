import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { EditMovieComponent } from './components/edit-movie/edit-movie.component';
import { ErrorComponent } from './components/error/error.component';
import { IndexComponent } from './components/index/index.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: IndexComponent , canActivate:[AuthGuard]},
  { path: 'add', component: AddMovieComponent , canActivate:[AuthGuard]},
  { path: 'edit/:id', component: EditMovieComponent , canActivate:[AuthGuard]},
  { path: '**', component: ErrorComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
