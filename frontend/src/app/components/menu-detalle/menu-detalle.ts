import { Component, OnInit, inject, signal } from '@angular/core'
import { TitleCasePipe } from '@angular/common'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
import { Menu } from '../../models/menu'
import { MenuService } from '../../services/menu-service'

@Component({
  imports: [RouterLink, TitleCasePipe],  
  selector: 'app-menu-detalle',
  styleUrl: './menu-detalle.css',
  templateUrl: './menu-detalle.html',
})
export class MenuDetalle implements OnInit {
  private servicio = inject(MenuService)
  private ruta = inject(ActivatedRoute)
  private router = inject(Router)

  protected readonly menu = signal<Menu | null>(null)
  protected readonly error = signal('')
  protected readonly confirmando = signal(false)

  ngOnInit() {
    this.ruta.params.subscribe(params => {
      const id = params['id']
      this.servicio.obtener(id).subscribe({
        next: menu => this.menu.set(menu),
        error: () => this.error.set('No se pudo cargar el menú')
      })
    })
  }

  eliminar(menu: Menu) {
    this.confirmando.set(false)
    this.servicio.eliminar(menu._id!).subscribe({
      next: () => {
        this.servicio.mensaje.set(`El menú ${menu.nombre} se eliminó con éxito`)
        this.router.navigate(['/menus'])
      },
      error: () => this.error.set('No se pudo eliminar el menú')
    })
  }
}

