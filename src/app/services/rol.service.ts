import { Injectable } from '@angular/core';
import { OtherService } from './other.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private http: HttpClient, private other: OtherService) { }

   // VAMOS A MOSTRAR LA LISTA DE ROLES
   public getListaRoles(): Observable<string[]> {
    return this.http.get<string[]>(this.other.getUrl() + '/rol/list', {headers: this.other.httpHeaders} ).pipe(
      map(rest => {
        return rest;
      })
    );
  }

}
