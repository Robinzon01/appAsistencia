import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ValidadorService } from '../../services/validador.service';
import { RolService } from '../../services/rol.service';
import Swal from 'sweetalert2';
import { Rol } from '../../models/rol';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'
})
export class RegistroComponent implements OnInit {

    formulario: FormGroup;
    roles: Rol[];
    rol: Rol;
    usuario: Usuario;

    constructor(private fb: FormBuilder, private valiServi: ValidadorService, private rolServi: RolService,
                private usuServi: UsuarioService ) {
      this.validarFormulario();
    }

    ngOnInit() {
      this.getAllRoles();
    }

    // CAPTURAR LOS ROLES
    public getAllRoles() {
      this.rolServi.getListaRoles().subscribe( (rest: Rol[]) => {
        this.roles = rest;
        // console.log(this.roles);
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: `Error`
        });
      });
    }

    get validarUsername(): boolean {
      return this.formulario.get('username').invalid && this.formulario.get('username').touched;
    }
    get validarPassword(): boolean {
      return this.formulario.get('password').invalid && this.formulario.get('password').touched;
    }
    /* get validarPassword2(): boolean {
      return this.formulario.get('password2').invalid && this.formulario.get('password2').touched;
    } */
    get validarRoles(): boolean {
      return (this.Roles.length === 0) ? false : true;
    }
    get Roles() {
      return this.formulario.get('sRoles') as FormArray;
    }
    get validarPassword2(): boolean {
      const pass1 = this.formulario.get('password').value;
      const pass2 = this.formulario.get('password2').value;
      return (pass1 === pass2) ? false : true;
    }

    agregarRoles(rol: string) {
      this.rol = new Rol();
      this.rol.authority = rol;
      if (this.Roles.length === 0 || this.Roles.length === 1) {
          this.Roles.push( this.fb.control(this.rol, Validators.required) );
      } else {
        if (this.Roles.value.indexOf(rol) < 0) {
          this.Roles.push( this.fb.control(this.rol, Validators.required) );
        }
      }
    }

    eliminarRol(i: number): void {
        this.Roles.removeAt(i);
    }
    private validarFormulario(): void {
        this.formulario = this.fb.group({
          username: ['', [Validators.required, Validators.minLength(3)]],
          password: ['', [Validators.required, Validators.minLength(3)]],
          password2: ['', Validators.required],
          sRoles: this.fb.array([])
        }, {
          validators: this.valiServi.passwordsIguales('password', 'password2')
        });
    }

    // METODO QUE NOS PERMITE GUARDAR
    public guardar(): void {
      if (this.formulario.invalid) {
        return;
      }
      // console.log(this.formulario);
      this.usuario = new Usuario();
      this.usuario.username = this.formulario.get('username').value;
      this.usuario.password = this.formulario.get('password').value;
      this.usuario.roles = this.Roles.value;
      console.warn(this.usuario);

      // this.usuServi.saveUsuario(this.usuario).subscribe();
    }

}
