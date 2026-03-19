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

  salvar(arame: any): Observable<ArameMetalicoResponseDTO> {
    return this.http.post<ArameMetalicoResponseDTO>(this.API, arame);
  }

  atualizar(id: string, arame: any): Observable<ArameMetalicoResponseDTO> {
    return this.http.put<ArameMetalicoResponseDTO>(`${this.API}/${id}`, arame);
  }

  excluir(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }

  alterarStatus(id: string): Observable<ArameMetalicoResponseDTO> {
    return this.http.patch<ArameMetalicoResponseDTO>(`${this.API}/${id}/status`, {});
  }
}
