import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrestamosService {

  private API_URL = "http://localhost:3000/api"

  constructor(private http: HttpClient) { }

  altaPrestamo(prestamo) {
    return this.http.post(`http://localhost:3000/api/prestamos/`, prestamo);
  }

  getPrestamos() {
    return this.http.get('http://localhost:3000/api/prestamos')
  }

  eliminarPrestamo(idPrestamo: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/prestamos/${idPrestamo}`)
  }

  editarPrestamo(idPrestamo: number, nuevoPrestamo: any): Observable<any> {
    return this.http.put(`${this.API_URL}/prestamos/${idPrestamo}`, nuevoPrestamo)
  }

  impReferencia(prestamo: any) {
    return this.http.post(`${this.API_URL}/prestamos/generapdf`, prestamo)
  }

  obtenerPrestamos(): Observable<any[]> {
    const numControl = localStorage.getItem('numControl');
    console.log('Número de control:', numControl); // Agregar esta línea para verificar el número de control

    return this.http.get<any[]>('http://localhost:3000/api/misPrestamos', { params: { numControl } });
}
}
