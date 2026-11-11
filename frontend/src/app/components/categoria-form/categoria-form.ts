import { Component, OnInit, inject, signal } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
import { CategoriaService } from '../../services/categoria-service'

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-categoria-form',
  styleUrl: './categoria-form.css',
  templateUrl: './categoria-form.html',
})
export class CategoriaForm implements OnInit {
  private fb = inject(FormBuilder)
  private servicio = inject(CategoriaService)
  private ruta = inject(ActivatedRoute)
  private router = inject(Router)

  protected id: string | null = null
  protected readonly error = signal('')
  protected readonly guardando = signal(false)
  protected readonly cargando = signal(false)

  protected readonly form = this.fb.nonNullable.group({
    nombre: ['', Validators.required],
    descripcion: [''],
  })

  ngOnInit() {
    this.ruta.params.subscribe(params => {
      this.id = params['id'] ?? null
      if (!this.id) {
        return
      }
      this.cargando.set(true)
      this.servicio.obtener(this.id).subscribe({
        next: categoria => {
          this.form.patchValue(categoria)
          this.cargando.set(false)
        },
        error: () => {
          this.error.set('No se pudo cargar la categoría')
          this.cargando.set(false)
        }
      })
    })
  }

  guardar() {
    if (this.form.invalid || this.guardando()) {
      return
    }
    this.guardando.set(true)
    this.error.set('')
    const datos = this.form.getRawValue()
    const peticion = this.id
      ? this.servicio.actualizar(this.id, datos)
      : this.servicio.crear(datos)
    peticion.subscribe({
      next: () => {
        this.servicio.mensaje.set(this.id
          ? 'La categoría se actualizó con éxito'
          : 'La categoría se guardó con éxito')
        this.router.navigate(['/categorias'])
      },
      error: () => {
        this.error.set('No se pudo guardar la categoría')
        this.guardando.set(false)
      }
    })
  }
}
