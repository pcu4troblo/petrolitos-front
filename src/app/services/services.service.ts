import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  

  api_url = 'https://nameless-tundra-28328.herokuapp.com/api';

  constructor(private httpClient: HttpClient) { }

  saveReport(report: any): Observable<any>{
    return this.httpClient.post(this.api_url+"/incident", report);
  }

  getIncidents(): Observable<any>{
    return this.httpClient.get(this.api_url+"/incidents");
  }

  getUsers(): Observable<any>{
    return this.httpClient.get(this.api_url+"/employees");
  }

  getEmployee(email: String): Observable<any>{
    return this.httpClient.get<any>(this.api_url+"/employee/" + email);
  }

  register(user: any){
    return this.httpClient.post(this.api_url+"/register", user);
  }

  login(user:any){
    return this.httpClient.post<any>(this.api_url+"/login", user);
  }

  

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  updateProfile(profile){
    return this.httpClient.put<any>(this.api_url+"/updateProfile", profile);
  }

  getToken(){
    return localStorage.getItem('token');
  }


}
