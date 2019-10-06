import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-incidentes',
  templateUrl: './lista-incidentes.component.html',
  styleUrls: ['./lista-incidentes.component.css']
})
export class ListaIncidentesComponent implements OnInit {

  incidents : Array<any> = [];
  empleados : Array<any> = [];
  responsable: FormGroup;


  constructor(private router: Router,
    private service: ServicesService) { }

  ngOnInit() {
    this.responsable = new FormGroup({
      destiny: new FormControl(),
      origin: new FormControl(),
      text: new FormControl(),
      idIncident: new FormControl()
    });

    this.service.getIncidents().subscribe(res => {
        this.incidents = res.incident;
        console.log(this.incidents);
    });

    this.service.getUsers().subscribe(res => {
      this.empleados = res.employees;
      console.log(this.empleados);
  });

  }

  goToIncident(incidente: any){
    this.router.navigateByUrl("/incidentes/" + incidente._id);
  }


}
