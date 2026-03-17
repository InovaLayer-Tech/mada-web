import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ParametroGlobal } from '../models/parametro-global.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/configuracoes`;

  obterConfiguracao(): Observable<ParametroGlobal> {
    return this.http.get<ParametroGlobal>(this.apiUrl);
  }

  atualizar(config: ParametroGlobal): Observable<ParametroGlobal> {
    return this.http.put<ParametroGlobal>(this.apiUrl, config);
  }
}
