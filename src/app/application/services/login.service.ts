import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { API } from '../models/api.enum';
import { res } from '../models/api.response';
import { loginPeyload } from '../models/interfaces/api/login';
import { LocalStorageService } from '../utils/local-storage.service';
import { ACCESS_TOKEN, REFRESH__TOKEN } from '../constants/CONSTANTS';
import { environment } from '../config/environment.development';

export interface res_data {
  accessToken: string;
  refreshToken: string;
  user: {
    rol: string;
    name: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private URL = environment.API_BACK;
  private URL_LOGIN = this.URL + API.LOGIN;
  private URL_REFRESH = this.URL + API.REFRESH__TOKEN;

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {}

  login(data: loginPeyload): Observable<res<res_data>> {
    return this.http.post<res<res_data>>(this.URL_LOGIN, data).pipe(
      tap((response) => {
        const data = Array.isArray(response.data)
          ? response.data[0]
          : response.data;
        this.setAccessToken(data.accessToken);
        this.setRefreshToken(data.refreshToken);
        localStorage.setItem('userRole', data.user?.rol.toUpperCase());
        localStorage.setItem('userName', data.user?.name);
      })
    );
  }
  getUserRole(): string {
    return localStorage.getItem('userRole') || 'USUARIO';
  }
  refreshToken(refreshToken: string): Observable<res<res_data>> {
    return this.http
      .post<res<res_data>>(this.URL_REFRESH, { refreshToken })
      .pipe(
        tap((response) => {
          const data = Array.isArray(response.data)
            ? response.data[0]
            : response.data;
          this.setAccessToken(data.accessToken);
        })
      );
  }

  getAccessToken(): string {
    return this.localStorage.getItem(ACCESS_TOKEN) || '';
  }

  setAccessToken(accessToken: string): void {
    this.localStorage.setItem(ACCESS_TOKEN, accessToken);
  }

  getRefreshToken(): string {
    return this.localStorage.getItem(REFRESH__TOKEN) || '';
  }

  setRefreshToken(refreshToken: string): void {
    this.localStorage.setItem(REFRESH__TOKEN, refreshToken);
  }

  isAuthenticated(): boolean {
    const token = this.getAccessToken();
    return !!token;
  }

  logout(): void {
    this.localStorage.clear();
  }
}
