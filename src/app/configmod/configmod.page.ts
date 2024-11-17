import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configmod',
  templateUrl: './configmod.page.html',
  styleUrls: ['./configmod.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Configmod implements OnInit {
  notifications = [
    { name: 'Desactivar todas las notificaciones', isEnabled: false },
    { name: 'Recordatorio de sesiones', isEnabled: false },
    { name: 'Recordatorio de sesion programada', isEnabled: false },
    { name: 'Notificación de diario', isEnabled: false },
  ];

  constructor(private router: Router) {}

  goBack() {  
    this.router.navigate(['/start']);
  }
  ngOnInit() {}
}
