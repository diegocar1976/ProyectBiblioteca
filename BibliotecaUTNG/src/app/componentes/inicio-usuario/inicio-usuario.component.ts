// inicio-usuario.component.ts

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-inicio-usuario',
  templateUrl: './inicio-usuario.component.html',
  styleUrls: ['./inicio-usuario.component.css']
})
export class InicioUsuarioComponent implements OnInit {

  userData: any;

  constructor(private authService:AuthService) {}

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    console.log('Datos del usuario obtenidos del localStorage en el componente:', this.userData);
  }
  
}
