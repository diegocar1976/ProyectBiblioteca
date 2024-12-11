import { Component, OnInit } from '@angular/core';
import {  PrestamosService } from 'src/app/servicios/prestamos.service';
import { FormGroup, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-prestamo',
  templateUrl: './actualizar-prestamo.component.html',
  styleUrls: ['./actualizar-prestamo.component.css']
})
export class ActualizarPrestamoComponent implements OnInit{

  esFechaValida: boolean = true;
  mensajeError: string = '';
  fechaDevolucion: string;

  prestamos: any = []
  form: FormGroup = new FormGroup({
    fechaDevolucion: new FormControl()
  })

  prestamo: any = undefined;

  filtroControl: number; // Variable para el filtro por numero

  constructor(private servPrestamos: PrestamosService, prestamosService:PrestamosService) { }


  ngOnInit() {
    this.servPrestamos.getPrestamos().subscribe((resp) => {
      this.prestamos = resp;
    },
      err => console.error(err)
    );
  }


  eliminarPrestamo(idPrestamo: number) {
    this.servPrestamos.eliminarPrestamo(idPrestamo).subscribe((resp) => {
      this.servPrestamos.getPrestamos().subscribe((resp) => {
        this.prestamos = resp;
      },
        err => console.error(err)
      );
    },
      err => console.error(err)
    );
  }

  editarPrestamo() {
    console.log('hola')

    const nuevoPrestamo = {
      fechaDevolucion: this.form.get('fechaDevolucion')?.value
    }
    this.servPrestamos.editarPrestamo(this.prestamo.idPrestamo, nuevoPrestamo).subscribe((resp) => {
      this.servPrestamos.getPrestamos().subscribe((resp) => {
        this.prestamos = resp;
        Swal.fire({
          title: 'Prestamo actualizado correctamente',
          icon: 'success'
        });
      },
        err => console.error(err)
      );
    },
      err => console.error(err)
    );
  }

  fechaDevolucionValidator(fechaOriginal: Date): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const nuevaFecha = new Date(control.value);
      const diferenciaDias = (nuevaFecha.getTime() - fechaOriginal.getTime()) / (1000 * 60 * 60 * 24); // Diferencia en días
  
      if (diferenciaDias <= 7) {
        return null; // La fecha es válida
      } else {
        // Muestra una alerta utilizando SweetAlert2
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'La nueva fecha de devolución no puede ser más de 7 días después de la fecha original.',
        });
  
        // Devuelve un error de validación
        return { fechaInvalida: true }; // La fecha excede los 7 días permitidos
      }
    };
  }

  reset(){
    this.fechaDevolucion = '';
  }

  selecinarPrestamo(prestamo: any) {
    const fechaDevolucion = new Date(prestamo.fechaDevolucion);
    const fechaPrestamo = new Date(prestamo.fechaPrestamo);
    const formatoFechaDevolucion = fechaDevolucion.toISOString().split('T')[0];
  
    this.form = new FormGroup({
      fechaDevolucion: new FormControl(formatoFechaDevolucion, [
        this.fechaAnteriorValidator(fechaPrestamo),
        this.fechaDevolucionValidator(fechaDevolucion)
      ])
    });
  
    this.prestamo = prestamo;
  }
  

  fechaAnteriorValidator(fechaReferencia: Date): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const fechaIngresada = new Date(control.value);
      if (fechaIngresada > fechaReferencia) {
        return null; // La fecha es válida
      } else {
        // Muestra una alerta utilizando SweetAlert2
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'La nueva fecha de devolución no puede ser anterior a la fecha original.',
        });
  
        // Devuelve un error de validación
        return { fechaInvalida: true }; // La fecha es anterior a la fecha original
      }
    };
  }

  confirmarEliminarPrestamo(idPrestamo: number): void {
    // Mostrar una alerta de confirmación
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar este préstamo?');

    // Si el usuario confirma, ejecutar la función eliminarPrestamo(idPrestamo)
    if (confirmacion) {
      this.eliminarPrestamo(idPrestamo);
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

  // Estatus de los prestamos
  //Estatus del prestamo
// Función para determinar el estatus basado en la fecha de devolución
obtenerEstatus(fechaDevolucion: string): string {
  const fechaActual = new Date();
  const fechaDevolucionDate = new Date(fechaDevolucion);

  // Calcular la diferencia de días entre la fecha actual y la fecha de devolución
  const diferencia = Math.ceil((fechaDevolucionDate.getTime() - fechaActual.getTime()) / (1000 * 60 * 60 * 24));

  if (diferencia > 5) {
    return 'En prestamo';
  } else if (diferencia >= 1 && diferencia <= 4) {
    return 'Por vencer';
  } else if (diferencia < 0) {
    return 'Vencido';
  } else {
    return 'Vencido, a espera de sanción'; // Aquí puedes ajustar el mensaje según necesites
  }
}

obtenerClaseEstatus(fechaDevolucion: string): string {
  const fechaActual = new Date();
  const fechaDevolucionDate = new Date(fechaDevolucion);

  // Calcular la diferencia de días entre la fecha actual y la fecha de devolución
  const diferencia = Math.ceil((fechaDevolucionDate.getTime() - fechaActual.getTime()) / (1000 * 60 * 60 * 24));

  if (diferencia > 5) {
    return 'prestamo';
  } else if (diferencia >= 1 && diferencia <= 4) {
    return 'por-vencer';
  } else {
    return 'vencido';
  }
}


}
