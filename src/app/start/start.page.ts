import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class StartPage implements OnInit {
  expandedItem: number | null = null;

  constructor(private router: Router) {}

  toggleExpand(item: number) {
    this.expandedItem = this.expandedItem === item ? null : item;
  }

  navigateToSelectSesion() {
    this.router.navigate(['/selectSesion']);
  }

  NavigateTo(page: string) {

  }

  ngOnInit() {
  }

}
