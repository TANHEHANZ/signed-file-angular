import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenConnectedResponse } from '../models/interfaces/connected';
import { StatusResponse } from '../models/interfaces/status';

@Injectable({
  providedIn: 'root',
})
export class pruebaService {
  private ULR_CONENCTED = 'https://localhost:9000/api/status';
  http = inject(HttpClient);
  conectedToken(): Observable<StatusResponse> {
    return this.http.get<StatusResponse>(this.ULR_CONENCTED);
  }
  private URL_LIST_TOKEN = 'https://localhost:9000/api/token/connected';
  listToken(): Observable<TokenConnectedResponse> {
    return this.http.get<TokenConnectedResponse>(this.URL_LIST_TOKEN);
  }
}
