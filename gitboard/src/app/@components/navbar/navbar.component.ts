import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@services/auth/AuthService';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {


  companyAdminRole = environment.adminRole
  siteAdminRole = environment.siteAdminRole

  constructor(private router: Router, private authService: AuthService) { }

  navigateTo(location: string) {
    this.router.navigateByUrl(location);
  }

  isUserLogged(): boolean {
    return localStorage.getItem('token') ? true : false
  }

  getRole() {
    return this.authService.getAuthFromToken()
  }

  logout() {
    localStorage.setItem('token', '')
    this.router.navigateByUrl("")
  }

}
