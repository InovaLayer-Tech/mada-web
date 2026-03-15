import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OrcamentoRequestDTO } from '../models/orcamento-request.dto';
import { OrcamentoResponseDTO } from '../models/orcamento-response.dto';
import { ProblemDetail } from '../models/problem-detail';

@Injectable({
  providedIn: 'root'
})
export class OrcamentoService {
  private readonly apiUrl = 'http://localhost:8080/api/v1/orcamentos';
  
  // Usando novo injection scope do Angular
  private http = inject(HttpClient);

  submeterOrcamento(request: OrcamentoRequestDTO): Observable<OrcamentoResponseDTO> {
    return this.http.post<OrcamentoResponseDTO>(this.apiUrl, request)
      .pipe(
        catchError(this.handleError)
      );
  }

  getOrcamento(id: string): Observable<OrcamentoResponseDTO> {
    return this.http.get<OrcamentoResponseDTO>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let problemDetail: ProblemDetail;

    if (error.error instanceof ErrorEvent) {
      problemDetail = {
        type: 'about:blank',
        title: 'Erro de Conexão',
        status: 0,
        detail: error.error.message,
        instance: ''
      };
    } else {
      problemDetail = error.error as ProblemDetail;
      
      if (!problemDetail || !problemDetail.title) {
        problemDetail = {
            type: 'about:blank',
            title: 'Erro de Servidor',
            status: error.status,
            detail: 'Ocorreu um erro na comunicação com a Engine. Verifique os logs.',
            instance: ''
        };
      }
    }
    return throwError(() => problemDetail);
  }
}
