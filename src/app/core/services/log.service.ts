import { Injectable, isDevMode } from '@angular/core';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

/**
 * Serviço centralizado de log para o frontend.
 * Em produção, suprime logs de nível debug e info.
 * Mantém o contexto da operação para rastreabilidade.
 */
@Injectable({ providedIn: 'root' })
export class LogService {

  private readonly isDev = isDevMode();

  debug(context: string, message: string, ...data: unknown[]): void {
    if (this.isDev) {
      console.debug(`[DEBUG] [${context}] ${message}`, ...data);
    }
  }

  info(context: string, message: string, ...data: unknown[]): void {
    if (this.isDev) {
      console.info(`[INFO]  [${context}] ${message}`, ...data);
    }
  }

  warn(context: string, message: string, ...data: unknown[]): void {
    console.warn(`[WARN]  [${context}] ${message}`, ...data);
  }

  error(context: string, message: string, ...data: unknown[]): void {
    console.error(`[ERROR] [${context}] ${message}`, ...data);
  }
}
