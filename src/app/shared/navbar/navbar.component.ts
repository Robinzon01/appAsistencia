import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  username: string;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {}

  logout(): void {
    let username = this.authService.usuario.username;
    Swal.fire({
      title: `Está seguro de cerrar sesión ${username}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.value) {
        // this.other.limpiar();
        this.authService.logout();
        this.router.navigateByUrl('/login');
      }
    });
  }

}
