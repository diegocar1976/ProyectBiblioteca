import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Ejemplar } from 'src/app/modelos/Ejemplar';
import { EjemplaresService } from 'src/app/servicios/ejemplares.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-ejemplares',
  templateUrl: './gestion-ejemplares.component.html',
  styleUrls: ['./gestion-ejemplares.component.css']
})
export class GestionEjemplaresComponent implements OnInit {
  showAlert = false;
  alertMessage = '';

  ejemplares: any = [];
  isbnBusqueda: string;
  visible: boolean = false;

  ejemplar: Ejemplar = {
    ISBN: 0
  }

  constructor(private servEjemplares: EjemplaresService) {}

  ngOnInit(): void {
  }

  // Obtener el inventario de todos los ejemplares mediante el ISBN
  getEjemplares() {
    this.servEjemplares.getEjemplares(parseInt(this.isbnBusqueda)).subscribe(
      resp => {
        console.log(resp);
        // Verificar si la respuesta contiene un valor numérico (1 o 0)
        if (resp === 1) {
          // El libro existe pero no hay ejemplares
          this.visible = true;
        } else if (resp === 0) {
          // El libro no existe
          this.visible = false;
          Swal.fire({
            title: 'El ISBN no existe',
            icon: 'error'
          });
        } else {
          // Respuesta inesperada o con ejemplares
          this.ejemplares = resp; // Asigna los ejemplares si los hay
          this.visible = Array.isArray(resp) && resp.length > 0;
        }
      },
      err => console.error(err)
    );
  }  
  

  /* Eliminar ejemplar y a la vez contar los ejemplares existentes para actualizar
  el numero de ejemplares */
  delEjemplar(id:number, isbn:number) {
    this.servEjemplares.deleteEjemplar(id, isbn).subscribe(
      resp => {
        this.ejemplares = resp;
        Swal.fire({
          title: 'Eliminado con exito!',
          icon: 'success'
        });
        this.getEjemplares();
      },
      err => console.error(err)
    );
  }

  /* AGREGAR EJEMPLAR */
  addEjemplar() {
    this.ejemplar.ISBN = parseInt(this.isbnBusqueda);
    this.servEjemplares.addEjemplar(this.ejemplar).subscribe(
      resp => {
        Swal.fire({
          title: 'Agregado con exito!',
          icon: 'success'
        });
        this.getEjemplares();
      },
      err => console.error(err)
    );
  }

}