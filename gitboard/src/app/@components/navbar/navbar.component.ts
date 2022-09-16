import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private router:Router) { }

  navigateTo(location:string){
    this.router.navigateByUrl(location);
  }

  isUserLogged(): boolean{
    return localStorage.getItem('token') ? true : false
  }

  logout(){
    localStorage.setItem('token', '')
    this.router.navigateByUrl("")
  }

}
