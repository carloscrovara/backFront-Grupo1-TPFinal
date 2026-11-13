import { Component, OnInit, computed, inject, signal } from '@angular/core'
import { TitleCasePipe } from '@angular/common'
import { RouterLink } from '@angular/router'
import { Buscador } from '../buscador/buscador'
import { Menu } from '../../models/menu'
import { MenuService } from '../../services/menu-service'

@Component({
  imports: [RouterLink, Buscador, TitleCasePipe],
  selector: 'app-menus-lista',
  styleUrl: './menus-lista.css',
  templateUrl: './menus-lista.html',
})
export class MenusLista implements OnInit {
  private servicio = inject(MenuService)

  protected readonly menus = signal<Menu[]>([])
  protected readonly busqueda = signal('')
  protected readonly error = signal('')
  protected readonly exito = signal('')
  protected readonly aEliminar = signal<Menu | null>(null)
  protected readonly filtrados = computed(() =>
    this.menus().filter(m =>
      m.nombre.toLowerCase().includes(this.busqueda().toLowerCase())))

  ngOnInit() {
    this.exito.set(this.servicio.mensaje())
    this.servicio.mensaje.set('')
    this.cargar()
  }

  cargar() {
    this.servicio.listar().subscribe({
      next: lista => this.menus.set(lista),
      error: () => this.error.set('No se pudo cargar la lista de menús')
    })
  }

  confirmarEliminar() {
    const menu = this.aEliminar()
    if (!menu) {
      return
    }
    this.aEliminar.set(null)
    this.servicio.eliminar(menu._id!).subscribe({
      next: () => {
        this.exito.set(`El menú ${menu.nombre} se eliminó con éxito`)
        this.cargar()
      },
      error: () => this.error.set('No se pudo eliminar el menú')
    })
  }
}

