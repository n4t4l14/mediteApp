import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: ()=> import('./welcome/welcome.page').then(m => m.WelcomePage)
  },
  {
    path: 'start',
    loadComponent: () => import('./start/start.page').then( m => m.StartPage)
  },
  {
    path: 'selectSesion',
    loadComponent: () => import('./selectSesion/selectSesion.page').then( m => m.SelectSesion)
  },
  {
    path: 'configmod',
    loadComponent: () => import('./configmod/configmod.page').then( m => m.Configmod)
  }
];
