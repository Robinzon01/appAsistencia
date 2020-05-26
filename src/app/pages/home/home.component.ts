import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Usuario } from '../../models/usuario';
import { GelocationService } from '../../services/gelocation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(private serviGelo: GelocationService, private router: Router) {}

  ngOnInit() {
    this.mensajeGelocalizacion();
  }
  public mensajeGelocalizacion(): void {
      let usuario = new Usuario();
      usuario = JSON.parse(sessionStorage.getItem('usuario'));
      this.serviGelo.getGelocation(usuario).subscribe(
        rest => {
          // console.log(rest);
          if (rest.longitud == null || rest.latitud == null ) {
              Swal.fire(`Hola ${rest.usuario}, necesita actualizar su geolocalización.`);
              this.router.navigateByUrl('/gelocation'); // NAVEGA HACIA GEOLOCALIZACION
          }

        }
      );
  }
  // METODO QUE NOS BRINDA EL MENSAJE DE BIENVENIDA
  public getMensaje() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });
    Toast.fire({
      icon: 'success',
      title: sessionStorage.getItem('mesaje')
    });
  }

}// FIN
