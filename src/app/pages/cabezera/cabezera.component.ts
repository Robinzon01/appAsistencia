import { Component, OnInit } from '@angular/core';
import { OtherService } from '../../services/other.service';
import { GelocationService } from '../../services/gelocation.service';
import { Gelocation } from '../../models/gelocation';

@Component({
  selector: 'app-cabezera',
  templateUrl: './cabezera.component.html',
})
export class CabezeraComponent implements OnInit {
  public user: string;
  public rs: string;
 // public gelocation = new Geolocation();
  constructor(private other: OtherService, private serviGelo: GelocationService) { }

  ngOnInit() {
    this.user = this.other.getUser();
    // this.rs = sessionStorage.getItem('rs');
    this.getGeloByCiaAndUser();
  }
  // METODOS QUE TRAE LOS DATOS DE LA GEOLOCALIZACION DEL USUARIO POR COMPAÑIA
  public getGeloByCiaAndUser() {
    this.serviGelo.getGelocation(this.other.getCia(), this.other.getUser()).subscribe(
      rest => {
         console.error(rest);
       // this.gelocation = rest;
      }
    );
  }

}
