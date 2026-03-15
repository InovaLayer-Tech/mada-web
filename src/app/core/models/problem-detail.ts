/**
 * Representação estrita baseada na RFC 7807 (Problem Details for HTTP APIs).
 * Enviado pelo GlobalExceptionHandler do Spring Boot (Backend).
 */
export interface ProblemDetail {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
  properties?: { [key: string]: any }; // Para o BeanValidation (Opcional fieldErrors)
}
