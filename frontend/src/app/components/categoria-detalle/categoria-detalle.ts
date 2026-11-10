import { Component, OnInit, inject, signal } from '@angular/core'
import { TitleCasePipe } from '@angular/common'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
import { Categoria } from '../../models/categoria'
import { CategoriaService } from '../../services/categoria-service'

@Component({
  imports: [RouterLink, TitleCasePipe],
  selector: 'app-categoria-detalle',
  styleUrl: './categoria-detalle.css',
  templateUrl: './categoria-detalle.html',
})
export class CategoriaDetalle implements OnInit {
  private servicio = inject(CategoriaService)
  private ruta = inject(ActivatedRoute)
  private router = inject(Router)

  protected readonly categoria = signal<Categoria | null>(null)
  protected readonly error = signal('')
  protected readonly confirmando = signal(false)

  ngOnInit() {
    this.ruta.params.subscribe(params => {
      const id = params['id']
      this.servicio.obtener(id).subscribe({
        next: categoria => this.categoria.set(categoria),
        error: () => this.error.set('No se pudo cargar la categoría')
      })
    })
  }

  eliminar(categoria: Categoria) {
    this.confirmando.set(false)
    this.servicio.eliminar(categoria._id!).subscribe({
      next: () => {
        this.servicio.mensaje.set(`La categoría ${categoria.nombre} se eliminó con éxito`)
        this.router.navigate(['/categorias'])
      },
      error: () => this.error.set('No se pudo eliminar la categoría')
    })
  }
}