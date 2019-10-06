import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormControlName } from '@angular/forms';

@Component({
  selector: 'app-incidente',
  templateUrl: './incidente.component.html',
  styleUrls: ['./incidente.component.css']
})
export class IncidenteComponent implements OnInit {
  empleados: Array<any> = [];
  incident: any = {};
  empleadoSeleccionado: any = {};
  asignaResponsable : FormGroup;
  adminUser: boolean;

  constructor(private service: ServicesService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.asignaResponsable = new FormGroup({
      destiny: new FormControl(),
      origin: new FormControl(),
      idIncident: new FormControl(),
      idResponsible: new FormControl()
    })

    let id  = this.route.snapshot.params["id"];
    this.service.getIncident(id).subscribe( res => {
      this.incident = res.incident;
      console.log(this.incident);
      
    })

    this.service.getUsers("responsable").subscribe(res => {
      this.empleados = res.responsible;
      console.log(this.empleados);
  });
  }

  escogerResponsable(empleado: any){
    this.empleadoSeleccionado = empleado;
  }

  asignarResponsable(){
    this.asignaResponsable.get('destiny').setValue(this.empleadoSeleccionado.email);
    this.asignaResponsable.get('origin').setValue("admin@petrolitos.com");
    this.asignaResponsable.get('idIncident').setValue(this.incident._id);
    this.asignaResponsable.get('idResponsible').setValue(this.empleadoSeleccionado._id);
    console.log(this.asignaResponsable.value);
    
    this.service.assignResponsible(this.asignaResponsable.value).subscribe( res => {
      console.log(res);
    })
  }

}
