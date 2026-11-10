import { Component, OnInit, computed, inject, signal } from '@angular/core'
import { TitleCasePipe } from '@angular/common'
import { RouterLink } from '@angular/router'
import { Buscador } from '../buscador/buscador'
import { Categoria } from '../../models/categoria'
import { CategoriaService } from '../../services/categoria-service'

@Component({
  imports: [RouterLink, Buscador, TitleCasePipe],
  selector: 'app-categorias-lista',
  styleUrl: './categorias-lista.css',
  templateUrl: './categorias-lista.html',
})
export class CategoriasLista implements OnInit {
  private servicio = inject(CategoriaService)

  protected readonly categorias = signal<Categoria[]>([])
  protected readonly busqueda = signal('')
  protected readonly error = signal('')
  protected readonly exito = signal('')
  protected readonly aEliminar = signal<Categoria | null>(null)

  protected readonly filtradas = computed(() =>
    this.categorias().filter(c =>
      c.nombre.toLowerCase().includes(this.busqueda().toLowerCase())))

  ngOnInit() {
    this.exito.set(this.servicio.mensaje())
    this.servicio.mensaje.set('')
    this.cargar()
  }

  cargar() {
    this.servicio.listar().subscribe({
      next: lista => this.categorias.set(lista),
      error: () => this.error.set('No se pudo cargar la lista de categorías')
    })
  }

  confirmarEliminar() {
    const categoria = this.aEliminar()
    if (!categoria) {
      return
    }
    this.aEliminar.set(null)
    this.servicio.eliminar(categoria._id!).subscribe({
      next: () => {
        this.exito.set(`La categoría ${categoria.nombre} se eliminó con éxito`)
        this.cargar()
      },
      error: () => this.error.set('No se pudo eliminar la categoría')
    })
  }
}