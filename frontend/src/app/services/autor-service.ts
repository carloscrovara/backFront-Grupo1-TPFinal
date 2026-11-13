import { Service, inject, signal } from '@angular/core'
import { ApiService } from './api-service'
import { Autor } from '../models/autor'

@Service()
export class AutorService {
  private api = inject(ApiService)

  readonly mensaje = signal('')

  listar() {
    return this.api.get<Autor[]>('/autores')
  }
  obtener(id: string) {
    return this.api.get<Autor>(`/autores/${id}`)
  }
  crear(autor: Autor) {
    return this.api.post<Autor>('/autores', autor)
  }
  actualizar(id: string, autor: Autor) {
    return this.api.patch<Autor>(`/autores/${id}`, autor)
  }
  eliminar(id: string) {
    return this.api.delete<Autor>(`/autores/${id}`)
  }
}

