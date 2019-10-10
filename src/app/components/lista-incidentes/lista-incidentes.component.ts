import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-lista-incidentes',
  templateUrl: './lista-incidentes.component.html',
  styleUrls: ['./lista-incidentes.component.css']
})
export class ListaIncidentesComponent implements OnInit {

  incidents: Array<any> = [];
  empleados: Array<any> = [];
  responsable: FormGroup;
  responsableUser: boolean;
  adminUser: boolean;
  normalUser: boolean;


  constructor(private router: Router,
    private service: ServicesService) { }

  ngOnInit() {
    this.responsable = new FormGroup({
      destiny: new FormControl(),
      origin: new FormControl(),
      text: new FormControl(),
      idIncident: new FormControl()
    });

    //lista de incidentes
    



    //validar tipo de usuario
    var decoded_token = jwt_decode(this.service.token);
    if (decoded_token.tipo == 'admin' || decoded_token.tipo == 'responsable') {
      if (decoded_token.tipo == 'admin') {
        this.adminUser = true;
        this.service.getIncidents().subscribe(res => {
          this.incidents = res.incident;
          console.log(this.incidents);
        });
      } else if (decoded_token.tipo == 'responsable') {
        this.responsableUser = true;
        this.service.responsibleIncidents(this.service.id).subscribe(res => {
          this.incidents = res.incident;
          console.log(res);
        });
      } else {
        this.normalUser = true;
      }
    };

  }

  //ir a incidente seleccionado
  goToIncident(incidente: any) {
    this.router.navigateByUrl("/incidentes/" + incidente._id);
  }


}
