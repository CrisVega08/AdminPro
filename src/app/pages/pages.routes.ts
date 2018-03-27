import { Routes, RouterModule, CanActivate } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesisComponent } from './promesis/promesis.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico/medico.component';

const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [LoginGuardGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard'} },
      { path: 'progress', component: ProgressComponent, data: { title: 'Progress Bar'} },
      { path: 'graficas1', component: Graficas1Component, data: { title: 'Graph'} },
      { path: 'promise', component: PromesisComponent, data: { title: 'Promise'} },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'RXJS'} },
      { path: 'account-setting', component: AccountSettingsComponent, data: { title: 'Account Settings'} },
      { path: 'profile', component: ProfileComponent, data: { title: 'Profile'} },
      // Manteniemiento     
      { path: 'usuarios', component: UsuariosComponent, data: { title: 'Mantenimiento Usuarios'} },
      { path: 'hospitales', component: HospitalesComponent, data: { title: 'Mantenimiento Hospitales'} },
      { path: 'medicos', component: MedicosComponent, data: { title: 'Mantenimiento Médicos'} },
      { path: 'medico/:id', component: MedicoComponent, data: { title: 'Actualizar Médico'} },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    ]
  }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );