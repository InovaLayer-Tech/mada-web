import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ClienteResponseDTO } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/clientes`;

  obterPerfilAtual(): Observable<ClienteResponseDTO> {
    // Para o MVP, pegamos o primeiro cliente retornado para simular o logado
    // Em produção, isso usaria o /me ou o ID do token JWT
    return this.http.get<ClienteResponseDTO>(`${this.apiUrl}/atual`);
  }
}
