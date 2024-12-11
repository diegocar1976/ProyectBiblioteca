import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Ejemplar } from 'src/app/modelos/Ejemplar';
import { EjemplaresService } from 'src/app/servicios/ejemplares.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista',
  templateUrl:'./lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {

  ejemplares: any[] = [];
  filtroNombre: string = ''; // Variable para el filtro por nombre

  constructor(private servEjemplares: EjemplaresService, private router:Router) {}

  ngOnInit(): void {
    this.getEjemplares();
  }

  // Función para determinar si un ejemplar cumple con el filtro de nombre
  cumpleFiltro(Ejemplar: any): boolean {
    // Si no se ha ingresado ningún término de búsqueda, devolvemos true
    if (!this.filtroNombre) {
      return true;
    }
    // Si el título del ejemplar incluye el término de búsqueda (ignorando mayúsculas/minúsculas), devolvemos true
    return Ejemplar.titulo.toLowerCase().includes(this.filtroNombre.toLowerCase());
  }

  // Función para manejar el evento de cambio en la barra de búsqueda
  onBuscarChange(event: any): void {
    // Actualizamos el término de búsqueda con el valor ingresado en la barra de búsqueda
    this.filtroNombre = event.target.value.trim();
  }


  getEjemplares(): void {
    this.servEjemplares.ejemplares().subscribe(
      (resp: any[]) => {
        console.log(resp); // Agregar esta línea para verificar los datos recibidos
        this.ejemplares = resp;
      },
      (error) => {
        console.error('Error al obtener los ejemplares:', error);
      }
    );
  }

  pedirPrestamo(ISBN: string, idEjemplar: string) {
    // Navegar a la página de alta de préstamo y pasar los parámetros en la URL
    this.router.navigate(['/prestamo'], { queryParams: { ISBN: ISBN, idEjemplar: idEjemplar } });
  }


}
