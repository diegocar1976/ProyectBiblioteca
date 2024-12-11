import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AltaLibroComponent } from './componentes/alta-libro/alta-libro.component';
import { ActualizarLibroComponent } from './componentes/actualizar-libro/actualizar-libro.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { AltaPrestamoComponent } from './componentes/alta-prestamo/alta-prestamo.component';
import { ActualizarPrestamoComponent } from './componentes/actualizar-prestamo/actualizar-prestamo.component';
import { TerminarPrestamoComponent } from './componentes/terminar-prestamo/terminar-prestamo.component';
import { GestionEjemplaresComponent } from './componentes/gestion-ejemplares/gestion-ejemplares.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ErrorComponent } from './componentes/error/error.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { RestablecerComponent } from './componentes/restablecer/restablecer.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/noauth.guard';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { InicioUsuarioComponent } from './componentes/inicio-usuario/inicio-usuario.component';
import { RoleGuard } from './guards/role.guard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ActualizarComponent } from './componentes/actualizar/actualizar.component';
import { SearchComponent } from './componentes/search/search.component';
import { SearchService2 } from './search.service';
import { ServiciosComponent } from './componentes/servicios/servicios.component';
import { ListaComponent } from './componentes/lista/lista.component';
import { PrestamoComponent } from './componentes/prestamo/prestamo.component';
import { ServiceWorkerModule } from '@angular/service-worker';



@NgModule({
  declarations: [
    AppComponent,
    AltaLibroComponent,
    ActualizarLibroComponent,
    InicioComponent,
    MenuComponent,
    AltaPrestamoComponent,
    ActualizarPrestamoComponent,
    TerminarPrestamoComponent,
    GestionEjemplaresComponent,
    ErrorComponent,
    LoginComponent,
    RegistroComponent,
    RestablecerComponent,
    UsuariosComponent,
    InicioUsuarioComponent,
    ActualizarComponent,
    SearchComponent,
    ServiciosComponent,
    ListaComponent,
    PrestamoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    ToastrModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    
  ],
  providers: [
    AuthGuard,
    NoAuthGuard,
    RoleGuard,
    SearchService2
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }