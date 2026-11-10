import { Component, OnInit, inject, signal } from '@angular/core'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
import { Receta } from '../../models/receta'
import { DificultadPipe } from '../../pipes/dificultad-pipe'
import { RecetaService } from '../../services/receta-service'

@Component({
  imports: [RouterLink, DificultadPipe],
  selector: 'app-receta-detalle',
  styleUrl: './receta-detalle.css',
  templateUrl: './receta-detalle.html',
})
export class RecetaDetalle implements OnInit {
  private servicio = inject(RecetaService)
  private ruta = inject(ActivatedRoute)
  private router = inject(Router)

  protected readonly receta = signal<Receta | null>(null)
  protected readonly error = signal('')
  protected readonly confirmando = signal(false)

  ngOnInit() {
    this.ruta.params.subscribe(params => {
      const id = params['id']
      this.servicio.obtener(id).subscribe({
        next: receta => this.receta.set(receta),
        error: () => this.error.set('No se pudo cargar la receta')
      })
    })
  }

  eliminar(receta: Receta) {
    this.confirmando.set(false)
    this.servicio.eliminar(receta._id!).subscribe({
      next: () => {
        this.servicio.mensaje.set(`La receta ${receta.titulo} se eliminó con éxito`)
        this.router.navigate(['/recetas'])
      },
      error: () => this.error.set('No se pudo eliminar la receta')
    })
  }
}
