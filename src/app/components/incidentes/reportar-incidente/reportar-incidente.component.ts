import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import { FormGroup, FormControl } from '@angular/forms'

@Component({
  selector: 'app-reportar-incidente',
  templateUrl: './reportar-incidente.component.html',
  styleUrls: ['./reportar-incidente.component.css']
})
export class ReportarIncidenteComponent implements OnInit {

  incidentForm: FormGroup;

  constructor(private services: ServicesService) { }



  ngOnInit() {

    this.incidentForm = new FormGroup({
      content: new FormControl(),
      category: new FormControl(),
      file : new FormControl(),
      tittle: new FormControl()
    });

    this.services.getIncidents().subscribe(res => {
      console.log(res);
      
    });

  }

  onSubmit():void{
   console.log(this.incidentForm.value);
   this.services.saveReport(this.incidentForm.value).subscribe(res => {
     console.log(res);
   })
   
  }

}
