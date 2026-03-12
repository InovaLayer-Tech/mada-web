import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArameMetalicoResponseDTO } from '../models/arame-metalico.model';

@Injectable({
  providedIn: 'root'
})
export class ArameMetalicoService {
  private readonly API = 'http://localhost:8080/api/v1/arames';

  constructor(private http: HttpClient) {}

  listarTodos(): Observable<ArameMetalicoResponseDTO[]> {
    return this.http.get<ArameMetalicoResponseDTO[]>(this.API);
  }
}
