import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  items: any[] = [
    { nombre: 'Iniciar Sesión', ruta: '/login' },
    { nombre: 'Servicios', ruta: '/servicios' },
    { nombre: 'Iniciar Sesión', ruta: '/login' },
    { nombre: 'Crear Cuenta', ruta: '/registrate' },
    { nombre: 'Nuestros Ejemplares', ruta: '/nuestrosEjemplares' },
    { nombre: 'Categorias', ruta: '/categorias' },
    { nombre: 'Disponibilidad', ruta: '/disponibilidad' },
    { nombre: 'Apartados', ruta: '/apartados' },
    { nombre: 'Solicitudes', ruta: '/solicitudes' },
    { nombre: 'Mapa', ruta: '/mapa' },
  ]; // Lista de elementos a buscar

  constructor() { }

  // Método para filtrar los elementos según el término de búsqueda
  filterItems(searchTerm: string): any[] {
    // Filtra los elementos que coincidan con el término de búsqueda
    const filteredItems = this.items.filter(item =>
      item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filteredItems;
  }
}

export class SearchService2 {
  items: any[] = [
    { nombre: 'Iniciar Sesión', ruta: '/login' },
    { nombre: 'Servicios', ruta: '/servicios' },
    { nombre: 'Crear Cuenta', ruta: '/registrate' },
    { nombre: 'Nuestros Ejemplares', ruta: '/nuestrosEjemplares' },
    { nombre: 'Categorias', ruta: '/categorias' },
    { nombre: 'Disponibilidad', ruta: '/disponibilidad' },
    { nombre: 'Apartados', ruta: '/apartados' },
    { nombre: 'Solicitudes', ruta: '/solicitudes' },
    { nombre: 'Mapa', ruta: '/mapa' },

  ]; // Lista de elementos a buscar

  constructor() { }

  // Método para filtrar los elementos según el término de búsqueda
  filterItems(searchTerm: string): any[] {
    // Filtra los elementos que coincidan con el término de búsqueda
    const filteredItems = this.items.filter(item =>
      item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filteredItems;
  }
}
