import { ServicesService } from './../../services/services.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router'
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  incidentForm: FormGroup;
  incidents: Array<any> = [];
  logedUser: any = {};
  adminUser: boolean;
  //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aXBvIjoiYWRtaW4iLCJpYXQiOjE1NzAzMjE2MjB9._ZLnMdIYixrioXJYq1ttAYMSszrf6hHz_DYO5w-RjGI

  constructor(
    private services: ServicesService,
    private router: Router,
  ) { }


  ngOnInit() {
    this.incidentForm = new FormGroup({
      content: new FormControl(),
      category: new FormControl(),
      file: new FormControl(),
      tittle: new FormControl()
    });


    //Validar el tipo de usuario
    var decoded_token = jwt_decode(this.services.token);
    if(decoded_token.tipo == 'admin'){
      this.adminUser = true;
    }

    //Obtener correo y nombre del usuario logeado
    this.logedUser = this.services.loggedUser;
   
    this.services.getIncidents().subscribe(res => {
      this.incidents = res.incident;
    });
  }

  enviarReporte(): void {
    console.log(this.incidentForm.value);
    this.services.saveReport(this.incidentForm.value).subscribe(res => {
      console.log(res);
    });
  }

  editProfile() {
    this.router.navigateByUrl("/profile/" + this.logedUser.email)
  }


 
  listaIncidentes(){
    this.router.navigate(['/incidentes']);
  }


}
