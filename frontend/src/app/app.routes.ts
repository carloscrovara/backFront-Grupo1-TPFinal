import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'recetas', pathMatch: 'full' },
    {
        path: 'health',
        loadComponent: () => import('./components/health/health')
            .then(m => m.Health)
    },
    { path: '**', redirectTo: 'recetas' }
];
