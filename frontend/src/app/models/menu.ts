export interface RecetaRef {
  _id: string
  titulo: string
}

export interface Menu {
  _id?: string
  nombre: string
  tipoComida?: string
  recetas?: RecetaRef[]
}

export interface MenuDatos {
  nombre: string
  tipoComida?: string
  recetas: string[]
}
