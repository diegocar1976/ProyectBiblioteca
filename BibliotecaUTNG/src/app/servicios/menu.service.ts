import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private API_URL = "http://localhost:3000/api"

  showNavbar : BehaviorSubject<boolean>;

  constructor(private http:HttpClient) { 
    this.showNavbar = new BehaviorSubject(true);
  }

  hide(){
    this.showNavbar.next(false);
  }

  display(){
    this.showNavbar.next(true);
  }

  actualizarUsuario(nuevosDatos: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/actualizar-usuario', nuevosDatos);
  }

}
