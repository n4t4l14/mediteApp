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

  //Lista de sessiones

  sessions = [
    {
      title: 'Relajación Profunda',
      objective: 'Reducir el estrés y liberar tensiones acumuladas en el cuerpo.',
      image: 'assets/images/img-Relajacion.jpg',
      selected: false,
    },
    {
      title: 'Cultivar la Gratitud',
      objective: 'Desarrollar una mentalidad positiva y reconocer las cosas buenas en tu vida.',
      image: 'assets/images/img-gratitud.jpg',
      selected: false,
    },
    {
      title: 'Atención Plena (Mindfulness)',
      objective: 'Vivir el momento presente con plena conciencia y sin juicio.',
      image: 'assets/images/img-mindfulness.jpg',
      selected: false,
    },
    {
      title: 'Autoaceptación',
      objective: 'Promover una relación más amable contigo mismo y fortalecer la autoestima.',
      image: 'assets/images/img-autoaceptacion.jpg',
      selected: false,
    },
  ];

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

  ngOnInit() {}
}
