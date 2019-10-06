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
  logedUser: any = {};

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
     this.token = res.token;
     this.logedUser = {
       name: res.user,
       email: res.email
     };
     localStorage.setItem('user', JSON.stringify(this.logedUser));
     this.router.navigateByUrl('')
   })
  }

  register(){
    this.router.navigate(['/register']);
  }

}
