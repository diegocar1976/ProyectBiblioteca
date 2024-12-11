import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RestablecerService } from 'src/app/servicios/restablecer.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.component.html',
  styleUrls: ['./restablecer.component.css']
})
export class RestablecerComponent {

  email: string = '';
  code: string;
  newPassword: string;
  confirmPassword: string;
  verificationCodeSent: boolean = false;
  codeVerified: boolean = false;
  errorMessage: string;
  error: string = '';
  nuevaContrasena: string;
  mensaje: string;
  idUsuario: string; 
  showResetForm: boolean = false; 

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  codeFormControl = new FormControl('', [Validators.required, Validators.pattern('^.{6}$')]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/)
  ]);

  constructor(private restablecerService: RestablecerService, private router: Router) {}

  sendVerificationCode() {
    this.restablecerService.sendVerificationCode(this.email).subscribe(
      response => {
        console.log('Correo enviado correctamente:', response);
        this.verificationCodeSent = true;
        Swal.fire({
          icon: 'success',
          title: 'Correo enviado correctamente',
          text: 'Se ha enviado un código de verificación a tu correo electrónico.'
        });
      },
      error => {
        console.error('Error al enviar el correo:', error);
        this.error = '';
        Swal.fire({
          icon: 'error',
          title: 'Error al enviar el correo',
          text: 'Hubo un problema al enviar el correo. Por favor, inténtalo de nuevo más tarde.'
        });
        this.email='';
      }
    );
  }

  verifyCode() {
    this.restablecerService.verifyCode(this.email, this.code).subscribe(
      response => {
        console.log('Código verificado correctamente:', response);
        this.showResetForm = true;
        Swal.fire({
          icon: 'success',
          title: 'Código verificado correctamente',
          text: 'El código de verificación es válido.'
        });
      },
      error => {
        console.error('Error al verificar el código:', error);
        if (error.status === 400) {
          this.error = '';
        } else {
          this.error = '';
          this.code=''
        }
        Swal.fire({
          icon: 'error',
          title: 'Error al verificar el código',
          text: this.error
        });
      }
    );
  }

  restablecerContrasena() {
    this.restablecerService.resetPassword(this.email, this.newPassword).subscribe(
      response => {
        console.log('Contraseña restablecida correctamente:', response);
        Swal.fire({
          icon: 'success',
          title: 'Contraseña restablecida correctamente',
          text: 'Tu contraseña ha sido restablecida con éxito.'
        });
        this.router.navigate(['/inicio']);
      },
      error => {
        console.error('Error al restablecer la contraseña:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al restablecer la contraseña',
          text: 'Hubo un problema al restablecer tu contraseña. Por favor, intenta nuevamente más tarde.'
        });
      }
    );
  } 

  //proyecto terminado
}
