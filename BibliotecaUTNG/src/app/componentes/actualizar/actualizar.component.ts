import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css']
})
export class ActualizarComponent implements OnInit {
  
  formulario: FormGroup;
  usuario: any;
  userData: any = {};

  constructor(private fb: FormBuilder, private authService: AuthService, private router:Router, private usuariosService: UsuariosService) { 

    this.userData = JSON.parse(localStorage.getItem('userData'));
    console.log('Datos del usuario obtenidos del localStorage en el componente:', this.userData);

  }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('[0-9]{10}')]]
    });

    // Suscribirse al observable userData$ para recibir los datos del usuario
    this.authService.userData$.subscribe(userData => {
      if (userData) {
        this.usuario = userData;
        this.establecerDatosUsuarioEnFormulario();
      }
    });
  }

  establecerDatosUsuarioEnFormulario() {
    this.formulario.patchValue({
      nombre: this.usuario.nombre,
      apellidos: this.usuario.apellidos,
      correo: this.usuario.correo,
      telefono: this.usuario.telefono
    });
  }

  actualizarUsuario() {
    this.usuariosService.actualizarUsuario(this.userData).subscribe(
      (res: any) => {
        console.log('Usuario actualizado correctamente:', res);
        this.authService.logout();
        Swal.fire('¡Actualización exitosa!', 'El usuario ha sido actualizado correctamente', 'success');
        Swal.fire('¡Sesión cerrada con exito!', 'La sesión se cerró por cambio de datos exitoso', 'success');
        // Aquí puedes agregar lógica adicional si lo necesitas, como actualizar la lista de usuarios después de la modificación
      },
      (err: any) => {
        console.error('Error al actualizar usuario:', err);
        Swal.fire('¡Actualización denegada!', 'El usuario no se actualizo correctamente', 'error');
        // Maneja cualquier error que pueda ocurrir durante la solicitud
      }
    );
  }


  cancelar(){
    this.router.navigate(['/inicio-usuario']);
    Swal.fire('¡Cancelación exitosa!', 'Haz cancelado la actualización de datos correctamente', 'success');
  }
}
