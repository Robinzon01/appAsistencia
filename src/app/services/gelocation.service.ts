import { Injectable } from '@angular/core';
import { OtherService } from './other.service';
import { Observable } from 'rxjs';
import { Gelocation } from '../models/gelocation';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GelocationService {

  constructor(private http: HttpClient, private other: OtherService) { }
  // OBTENER LOS DATOS DE LA GELOCATION
  public getGelocation(cia: string, user: string): Observable<Gelocation> {
    return this.http.get<Gelocation>(this.other.getUrl() + `/gelo/get/${cia}/${user}`, {headers: this.other.httpHeaders}).pipe(
      map(rest => {
        // console.log(rest);
        return rest;
      })
    );
  }
}
