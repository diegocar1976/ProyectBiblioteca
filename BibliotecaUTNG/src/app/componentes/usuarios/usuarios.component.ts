import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgModel } from '@angular/forms';



@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: any[] = []; // Definición de la propiedad usuarios
  usuario: any;
  datosCargados: boolean = false; // Bandera para indicar si los datos del usuario se han cargado

  formularioEditar: FormGroup; // Definir la referencia al formulario

  constructor(private usuariosService: UsuariosService, private modalService: NgbModal, private formBuilder: FormBuilder) { } // Inyección del servicio UsuarioService

  ngOnInit(): void {
    this.formularioEditar = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('[0-9]{10}')]]
    });
    // Lógica para cargar los usuarios al inicializar el componente
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    // Lógica para cargar los usuarios desde el servicio
    this.usuariosService.obtenerUsuarios().subscribe(
      (res: any) => {
        this.usuarios = res; // Asigna los usuarios obtenidos del servicio a la propiedad usuarios del componente
      },
      (err: any) => {
        console.error(err);
      }
    );
  }

  /////////////////////////////

  abrirModalEditar(numControl: string) {
    this.usuariosService.obtenerUsuarioo(numControl).subscribe(
      (res: any) => {
        this.usuario = res;
        this.datosCargados = true; // Actualiza la bandera para indicar que los datos del usuario se han cargado
        console.log(this.usuario); // Puedes quitar este console.log, solo lo he dejado para depurar y asegurarnos de que los datos se están recibiendo correctamente
        // Ahora puedes abrir el modal con los datos del usuario usando el ID del modal o cualquier otro mecanismo que tengas implementado en tu aplicación
      },
      (err: any) => {
        console.error(err);
        // Maneja cualquier error que pueda ocurrir durante la solicitud
      }
    );
  }



  actualizarUsuario() {
    this.usuariosService.actualizarUsuario(this.usuario).subscribe(
      (res: any) => {
        console.log('Usuario actualizado correctamente:', res);
        this.modalService.dismissAll();
        this.cargarUsuarios();
        Swal.fire('¡Actualización exitosa!', 'El usuario ha sido actualizado correctamente', 'success');
        // Aquí puedes agregar lógica adicional si lo necesitas, como actualizar la lista de usuarios después de la modificación
      },
      (err: any) => {
        console.error('Error al actualizar usuario:', err);
        Swal.fire('¡Actualización denegada!', 'El usuario no se actualizo correctamente', 'error');
        // Maneja cualquier error que pueda ocurrir durante la solicitud
      }
    );
  }

  eliminarUsuario(numControl: string) {
    // Lógica para eliminar el usuario
    this.usuariosService.eliminarUsuario(numControl).subscribe(
      (res: any) => {
        this.cargarUsuarios();
        console.log('Usuario eliminado correctamente');
        // Aquí puedes recargar la lista de usuarios si lo deseas
        Swal.fire('¡Eliminación exitosa!', 'El usuario ha sido eliminado correctamente', 'success');
      },
      (err: any) => {
        console.error('Error al eliminar usuario:', err);
        Swal.fire('¡Eliminación denegada!', 'El usuario no se eliminó correctamente', 'error');
      }
    );
  }

}
