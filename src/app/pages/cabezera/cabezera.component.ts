import { Component, OnInit } from '@angular/core';
import { OtherService } from '../../services/other.service';
import { GelocationService } from '../../services/gelocation.service';
import { Gelocation } from '../../models/gelocation';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-cabezera',
  templateUrl: './cabezera.component.html',
})
export class CabezeraComponent implements OnInit {
  private usuario: Usuario;
  public gelocation: Geolocation;
  constructor(private other: OtherService, private serviGelo: GelocationService) { }

  ngOnInit() {
    // this.rs = sessionStorage.getItem('rs');
    this.getGeloByCiaAndUser();
  }
  // METODOS QUE TRAE LOS DATOS DE LA GEOLOCALIZACION DEL USUARIO POR COMPAÑIA
  public getGeloByCiaAndUser() {
    this.usuario = new Usuario();
    this.usuario = JSON.parse(sessionStorage.getItem('usuario'));
    this.serviGelo.getGelocation(this.usuario).subscribe(
      rest => {
       //  console.error(rest);
       this.gelocation = rest;
      }
    );
  }

}
