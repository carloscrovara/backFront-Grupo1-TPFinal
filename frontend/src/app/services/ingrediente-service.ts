import { Service, inject, signal } from '@angular/core';
import { ApiService } from './api-service';
import { Ingrediente } from '../models/ingrediente';

@Service()
export class IngredienteService {
  private api = inject(ApiService);

  readonly mensaje = signal('');

  listar() {
    return this.api.get<Ingrediente[]>('/ingredientes');
  }
  obtener(id: string) {
    return this.api.get<Ingrediente>(`/ingredientes/${id}`);
  }
  crear(ingrediente: Ingrediente) {
    return this.api.post<Ingrediente>('/ingredientes', ingrediente);
  }
  actualizar(id: string, ingrediente: Ingrediente) {
    return this.api.patch<Ingrediente>(`/ingredientes/${id}`, ingrediente);
  }
  eliminar(id: string) {
    return this.api.delete<Ingrediente>(`/ingredientes/${id}`);
  }
}