import { Routes } from '@angular/router';
import { Health } from './components/health/health';

export const routes: Routes = [
    { path: 'health', component: Health },
    { path: '', redirectTo: 'recetas', pathMatch: 'full' }
];
