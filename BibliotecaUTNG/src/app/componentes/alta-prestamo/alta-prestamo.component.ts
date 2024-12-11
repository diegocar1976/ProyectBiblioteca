import { Component, OnInit } from '@angular/core';
import { LibrosService } from 'src/app/servicios/libros.service';
import { PrestamosService } from 'src/app/servicios/prestamos.service';
import { map, take } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/servicios/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-alta-prestamo',
  templateUrl: './alta-prestamo.component.html',
  styleUrls: ['./alta-prestamo.component.css']
})
export class AltaPrestamoComponent implements OnInit{

  userData: any = {};

  userEmail: String;

  sugerenciasISBN: string[] = [];
  esFechaValida: boolean = true;
  mensajeError: string = '';

  ISBN: string;
  idEjemplar: string;
  numControl: number;
  correo: string;
  fechaPrestamo: string;
  fechaDevolucion: string;

  resp: any = [];
  resultados: any[];
  search : string;

  constructor(private prestamosService: PrestamosService, private librosService: LibrosService,
     private authService:AuthService, private route: ActivatedRoute) {

    this.userData = JSON.parse(localStorage.getItem('userData'));
    console.log('Datos del usuario obtenidos del localStorage en el componente:', this.userData);

  } 

  ngOnInit(): void {
    // Obtener la fecha actual
    const fechaActual = new Date();
  
    // Formatear la fecha actual en formato YYYY-MM-DD para asignarla al input
    this.fechaPrestamo = fechaActual.toISOString().split('T')[0];

    // Obtener los parámetros de la URL
    this.route.queryParams.subscribe(params => {
      this.ISBN = params['ISBN'];
      this.idEjemplar = params['idEjemplar'];
    });
  }

  altaPrestamo() {

    if (this.esFechaValida && this.correo) {
      // Código para crear el libro
      console.log('Fecha válida.');
      // Aquí deberías enviar los datos al servidor para crear el libro
    } else {
      console.log('La fecha de prestamo no puede ser anterior a la fecha actual. El prestamo no se creará.');
    }

    const prestamo = {
      ISBN: this.ISBN,
      idEjemplar: this.idEjemplar,
      numControl: this.userData.numControl,
      correo: this.userData.correo,
      fechaPrestamo: this.fechaPrestamo,
      fechaDevolucion: this.fechaDevolucion
    };

    this.prestamosService.altaPrestamo(prestamo).subscribe(
      data => {
        console.log('Prestamo creado:', data);
        Swal.fire({
          title: 'Prestamo creado correctamente!',
          icon: 'success'
        });
        this.ISBN = '';
        this.idEjemplar = '';
        this.fechaDevolucion = null;
      },
      error => {
        console.log('Error al crear el prestamo:', error);
        if (error.status === 400 && error.error.Resultado === 0) {
          // El ID del ejemplar ya se encuentra en préstamo
          Swal.fire({
            title: 'El libro ya se encuentra en prestamo',
            text: '',
            icon: 'error'
          });
        } else {
          // Otro tipo de error
          Swal.fire({
            title: 'Hubo un error al crear el préstamo.',
            text: '',
            icon: 'error'
          });
        }
      }
    );
  }

  validarFecha(): void {
    // Obtener la fecha actual
    const fechaActual = new Date();
  
    // Formatear la fecha actual en formato YYYY-MM-DD para asignarla al input
    const fechaActualFormateada = fechaActual.toISOString().split('T')[0];

    // Asignar la fecha actual al input
    this.fechaPrestamo = fechaActualFormateada;

    // Establecer las horas, minutos, segundos y milisegundos de la fecha actual a 0
    fechaActual.setHours(0, 0, 0, 0);

    // Obtener la fecha de préstamo
    const fechaPrestamo = new Date(this.fechaPrestamo);

    // Verificar si la fecha de préstamo es igual a la fecha actual y no es nula
    if (fechaPrestamo && fechaPrestamo.getTime() === fechaActual.getTime()) {
        this.esFechaValida = true;
        this.mensajeError = '';
    } else {
        this.esFechaValida = false;
        Swal.fire({
          title: 'La fecha de préstamo debe coincidir con la fecha actual.',
          icon: 'error'
        });
        this.reset();
    }
}


reset(){
  this.fechaPrestamo = '';
}

validarFechaDevolucion(): void {
  const fechaDevolucion = new Date(this.fechaDevolucion);
  const fechaActual = new Date();

  let diasPermitidos: number;
  if (this.authService.getUserRole() === 'estudiante') {
    diasPermitidos = 7; // Estudiantes tienen permitidos 7 días de préstamo
  } else if (this.authService.getUserRole() === 'profesor') {
    diasPermitidos = 14; // Profesores tienen permitidos 14 días de préstamo
  } else {
    // Otros roles pueden ser configurados aquí si es necesario
    diasPermitidos = 30; // Por defecto, permitimos 7 días de préstamo
  }

  // Calcular la fecha permitida para devolución (díasPermitidos días después de la fecha actual)
  const fechaPermitida = new Date(fechaActual);
  fechaPermitida.setDate(fechaPermitida.getDate() + diasPermitidos);

  // Establecer las horas, minutos, segundos y milisegundos de la fecha actual a 0
  fechaActual.setHours(0, 0, 0, 0);
  fechaPermitida.setHours(0, 0, 0, 0);

  // Verificar si la fecha de devolución es válida (no anterior a la fecha actual y no posterior a los días permitidos desde la fecha actual)
  if (fechaDevolucion >= fechaActual && fechaDevolucion <= fechaPermitida) {
      this.esFechaValida = true;
      this.mensajeError = '';
  } else {
    this.esFechaValida = false;
    Swal.fire({
        title: `La fecha de devolución no es válida. Debe ser dentro de los próximos ${diasPermitidos} días desde la fecha actual.`,
        icon: 'error'
    });
    this.resett();
  }
}


resett(){
  this.fechaDevolucion = '';
}

  private resetForm() {
    this.ISBN = null;
    this.idEjemplar = null;
    this.fechaPrestamo = '';
    this.fechaDevolucion = '';
  }

  // Barra de búsqueda
buscarLibros(terminoBusqueda: string) {
  this.librosService.buscarLibros(terminoBusqueda).subscribe(
    (res: any) => {
      this.resultados = res; // Suponiendo que el servidor devuelve una lista de libros que coinciden con el término de búsqueda
    },
    (err: any) => {
      console.error(err);
    }
  );
}

/************** */

//Traer ISBN y idEJmplar


}