import { Component, OnInit, inject, signal } from '@angular/core'
import { UpperCasePipe } from '@angular/common'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
import { Autor } from '../../models/autor'
import { AutorService } from '../../services/autor-service'

@Component({
  imports: [RouterLink, UpperCasePipe],
  selector: 'app-autor-detalle',
  styleUrl: './autor-detalle.css',
  templateUrl: './autor-detalle.html',
})
export class AutorDetalle implements OnInit {
  private servicio = inject(AutorService)
  private ruta = inject(ActivatedRoute)
  private router = inject(Router)

  protected readonly autor = signal<Autor | null>(null)
  protected readonly error = signal('')
  protected readonly confirmando = signal(false)

  ngOnInit() {
    this.ruta.params.subscribe(params => {
      const id = params['id']
      this.servicio.obtener(id).subscribe({
        next: autor => this.autor.set(autor),
        error: () => this.error.set('No se pudo cargar el autor')
      })
    })
  }

  eliminar(autor: Autor) {
    this.confirmando.set(false)
    this.servicio.eliminar(autor._id!).subscribe({
      next: () => {
        this.servicio.mensaje.set(`El autor ${autor.apellido}, ${autor.nombre} se eliminó con éxito`)
        this.router.navigate(['/autores'])
      },
      error: () => this.error.set('No se pudo eliminar el autor')
    })
  }
}
