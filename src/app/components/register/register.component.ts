import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ServicesService } from 'src/app/services/services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: FormGroup;

  constructor(
    private service: ServicesService,
    private router: Router
    ) { }

  ngOnInit() {
    this.user = new FormGroup({
      name : new FormControl(),
      email : new FormControl(),
      password: new FormControl(),
      tipo: new FormControl()
    }) 
  }

  onRegister():void{
    this.service.register(this.user.value).subscribe( res => {
      this.router.navigate(['/login'])
    })
  }

}
