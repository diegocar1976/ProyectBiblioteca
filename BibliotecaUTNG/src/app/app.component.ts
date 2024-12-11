import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './servicios/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private router: Router, private authService: AuthService){}

  title = 'gestorBiblioteca';
  jwtToken: string;
  userData: any;
  isLoggedIn: boolean = false;

  isHomePageOrErrorPage(): boolean {
    console.log("Current URL:", this.router.url);
    return this.router.url === '/' || this.router.url === '/error';
  }

  ngOnInit() {    

    // Obtener los datos del usuario del localStorage
    this.userData = this.authService.getUserDataFromLocalStorage();

    // Obtener el estado de inicio de sesión al inicializar el componente
    this.authService.getLoggedIn().subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });

    // Obtener los datos del usuario al inicializar el componente
    this.authService.getUserData().subscribe((userData: any) => {
      this.userData = userData;
    });
  }
}