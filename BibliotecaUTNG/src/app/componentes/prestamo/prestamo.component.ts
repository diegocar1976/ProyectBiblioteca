import { Component, OnInit } from '@angular/core';
import { PrestamosService } from 'src/app/servicios/prestamos.service';

@Component({
  selector: 'app-prestamo',
  templateUrl: './prestamo.component.html',
  styleUrls: ['./prestamo.component.css']
})
export class PrestamoComponent implements OnInit {
  prestamos: any[];

  constructor(private prestamoService: PrestamosService) { }

  ngOnInit(): void {
    this.obtenerPrestamos();
  }

  obtenerPrestamos(): void {
    this.prestamoService.obtenerPrestamos()
      .subscribe(prestamos => {
        console.log('Préstamos recibidos:', prestamos); // Agregar esta línea para verificar los préstamos recibidos

        this.prestamos = prestamos;
      }, error => {
        console.error('Error al obtener los préstamos:', error);
      });
}

//Estatus del prestamo
// Función para determinar la clase de estilo CSS basada en el estado
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
