import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ColaboradorService {
  private readonly baseUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  cadastrarColaborador(dados: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/colaboradores`, dados);
  }

  verificarNome(nome: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/colaboradores/checar-nome`, {
      params: { nome }
    });
  }

  verificarEmail(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/colaboradores/checar-email`, {
      params: { email }
    });
  }
}
