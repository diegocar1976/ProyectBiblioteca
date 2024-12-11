export interface Usuario {
    idUsuario?: number; // El signo de interrogación indica que el campo es opcional
    numControl: number;
    nombre: string;
    apellido: string;
    correo: string;
    telefono: string; // El campo telefono es opcional
    contraseña: string;
  }