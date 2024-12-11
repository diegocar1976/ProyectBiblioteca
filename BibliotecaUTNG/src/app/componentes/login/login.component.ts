import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { AuthService } from 'src/app/servicios/auth.service';
import { HttpClient } from '@angular/common/http'

// Declara la función grecaptcha como una variable global
declare const grecaptcha: any;
const provider = new firebase.auth.GoogleAuthProvider();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  numControl: string;
  contrasena: string;
  jwtToken: string;
  showModal: boolean = false; // Variable para controlar la visibilidad del modal
  errorMensaje: string = ''; // Variable para almacenar el mensaje de error

  @ViewChild('captchaElement') captchaElement;

  showTokenForm: boolean = false;
  token: string = '';
  error: string;

  //Mostrar formulario para ingresar con el token
  mostrarFormularioToken: boolean = false;
  tokenIngresado: string;
  codigoVerificacion: string;

  constructor(private usuariosService: UsuariosService, private router: Router,
     private afAuth: AngularFireAuth, private authService:AuthService, private http: HttpClient) {}

  ngOnInit() {
  }

  login(loginForm: NgForm) {
    loginForm.form.markAllAsTouched();
  
    console.log('Intentando iniciar sesión...');
  
   /* if (loginForm.invalid) {
      console.log('Formulario inválido.');
      return;
    }
  
    // Verificar si la casilla de verificación está marcada
    const captchaResponse = grecaptcha.getResponse();
    const captchaChecked = captchaResponse && captchaResponse.length !== 0;
  
    console.log('Respuesta de reCAPTCHA:', captchaResponse);
  
    if (!captchaChecked) {
      // Si la casilla de verificación no está marcada, muestra un mensaje de error
      console.log('Verificación humana incompleta.');
      this.errorMensaje = 'Por favor, completa la verificación humana';
      return;
    } */
  
    console.log('Verificación humana completada.');
  
    // Continuar con el proceso de inicio de sesión si la verificación humana es exitosa
    this.usuariosService.login(this.numControl, this.contrasena).subscribe(
      (res: any) => {
        console.log('Respuesta del servicio de inicio de sesión:', res);
        //Almacena los datos del usuario
        this.authService.setUserData(res.userData);
        //Notificar al servicio de autenticacion que el usuario ha iniciado sesion
        // Almacena el token y actualiza el estado de la sesion
        this.usuariosService.setToken(res.token);
        // Almacena el token JWT en la variable del componente
        this.jwtToken = res.token;
        // Muestra el token JWT en la consola
        console.log('Token JWT:', this.jwtToken);
        this.authService.saveToken(res.token);

        // Redirige a la pagina de alta
        //this.router.navigate(['/inicio-usuario']);

        //Muestra el formulario del token
        // Después de validar las credenciales
        this.mostrarFormularioToken = true;

        // Mostrar el primer mensaje
        Swal.fire('¡Credenciales validas!', 'Ingresa el token enviado a tu correo', 'success')
      },
      (error: any) => {
        console.error('Error en el inicio de sesión:', error);
        // Manejar errores del inicio de sesión
        this.errorMensaje = 'El número de control o contraseña son incorrectos';
        Swal.fire('¡Inicio de sesión no exitoso!', 'El número de control o contraseña son incorrectos', 'error')
        this.resetForm();
      }
    );
  }

  //Metodo para verificar token e iniciar sesion:
  verificarToken() {
    // Verifica que el código de verificación no esté vacío
    if (!this.codigoVerificacion) {
      console.error('El código de verificación está vacío.');
      Swal.fire('¡Codigo de verificacion vacio!', 'error')
      return; // Sale de la función si el código de verificación está vacío
    }
  
    // Realiza la solicitud HTTP para verificar el token
    this.http.post('http://localhost:3000/api/verificar-token', { token: this.codigoVerificacion })
      .subscribe(
        (response: any) => {
          console.log('Respuesta del servidor:', response);
          // Verifica si la respuesta del servidor es válida
          if (response && response.valid) {
            console.log('Token válido. Redirigiendo...');
            // Aquí redirige al usuario a la página de inicio/usuario
            
            this.router.navigate(['/inicio-usuario']);
            // Mostrar el primer mensaje
        Swal.fire('¡Inicio de sesión exitoso!', 'Bienvenido de vuelta', 'success')
        .then((result) => {
          if (result.isConfirmed) {
            // Mostrar el segundo mensaje después de que el usuario confirme el primero
            Swal.fire('¡Importante!', 'Si requiere un cambio de rol, notifíquese con el administrador al correo bibliotecautng1975@gmail.com', 'info');
          }
        });
          } else {
            console.log('Token inválido.');
            // Manejar el caso de token inválido si es necesario
          }
        },
        (error) => {
          console.error('Error al verificar el token:', error);
          Swal.fire('¡Codigo de verificacion incorrecto!', 'error')
            this.logout();
          // Aquí puedes manejar el error
        }
      );
  }

  // Metodo para cerra la sesion
  logout() {
    console.log('Cerrando sesión');

    // Eliminar el token
    localStorage.removeItem('token');

    // Eliminar los datos del usuario
    localStorage.removeItem('userData');

    // Limpiar la consola
    console.clear();

    // Mostrar mensaje de confirmación con SweetAlert
    Swal.fire({
      icon: 'info',
      title: 'Token invalido',
      text: 'La sesión se ha cerrado por seguridad, vuelve a ingresar sesión nuevamente.',
      confirmButtonText: 'Aceptar'
    });

    // Redirigir a la página de inicio
    this.router.navigate(['/inicio']);
  }
  
  

  

  validateNumberInput(event: KeyboardEvent) {
    const isNumberOrBackspaceOrArrowKey =
      (event.keyCode >= 48 && event.keyCode <= 57) || // Números
      (event.keyCode >= 37 && event.keyCode <= 40) || // Flechas izquierda y derecha
      event.keyCode === 8; // Backspace

    if (!isNumberOrBackspaceOrArrowKey) {
      event.preventDefault();
    }
  }

  resetForm() {
    this.numControl = '';
    this.contrasena = '';
  }


