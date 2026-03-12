import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrcamentoService {
  private readonly API = 'http://localhost:8080/api/v1/orcamentos';

  constructor(private http: HttpClient) {}

  calcular(dados: any): Observable<any> {
    return this.http.post<any>(this.API, dados);
  }
}
