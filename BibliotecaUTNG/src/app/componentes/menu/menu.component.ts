import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuService } from 'src/app/servicios/menu.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router'; // Importar Router en lugar de ActivatedRoute
import Swal from 'sweetalert2';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

declare var $: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnDestroy, OnInit {

  isButtonEnabled: boolean = true;
  showButton: boolean = true; // Inicialmente, mostrar el botón

  usuario: any;
  datosCargados: boolean = false; // Bandera para indicar si los datos del usuario se han cargado

  showNavbar: boolean = true;
  isLoggedIn: boolean = true;
  subscription: Subscription;
  userData: any = {};
  jwtToken: string;
  expirationTime: Date;

  constructor(private menuService: MenuService, private authService: AuthService, private router: Router, private usuariosService: UsuariosService) {
    this.subscription = this.menuService.showNavbar.subscribe((value) => {
      this.showNavbar = value;
    });
  
    this.authService.getLoggedIn().subscribe((value: boolean) => {
      this.isLoggedIn = value;
      console.log('Estado de autenticacion actualizado', this.isLoggedIn);
    });
  
    // Obtener la hora actual y mostrarla en la consola
    const currentDateTime = new Date();
    console.log('Hora actual:', currentDateTime.toLocaleTimeString());
  
    this.userData = JSON.parse(localStorage.getItem('userData'));
    console.log('Datos del usuario obtenidos del localStorage en el componente:', this.userData);

    // Lógica para iniciar sesión y almacenar el número de control en el almacenamiento local
    localStorage.setItem('numControl', this.userData.numControl);
  
    // Obtener el token JWT del localStorage
    this.jwtToken = localStorage.getItem('token');
    console.log('Token JWT obtenido del localStorage en el componente:', this.jwtToken);
  
    // Suscribirse al cambio de datos del usuario
    this.subscription = this.authService.getUserData().subscribe((userData: any) => {
      console.log('Datos del usuario recibidos en el componente:', userData);
      this.userData = userData;
    });
  
    // Verificar la ruta actual y deshabilitar el botón si es necesario
    const currentRoute = this.router.url;
    if (currentRoute === '/inicio' || currentRoute === '/registrate' || currentRoute === '/restablecer' || currentRoute === '/caduca') {
      this.isButtonEnabled = false;
    }
  
    // Establecer el tiempo de expiración (20 minutos después)
    const expirationTime = new Date(currentDateTime.getTime() + 20 * 60 * 1000); // 20 minutos en milisegundos
  
    // Verificar si userData o token no son null
if (this.userData !== null || this.jwtToken !== null) {
  // Iniciar un temporizador para verificar la expiración de la sesión
  const sessionExpirationTimer = setTimeout(() => {
      console.log('La sesión ha caducado.');
      // Aquí puedes realizar cualquier acción que desees al expirar la sesión, como mostrar un formulario o redirigir a otra página.
      // Por ejemplo, podrías navegar a la página de sesión caducada:
      this.router.navigate(['/caduca']);
  }, expirationTime.getTime() - currentDateTime.getTime()); // Tiempo restante hasta la expiración de la sesión en milisegundos

  // Aquí puedes renderizar el contenido de la página, ya que userData o token no son null
  // Por ejemplo, podrías mostrar una sección específica de la página o cargar datos desde el backend.
} else {
  // En caso de que userData y token sean null, puedes redirigir al usuario a una página de inicio de sesión.
}
  }
  
  

  ngOnInit() {
    this.router.events.subscribe(() => { // Usar router.events en lugar de route.url
      const currentRoute = this.router.url;
      // Ocultar el botón en ciertas rutas
      if (currentRoute === '/login' || currentRoute === '/restablecer' || currentRoute=== '/registrate' || currentRoute === '/caduca') {
        this.showButton = false;
      } else {
        // Verificar si userData es null
        if (this.userData === null) {
          this.showButton = false;
        } else {
          this.showButton = true;
        }
      }
    });
    // Suscríbete a los cambios en la información de expiración del token
    this.subscription = this.authService.getExpirationTime().subscribe((expirationTime: Date) => {
      // Asigna la fecha de expiración del token
      this.expirationTime = expirationTime;
      // Muestra la fecha de expiración en la consola o en otro lugar
      console.log('Tiempo de expiración del token:', this.expirationTime);
    });
  }

  // Método para cerrar sesión
  logout() {
    console.log('Cerrando sesión');
    
    // Llamar al método logout del AuthService
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  actualizar(){
    this.router.navigate(['/actualizarUsuarios' ]);
    Swal.fire('¡Importante!', 'Al cambiar la información del usuario tu sesión se cerrará y tendrás que volver a iniciar sesión.', 'info');
  }

}
