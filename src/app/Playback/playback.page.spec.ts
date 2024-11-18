import { Component } from '@angular/core';

@Component({
  selector: 'app-playback',
  templateUrl: './playback.page.html',
  styleUrls: ['./playback.page.scss'],
})
export class PlaybackPage {
  isPlaying: boolean = false;
  progress: number = 0; 
  currentTime: string = '0:00';

  togglePlay() {
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      this.progress = 1; 
    }
  }

  stopPlayback() {
    this.isPlaying = false;
    this.progress = 0; 
    this.currentTime = '0:00'; 
  }

  skipForward() {
    this.progress = Math.min(this.progress + 10, 100);
  }

  skipBackward() {
    this.progress = Math.max(this.progress - 10, 0); 
  }

  updateCurrentTime() {
    const totalSeconds = Math.floor((this.progress / 100) * 15 * 60); 
    const minutes = Math.floor(totalSeconds / 60); 
    const seconds = totalSeconds % 60; 
  
    this.currentTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
  
}


