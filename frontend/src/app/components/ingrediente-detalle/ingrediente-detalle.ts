import { Component, OnInit, inject, signal } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Ingrediente } from '../../models/ingrediente';
import { IngredienteService } from '../../services/ingrediente-service';

@Component({
  imports: [RouterLink, TitleCasePipe],
  selector: 'app-ingrediente-detalle',
  styleUrl: './ingrediente-detalle.css',
  templateUrl: './ingrediente-detalle.html',
})
export class IngredienteDetalle implements OnInit {
  private servicio = inject(IngredienteService);
  private ruta = inject(ActivatedRoute);
  private router = inject(Router);

  protected readonly ingrediente = signal<Ingrediente | null>(null);
  protected readonly error = signal('');
  protected readonly confirmando = signal(false);

  ngOnInit() {
    this.ruta.params.subscribe((params) => {
      const id = params['id'];
      this.servicio.obtener(id).subscribe({
        next: (ingrediente) => this.ingrediente.set(ingrediente),
        error: () => this.error.set('No se pudo cargar el ingrediente'),
      });
    });
  }

  eliminar(ingrediente: Ingrediente) {
    this.confirmando.set(false);
    this.servicio.eliminar(ingrediente._id!).subscribe({
      next: () => {
        this.servicio.mensaje.set(`El ingrediente ${ingrediente.nombre} se eliminó con éxito`);
        this.router.navigate(['/ingredientes']);
      },
      error: () => this.error.set('No se pudo eliminar el ingrediente'),
    });
  }
}
