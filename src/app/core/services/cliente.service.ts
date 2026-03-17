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
    return this.http.get<ClienteResponseDTO>(`${this.apiUrl}/atual`);
  }

  atualizarPerfil(id: string, cliente: any): Observable<ClienteResponseDTO> {
    return this.http.put<ClienteResponseDTO>(`${this.apiUrl}/${id}`, cliente);
  }
}
