import { Component, OnInit } from '@angular/core';
import { OtherService } from '../../services/other.service';
import { GelocationService } from '../../services/gelocation.service';
import { Gelocation } from '../../models/gelocation';

@Component({
  selector: 'app-gelocation',
  templateUrl: './gelocation.component.html'
})
export class GelocationComponent implements OnInit {
  // VARIABLES
  public gelocation: Gelocation = new Gelocation();

  constructor(private other: OtherService, private serviGelo: GelocationService) { }

  ngOnInit() {
    this.getGeloByCiaAndUser();
  }
    // METODOS QUE TRAE LOS DATOS DE LA GEOLOCALIZACION DEL USUARIO POR COMPAÑIA
    public getGeloByCiaAndUser() {
      this.serviGelo.getGelocation(this.other.getCia(), this.other.getUser()).subscribe(
        rest => {
          this.gelocation = rest;
        }
      );
    }

}
