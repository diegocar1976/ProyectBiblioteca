import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // Obtener los datos del usuario desde el servicio AuthService
    const userData = this.authService.getUserDataFromLocalStorage();
  
    // Si hay datos de usuario, redirigir lejos de las páginas de inicio de sesión, registro y restablecimiento
    if (userData) {
      console.log('Datos del usuario obtenidos del localStorage en el Guard:', userData);
      this.router.navigate(['/inicio-usuario']);
      return false; // Devolver false para bloquear la navegación
    } else {
      return true; // Permitir la navegación si no hay datos de usuario
    }
  }
  
}