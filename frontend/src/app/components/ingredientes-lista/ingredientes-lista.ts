import { Component, OnInit, computed, inject, signal } from '@angular/core'
import { TitleCasePipe } from '@angular/common'
import { RouterLink } from '@angular/router'
import { Buscador } from '../buscador/buscador'
import { Ingrediente } from '../../models/ingrediente'
import { IngredienteService } from '../../services/ingrediente-service'

@Component({
  imports: [RouterLink, Buscador, TitleCasePipe],  
  selector: 'app-ingredientes-lista',
  styleUrl: './ingredientes-lista.css',
  templateUrl: './ingredientes-lista.html',
})
export class IngredientesLista implements OnInit {
  private servicio = inject(IngredienteService)

  protected readonly ingredientes = signal<Ingrediente[]>([])
  protected readonly busqueda = signal('')
  protected readonly error = signal('')
  protected readonly exito = signal('')
  protected readonly aEliminar = signal<Ingrediente | null>(null)
  protected readonly filtrados = computed(() =>
    this.ingredientes().filter(i =>
      i.nombre.toLowerCase().includes(this.busqueda().toLowerCase())))
  ngOnInit() {
    this.exito.set(this.servicio.mensaje())
    this.servicio.mensaje.set('')
    this.cargar()
  }

  cargar() {
    this.servicio.listar().subscribe({
      next: lista => this.ingredientes.set(lista),
      error: () => this.error.set('No se pudo cargar la lista de ingredientes')
    })
  }

  confirmarEliminar() {
    const ingrediente = this.aEliminar()
    if (!ingrediente) {
      return
    }
    this.aEliminar.set(null)
    this.servicio.eliminar(ingrediente._id!).subscribe({
      next: () => {
        this.exito.set(`El ingrediente ${ingrediente.nombre} se eliminó con éxito`)
        this.cargar()
      },
      error: () => this.error.set('No se pudo eliminar el ingrediente')
    })
  }
}