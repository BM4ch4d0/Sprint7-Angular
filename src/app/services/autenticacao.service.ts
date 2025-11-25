import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {
  private readonly USER_ID_KEY = 'userId';

  constructor(private httpClient: HttpClient) {}

  autenticar(login: string, senha: string, lembrar: boolean): Observable<any> {
    return this.httpClient.post<any>('http://localhost:3001/login', { nome: login, senha: senha } )
      .pipe(
        tap(response => {
          const userId = response.id; 
          
          if (userId) {
            const storage = lembrar ? localStorage : sessionStorage;
            const otherStorage = lembrar ? sessionStorage : localStorage;
            otherStorage.removeItem(this.USER_ID_KEY);
            storage.setItem(this.USER_ID_KEY, userId.toString()); 
            console.log(`ID do usuário salvo no ${lembrar ? 'localStorage' : 'sessionStorage'}.`);
          } else {
            console.error('ID do usuário não encontrado na resposta da API.');
          }
        })
      );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.USER_ID_KEY) || !!sessionStorage.getItem(this.USER_ID_KEY);
  }

  logout(): void {
    localStorage.removeItem(this.USER_ID_KEY);
    sessionStorage.removeItem(this.USER_ID_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.USER_ID_KEY) || sessionStorage.getItem(this.USER_ID_KEY);
  }
}