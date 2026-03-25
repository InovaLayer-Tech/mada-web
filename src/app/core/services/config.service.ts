import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { EntradaPadrao } from '../models/entrada-padrao.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private http = inject(HttpClient);
  // Endpoint alinhado com o Backend refatorado
  private apiUrl = `${environment.apiUrl}/admin/entradas-padrao`;

  obterConfiguracao(): Observable<EntradaPadrao> {
    return this.http.get<EntradaPadrao>(this.apiUrl);
  }

  atualizar(config: EntradaPadrao): Observable<EntradaPadrao> {
    return this.http.put<EntradaPadrao>(this.apiUrl, config);
  }
}
