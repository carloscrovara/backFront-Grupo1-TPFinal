export interface Ref {
    _id: string
    nombre: string
}

export interface AutorRef {
    _id: string
    apellido: string
    nombre: string
}

export interface Receta {
    _id?: string
    titulo: string
    descripcion?: string
    tiempoPreparacion?: number | null
    porciones?: number | null
    dificultad?: string
    ingredientes?: Ref[]
    autor?: AutorRef | null
    categoria?: Ref | null
}

export interface RecetaDatos {
    titulo: string
    descripcion?: string
    tiempoPreparacion?: number | null
    porciones?: number | null
    dificultad?: string
    ingredientes: string[]
    autor: string | null
    categoria: string | null
}