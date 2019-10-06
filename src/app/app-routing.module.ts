import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { AuthGuard } from './guard/auth.guard';
import { IncidenteComponent } from './components/incidente/incidente.component';
import { ListaIncidentesComponent } from './components/lista-incidentes/lista-incidentes.component';


const routes: Routes = [
  { path: 'profile/:email', component: EditProfileComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path : 'incidentes' ,component: ListaIncidentesComponent, canActivate: [AuthGuard]},
  { path : 'incidentes/:id' , component: IncidenteComponent, canActivate: [AuthGuard]},
  { path: '', component: InicioComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
