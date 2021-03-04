import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  setToken(token: string): void {
    localStorage.setItem(environment.keyToken, token);
  }

  getToken(): string {
    return localStorage.getItem(environment.keyToken) ?? 'ddd';
  }

  removeToken() {
    localStorage.removeItem(environment.keyToken);
    //localStorage.clear();
  }
}
