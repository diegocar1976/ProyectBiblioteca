import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // Obtener los datos del usuario desde el servicio AuthService
    const userData = this.authService.getUserDataFromLocalStorage();
  
    // Si no hay datos de usuario, bloquear el acceso a la página de alta
    if (!userData) {
      console.log('No hay datos de usuario. Bloqueando el acceso a la página de alta.');
      // Redirigir a una página diferente (por ejemplo, la página de inicio)
      this.router.navigate(['/inicio']);
      return false; // Devolver false para bloquear la navegación
    } else {
      return true; // Permitir la navegación si hay datos de usuario
    }
  }
}