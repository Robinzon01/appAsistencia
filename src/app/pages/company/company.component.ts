import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../models/company';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styles: []
})
export class CompanyComponent implements OnInit {

  // VARIABLES
  public cias: Company[];
  public codCia = '0';

  constructor(private servi: CompanyService, private router: Router) {
  }

  ngOnInit() {
    this.getCias();
  }

  // EVENTO PARA EL BOTON INGRESAR
  onSumit() {
    this.getCompany();
    this.router.navigateByUrl('/home'); // NAVEGA HACIA EL HOME
  }
  // METODO QUE NOS PERMITE SELECCIONAR LA COMPAÑIA
  public getCias() {
      this.servi.getListaCias().subscribe( (rest: Company[]) => {
        this.cias = rest;
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: `Error`
        });
      });
  }

  public capturarCompany(value: string) {
    this.codCia = value;
  }

   // METODO QUE NOS TRAE LOS VALORES DEL SELECT DE COMPAÑIAS
  public getCompany() {
    for ( let comp of this.cias) {
          if (comp.cia === this.codCia) {
            sessionStorage.setItem('cia', this.codCia);
            sessionStorage.setItem('rs', comp.razonSocial);
          }
    }
  }

}
