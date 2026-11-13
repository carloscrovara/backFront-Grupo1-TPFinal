import { Component, OnInit, inject, signal } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
import { MenuDatos, RecetaRef } from '../../models/menu'
import { MenuService } from '../../services/menu-service'

@Component({
  imports: [ReactiveFormsModule, RouterLink],  
  selector: 'app-menu-form',
  styleUrl: './menu-form.css',
  templateUrl: './menu-form.html',
})

export class MenuForm implements OnInit {
  private fb = inject(FormBuilder)
  private servicio = inject(MenuService)
  private ruta = inject(ActivatedRoute)
  private router = inject(Router)

  protected readonly tiposComida = [
    { valor: 'desayuno', texto: 'Desayuno' },
    { valor: 'almuerzo', texto: 'Almuerzo' },
    { valor: 'merienda', texto: 'Merienda' },
    { valor: 'cena', texto: 'Cena' },
    { valor: 'postre', texto: 'Postre' },
  ]

  protected id: string | null = null
  protected readonly error = signal('')
  protected readonly guardando = signal(false)
  protected readonly cargando = signal(false)

  protected readonly recetas = signal<RecetaRef[]>([])
  protected readonly elegidas = signal<string[]>([])

  protected readonly form = this.fb.nonNullable.group({
    nombre: ['', Validators.required],
    tipoComida: ['desayuno'],
  })

  ngOnInit() {
    this.cargarOpciones()
    this.ruta.params.subscribe(params => {
      this.id = params['id'] ?? null
      if (!this.id) {
        return
      }
      this.cargando.set(true)
      this.servicio.obtener(this.id).subscribe({
        next: menu => {
          this.form.patchValue({
            nombre: menu.nombre,
            tipoComida: menu.tipoComida ?? 'desayuno',
          })
          this.elegidas.set((menu.recetas ?? []).map(r => r._id))
          this.cargando.set(false)
        },
        error: () => {
          this.error.set('No se pudo cargar el menú')
          this.cargando.set(false)
        }
      })
    })
  }



  private cargarOpciones() {
    this.servicio.opcionesRecetas().subscribe({
      next: lista => this.recetas.set(lista),
      error: () => this.error.set('No se pudieron cargar las recetas')
    })
  }

  alternar(idReceta: string) {
    this.elegidas.update(lista =>
      lista.includes(idReceta)
        ? lista.filter(x => x !== idReceta)
        : [...lista, idReceta])
  }

  guardar() {
    if (this.form.invalid || this.guardando()) {
      return
    }
    this.guardando.set(true)
    this.error.set('')

    const datos: MenuDatos = {
      ...this.form.getRawValue(),
      recetas: this.elegidas(),
    }

    const peticion = this.id
      ? this.servicio.actualizar(this.id, datos)
      : this.servicio.crear(datos)

    peticion.subscribe({
      next: () => {
        this.servicio.mensaje.set(this.id
          ? 'El menú se actualizó con éxito'
          : 'El menú se guardó con éxito')
        this.router.navigate(['/menus'])
      },
      error: () => {
        this.error.set('No se pudo guardar el menú')
        this.guardando.set(false)
      }
    })
  }
}

