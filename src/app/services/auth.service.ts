import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Login } from '../models/login';
import { Usuario } from '../models/usuario';

import { map } from 'rxjs/operators';
import { Rgtacde } from '../models/rgtacde';
import { OtherService } from './other.service';
import { Astenci } from '../models/astenci';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private other: OtherService) {}

  // METODO QUE NOS PERIMTE HACER EL LOGIN
  mlogin( login: Login) {
    console.warn(this.other.getUrl());
    const authData = {
      ...login
    };
    return this.http.post(this.other.getUrl() + '/login', authData ).pipe(
      map( resp => {
        this.guardarToken( resp['token'], resp['message'], resp['user'].username, resp['user'].authorities );
        return resp;
      } )
    );
  }

  // METODO QUE NOS PERMITE GUARDAR EL TOKEN
  private guardarToken(idToken: string, mesaje: string, user: string, roles: []) {
    sessionStorage.setItem('mesaje', mesaje);
    this.other.setToken(idToken);
    this.other.setRoles(JSON.stringify(roles));
    this.other.setUser(user);
  }

  // VAMOS A MOSTRAR TODAS LAS ASISTENCIAS
  public getAllAsistencias() {
    return this.http.get<Astenci[]>(this.other.getUrl() + `/asten/list/${this.other.getCia()}`, {headers: this.other.httpHeaders} ).pipe(
      map( rest => {
        return rest;
      } )
    );
  }

  // METODO QUE NOS PERMITE GUARDAR UN RGTACDE
  public saveRgtacde(rgtacde: Rgtacde) {
    const authData = {
      ...rgtacde
    };
    return this.http.post(this.other.getUrl() + '/rgta/save', authData, {headers: this.other.httpHeaders});
  }

  // METODO QUE NOS PERMITE CREAR NUEVO USUARIO
  nuevoUsuario(usuario: Usuario) {
    const authData = {
      ...usuario,
      token: true
    };

  }
  // VAMOS A TRAER LOS REGISTRO DE HOY
  public registroHoy() {
    return this.http.get<Rgtacde[]>(this.other.getUrl() + `/rgta/rgHoy/${this.other.getCia()}/${this.other.getUser()}`,
     {headers: this.other.httpHeaders} ).pipe(
       map(rest => {
         return rest;
       })
     );
  }
  // vamos a traer las asistencias sin registrar
    // VAMOS A TRAER LOS REGISTRO DE HOY
    public asistenciaSinRegistrar(): Observable<Astenci[]> {
      return this.http.get<Astenci[]>(this.other.getUrl() + `/asten/asHoy/${this.other.getCia()}/${this.other.getUser()}`,
      {headers: this.other.httpHeaders} ).pipe(
         map(rest => {
           return rest;
         })
       );
    }

}
