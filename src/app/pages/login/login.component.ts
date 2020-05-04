import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Login } from '../../models/login';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  login: Login;
  recordar = false;

  public lat: number;
  public lng: number;

  constructor( private servi: AuthService, private router: Router) { }

  ngOnInit() {
    // OBTENER LA UBICACION
    this.getGeolocalizacion();
    this.login = new Login();
    if (localStorage.getItem('usuario')) {
        this.login.username = sessionStorage.getItem('user');
        this.recordar = true;
    }
  }
  // EVENTO PARA EL BOTON INGRESAR
  onSumit(form: NgForm) {

    if (form.invalid) {
      return;
    }
    // ALERTA
    Swal.fire({
      allowOutsideClick: false, // CLICK FUERA
      icon: 'info',
      text: 'Espere por favor...'
    });

    Swal.showLoading();

    this.servi.mlogin(this.login).subscribe( rest => {
      Swal.close(); // SE CIERRA EL MENSAJE
      if (sessionStorage.getItem('lat') && sessionStorage.getItem('lng') ) { // SI ACEPTO DAR SU UBICACION
         this.router.navigateByUrl('/company'); // NAVEGA HACIA EL HOME
      } else {
         // ALERTA
          Swal.fire({
            allowOutsideClick: false, // CLICK FUERA
            icon: 'info',
            title: 'Debe permitir el acceder a su ubicación.'
          });
          // OBTENER LA UBICACION
          this.getGeolocalizacion();
      }
    }, (err) => {
        if (this.recordar) {
          sessionStorage.setItem('user', this.login.username);
        }
        Swal.fire({
          icon: 'error',
          title: err.error.token
        });
    });

  }
  // METODO QUE NOS PERMITE SABER LA UBICACION DEL USUSARIO
  public getGeolocalizacion() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( position => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          // GUARDAR LAS UBICACIONES
          sessionStorage.setItem('lat', this.lat.toString());
          sessionStorage.setItem('lng', this.lng.toString());
      } );
    }

  }

}
