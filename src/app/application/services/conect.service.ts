import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenConnectedResponse } from '../models/interfaces/connected';
import { StatusResponse } from '../models/interfaces/status';
import { environment } from '../config/environment.production';

@Injectable({
  providedIn: 'root',
})
export class ConectService {
  readonly URL = environment.API_JACUIBITUS;
  private ULR_CONENCTED = URL + '/api/status';
  http = inject(HttpClient);
  conectedToken(): Observable<StatusResponse> {
    return this.http.get<StatusResponse>(this.ULR_CONENCTED);
  }
  private URL_LIST_TOKEN = URL + '/api/token/connected';
  listToken(): Observable<TokenConnectedResponse> {
    return this.http.get<TokenConnectedResponse>(this.URL_LIST_TOKEN);
  }
}
