import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IndexComponent } from './components/index/index.component';
import { ErrorComponent } from './components/error/error.component';
import { TokenStorageService } from './services/token-storage.service';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { EditMovieComponent } from './components/edit-movie/edit-movie.component';
import { AuthGuard } from './auth.guard';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    IndexComponent,
    ErrorComponent,
    AddMovieComponent,
    EditMovieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenStorageService,
      multi: true,
    },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
