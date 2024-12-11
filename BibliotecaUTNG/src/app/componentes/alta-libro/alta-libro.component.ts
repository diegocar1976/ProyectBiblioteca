import { Component } from '@angular/core';
import { LibrosService } from 'src/app/servicios/libros.service';
import Swal from 'sweetalert2';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

@Component({
  selector: 'app-alta-libro',
  templateUrl: './alta-libro.component.html',
  styleUrls: ['./alta-libro.component.css']
})
export class AltaLibroComponent {

  esFechaValida: boolean = true;
  mensajeError: string = '';
  Autores: string[] = [];
  NuevoAutor: string = '';



  constructor(private librosService:LibrosService) { }

  

  ISBND: number;
  Titulo: string;
  fPublicacion: string;
  Editorial: string;
  cantEjemplares: number=0;
  Categoria: string;

  libro:any = {}

  agregarAutor() {
    if (this.NuevoAutor.trim() !== '') {
      this.Autores.push(this.NuevoAutor);
      this.NuevoAutor = ''; // Limpiar el input para el próximo autor
      console.log('Autores actuales:', this.Autores); // Verificar la lista de autores
    }
  }

  eliminarAutor(index: number) {
    this.Autores.splice(index, 1);
  }

  validarFecha(): void {
    const fechaIngresada = new Date(this.fPublicacion);
    const fechaActual = new Date();
    this.esFechaValida = fechaIngresada <= fechaActual;

    if (!this.esFechaValida) {
      //window.alert('La fecha de publicación no puede ser posterior a la actual.'); // Muestra una alerta
      Swal.fire({
        title: 'La fecha de publicación no puede ser posterior a la actual.',
        icon: 'error'
      });
      this.resetFor();
    } else {
      this.mensajeError = '';
    }
  }
  

  altaLibro() {
    const autoresString = this.Autores.join(' , ');

    if (this.esFechaValida) {
      // Código para crear el libro
      console.log('Libro creado exitosamente.');
      // Aquí deberías enviar los datos al servidor para crear el libro
    } else {
      console.log('La fecha de publicación no puede ser posterior a la fecha actual. El libro no se creará.');
    }
    

    this.libro = {
      ISBN: this.ISBND,
      titulo: this.Titulo,
      autores: autoresString,
      fPublicacion: this.fPublicacion,
      editorial: this.Editorial, 
      cantEjemplares: this.cantEjemplares,
      categoria: this.Categoria
    };

    

    
    this.librosService.altaLibro(this.libro).subscribe(
      data => {
        console.log('Libro creado:', data);
        Swal.fire({
          title: 'Libro creado correctamente!',
          icon: 'success'
        });
        console.log('Autores concatenados:', autoresString);
        this.resetForm();
      },
      error => {
        console.log('Error al crear el libro:', error);
        if (error.status === 500) {
          console.log('Código de estado 500 detectado. Mensaje de error:', error.error);
          Swal.fire({
            title: 'El ISBN ya existe.',
            icon: 'error'
          });
          this.resetFormm();
        }
      }
    );
    
    
  }

  resetForm() {
    this.ISBND = null;
    this.Titulo = '';
    this.Autores = [];
    this.fPublicacion = '';
    this.Editorial = '';
    this.cantEjemplares = 0;
    this.Categoria = '';
 }

 resetFormm(){
  this.ISBND = null;
 }

 resetFor(){
  this.fPublicacion = '';
 }

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

}