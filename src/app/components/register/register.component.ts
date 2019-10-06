import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ServicesService } from 'src/app/services/services.service';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: FormGroup;
  adminUser: boolean;

  constructor(
    private service: ServicesService,
    private router: Router
    ) { }

  ngOnInit() {
    this.user = new FormGroup({
      name : new FormControl(),
      email : new FormControl(),
      password: new FormControl(),
      phone: new FormControl(),
      tipo: new FormControl()
    }) 

    //Validar el tipo de usuario
    var decoded_token = jwt_decode(this.service.token);
    if(decoded_token.tipo == 'admin'){
      this.adminUser = true;
    }
  }

  onRegister():void{
    this.service.register(this.user.value).subscribe( res => {
      this.router.navigate([''])
    })
  }

}
