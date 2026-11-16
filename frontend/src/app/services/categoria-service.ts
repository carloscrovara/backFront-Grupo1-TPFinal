import { Service, inject, signal } from '@angular/core'
import { ApiService } from './api-service'
import { Categoria } from '../models/categoria'

@Service()
export class CategoriaService {
  private api = inject(ApiService)

  readonly mensaje = signal('')

  listar() {
    return this.api.get<Categoria[]>('/categorias')
  }

  obtener(id: string) {
    return this.api.get<Categoria>(`/categorias/${id}`)
  }

  crear(categoria: Categoria) {
    return this.api.post<Categoria>('/categorias', categoria)
  }

  actualizar(id: string, categoria: Categoria) {
    return this.api.patch<Categoria>(`/categorias/${id}`, categoria)
  }

  eliminar(id: string) {
    return this.api.delete<Categoria>(`/categorias/${id}`)
  }
}