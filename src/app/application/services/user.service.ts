import { Injectable, inject } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API } from '../models/api.enum';
import { res } from '../models/api.response';
import { infoUser } from '../models/interfaces/api/infoUser';
import { RegisterPeyload } from '../models/interfaces/api/login';
import { tap } from 'rxjs/operators';
import { environment } from '../config/environment.development';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);
  private URL = environment.API_BACK;

  private URL_SEARCH_USER = this.URL + API.SERVICE_EXTERNAL;
  private URL_REGISTER = this.URL + API.REGISTER;
  private URL_ROL = this.URL + API.ROL;
  private URL_UNSUB = this.URL + API.UNSUB;

  private refreshSubject = new BehaviorSubject<boolean>(false);

  get refresh$(): Observable<boolean> {
    return this.refreshSubject.asObservable();
  }

  infoUser(CI: string): Observable<res<infoUser[]>> {
    return this.http.post<res<infoUser[]>>(
      this.URL_SEARCH_USER + '/' + CI,
      null
    );
  }

  getById(id: string): Observable<any> {
    return this.http.get<any>(this.URL_REGISTER + '/' + id);
  }

  register(data: RegisterPeyload): Observable<res<any>> {
    return this.http
      .post<res<any>>(this.URL_REGISTER, data)
      .pipe(tap(() => this.refreshSubject.next(true)));
  }

  getRolUser(): Observable<res<any>> {
    return this.http.get<res<any>>(this.URL_ROL);
  }
  getAllUser(filters: {
    TipoFilter?: string;
    nameFilter?: string;
    state?: string;
    page?: number;
    limit?: number;
  }): Observable<any> {
    let params = new HttpParams();

    if (filters.TipoFilter) {
      params = params.set('TipoFilter', filters.TipoFilter);
    }
    if (filters.nameFilter) {
      params = params.set('nameFilter', filters.nameFilter);
    }
    if (filters.state) {
      params = params.set('state', filters.state);
    }
    if (filters.page) {
      params = params.set('page', filters.page.toString());
    }
    if (filters.limit) {
      params = params.set('limit', filters.limit.toString());
    }

    return this.http.get<any>(this.URL_REGISTER, { params });
  }

  unsubscribe(id: string, state: string): Observable<any> {
    return this.http
      .patch<any>(this.URL_REGISTER + '/' + id, { state })
      .pipe(tap(() => this.refreshSubject.next(true)));
  }
  updateUser(id: string, data: any): Observable<res<any>> {
    return this.http
      .put<res<any>>(`${this.URL_REGISTER}/${id}`, data)
      .pipe(tap(() => this.refreshSubject.next(true)));
  }
}
