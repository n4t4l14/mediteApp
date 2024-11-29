import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { SessionService } from '../services/sessionservice';

@Component({
  selector: 'app-diario',
  templateUrl: './diario.page.html',
  styleUrls: ['./diario.page.scss'],
  standalone: true,  
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Diario implements OnInit {
  sessions: any[] = [];
  loading: boolean = false;
  selectedSessionText: string = "";
  selectedSessionId: number | null = null;
;

  constructor(private router: Router,private sessionService: SessionService) {}

  goBack() {  
    this.router.navigate(['/start']);
  }

  selectSession(session: { id: number; date: string; time: string; pensamiento: string}) {
    this.selectedSessionText = `${session.pensamiento}`;
    this.selectedSessionId = session.id; 
  }

  saveThought() {
    if (this.selectedSessionId !== null) {
      const session = this.sessions.find(s => s.id === this.selectedSessionId);
      if (session) {
        session.pensamiento = this.selectedSessionText;
        this.sessionService.updateSession(session);
        alert("Pensamiento actualizado");
        this.selectedSessionText = "";
      }
    }
  }

  async ngOnInit(){
    this.loading = true;
    try {
      this.sessions = await this.sessionService.getSessions();
      this.sessions = this.sessions.filter(session => session.check == true);
      this.sessions.sort((a, b) => a.id - b.id);
    } catch (error) {
      console.error('Error al cargar sesiones:', error);
    } finally {
      this.loading = false;
    }
  }
}
