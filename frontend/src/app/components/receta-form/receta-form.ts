import { Component, OnInit, inject, signal } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
import { AutorRef, RecetaDatos, Ref } from '../../models/receta'
import { RecetaService } from '../../services/receta-service'

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-receta-form',
  styleUrl: './receta-form.css',
  templateUrl: './receta-form.html',
})
export class RecetaForm implements OnInit {
  private fb = inject(FormBuilder)
  private servicio = inject(RecetaService)
  private ruta = inject(ActivatedRoute)
  private router = inject(Router)

  protected readonly dificultades = [
    { valor: 'facil', texto: 'Fácil' },
    { valor: 'media', texto: 'Media' },
    { valor: 'dificil', texto: 'Difícil' },
  ]

  protected id: string | null = null
  protected readonly error = signal('')
  protected readonly guardando = signal(false)
  protected readonly cargando = signal(false)

  protected readonly ingredientes = signal<Ref[]>([])
  protected readonly autores = signal<AutorRef[]>([])
  protected readonly categorias = signal<Ref[]>([])
  protected readonly elegidos = signal<string[]>([])

  protected readonly form = this.fb.nonNullable.group({
    titulo: ['', Validators.required],
    descripcion: [''],
    tiempoPreparacion: [null as number | null, Validators.min(0)],
    porciones: [null as number | null, Validators.min(1)],
    dificultad: ['facil'],
    autor: [''],
    categoria: [''],
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
        next: receta => {
          this.form.patchValue({
            titulo: receta.titulo,
            descripcion: receta.descripcion ?? '',
            tiempoPreparacion: receta.tiempoPreparacion ?? null,
            porciones: receta.porciones ?? null,
            dificultad: receta.dificultad ?? 'facil',
            autor: receta.autor?._id ?? '',
            categoria: receta.categoria?._id ?? '',
          })
          this.elegidos.set((receta.ingredientes ?? []).map(i => i._id))
          this.cargando.set(false)
        },
        error: () => {
          this.error.set('No se pudo cargar la receta')
          this.cargando.set(false)
        }
      })
    })
  }

  private cargarOpciones() {
    this.servicio.opcionesIngredientes().subscribe({
      next: lista => this.ingredientes.set(lista),
      error: () => this.error.set('No se pudieron cargar los ingredientes')
    })
    this.servicio.opcionesAutores().subscribe({
      next: lista => this.autores.set(lista),
      error: () => this.error.set('No se pudieron cargar los autores')
    })
    this.servicio.opcionesCategorias().subscribe({
      next: lista => this.categorias.set(lista),
      error: () => this.error.set('No se pudieron cargar las categorías')
    })
  }

  alternar(idIngrediente: string) {
    this.elegidos.update(lista =>
      lista.includes(idIngrediente)
        ? lista.filter(x => x !== idIngrediente)
        : [...lista, idIngrediente])
  }

  guardar() {
    if (this.form.invalid || this.guardando()) {
      return
    }
    this.guardando.set(true)
    this.error.set('')

    const valores = this.form.getRawValue()
    const datos: RecetaDatos = {
      ...valores,
      autor: valores.autor || null,
      categoria: valores.categoria || null,
      ingredientes: this.elegidos(),
    }

    const peticion = this.id
      ? this.servicio.actualizar(this.id, datos)
      : this.servicio.crear(datos)

    peticion.subscribe({
      next: () => {
        this.servicio.mensaje.set(this.id
          ? 'La receta se actualizó con éxito'
          : 'La receta se guardó con éxito')
        this.router.navigate(['/recetas'])
      },
      error: () => {
        this.error.set('No se pudo guardar la receta')
        this.guardando.set(false)
      }
    })
  }
}