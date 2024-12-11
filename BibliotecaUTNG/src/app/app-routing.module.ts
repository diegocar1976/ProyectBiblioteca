import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { AltaLibroComponent } from './componentes/alta-libro/alta-libro.component';
import { ActualizarLibroComponent } from './componentes/actualizar-libro/actualizar-libro.component';
import { AltaPrestamoComponent } from './componentes/alta-prestamo/alta-prestamo.component';
import { ActualizarPrestamoComponent } from './componentes/actualizar-prestamo/actualizar-prestamo.component';
import { TerminarPrestamoComponent } from './componentes/terminar-prestamo/terminar-prestamo.component';
import { GestionEjemplaresComponent } from './componentes/gestion-ejemplares/gestion-ejemplares.component';
import { ErrorComponent } from './componentes/error/error.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { LoginComponent } from './componentes/login/login.component';
import { RestablecerComponent } from './componentes/restablecer/restablecer.component';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/noauth.guard';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { RoleGuard } from './guards/role.guard';
import { InicioUsuarioComponent } from './componentes/inicio-usuario/inicio-usuario.component';
import { CaducaComponent } from './componentes/caduca/caduca.component';
import { ActualizarComponent } from './componentes/actualizar/actualizar.component';
import { NuestrosEjemplaresComponent } from './componentes/nuestros-ejemplares/nuestros-ejemplares.component';
import { CategoriasComponent } from './componentes/categorias/categorias.component';
import { DisponibilidadComponent } from './componentes/disponibilidad/disponibilidad.component';
import { ApartadosComponent } from './componentes/apartados/apartados.component';
import { SolicitudesComponent } from './componentes/solicitudes/solicitudes.component';
import { MapaComponent } from './componentes/mapa/mapa.component';
import { ServiciosComponent } from './componentes/servicios/servicios.component';
import { ListaComponent } from './componentes/lista/lista.component';
import { PrestamoComponent } from './componentes/prestamo/prestamo.component';
import { MapaInicioComponent } from './componentes/mapa-inicio/mapa-inicio.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'registrate', component: RegistroComponent, canActivate: [AuthGuard] },
  { path: 'restablecer', component: RestablecerComponent, canActivate: [AuthGuard] },
  { path: 'inicio', component: InicioComponent, canActivate: [AuthGuard]},
  { path: 'nuestrosEjemplares', component: NuestrosEjemplaresComponent, canActivate: [AuthGuard]},
  { path: 'categorias', component: CategoriasComponent, canActivate: [AuthGuard]},
  { path: 'disponibilidad', component: DisponibilidadComponent, canActivate: [AuthGuard]},
  { path: 'apartados', component: ApartadosComponent, canActivate: [AuthGuard]},
  { path: 'solicitudes', component: SolicitudesComponent, canActivate: [AuthGuard]},
  { path: 'mapa-inicio', component: MapaInicioComponent, canActivate: [AuthGuard]},
  { path: 'alta', component: AltaLibroComponent, canActivate: [RoleGuard], data: { expectedRole: ['administrador', 'bibliotecario'] } },
  { path: 'actualizar', component: ActualizarLibroComponent, canActivate: [RoleGuard], data: { expectedRole: ['administrador', 'bibliotecario'] } },
  { path: 'prestamo', component: AltaPrestamoComponent, canActivate: [RoleGuard], data: { expectedRole: ['administrador','estudiante', 'profesor', 'bibliotecario'] } },
  { path: 'editar', component: ActualizarPrestamoComponent, canActivate: [RoleGuard], data: { expectedRole: ['administrador', 'bibliotecario'] } },
  { path: 'terminar', component: TerminarPrestamoComponent, canActivate: [RoleGuard], data: { expectedRole: ['administrador', 'bibliotecario'] } },
  { path: 'gestionEjemplares', component: GestionEjemplaresComponent, canActivate: [RoleGuard], data: { expectedRole: ['estudiante', 'profesor','administrador', 'bibliotecario'] } },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [RoleGuard], data: { expectedRole: ['administrador'] } },
  { path: 'inicio-usuario', component: InicioUsuarioComponent, canActivate: [RoleGuard], data: { expectedRole: ['administrador','estudiante', 'profesor', 'bibliotecario'] } },
  { path: 'caduca', component:CaducaComponent, canActivate: [RoleGuard], data: { expectedRole: ['administrador','estudiante', 'profesor', 'bibliotecario'] }},
  { path: 'actualizarUsuarios', component:ActualizarComponent, canActivate: [RoleGuard], data: { expectedRole: ['administrador','estudiante', 'profesor', 'bibliotecario'] }},
  {path: 'mapa', component: MapaComponent, canActivate: [RoleGuard], data: { expectedRole: ['estudiante','administrador', 'profesor', 'bibliotecario'] } },
  {path: 'servicios', component: ServiciosComponent, canActivate: [AuthGuard]},
  {path: 'lista', component: ListaComponent, canActivate: [RoleGuard], data: { expectedRole: ['administrador','estudiante', 'profesor', 'bibliotecario'] } },
  { path: 'misPrestamos', component: PrestamoComponent,canActivate: [RoleGuard], data: { expectedRole: ['estudiante','administrador', 'profesor', 'bibliotecario'] }  },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }