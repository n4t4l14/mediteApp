import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { PreferencesService } from '../services/preferences.service'; // Asegúrate de que el servicio esté importado

@Component({
  selector: 'app-configmod',
  templateUrl: './configmod.page.html',
  styleUrls: ['./configmod.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Configmod implements OnInit {
  notifications = [
    { name: 'Recordatorio de sesiones', isEnabled: false },
    { name: 'Recordatorio de sesion programada', isEnabled: false },
    { name: 'Notificación de diario', isEnabled: false },
  ];

  constructor(
    private router: Router,
    private preferencesService: PreferencesService // Inyectamos el servicio
  ) {}

  ngOnInit() {
    this.loadPreferences(); // Cargamos las preferencias al iniciar
  }

  goBack() {  
    this.router.navigate(['/start']);
  }

  toggleAllNotifications(event: any) {
    const isEnabled = event.detail.checked;
    this.notifications.forEach(notification => {
      notification.isEnabled = isEnabled;
    });
  }

  // Método para guardar las preferencias en Firestore
  async savePreferences() {
    const preferences = this.notifications.map(notification => ({
      name: notification.name,
      isEnabled: notification.isEnabled,
    }));

    try {
      await this.preferencesService.savePreferences(preferences);
      console.log('Preferencias guardadas en Firestore:', preferences);
    } catch (error) {
      console.error('Error al guardar las preferencias:', error);
    }
  }

  // Cargar las preferencias desde Firestore
  async loadPreferences() {
    const preferences = await this.preferencesService.getPreferences();
    if (preferences && Array.isArray(preferences.preferences)) {
      this.notifications = preferences.preferences.map((preference: any) => ({
        name: preference.name,
        isEnabled: preference.isEnabled,
      }));
    } else {
      // Si no hay preferencias, configura un valor predeterminado
      this.notifications = [
        { name: 'Recordatorio de sesiones', isEnabled: false },
        { name: 'Recordatorio de sesion programada', isEnabled: false },
        { name: 'Notificación de diario', isEnabled: false },
      ];
    }
  }
  
}
