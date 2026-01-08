import { Routes } from '@angular/router';
import { Layout } from './shared/components/layout/layout';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        loadComponent: () => import('./features/home/home').then((m) => m.Home),
        title: 'PasteBinX - Create Paste',
      },
    ],
  },
  {
    path: 'auth/register',
    loadComponent: () => import('./features/auth/register/register').then((m) => m.Register),
    canActivate: [guestGuard],
    title: 'Register - PasteBinX',
  },
  {
    path: 'auth/login',
    canActivate: [guestGuard],
    loadComponent: () => import('./features/auth/login/login').then((m) => m.Login),
    title: 'Login - PasteBinX',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
