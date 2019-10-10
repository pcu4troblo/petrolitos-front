import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormControlName } from '@angular/forms';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-incidente',
  templateUrl: './incidente.component.html',
  styleUrls: ['./incidente.component.css']
})
export class IncidenteComponent implements OnInit {
  empleados: Array<any> = [];
  incident: any = {};
  empleadoSeleccionado: any = {};
  asignaResponsable: FormGroup;
  comments: FormGroup;
  adminUser: boolean;
  responsableUser: boolean;
  normalUser: boolean;

  constructor(private service: ServicesService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.asignaResponsable = new FormGroup({
      destiny: new FormControl(),
      origin: new FormControl(),
      idIncident: new FormControl(),
      idResponsible: new FormControl()
    });

    this.comments = new FormGroup({
      comments: new FormControl()
    });
    //var decoded_token = jwt_decode(this.services.token);
    var decoded_token = jwt_decode(this.service.token);
    if (decoded_token.tipo == 'admin' || decoded_token.tipo == 'responsable') {
      if (decoded_token.tipo == 'admin') {
        this.adminUser = true;
      } else if (decoded_token.tipo == 'responsable') {
        this.responsableUser = true;
      }else{
        this.normalUser = true;
      }
    }

    

    //Llamar el incidente por id del servidor
    var id = this.route.snapshot.params["id"];
    this.service.getIncident(id).subscribe(res => {
      this.incident = res.incident;
      console.log(this.incident);
    });

    //lista de responsables
    this.service.getUsers("responsable").subscribe(res => {
      this.empleados = res.responsible;
      console.log(this.empleados);
    });

  }

  escogerResponsable(empleado: any) {
    this.empleadoSeleccionado = empleado;
  }

  asignarResponsable() {
    this.asignaResponsable.get('destiny').setValue(this.empleadoSeleccionado.email);
    this.asignaResponsable.get('origin').setValue("admin@petrolitos.com");
    this.asignaResponsable.get('idIncident').setValue(this.incident._id);
    this.asignaResponsable.get('idResponsible').setValue(this.empleadoSeleccionado._id);
    console.log(this.asignaResponsable.value);

    this.service.assignResponsible(this.asignaResponsable.value).subscribe(res => {
      console.log(res);
    })
  }

  guardarComentario(){
    
  }

}
