import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-playback',
  standalone: true, 
  templateUrl: './playback.page.html', 
  styleUrls: ['./playback.page.scss'], 
  imports: [CommonModule, IonicModule, FormsModule], 
})
export class PlaybackPage {
  isPlaying = false; 
  progress = 0; 
  currentTime = '0:00'; 
  duration = 15; 
  interval: any; 

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
}


