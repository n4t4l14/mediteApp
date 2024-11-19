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
  isLoading: boolean = false;
  errorMessage: string = "";

  constructor(private router: Router, private modalController: ModalController, private sessionService: SessionService) {}

  goBack() {  
    this.router.navigate(['/start']);
  }

  async confirmSelection() {
    if (this.selectedDate && this.selectedTime) {
      this.isLoading = true; 

      try {
        if (this.selectedDate && this.selectedTime) {
          const selectedDateTime = new Date(`${this.selectedDate}T${this.selectedTime}`);
          const now = new Date();
        
        if (selectedDateTime < now) {
          this.errorMessage = 'La fecha y hora seleccionadas no pueden ser menores a la actual.';
          this.isModalOpen = false; 
          return;
        } else {
          this.errorMessage = '';
        }
      }
        await this.sessionService.createSession(this.selectedDate, this.selectedTime);
        this.isModalOpen = true;
      } catch (error) {
        console.error('Error al guardar la sesión:', error);
        alert('Hubo un error al guardar la sesión. Inténtalo de nuevo.');
      } finally {
        this.isLoading = false;
      }
    }
  }

  closeModal() {
    this.isModalOpen = false;
  }

  resetFields() {
    this.selectedDate = '';
    this.selectedTime = '';
    this.isModalOpen = false;
  }

  ngOnInit() {}
}
