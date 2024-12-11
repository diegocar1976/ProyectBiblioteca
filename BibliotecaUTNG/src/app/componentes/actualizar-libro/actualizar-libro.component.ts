  import { Component, OnInit } from '@angular/core';
  import { LibrosService } from 'src/app/servicios/libros.service';
  import { Libro } from 'src/app/modelos/Libro';
  import Swal from 'sweetalert2';
  import { Router } from '@angular/router';
  

  @Component({
    selector: 'app-actualizar-libro',
    templateUrl: './actualizar-libro.component.html',
    styleUrls: ['./actualizar-libro.component.css']
  })

  export class ActualizarLibroComponent implements OnInit {

    libros: any = [];
    libro: any = {};
    lib: Libro;

    busqueda: string = '';


    categorias: any[] = [
      { nombre: 'Ficción' },
      { nombre: 'No ficción' },
      { nombre: 'Ciencia ficción' },
      { nombre: 'Infantil' },
      { nombre: 'Misterio' },
      { nombre: 'Aventura' },
      { nombre: 'Romance' },
      { nombre: 'Histórico' },
      { nombre: 'Biografía' },
      { nombre: 'Poesía' },
      { nombre: 'Ensayo' },
      { nombre: 'Teatro' },
      { nombre: 'Crónica' },
      { nombre: 'Memorias' },
      { nombre: 'Novela policiaca' },
      { nombre: 'Suspense' },
      { nombre: 'Género' },
      { nombre: 'Literatura infantil' },
      { nombre: 'Narrativa juvenil' },
      { nombre: 'Psicológico' }
    ];

    // NgMODEL
    ISBND: number;
    Titulo: string;
    Autores: string;
    fPublicacion: string;
    Editorial: string;
    cantEjemplares: number=0;
    Categoria: string;

    constructor(private servLibros: LibrosService, private rt: Router) {
    
  }

    ngOnInit() {
      this.getLibros();
    }

    //Barra de busqueda
    searchTerm: number;
    books: any[] = [];

    getLibros() {
      this.servLibros.getLibros().subscribe(
        resp => {
          console.log('Datos de servicio:', resp);
          this.libros = resp;
        },
        err => console.error(err)
      );
    }

    delLibro(isbn: number) {
      this.servLibros.borrarLibro(isbn).subscribe(
        resp => {
          this.libros = resp;
          alert('Entro');
          Swal.fire({
            title: 'Eliminado con exito!',
            icon: 'success'
          });
          this.getLibros();
          alert('Despues de obtener libros');
        },
        err => {
          Swal.fire({
            title: 'Error al eliminar!',
            text: "Error al eliminar el libro: " + err,
            icon: 'error'
          });
        }
      );
    }

    getLibro(isbn: number) {
      this.servLibros.getLibro(isbn).subscribe(
        resp => {
          console.log(resp);
          this.libro = resp;
          try {
            // ASIGNAR LOS VALORES A LOS NGMODEL DEL MODAL
            this.ISBND = this.libro[0].ISBN;
            this.Titulo = this.libro[0].titulo;
            this.Autores = this.libro[0].autores;
            const fczh = new Date(this.libro[0].fPublicacion);
            this.fPublicacion = fczh.toISOString().slice(0, 10);
            this.Editorial = this.libro[0].editorial;
            this.cantEjemplares = this.libro[0].cantEjemplares;
            this.Categoria = this.libro[0].categoria;
          } catch (error) {
            Swal.fire({
              title: 'Error al obtener los datos del libro!',
              text: "Error al obtner los datos del libro: " + error,
              icon: 'error'
            });
          }
        },
        err => {
          Swal.fire({
            title: 'Error al obtener los datos del libro!',
            text: "Error al obtner los datos del libro: " + err,
            icon: 'error'
          });
        }
      );
    }

    actualizarLibro() {
      this.lib = {
        ISBN: this.ISBND,
        titulo: this.Titulo,
        autores: this.Autores,
        fPublicacion: this.fPublicacion,
        editorial: this.Editorial,
        cantEjemplares: this.cantEjemplares,
        categoria: this.Categoria
      };
      console.log(this.lib);
      this.servLibros.actualizarLibro(this.lib.ISBN, this.lib).subscribe(
        data => {
          console.log(data);
          Swal.fire({
            title: 'El libro se ha actualizado con exito!',
            icon: 'success'
          });
          this.getLibros();
        },
        err => {
          Swal.fire({
            title: 'Error al obtener los datos del libro!',
            text: "Error al obtner los datos del libro: " + err,
            icon: 'error'
          });
        }
      );
    }

    eliminarLibro(ISBN: number) {
      this.servLibros.borrarLibro(ISBN).subscribe(
        () => {
          console.log('Libro eliminado correctamente.');
          this.getLibros();
          Swal.fire({
            title: 'Libro borrado correctamente!',
            icon: 'success'
          });
          // Puedes realizar alguna acción adicional después de eliminar el libro si es necesario.
        },
        error => {
          console.error('Error al eliminar el libro:', error);
          // Maneja el error de ser necesario.
        }
      );
    }

    confirmarEliminarLibro(ISBN: number): void {
      // Mostrar una alerta de confirmación
      const confirmacion = confirm('¿Estás seguro de que deseas eliminar este libro?');

      // Si el usuario confirma, ejecutar la función eliminarPrestamo(idPrestamo)
      if (confirmacion) {
        this.eliminarLibro(ISBN);
        Swal.fire({
          title: 'Prestamo borrado correctamente',
          icon: 'success'
        });
      } else {
        // El usuario canceló la eliminación, realizar alguna otra acción si es necesario
        console.log('Eliminación cancelada.');
        Swal.fire({
          title: 'Eliminación cancelada',
          icon: 'error'
        });
      }
    }

  }
