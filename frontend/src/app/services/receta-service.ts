import { Service, inject, signal } from '@angular/core';
import { ApiService } from './api-service'
import { Ref, AutorRef, Receta, RecetaDatos } from '../models/receta'

@Service()
export class RecetaService {
    private api = inject(ApiService)

    readonly mensaje = signal('')

    listar() {
        return this.api.get<Receta[]>('/recetas')
    }
    obtener(id: string) {
        return this.api.get<Receta>(`/recetas/${id}`)
    }
    crear(datos: RecetaDatos) {
        return this.api.post<Receta>('/recetas', datos)
    }
    actualizar(id: string, datos: RecetaDatos) {
        return this.api.patch<Receta>(`/recetas/${id}`, datos)
    }
    eliminar(id: string) {
        return this.api.delete<Receta>(`/recetas/${id}`)
    }

    opcionesIngredientes() {
        return this.api.get<Ref[]>('/ingredientes')
    }
    opcionesAutores() {
        return this.api.get<AutorRef[]>('/autores')
    }
    opcionesCategorias() {
        return this.api.get<Ref[]>('/categorias')
    }
}