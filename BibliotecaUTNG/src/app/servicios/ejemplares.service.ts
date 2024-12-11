import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ejemplar } from '../modelos/Ejemplar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EjemplaresService {

  private API_URL = "http://localhost:3000/api"

  constructor(private http:HttpClient) { }

  getEjemplares(id: number) {
    return this.http.get(`http://localhost:3000/api/ejemplares/${id}`);
  }

  deleteEjemplar(id: number, isbn: number) {
    return this.http.delete(`http://localhost:3000/api/ejemplares/${id}/${isbn}`);
  }

  addEjemplar(ejemplar:Ejemplar) {
    return this.http.post(`http://localhost:3000/api/ejemplares/`, ejemplar);
  }

  buscarLibros(terminoBusqueda: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/libros/buscar?termino=${terminoBusqueda}`);
  }

  //Todos los ejemplares
  ejemplares(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/api/ej');
  }
  

}
