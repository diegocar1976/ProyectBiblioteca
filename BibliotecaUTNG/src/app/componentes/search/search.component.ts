import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { SearchService, SearchService2 } from 'src/app/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent {
  searchTerm: string = '';
  searchOptions: any[] = [];
  selectedOption: string = '';
  showOptions: boolean = true;
  recognition: any; // Reconocimiento de voz

  constructor(
    private authService: AuthService,
    private searchService: SearchService2,
    private router: Router
  ) {
    // Inicializa la instancia de reconocimiento de voz
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.lang = 'es-MX'; // Configura el idioma (Español México)
      this.recognition.interimResults = false;

      // Evento: El reconocimiento devuelve resultados
      this.recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        this.searchTerm = transcript; // Asigna el texto reconocido al campo de búsqueda
        this.showSearchOptions(); // Actualiza las opciones de búsqueda
      };

      this.recognition.onerror = (event: any) => {
        console.error('Error en reconocimiento de voz:', event.error);
      };
    } else {
      console.warn('El reconocimiento de voz no es soportado en este navegador.');
    }
  }

  // Inicia el dictado por voz
  startVoiceRecognition(): void {
    if (this.recognition) {
      this.recognition.start();
      console.log('Iniciando reconocimiento de voz...');
    } else {
      alert('El reconocimiento de voz no es soportado en este navegador.');
    }
  }

  showSearchOptions(): void {
    if (this.searchTerm.length > 0) {
      this.searchOptions = this.searchService.filterItems(this.searchTerm);
    } else {
      this.searchOptions = [];
    }
  }

  selectOption(): void {
    this.searchTerm = this.selectedOption;
    this.search();
  }

  search(): void {
    const results = this.searchService.filterItems(this.searchTerm);
    if (results.length > 0) {
      this.router.navigateByUrl(results[0].ruta);
    }
  }
}
