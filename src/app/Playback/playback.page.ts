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
export class PlaybackPage{
  isPlaying = false; 
  progress = 0; 
  currentTime = '0:00'; 
  duration = 15; 
  interval: any; 
  sessions: any[] = [];
  loading: boolean = false;

  constructor(private router: Router,private sessionService: SessionService) {}

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
      }
    }, 1000); 
  }

 
  pausePlayback() {
    clearInterval(this.interval);
  }

 
  stopPlayback() {
    this.isPlaying = false;
    this.pausePlayback();
    this.progress = 0;
    this.currentTime = '0:00';
  }

  
  updateCurrentTime() {
    const totalSeconds = Math.floor((this.progress / 100) * (this.duration * 60));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    this.currentTime = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  }

  
  updateProgress() {
    this.currentTime = `${Math.floor((this.progress / 100) * this.duration)}:00`;
  }


  skipForward() {
    this.progress = Math.min(this.progress + 10, 100);
    this.updateCurrentTime();
  }

 
  skipBackward() {
    this.progress = Math.max(this.progress - 10, 0);
    this.updateCurrentTime();
  }

  async ngOnInit(){
    this.loading = true;
    try {
      this.sessions = await this.sessionService.getSessions();
      this.sessions.sort((a, b) => a.id - b.id);
    } catch (error) {
      console.error('Error al cargar sesiones:', error);
    } finally {
      this.loading = false;
    }
  }

}


