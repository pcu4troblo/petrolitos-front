import { ServicesService } from './../../services/services.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router'

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  incidentForm: FormGroup;
  incidents: Array<any> = [];
  logedUser: any = {};
  
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

    
    this.logedUser = JSON.parse(localStorage.getItem('user'));
   

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

  editProfile(){
    this.router.navigateByUrl("/profile/" + this.logedUser.email)
  }

 

}
