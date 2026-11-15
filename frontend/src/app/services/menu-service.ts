import { Service, inject, signal } from '@angular/core'
import { ApiService } from './api-service'
import { RecetaRef, Menu, MenuDatos } from '../models/menu'

@Service()
export class MenuService {
  private api = inject(ApiService)

  readonly mensaje = signal('')

  listar() {
    return this.api.get<Menu[]>('/menus')
  }
  obtener(id: string) {
    return this.api.get<Menu>(`/menus/${id}`)
  }
  crear(datos: MenuDatos) {
    return this.api.post<Menu>('/menus', datos)
  }
  actualizar(id: string, datos: MenuDatos) {
    return this.api.patch<Menu>(`/menus/${id}`, datos)
  }
  eliminar(id: string) {
    return this.api.delete<Menu>(`/menus/${id}`)
  }

  opcionesRecetas() {
    return this.api.get<RecetaRef[]>('/recetas')
  }
}