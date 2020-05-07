import { Injectable } from '@angular/core';
import { OtherService } from './other.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Rol } from '../models/rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private http: HttpClient, private other: OtherService) { }

   // VAMOS A MOSTRAR LA LISTA DE ROLES
   public getListaRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.other.getUrl() + '/rol/list', {headers: this.other.httpHeaders} ).pipe(
      map(rest => {
        return rest;
      })
    );
  }

}
