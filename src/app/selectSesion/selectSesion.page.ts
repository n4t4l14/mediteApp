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

  constructor(private router: Router, private modalController: ModalController) {}

  /*toggleExpand(item: number) {
    this.expandedItem = this.expandedItem === item ? null : item;
  }*/

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
    this.isModalOpen = false;
  }

  ngOnInit() {}
}
