import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../modelos/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private datosUsuario: any;

  private tokenSubject = new BehaviorSubject<string | null>(null);

  private API_URL = "http://localhost:3000/api"

  constructor(private http: HttpClient, private router:Router) { 
    // Obtener el token almacenado localmente si existe
    const token = localStorage.getItem('token');
    if (token) {
      this.tokenSubject.next(token);
    }
  }

  registro(usuario):Observable<any> {
    return this.http.post(`http://localhost:3000/api/registro`, usuario);
  }

  login(numControl: string, contraseña: string): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/api/login`, { numControl, contraseña });
  }

  // Método para verificar si el correo electrónico está registrado
  checkEmail(email: string) {
    return this.http.post<any>('http://localhost:3000/api/check-email', { email });
  }

  get token() {
    return this.tokenSubject.asObservable();
  }

  // Almacena el token en el cliente
  setToken(token: string) {
    localStorage.setItem('token', token);
    this.tokenSubject.next(token);
  }

  // Borra el token del cliente
  clearToken() {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
  }

  obtenerUsuarios() {
    return this.http.get('http://localhost:3000/api/usuarios'); // Realiza una solicitud GET al servidor para obtener los datos de los usuarios
  }

  // Método para enviar el correo de verificación
  verifyToken(token: string): Observable<any> {
    console.log('Codigo de verificacion: ', token);
    return this.http.post<any>('http://localhost:3000/api/verify-token', { token })
      .pipe(
        catchError(error => {
          console.error('Error al verificar el código:', error);
          console.log('Respuesta completa del servidor:', error.error); // Imprimir la respuesta completa del servidor
          throw error;
        })
      );
  }

  // Método para redirigir al usuario a la ruta de inicio de usuario
  redirectToUserHome() {
    this.router.navigate(['/inicio-usuario']);
  }

  //Metodo para actualizar usuario
  getUsuarios(numControl: number) {
    return this.http.get(`http://localhost:3000/api/actualizar/usuarios/${numControl}`);
  }

  /////////////////////////

  obtenerUsuarioo(numControl: string): Observable<any> {
    const url = `${this.API_URL}/actualizar/usuarios/${numControl}`;
    return this.http.get<any>(url);
  }

  actualizarUsuario(usuario: any): Observable<any> {
    const url = `${this.API_URL}/actualizar/usuario/${usuario.numControl}`; // Suponiendo que el usuario tiene un ID único
    return this.http.put<any>(url, usuario);
  }

  eliminarUsuario(numControl: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/eliminar/usuarios/${numControl}`);
  }

  //////

  obtenerUsuarioLocalStorage() {
    const usuarioString = localStorage.getItem('usuario');
    if (usuarioString) {
      return JSON.parse(usuarioString);
    }
    return null;
  }

  //Metodo paara validar token al iniciar sesion:
  // En tu servicio de usuarios
verificarToken(token: string) {
  return this.http.post('http://localhost:3000/api/verificar-token', { token });
}
} 