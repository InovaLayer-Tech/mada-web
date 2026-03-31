import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { tap, catchError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LogService } from './log.service';

export interface AuthResponse {
  token: string;
  email: string;
  nomeCompleto: string;
  role: string;
  expiresAt: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  private log = inject(LogService);
  private apiUrl = `${environment.apiUrl}/auth`;

  // Estado reativo do usuário
  currentUser = signal<AuthResponse | null>(this.getUserFromStorage());

  login(credentials: any) {
    this.log.info('AuthService', 'Tentativa de login | email=' + credentials.email);
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        this.log.info('AuthService', 'Login bem-sucedido | email=' + response.email + ' | role=' + response.role);
        this.saveUser(response);
      }),
      catchError(error => {
        this.log.error('AuthService', 'Falha no login | email=' + credentials.email, error);
        throw error;
      })
    );
  }

  register(userData: any) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/cadastro`, userData).pipe(
      tap(response => this.saveUser(response))
    );
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('mada_user');
    }
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  private saveUser(user: AuthResponse) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('mada_user', JSON.stringify(user));
    }
    this.currentUser.set(user);
  }

  updateUser(partial: Partial<AuthResponse>) {
    const current = this.currentUser();
    if (current) {
      const updated = { ...current, ...partial };
      this.saveUser(updated);
    }
  }

  private getUserFromStorage(): AuthResponse | null {
    if (isPlatformBrowser(this.platformId)) {
      const userJson = localStorage.getItem('mada_user');
      return userJson ? JSON.parse(userJson) : null;
    }
    return null;
  }

  getToken(): string | null {
    return this.currentUser()?.token || null;
  }

  isAuthenticated(): boolean {
    return this.currentUser() !== null;
  }

  getRole(): string | null {
    return this.currentUser()?.role || null;
  }
}
