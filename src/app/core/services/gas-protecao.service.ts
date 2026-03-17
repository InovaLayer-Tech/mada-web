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
}
