import { Component, OnInit, computed, inject, signal } from '@angular/core'
import { UpperCasePipe } from '@angular/common'
import { RouterLink } from '@angular/router'
import { Buscador } from '../buscador/buscador'
import { Autor } from '../../models/autor'
import { AutorService } from '../../services/autor-service'

@Component({
  imports: [RouterLink, Buscador, UpperCasePipe],  
  selector: 'app-autores-lista',
  styleUrl: './autores-lista.css',
  templateUrl: './autores-lista.html',
})

export class AutoresLista implements OnInit {
  private servicio = inject(AutorService)

  protected readonly autores = signal<Autor[]>([])
  protected readonly busqueda = signal('')
  protected readonly error = signal('')
  protected readonly exito = signal('')
  protected readonly aEliminar = signal<Autor | null>(null)
  protected readonly filtrados = computed(() =>
    this.autores().filter(a =>
      a.apellido.toLowerCase().includes(this.busqueda().toLowerCase())))

  ngOnInit() {
    this.exito.set(this.servicio.mensaje())
    this.servicio.mensaje.set('')
    this.cargar()
  }

  cargar() {
    this.servicio.listar().subscribe({
      next: lista => this.autores.set(lista),
      error: () => this.error.set('No se pudo cargar la lista de autores')
    })
  }

  confirmarEliminar() {
    const autor = this.aEliminar()
    if (!autor) {
      return
    }
    this.aEliminar.set(null)
    this.servicio.eliminar(autor._id!).subscribe({
      next: () => {
        this.exito.set(`El autor ${autor.apellido}, ${autor.nombre} se eliminó con éxito`)
        this.cargar()
      },
      error: () => this.error.set('No se pudo eliminar el autor')
    })
  }
}
