import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit(): void {
  }

  signOut() {
    this.authService.signOut()
    this.router.navigate(['/login']);
  }

}
