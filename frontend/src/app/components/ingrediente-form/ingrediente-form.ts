import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IngredienteService } from '../../services/ingrediente-service';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-ingrediente-form',
  styleUrl: './ingrediente-form.css',
  templateUrl: './ingrediente-form.html',
})
export class IngredienteForm implements OnInit {
  private fb = inject(FormBuilder);
  private servicio = inject(IngredienteService);
  private ruta = inject(ActivatedRoute);
  private router = inject(Router);

  protected id: string | null = null;
  protected readonly error = signal('');
  protected readonly guardando = signal(false);
  protected readonly cargando = signal(false);

  protected readonly form = this.fb.nonNullable.group({
    nombre: ['', Validators.required],
    unidadMedida: [''],
    calorias: [null as number | null, Validators.min(0)],
  });
  ngOnInit() {
    this.ruta.params.subscribe((params) => {
      this.id = params['id'] ?? null;
      if (!this.id) {
        return;
      }
      this.cargando.set(true);
      this.servicio.obtener(this.id).subscribe({
        next: (ingrediente) => {
          this.form.patchValue(ingrediente);
          this.cargando.set(false);
        },
        error: () => {
          this.error.set('No se pudo cargar el ingrediente');
          this.cargando.set(false);
        },
      });
    });
  }
  guardar() {
    if (this.form.invalid || this.guardando()) {
      return;
    }
    this.guardando.set(true);
    this.error.set('');

    const datos = this.form.getRawValue();
    const peticion = this.id
      ? this.servicio.actualizar(this.id, datos)
      : this.servicio.crear(datos);

    peticion.subscribe({
      next: () => {
        this.servicio.mensaje.set(
          this.id ? 'El ingrediente se actualizó con éxito' : 'El ingrediente se guardó con éxito',
        );
        this.router.navigate(['/ingredientes']);
      },
      error: () => {
        this.error.set('No se pudo guardar el ingrediente');
        this.guardando.set(false);
      },
    });
  }
}
