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
    path: 'playback',
    loadComponent: () => import('./playback/playback.page').then( m => m.PlaybackPage)
  },
  {
    path: 'selectSesion',
    loadComponent: () => import('./selectSesion/selectSesion.page').then( m => m.SelectSesion)
  },
  {
    path: 'diario',
    loadComponent: () => import('./diario/diario.page').then( m => m.Diario)
  },
  {
    path: 'configmod',
    loadComponent: () => import('./configmod/configmod.page').then( m => m.Configmod)
  }
];
