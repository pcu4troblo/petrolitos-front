import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  logedUser: any= {};

  constructor(private router: Router) { }

  ngOnInit() {
    this.logedUser = JSON.parse(localStorage.getItem('user'));
  }

  logOut(){
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }


}
