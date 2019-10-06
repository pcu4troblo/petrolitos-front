import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  logedUser: any= {};

  constructor(private router: Router,
              private service: ServicesService) { }

  ngOnInit() {
    this.logedUser = this.service.loggedUser;
  }

  logOut(){
    this.service.loggedUser = null;
    this.router.navigate(['/login']);
  }


}
