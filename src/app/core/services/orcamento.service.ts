import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { OrcamentoRequestDTO, OrcamentoResponseDTO } from '../models/orcamento.model';

@Injectable({
  providedIn: 'root'
})
export class OrcamentoService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/orcamentos`;

  criarOrcamento(request: OrcamentoRequestDTO): Observable<OrcamentoResponseDTO> {
    return this.http.post<OrcamentoResponseDTO>(this.apiUrl, request);
  }

  listarTodos(): Observable<OrcamentoResponseDTO[]> {
    return this.http.get<OrcamentoResponseDTO[]>(this.apiUrl);
  }

  buscarPorId(id: string): Observable<OrcamentoResponseDTO> {
    return this.http.get<OrcamentoResponseDTO>(`${this.apiUrl}/${id}`);
  }
}
