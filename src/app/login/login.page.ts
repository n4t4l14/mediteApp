import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true, 
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  async login() {
    try {
      await this.authService.login(this.email, this.password);
      alert('Inicio de sesión exitoso');
      this.router.navigate(['/start']); // Cambia la ruta según tu app
    } catch (error) {
      alert('Error en el inicio de sesión: ' + error);
    }
  }
  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
