import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/landing/pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'universidades',
    loadComponent: () =>
      import('./features/landing/pages/universities/universities.component').then(m => m.UniversitiesComponent)
  },
  {
    path: 'chat',
    loadComponent: () =>
      import('./features/chat/pages/chat/chat.component').then(m => m.ChatComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  { path: '**', redirectTo: '' }
];
