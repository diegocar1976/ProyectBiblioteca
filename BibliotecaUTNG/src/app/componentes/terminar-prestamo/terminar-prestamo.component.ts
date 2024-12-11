import { Component } from '@angular/core';
import { PrestamosService } from 'src/app/servicios/prestamos.service';

@Component({
  selector: 'app-terminar-prestamo',
  templateUrl: './terminar-prestamo.component.html',
  styleUrls: ['./terminar-prestamo.component.css']
})
export class TerminarPrestamoComponent {
  prestamos:any = [];

  constructor(private prestamosService:PrestamosService){}


  ngOnInit() {
    this.prestamosService.getPrestamos().subscribe(
      resp => {
        this.prestamos = resp;
      },
      err => console.error(err)
    );
  }

  eliminarPrestamo(){
    this.prestamosService.eliminarPrestamo(this.prestamos).subscribe(
      data => {
        console.log('Prestamo borrado correctamente', data);
      },
      error => console.log('Error al borrar el prestamo', error)
    )
  }
  

}
