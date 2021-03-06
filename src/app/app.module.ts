import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RegistroComponent } from './pages/registro/registro.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CabezeraComponent } from './pages/cabezera/cabezera.component';
import { CompanyComponent } from './pages/company/company.component';
import { AsistenciaComponent } from './pages/asistencia/asistencia.component';
import { RgtacdeComponent } from './pages/rgtacde/rgtacde.component';
import { PagiRgtaComponent } from './pages/pagi-rgta/pagi-rgta.component';
import { GelocationComponent } from './pages/gelocation/gelocation.component';
import { TokenInterceptor } from './interceptor/TokenInterceptor';
import { UsuarioComponent } from './pages/usuario/usuario.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    CabezeraComponent,
    CompanyComponent,
    AsistenciaComponent,
    RgtacdeComponent,
    PagiRgtaComponent,
    GelocationComponent,
    UsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
