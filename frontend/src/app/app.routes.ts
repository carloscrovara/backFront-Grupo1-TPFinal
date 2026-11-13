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

    {
        path: 'categorias',
        loadComponent: () => import('./components/categorias-lista/categorias-lista')
          .then(m => m.CategoriasLista)
    },
    {
        path: 'categorias/nueva',
        loadComponent: () => import('./components/categoria-form/categoria-form')
          .then(m => m.CategoriaForm)
    },
    {
        path: 'categorias/:id',
        loadComponent: () => import('./components/categoria-detalle/categoria-detalle')
          .then(m => m.CategoriaDetalle)
    },
    {
        path: 'categorias/:id/editar',
        loadComponent: () => import('./components/categoria-form/categoria-form')
          .then(m => m.CategoriaForm)
    },
    {
        path: 'ingredientes',
        loadComponent: () => import('./components/ingredientes-lista/ingredientes-lista')
        .then(m => m.IngredientesLista)
    },
    {
        path: 'ingredientes/nuevo',
        loadComponent: () => import('./components/ingrediente-form/ingrediente-form')
        .then(m => m.IngredienteForm)
    },
    {
        path: 'ingredientes/:id',
        loadComponent: () => import('./components/ingrediente-detalle/ingrediente-detalle')
        .then(m => m.IngredienteDetalle)
    },
    {
        path: 'ingredientes/:id/editar',
        loadComponent: () => import('./components/ingrediente-form/ingrediente-form')
        .then(m => m.IngredienteForm)
    },
     {
    path: 'menus',
    loadComponent: () => import('./components/menus-lista/menus-lista')
      .then(m => m.MenusLista)
    },
    {
        path: 'menus/nuevo',
        loadComponent: () => import('./components/menu-form/menu-form')
        .then(m => m.MenuForm)
    },
    {
        path: 'menus/:id',
        loadComponent: () => import('./components/menu-detalle/menu-detalle')
        .then(m => m.MenuDetalle)
    },
    {
        path: 'menus/:id/editar',
        loadComponent: () => import('./components/menu-form/menu-form')
            .then(m => m.MenuForm)
    },
    {
        path: 'autores',
        loadComponent: () => import('./components/autores-lista/autores-lista')
            .then(m => m.AutoresLista)
    },
    {
        path: 'autores/nuevo',
        loadComponent: () => import('./components/autor-form/autor-form')
            .then(m => m.AutorForm)
    },
    {
        path: 'autores/:id',
        loadComponent: () => import('./components/autor-detalle/autor-detalle')
            .then(m => m.AutorDetalle)
    },
    {
        path: 'autores/:id/editar',
        loadComponent: () => import('./components/autor-form/autor-form')
            .then(m => m.AutorForm)
    },

    { path: '', redirectTo: 'recetas', pathMatch: 'full' },
    { path: '**', redirectTo: 'recetas' }
];
