import { SessionService } from '../services/sessionservice';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-playback',
  standalone: true, 
  templateUrl: './playback.page.html', 
  styleUrls: ['./playback.page.scss'], 
  imports: [IonicModule, FormsModule, CommonModule],  
})
export class PlaybackPage {
  isPlaying = false; 
  progress = 0; 
  currentTime = '00:00'; // Aseguramos que inicie en '00:00'
  duration = 15; // Duración total en minutos
  interval: any; 
  sessions: any[] = [];
  loading: boolean = false;
  selectedSession: any = null; 
  selectedObjetivo: string = '';

  constructor(private router: Router, private sessionService: SessionService) {}

  goBack() {  
    this.router.navigate(['/start']);
  }

  togglePlay() {
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      this.startPlayback();
    } else {
      this.pausePlayback();
    }
  }

  startPlayback() {
    this.interval = setInterval(() => {
      if (this.progress < 100) {
        this.progress += 0.1; 
        this.updateCurrentTime();
      } else {
        this.stopPlayback();
        this.updateSession(); // Llamamos a la función cuando llega a 0
      }
    }, 1000); // Actualiza cada segundo
  }

  pausePlayback() {
    clearInterval(this.interval);
  }

  stopPlayback() {
    this.isPlaying = false;
    this.pausePlayback();
    this.progress = 0;
    this.currentTime = '00:00';
  }

  updateCurrentTime() {
    const totalSeconds = Math.floor((this.progress / 100) * (this.duration * 60)); // Convertir progreso en segundos
    const minutes = Math.floor(totalSeconds / 60); // Calcular minutos
    const seconds = totalSeconds % 60; // Calcular segundos

    // Mostrar el formato adecuado de minutos y segundos
    this.currentTime = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  }

  // Método que se llama cuando el tiempo se acaba
  updateSession() {
    if (this.selectedSession) {
      const session = this.sessions.find(s => s.id === this.selectedSession.id);
      session.check = true;
      this.sessionService.updateSession(session)
        .then(() => {
          console.log("Sesión actualizada");
          this.ngOnInit();
        })
        .catch(error => {
          console.error("Error al actualizar la sesión", error);
        });
    }
  }

  skipForward() {
    this.progress = Math.min(this.progress + 10, 100);
    this.updateCurrentTime();
  }

  skipBackward() {
    this.progress = Math.max(this.progress - 10, 0);
    this.updateCurrentTime();
  }

  selectSession(session: any) {
    this.selectedSession = session;
    this.selectedObjetivo = session.title; // Asignamos el objetivo de la sesión seleccionada
  }

  async ngOnInit() {
    this.loading = true;
    try {
      this.sessions = await this.sessionService.getSessions();
      this.sessions = this.sessions.filter(session => session.check == false); // Filtrar sesiones
      console.log("dato: " + this.sessions )
      this.sessions.sort((a, b) => a.id - b.id);      
      this.selectedSession = null; 
      this.progress = 0; 
      this.currentTime = '00:00'; 
      this.duration = 15;
    } catch (error) {
      console.error('Error al cargar sesiones:', error);
    } finally {
      this.loading = false;
    }
  }
}
