import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ServicesService } from 'src/app/services/services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  user: FormGroup;
  token: any;

  constructor(
    private service: ServicesService,
    private router: Router
    ) { }

  ngOnInit() {
    this.user = new FormGroup({
      email : new FormControl(),
      password: new FormControl(),
    }) 
  }

  onLogin(): void{
   this.service.login(this.user.value).subscribe( res => {
     console.log(res.accessToken);
     /*this.token = res.accesToken;
     localStorage.setItem('token', res.accesToken)*/
     
   })
  }

}
