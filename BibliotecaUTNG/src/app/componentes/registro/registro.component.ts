import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import Swal from 'sweetalert2';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import { RestablecerService } from 'src/app/servicios/restablecer.service';

// Declara la función grecaptcha como una variable global
declare const grecaptcha: any;

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent{ 

  numeroControl: string = '';
  nombre: string = '';
  apellido: string = '';
  email: string = '';
  telefono: string = '';
  password: string = '';
  confirmPassword: string = '';

  @ViewChild('captchaElement') captchaElement;

  //Envio de token
  verificationCodeSent: boolean = false;
  code: string = '';
  codeVerified: boolean = false;
  errorMessage: string;
  error: string = '';
  showTokenForm: boolean = false; //
  tokenFormControl: FormControl;
  registroForm: FormGroup;
  token: string; // Define la propiedad token
  showResetForm: boolean = false; //

  correo : string;

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  codeFormControl = new FormControl('', [Validators.required, Validators.pattern('^.{6}$')]);
// Expresión regular corregida para la validación de contraseña
passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!#$%^&])[A-Za-z\d@!#$%^&]{8,}$/;

// Función para verificar si la confirmación de la contraseña coincide con la contraseña ingresada
checkPasswordMatch(password: string, confirmPassword: string): boolean {
    return password === confirmPassword;
}
  

  constructor(private usuarioService: UsuariosService, private router: Router, private restablecerService:RestablecerService) {
  }

  registro(registroForm: NgForm) {
    registroForm.form.markAllAsTouched(); 
    if (registroForm.invalid) {
      // Si el formulario es inválido, no se realiza el registro
      return;
    }
  
    // Verificar si la casilla de verificación está marcada
    const captchaResponse = grecaptcha.getResponse();
    const captchaChecked = captchaResponse && captchaResponse.length !== 0;
  
    if (!captchaChecked) {
      // Si la casilla de verificación no está marcada, muestra un mensaje de error
      Swal.fire('¡Uppps!', 'Por favor, completa la verificación humana', 'error');
      return;
    }
  
    if (this.password !== this.confirmPassword) {
      // Si las contraseñas no coinciden, muestra un mensaje de error
      Swal.fire('¡Uppps!', 'Las contraseñas no coinciden', 'error');
      // Reiniciar campos de contraseña y confirmar contraseña
      this.password = '';
      this.confirmPassword = '';
      return;
    }
  
    const usuario = {
      numero_control: this.numeroControl,
      nombre: this.nombre,
      apellido: this.apellido,
      email: this.email,
      telefono: this.telefono,
      contrasena: this.password,
      rol:'estudiante'
    };
  
    this.usuarioService.registro(usuario).subscribe(
      (res: any) => {
        // Manejar respuesta exitosa del registro
        Swal.fire('¡Registro exitoso!', 'El usuario ha sido registrado correctamente', 'success');
        // Reiniciar campos
        this.numeroControl = '';
        this.nombre = '';
        this.apellido = '';
        this.email = '';
        this.telefono = '';
        this.password = '';
        this.confirmPassword = '';
        // Redirigir a la página de inicio
        this.router.navigate(['/inicio']);
      },
      (error: any) => {
        console.error(error);
        // Manejar errores del registro
        if (error.status === 400 && error.error && error.error.message) {
          Swal.fire('¡Uppps!', error.error.message, 'error');
        } else {
          Swal.fire('¡Uppps!', 'Ocurrió un error al registrar el usuario', 'error');
        }
        // Reiniciar campos
        this.numeroControl = '';
        this.nombre = '';
        this.apellido = '';
        this.email = '';
        this.telefono = '';
        this.password = '';
        this.confirmPassword = '';
        grecaptcha.reset();
      }
    );   
  }
  
  validateConfirmPassword() {
    if (this.password !== this.confirmPassword) {
      this.registroForm.controls['confirmPassword'].setErrors({ passwordMismatch: true });
    } else {
      this.registroForm.controls['confirmPassword'].setErrors(null);
    }
  }
  

  validateNumberInput(event: KeyboardEvent) {
    // Código ASCII de 0 a 9, códigos de tecla para borrar (Backspace),
    // teclas de flecha izquierda (37) y derecha (39)
    const isNumberOrBackspaceOrArrowKey = 
      (event.keyCode >= 48 && event.keyCode <= 57) || // Números
      (event.keyCode >= 37 && event.keyCode <= 40) || // Flechas izquierda y derecha
      event.keyCode === 8; // Backspace
    
    if (!isNumberOrBackspaceOrArrowKey) {
      event.preventDefault();
    }
  }
    
    
    registrarUsuario() {
      // Construye el objeto de usuario con los datos del formulario
      const usuario = {
        numero_control: this.numeroControl,
        nombre: this.nombre,
        apellido: this.apellido,
        email: this.email,
        telefono: this.telefono,
        contrasena: this.password,
        rol: 'estudiante'
      };
    
      // Envía la solicitud de registro del usuario
      this.usuarioService.registro(usuario).subscribe(
        (res: any) => {
          // Manejar respuesta exitosa del registro
          Swal.fire('¡Registro exitoso!', 'El usuario ha sido registrado correctamente', 'success');
          // Reiniciar campos
          this.numeroControl = '';
          this.nombre = '';
          this.apellido = '';
          this.email = '';
          this.telefono = '';
          this.password = '';
          // Redirigir a la página de inicio
          this.router.navigate(['/inicio']);
        },
        (error: any) => {
          console.error(error);
          // Manejar errores del registro
          if (error.status === 400 && error.error && error.error.message) {
            Swal.fire('¡Uppps!', error.error.message, 'error');
          } else {
            Swal.fire('¡Uppps!', 'Ocurrió un error al registrar el usuario', 'error');
          }
          // Reiniciar campos
          this.numeroControl = '';
          this.nombre = '';
          this.apellido = '';
          this.email = '';
          this.telefono = '';
          this.password = '';
        }
      );
    }
  


}