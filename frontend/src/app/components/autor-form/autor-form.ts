import { Component, OnInit, inject, signal } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
import { AutorService } from '../../services/autor-service'

@Component({
  imports: [ReactiveFormsModule, RouterLink],  
  selector: 'app-autor-form',
  styleUrl: './autor-form.css',
  templateUrl: './autor-form.html',
})
export class AutorForm implements OnInit {
  private fb = inject(FormBuilder)
  private servicio = inject(AutorService)
  private ruta = inject(ActivatedRoute)
  private router = inject(Router)

  protected readonly paises = [
    { valor: 'Argentina', texto: 'Argentina' },
    { valor: 'Brasil', texto: 'Brasil' },
    { valor: 'Chile', texto: 'Chile' },
    { valor: 'Uruguay', texto: 'Uruguay' },
    { valor: 'Paraguay', texto: 'Paraguay' },
    { valor: 'Bolivia', texto: 'Bolivia' },
    { valor: 'Peru', texto: 'Perú' },
    { valor: 'Mexico', texto: 'México' },
    { valor: 'Espana', texto: 'España' },
    { valor: 'Italia', texto: 'Italia' },
    { valor: 'Francia', texto: 'Francia' },
    { valor: 'Otro', texto: 'Otro' },
  ]

  protected id: string | null = null
  protected readonly error = signal('')
  protected readonly guardando = signal(false)
  protected readonly cargando = signal(false)

  protected readonly form = this.fb.nonNullable.group({
    apellido: ['', Validators.required],
    nombre: ['', Validators.required],
    pais: ['Otro'],
  })

  ngOnInit() {
    this.ruta.params.subscribe(params => {
      this.id = params['id'] ?? null
      if (!this.id) {
        return
      }
      this.cargando.set(true)
      this.servicio.obtener(this.id).subscribe({
        next: autor => {
          this.form.patchValue(autor)
          this.cargando.set(false)
        },
        error: () => {
          this.error.set('No se pudo cargar el autor')

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
          ? 'El autor se actualizó con éxito'
          : 'El autor se guardó con éxito')
        this.router.navigate(['/autores'])
      },
      error: () => {
        this.error.set('No se pudo guardar el autor')
        this.guardando.set(false)
      }
    })
  }
}