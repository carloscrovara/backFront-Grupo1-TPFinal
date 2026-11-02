import { Component, input, output, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-buscador',
  styleUrl: './buscador.css',
  templateUrl: './buscador.html',
})
export class Buscador {
  readonly placeholder = input('Buscar...');
  readonly texto = output<string>();
  protected readonly busqueda = signal('');

  actualizar(valor: string): void {
    this.busqueda.set(valor);
    this.texto.emit(valor);
  }
}