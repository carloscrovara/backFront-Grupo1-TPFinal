import { Component, OnInit, inject, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-health',
  template: `
    <div class="alert alert-info">
      Backend: {{ respuesta() | json }}
    </div>`,
  imports: [JsonPipe]
})
export class Health implements OnInit {
  private api = inject(ApiService);
  respuesta = signal<unknown>('cargando...');

  ngOnInit() {
    this.api.get('/health').subscribe({
      next: r => this.respuesta.set(r),
      error: e => this.respuesta.set('error: ' + e.message)
    });
  }
}