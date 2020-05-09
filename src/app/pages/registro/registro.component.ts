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
    get validarRol(): boolean {
      return this.formulario.get('rol').invalid && this.formulario.get('rol').touched;
    }
    get validarAuthority(): boolean {
      return this.formulario.get('authority').invalid && this.formulario.get('authority').touched;
    }
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
    // DESDE EL EVENTO SELECT
    agregarRoles() {
      const srol = this.formulario.get('rol').value;
      const rolesFormGroup = this.fb.group({authority: srol});
      if (this.Roles.length === 0 || this.Roles.length === 1) {
          this.Roles.push(rolesFormGroup);
      } else {
        let i = 0;
        for ( let r of this.Roles.value) {
            if ( r.authority === srol) { i++; }
        }
        if (i === 0) { this.Roles.push(rolesFormGroup); }
      }
    }
    // DESDE EL EVENTO AGREGAR
    getRoles() {
      const rolesFormGroup = this.fb.group({authority: ['', [Validators.required, Validators.minLength(5)] ]});
      this.Roles.push(rolesFormGroup);
    }

    eliminarRol(i: number): void {
        this.Roles.removeAt(i);
    }
    private validarFormulario(): void {
        this.formulario = this.fb.group({
          username: ['', [Validators.required, Validators.minLength(3)]],
          password: ['', [Validators.required, Validators.minLength(3)]],
          password2: ['', Validators.required],
          rol: ['', Validators.required],
          sRoles: this.fb.array([])
        }, {
          validators: this.valiServi.passwordsIguales('password', 'password2')
        });
    }

    // METODO QUE NOS PERMITE GUARDAR
    public guardar(): void {
      if (this.formulario.invalid) {
        return Object.values(this.formulario.controls).forEach( control => {
          /* if ( control instanceof FormGroup ){
             Object.values( control.controls ).forEach( cont => cont.markAllAsTouched() );
          } */
          control.markAsTouched();
        });
      }
     // console.log(this.formulario.value);
      this.usuario = new Usuario();
      this.usuario.username = this.formulario.get('username').value;
      this.usuario.password = this.formulario.get('password').value;
      this.usuario.roles = this.Roles.value;
      // console.warn(this.usuario);
      // MENSAJE DE VERIFICACIÓN CUANDO HACE UN REGISTRO DE USUARIO
      Swal.fire({
        title: `Está seguro de registrar el usuario ${this.usuario.username}?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
      }).then((result) => {
        if (result.value) {
          this.usuServi.saveUsuario(this.usuario).subscribe();
          // MENSAJE DE CONFIRMACION CUANDO SE REGISTRA
          Swal.fire({
            position: 'center',
            icon: 'success',
            text: `Se registro el usuario ${this.usuario.username}`,
            showConfirmButton: false,
            timer: 2000
          });
        }
      });
      this.formulario.reset({});
    }

}
