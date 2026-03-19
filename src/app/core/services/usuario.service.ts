import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface UsuarioResponse {
  id: string;
  email: string;
  nomeCompleto: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/usuarios`;

  obterPerfil(): Observable<UsuarioResponse> {
    return this.http.get<UsuarioResponse>(`${this.apiUrl}/perfil`);
  }

  atualizarPerfil(dados: Partial<UsuarioResponse>): Observable<UsuarioResponse> {
    return this.http.put<UsuarioResponse>(`${this.apiUrl}/perfil`, dados);
  }

  criarAdmin(cadastroData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin`, cadastroData);
  }

  atualizarSenha(senhaDados: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/perfil/senha`, senhaDados);
  }
}
