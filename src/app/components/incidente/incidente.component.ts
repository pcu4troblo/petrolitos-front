import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-incidente',
  templateUrl: './incidente.component.html',
  styleUrls: ['./incidente.component.css']
})
export class IncidenteComponent implements OnInit {

  incident: any = {};

  constructor(private service: ServicesService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    let id  = this.route.snapshot.params["id"];
    
    this.service.getIncident(id).subscribe( res => {
      console.log(res);
      
      this.incident = res;
    })
  }

}
