import { ServicesService } from './../../services/services.service'
import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms'
import { Router } from '@angular/router'
import * as jwt_decode from 'jwt-decode'

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: [
    './inicio.component.css'
  ]
})
export class InicioComponent implements OnInit {
  incidentForm: FormGroup
  leccionForm: FormGroup
  incidents: Array<any> = []
  logedUser: any = {}
  adminUser: boolean
  responsibleUser: boolean
  selectedFile = null

  constructor (private services: ServicesService, private router: Router) {}

  ngOnInit () {
    //Inicializar forms
    this.incidentForm = new FormGroup({
      content: new FormControl(),
      category: new FormControl(),
      file: new FormControl(),
      tittle: new FormControl()
    })

    this.leccionForm = new FormGroup({
      description: new FormControl(),
      file: new FormControl()
    })

    //Validar el tipo de usuario
    var decoded_token = jwt_decode(this.services.token)
    if (decoded_token.tipo == 'admin' || decoded_token.tipo == 'responsable') {
      if (decoded_token.tipo == 'admin') {
        this.adminUser = true
      } else if (decoded_token.tipo == 'responsable') {
        this.responsibleUser = true
      }
    }

    //Obtener correo y nombre del usuario logeado
    this.logedUser = JSON.parse(localStorage.getItem('user'))

    this.services.getIncidents().subscribe((res) => {
      this.incidents = res.incident
    })
  }

  /*
  onIncidentSelected (event) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0]
      this.incidentForm.get('file').setValue(this.selectedFile)
    }
  }

  onLessonFileSelected (event) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0]
      this.leccionForm.get('file').setValue(this.selectedFile)
    }
  }
  */

  enviarReporte (): void {
    this.services.saveReport(this.incidentForm.value).subscribe((res) => {
      console.log(res)
    })
  }

  enviarLeccion (): void {
    this.services.saveLesson(this.leccionForm.value).subscribe((res) => {
      console.log(res)
    })
  }

  editProfile () {
    this.router.navigateByUrl('/profile/' + this.logedUser.email)
  }

  registrarResponsable () {
    this.router.navigate([
      '/register'
    ])
  }

  listaIncidentes () {
    this.router.navigate([
      '/incidentes'
    ])
  }
}
