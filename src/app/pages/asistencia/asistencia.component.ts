import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Astenci } from '../../models/astenci';
import { Rgtacde } from '../../models/rgtacde';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styles: []
})
export class AsistenciaComponent implements OnInit {
  // VARIABLES
  public asistencias: Astenci[];
  public rgtacde: Rgtacde;
  public rgtacdes: Rgtacde[];
  private fechaA = new Date();
  estado: true;
  constructor(private servi: AuthService) {}

  ngOnInit() {
    this. asSinRegistrar();
  }

  // METODO QUE NOS MUESTRA TODAS LAS ASISTENCIAS
  public getAllAsistencias() {
    this.servi.getAllAsistencias().subscribe( (rest: Astenci[]) => {
      this.asistencias = rest;
      console.warn(this.asistencias);
    } );
  }
  // METODOS QUE NOS PERMITE GUARDAR EL REGISTRO DE ASISTENCIA
  public save(aste: Astenci, div: any) {
    this.rgtacde = new Rgtacde();
    // VAMOS A PASAR LOS VALORES
    this.rgtacde.usuario = sessionStorage.getItem('user');
    this.rgtacde.astenci = aste;
    this.rgtacde.cia = sessionStorage.getItem('cia');
    this.rgtacde.latitud = sessionStorage.getItem('lat');
    this.rgtacde.longuitud = sessionStorage.getItem('lng');
    // MENSAJE DE VERIFICACIÓN CUANDO HACE UN REGISTRO
    Swal.fire({
      title: `Está seguro de registrar su ${aste.nombre}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.value) {
        div.hidden = true;
        // REST SAVE
        this.servi.saveRgtacde(this.rgtacde).subscribe();
        // MENSAJE DE CONFIRMACION CUANDO REGISTRA
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: `Se registro su ${aste.nombre} a las ${this.fechaA.getHours()}:${this.fechaA.getMinutes()} ${this.fechaA.getDate()}/
            ${this.fechaA.getMonth() + 1}/${this.fechaA.getUTCFullYear()}`,
          showConfirmButton: false,
          timer: 2000
        });
      }
    });
  }
   // METODO QUE NOS DEVUELVE LAS ASISTENCIA SIN REGISTRAR
   public asSinRegistrar() {
    this.servi.asistenciaSinRegistrar().subscribe( (rest: Astenci[]) => {
        // console.log(rest);
        this.asistencias = rest;
        if (this.asistencias.length === 0) {
          Swal.fire({
            position: 'center',
            title: 'Ya registraste todas tus asistencias',
            showConfirmButton: false,
            timer: 2000
          })
        }
    },
    (err) => {
      console.warn(err);
      Swal.fire({
        icon: 'error',
        title: `Error`
      });
    }
    );
  }

}
