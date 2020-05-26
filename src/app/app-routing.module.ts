import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { CompanyComponent } from './pages/company/company.component';
import { RgtacdeComponent } from './pages/rgtacde/rgtacde.component';
import { GelocationComponent } from './pages/gelocation/gelocation.component';

const routes: Routes = [
  { path: 'home'    , component: HomeComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'company', component: CompanyComponent },
  { path: 'asistencia', component: RgtacdeComponent },
  { path: 'gelocation', component: GelocationComponent },
  { path: 'asistencia/page/:page', component: RgtacdeComponent },
  { path: 'login'   , component: LoginComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
