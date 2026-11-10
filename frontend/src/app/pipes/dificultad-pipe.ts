import { Pipe, PipeTransform } from '@angular/core'

const TEXTOS: Record<string, string> = {
  facil: 'Fácil',
  media: 'Media',
  dificil: 'Difícil',
}

@Pipe({
  name: 'dificultad',
})
export class DificultadPipe implements PipeTransform {
  transform(valor: string | undefined): string {
    return valor ? (TEXTOS[valor] ?? valor) : ''
  }
}