// Método para inciar sesion por google
async loginWithGoogle() {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await this.afAuth.signInWithPopup(provider);
    const userEmail = result.user.email; // Obtener el correo electrónico del usuario

    // Enviar el correo electrónico al servidor para verificar si está registrado
    this.usuariosService.checkEmail(userEmail).subscribe(
      (response) => {
        console.log('Respuesta del servidor después de iniciar sesión con Google:', response);
        if (response && response.token) {
          // Almacena el token en el cliente
          const token = response.token;

          // Imprimir el token en la consola par  a verificar su contenido
          console.log('Token JWT recibido:', token);

          // Imprimir el tiempo de expiración del token en la consola
          console.log('Tiempo de expiración del token:', response.expirationTime);

          // Luego de recibir el token y la fecha de expiración del servidor
          this.authService.setExpirationTime(response.expirationTime);

          // Almacena el token y los datos del usuario en el servicio de usuarios
          this.usuariosService.setToken(token);

          // Almacena los datos del usuario en el servicio de autenticación
          const userData = response.userData;
          console.log('Datos del usuario recibidos:', userData);
          this.authService.setUserData(userData);

          // Notifica al servicio de autenticación que el usuario ha iniciado sesión
          this.authService.setLoggedIn(true);

          //REdirige a la pagina de prestamo
          this.router.navigate(['/inicio-usuario']);

          // Mostrar el primer mensaje
          Swal.fire('¡Inicio de sesión exitoso!', 'Bienvenido de vuelta', 'success')
          .then((result) => {
            if (result.isConfirmed) {
              // Mostrar el segundo mensaje después de que el usuario confirme el primero
              Swal.fire('¡Importante!', 'Si requiere un cambio de rol, notifíquese con el administrador al correo bibliotecautng1975@gmail.com', 'info');
            }
          });
        } else {
          // Si el correo electrónico no está registrado o no se recibió el token, mostrar un mensaje de error
          Swal.fire('¡Uppps!', 'El correo electrónico no está registrado, inténtalo nuevamente.', 'error');
        }
      },
      (error) => {
        console.error('Error al verificar el correo electrónico:', error);
        Swal.fire('¡Uppps!', 'El correo electrónico no está registrado, inténtalo nuevamente.', 'error');
      }
    );
  } catch (error) {
    console.error('Error al autenticar con Google:', error);
    Swal.fire('¡Uppps!', 'No se pudo autenticar con ese correo electrónico, inténtalo nuevamente.', 'error');
  }
}


}