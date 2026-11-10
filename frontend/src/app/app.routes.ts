import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'recetas',
        loadComponent: () => import('./components/recetas-lista/recetas-lista')
            .then(m => m.RecetasLista)
    },
    {
        path: 'recetas/nueva',
        loadComponent: () => import('./components/receta-form/receta-form')
            .then(m => m.RecetaForm)
    },
    {
        path: 'recetas/:id',
        loadComponent: () => import('./components/receta-detalle/receta-detalle')
            .then(m => m.RecetaDetalle)
    },
    {
        path: 'recetas/:id/editar',
        loadComponent: () => import('./components/receta-form/receta-form')
            .then(m => m.RecetaForm)
    },
    { path: '', redirectTo: 'recetas', pathMatch: 'full' },
    { path: '**', redirectTo: 'recetas' }
];
