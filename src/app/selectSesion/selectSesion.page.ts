import { SessionService } from '../services/sessionservice';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';

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
  selectedObjetivo: string = '';
  isModalOpen: boolean = false; 
  selectsessions: any[] = [];
  loading: boolean = false;
  selectedSession: any = null; //sesion seleccionada
  isConfirmActive: boolean = false;// estado del boton Confirmar
  errorMessage: string = "";
  isLoading: boolean = false;

  constructor(private alertController: AlertController, private router: Router, private modalController: ModalController, private sessionService: SessionService) {}

  //seleccionar una sesion
  selectSession(session: any) {
    this.selectedSession = session;
    this.selectedObjetivo = session.title; // Asignamos el objetivo de la sesión seleccionada
    this.updateConfirmState();
  }

  updateConfirmState() {
    this.isConfirmActive = !!this.selectedDate && !!this.selectedTime && !!this.selectedObjetivo;
  } 

  goBack() {  
    this.router.navigate(['/start']);
  }

  confirmSelection() {
    if (!this.validateDateTime()) {
      return; 
    }
    if (this.selectedDate && this.selectedTime && this.selectedObjetivo) {
            this.sessionService.createSession(this.selectedDate, this.selectedTime, this.selectedObjetivo);
      this.isModalOpen = true;
    }
  }

  validateDateTime() {
    const currentDate = new Date();
    const selectedDateTime = new Date(`${this.selectedDate}T${this.selectedTime}`);
    
    if (selectedDateTime < currentDate) {
      this.showAlert('La fecha y la hora seleccionadas deben ser mayores a la hora actual.');
      return false;
    }
    return true;
  }

  async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Advertencia',
      message: message,
      buttons: ['Aceptar'],
    });
    await alert.present();
  }

  closeModal() {
    this.isModalOpen = false;
  }

  resetFields() {
    this.selectedDate = '';
    this.selectedTime = '';
    this.selectedSession = null;
    this.selectedObjetivo = '';
    this.updateConfirmState();
    this.closeModal();
  }

  async ngOnInit() {
    this.loading = true;
    try {
      this.selectsessions = await this.sessionService.getSelectSessions();      
    } catch (error) {
      console.error('Error al cargar opciones de sesiones:', error);
    } finally {
      this.loading = false;
    }
  }
}
