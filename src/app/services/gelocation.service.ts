import { Injectable } from '@angular/core';
import { OtherService } from './other.service';
import { Observable } from 'rxjs';
import { Gelocation } from '../models/gelocation';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class GelocationService {

  constructor(private http: HttpClient, private other: OtherService) { }
  // OBTENER LOS DATOS DE LA GELOCATION
  public getGelocation(usuario: Usuario): Observable<any> {
    return this.http.get<any>(this.other.getUrl() + `/gelo/get/${usuario.cia}/${usuario.username}`).pipe(
      map(rest => {
        return rest;
      })
    );
  }
}
