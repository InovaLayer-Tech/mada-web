import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { GasProtecaoResponseDTO } from '../models/gas-protecao.model';

@Injectable({
  providedIn: 'root'
})
export class GasProtecaoService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/gases`;

  listarTodos(): Observable<GasProtecaoResponseDTO[]> {
    return this.http.get<GasProtecaoResponseDTO[]>(this.apiUrl);
  }

  salvar(gas: any): Observable<GasProtecaoResponseDTO> {
    return this.http.post<GasProtecaoResponseDTO>(this.apiUrl, gas);
  }

  atualizar(id: string, gas: any): Observable<GasProtecaoResponseDTO> {
    return this.http.put<GasProtecaoResponseDTO>(`${this.apiUrl}/${id}`, gas);
  }

  excluir(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  alterarStatus(id: string): Observable<GasProtecaoResponseDTO> {
    return this.http.patch<GasProtecaoResponseDTO>(`${this.apiUrl}/${id}/status`, {});
  }
}
