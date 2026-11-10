import { Component, OnInit, computed, inject, signal } from '@angular/core'
import { RouterLink } from '@angular/router'
import { Buscador } from '../buscador/buscador'
import { Receta } from '../../models/receta'
import { DificultadPipe } from '../../pipes/dificultad-pipe'
import { RecetaService } from '../../services/receta-service'

@Component({
  imports: [RouterLink, Buscador, DificultadPipe],
  selector: 'app-recetas-lista',
  styleUrl: './recetas-lista.css',
  templateUrl: './recetas-lista.html',
})
export class RecetasLista implements OnInit {
  private servicio = inject(RecetaService)

  protected readonly recetas = signal<Receta[]>([])
  protected readonly busqueda = signal('')
  protected readonly error = signal('')
  protected readonly exito = signal('')
  protected readonly aEliminar = signal<Receta | null>(null)
  protected readonly filtradas = computed(() =>
    this.recetas().filter(r =>
      r.titulo.toLowerCase().includes(this.busqueda().toLowerCase())))

  ngOnInit() {
    this.exito.set(this.servicio.mensaje())
    this.servicio.mensaje.set('')
    this.cargar()
  }

  cargar() {
    this.servicio.listar().subscribe({
      next: lista => this.recetas.set(lista),
      error: () => this.error.set('No se pudo cargar la lista de recetas')
    })
  }

  confirmarEliminar() {
    const receta = this.aEliminar()
    if (!receta) {
      return
    }
    this.aEliminar.set(null)
    this.servicio.eliminar(receta._id!).subscribe({
      next: () => {
        this.exito.set(`La receta ${receta.titulo} se eliminó con éxito`)
        this.cargar()
      },
      error: () => this.error.set('No se pudo eliminar la receta')
    })
  }
}