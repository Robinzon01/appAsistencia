import { Component, OnInit } from '@angular/core';
import { OtherService } from '../../services/other.service';
import { GelocationService } from '../../services/gelocation.service';
import { Gelocation } from '../../models/gelocation';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-gelocation',
  templateUrl: './gelocation.component.html'
})
export class GelocationComponent implements OnInit {
  // VARIABLES
  public gelocation: Gelocation = new Gelocation();
  private usuario: Usuario;

  constructor(private other: OtherService, private serviGelo: GelocationService) { }

  ngOnInit() {
    this.getGeloByCiaAndUser();
  }
    // METODOS QUE TRAE LOS DATOS DE LA GEOLOCALIZACION DEL USUARIO POR COMPAÑIA
    public getGeloByCiaAndUser() {
      this.usuario = new Usuario();
      this.usuario = JSON.parse(sessionStorage.getItem('usuario'));
      this.serviGelo.getGelocation(this.usuario).subscribe(
        rest => {
          this.gelocation = rest;
        }
      );
    }

}
