import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { OrcamentoRequestDTO, OrcamentoResponseDTO, OrcamentoCalculoRequestDTO } from '../models/orcamento.model';

@Injectable({
  providedIn: 'root'
})
export class OrcamentoService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/orcamentos`;

  listarTodos(): Observable<OrcamentoResponseDTO[]> {
    return this.http.get<OrcamentoResponseDTO[]>(this.apiUrl);
  }

  criar(orcamento: OrcamentoRequestDTO): Observable<OrcamentoResponseDTO> {
    return this.http.post<OrcamentoResponseDTO>(this.apiUrl, orcamento);
  }

  buscarPorId(id: string): Observable<OrcamentoResponseDTO> {
    return this.http.get<OrcamentoResponseDTO>(`${this.apiUrl}/${id}`);
  }

  processarCalculo(id: string, dadosCalculo: OrcamentoCalculoRequestDTO): Observable<OrcamentoResponseDTO> {
    return this.http.put<OrcamentoResponseDTO>(`${this.apiUrl}/${id}/calcular`, dadosCalculo);
  }

  aprovar(id: string): Observable<OrcamentoResponseDTO> {
    return this.http.patch<OrcamentoResponseDTO>(`${this.apiUrl}/${id}/aprovar`, {});
  }

  devolverParaCliente(id: string, motivo: string): Observable<OrcamentoResponseDTO> {
    return this.http.patch<OrcamentoResponseDTO>(`${this.apiUrl}/${id}/devolver`, { motivo });
  }

  excluir(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
