import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'
})
export class RegistroComponent implements OnInit {
  usuario: Usuario;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.usuario = new Usuario();
    this.usuario.email = 'sant4n4.1@gmail.com';
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

  }


}
