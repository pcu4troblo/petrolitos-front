import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  api_url = 'https://nameless-tundra-28328.herokuapp.com/api';

  constructor(private httpClient: HttpClient) { }

  saveReport(report: any): Observable<any>{
    return this.httpClient.post(this.api_url+"/createIncident", report);
  }

  getIncidents(): Observable<any>{
    return this.httpClient.get(this.api_url+"/incidents")
  }

}
