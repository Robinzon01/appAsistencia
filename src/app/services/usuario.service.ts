import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OtherService } from './other.service';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient, private other: OtherService) { }
  // METODO QUE NOS PERMITE GUARDAR UN USUARIO
  public saveUsuario(usuario: Usuario) {
    const authData = {
      ...usuario
    };
    return this.http.post(this.other.getUrl() + '/usu/save', authData, {headers: this.other.httpHeaders});
  }

}
