import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  api_url = 'https://nameless-tundra-28328.herokuapp.com/api'
  //api_url = 'https://localhost:3000/api'
  token: any
  id: any
  loggedUser: any = {}

  constructor (private httpClient: HttpClient) {}

  saveReport (report: any): Observable<any> {
    const formData = new FormData();
    console.log(report);
    formData.append('content', report.content);
    formData.append('category', report.category);
    formData.append('file', report.file);
    formData.append('tittle', report.tittle);
    return this.httpClient.post(this.api_url + '/incident', formData);
  }

  saveLesson (lesson: any): Observable<any> {
    return this.httpClient.post(this.api_url + '/lesson', lesson)
  }

  getIncidents (): Observable<any> {
    return this.httpClient.get(this.api_url + '/incidents')
  }

  responsibleIncidents (id: any): Observable<any> {
    return this.httpClient.get(this.api_url + '/incidentsr/' + id)
  }

  getIncident (id: any): Observable<any> {
    return this.httpClient.get(this.api_url + '/incident/' + id)
  }

  getUsers (tipo: string): Observable<any> {
    return this.httpClient.get(this.api_url + '/employee/' + tipo)
  }

  getEmployee (email: string): Observable<any> {
    return this.httpClient.get<any>(this.api_url + '/employee/' + email)
  }

  assignResponsible (body: any) {
    return this.httpClient.post(this.api_url + '/responsible', body)
  }

  register (user: any) {
    return this.httpClient.post(this.api_url + '/register', user)
  }

  login (user: any) {
    return this.httpClient.post<any>(this.api_url + '/login', user).pipe(
      tap((res: any) => {
        if (res) {
          this.token = res.token
          this.id = res.id
          /*this.loggedUser.user = res.user;
          this.loggedUser.email = res.email;*/
        }
      })
    )
  }

  loggedIn () {
    return !!localStorage.getItem('user')
  }

  updateProfile (profile) {
    return this.httpClient.put<any>(this.api_url + '/updateProfile', profile)
  }
}
