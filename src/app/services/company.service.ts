import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Company } from '../models/company';
import { map } from 'rxjs/operators';
import { OtherService } from './other.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient, private other: OtherService) { 
    // console.warn('Inicia el servicio de compañia');
  }

   // VAMOS A MOSTRAR LA LISTA DE COMPAÑIAS
   public getListaCias(): Observable<Company[]> {
    return this.http.get<Company[]>(this.other.getUrl() + '/company/list', {headers: this.other.httpHeaders} ).pipe(
      map( rest => rest as Company[])
    );
  }


}
