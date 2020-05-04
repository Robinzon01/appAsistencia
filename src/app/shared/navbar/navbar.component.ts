import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { OtherService } from '../../services/other.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  username: string;

  constructor(private auth: AuthService, private router: Router, private other: OtherService) {}

  ngOnInit() {}

  public consultar() {
    if (this.other.getToken()) {

      Swal.fire({
        title: `Está seguro de cerrar sesión ${this.other.getUser()}?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
      }).then((result) => {
        if (result.value) {
          this.other.limpiar();
          this.router.navigateByUrl('/login');
        }
      });

    }

  }

}
