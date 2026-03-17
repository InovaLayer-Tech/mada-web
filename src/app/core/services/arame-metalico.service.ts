import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArameMetalicoResponseDTO } from '../models/arame-metalico.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArameMetalicoService {
  private http = inject(HttpClient);
  private readonly API = `${environment.apiUrl}/arames`;

  listarTodos(): Observable<ArameMetalicoResponseDTO[]> {
    return this.http.get<ArameMetalicoResponseDTO[]>(this.API);
  }
}
