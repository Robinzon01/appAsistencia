import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ValidadorService } from '../../services/validador.service';
import { RolService } from '../../services/rol.service';
import Swal from 'sweetalert2';
import { Rol } from '../../models/rol';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'
})
export class RegistroComponent implements OnInit {

    formulario: FormGroup;
    roles: Rol[];
    usuario: Usuario;

    constructor(private fb: FormBuilder, private valiServi: ValidadorService, private rolServi: RolService ) {
      this.crearFormulario();
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
    get validarPassword2(): boolean {
      return this.formulario.get('password2').invalid && this.formulario.get('password2').touched;
    }
    get validarRoles(): boolean {
      return (this.Roles.length === 0) ? false : true;
    }
    get Roles() {
      return this.formulario.get('sRoles') as FormArray;
    }

    agregarRoles(rol: string) {
      if (this.Roles.length === 0 || this.Roles.length === 1) {
        this.Roles.push( this.fb.control(rol, Validators.required) );
      } else {
        if (this.Roles.value.indexOf(rol) < 0) {
          this.Roles.push( this.fb.control(rol, Validators.required) );
        }
      }
    }

    eliminarRol(i: number): void {
        this.Roles.removeAt(i);
    }
    private crearFormulario(): void {
        this.formulario = this.fb.group({
          username: ['', [Validators.required, Validators.minLength(3)]],
          password: ['', [Validators.required, Validators.minLength(3)]],
          password2: ['', Validators.required],
          sRoles: this.fb.array([])
        });
    }

    // METODO QUE NOS PERMITE GUARDAR
    public guardar(): void {
      console.log(this.formulario);
    }

}
