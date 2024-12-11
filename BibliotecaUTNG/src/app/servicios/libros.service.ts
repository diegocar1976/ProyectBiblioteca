import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs'; //Fer//
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Libro} from '../modelos/Libro';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  private API_URL = "http://localhost:3000/api"

  constructor(private http: HttpClient) { }

  getLibros() {
    return this.http.get('http://localhost:3000/api/libros')
      .pipe(
        catchError(error => {
          console.error('Error al obtener datos de libros:', error);
          return throwError('Error al obtener datos de libros');
        })
      );
  }

  //Buscar libros
  searchBooks(term: number) {
    return this.http.get(`http://localhost:3000/api/books/search/${term}`);
  }

  altaLibro(libro): Observable<any> {
     return this.http.post('http://localhost:3000/api/libros', libro);
  }

  borrarLibro(ISBN: number) {
    return this.http.delete(`http://localhost:3000/api/libros/${ISBN}`);
  }

  verificarIsbnExistente(isbn: string): Observable<boolean> {
    const url = `${this.API_URL}/verificar-isbn/${isbn}`; // Reemplaza con el endpoint de tu API para verificar el ISBN

    // Hacer una solicitud HTTP para verificar si el ISBN existe
    return this.http.get<boolean>(url);
  }

  getLibro(ISBN: number) {
    return this.http.get(`http://localhost:3000/api/libros/${ISBN}`)
  }

  actualizarLibro(ISBN: number, libro: Libro) {
    return this.http.put(`http://localhost:3000/api/libros/${ISBN}`, libro);
  }

  buscarLibros(terminoBusqueda: string): Observable<any[]> {
    const params = new HttpParams().set('termino', terminoBusqueda);
    return this.http.get<any[]>(`${this.API_URL}/libros/buscar`, { params });
  }
  

}
