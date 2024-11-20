import { SessionService } from '../services/sessionservice';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-selectSesion',
  templateUrl: './selectSesion.page.html',
  styleUrls: ['./selectSesion.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SelectSesion implements OnInit {
  selectedDate: string = '';
  selectedTime: string = '';
  isModalOpen: boolean = false; 
  selectedSession: any = null; //sesion seleccionada
  isConfirmActive: boolean = false;// estado del boton Confirmar
  sessions: any[] = [];
  loading: boolean = false;;

  //seleccionar una sesion
  selectSession(session: any) {
    this.sessions.forEach ((s) => (s.selected = false)); //deselecciona todas las sesiones
    session.selected = true;
    this.selectedSession = session;
    this.updateConfirmState();
  }

  updateConfirmState() {
    this.isConfirmActive = !!this.selectedDate && !!this.selectedTime && !!this.selectedSession;
  }

  isLoading: boolean = false;
  errorMessage: string = "";

  constructor(private router: Router, private modalController: ModalController, private sessionService: SessionService) {}

  goBack() {  
    this.router.navigate(['/start']);
  }

  confirmSelection() {
    if (this.selectedDate && this.selectedTime) {
      // Abre el modal solo si hay valores seleccionados
      this.isModalOpen = true;
    }
  }

  closeModal() {
    this.isModalOpen = false;
  }

  resetFields() {
    this.selectedDate = '';
    this.selectedTime = '';
    this.selectedSession = '';
    this.sessions.forEach ((s) => (s.selected = false));
    this.updateConfirmState();
    this.closeModal();
  }

  async ngOnInit() {
    this.loading = true;
    try {
      this.sessions = await this.sessionService.getSelectSessions();
      this.sessions.sort((a, b) => a.id - b.id);
    } catch (error) {
      console.error('Error al cargar el tipo de sesiones:', error);
    } finally {
      this.loading = false;
    }
  }
}
