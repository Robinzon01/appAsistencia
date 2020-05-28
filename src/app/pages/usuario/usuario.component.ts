import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html'
})
export class UsuarioComponent implements OnInit {
  public usuarios: Usuario[];
  paginador: any;
  constructor(private usuService: UsuarioService, private actiRouter: ActivatedRoute) { }

  ngOnInit() {
        // VAMOS A TRAER EL PAGE DE USUARIO
        this.actiRouter.paramMap.subscribe( params => {
          let page: number = +params.get('page');
          if (!page) { // SI NO EXISTE
            page = 0;
          }
          let usu = new Usuario();
          usu = JSON.parse(sessionStorage.getItem('usuario'));
          this.usuService.getPageUsuario(usu, page).subscribe( response => {
              this.usuarios = response.content as Usuario[];
              this.paginador = response;
            });
          }
        );
  }

}
