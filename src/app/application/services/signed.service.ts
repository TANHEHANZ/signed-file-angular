import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API } from '../models/api.enum';
import { map, Observable } from 'rxjs';
import { res } from '../models/api.response';
import { responceSigned } from '../models/interfaces/api/signed';
import { environment } from '../config/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SignedService {
  private http = inject(HttpClient);
  private URL = environment.API_BACK;

  private URL_DOCUMENTS_SIGNED = this.URL + API.SIGNED;
  private URL_SIGNED_HISTORY = this.URL + API.SIGNED_HISTORY;
  private URL_SIGNED_FILE_BY_ID = this.URL + API.SIGNED_FILE_BY_ID;

  docuemntsSigned(params: {
    page?: number;
    limit?: number;
    nombreFirmador?: string;
    Cifirmador?: string;
    FechaCreacion?: string;
    estadoDocumento?: string;
  }): Observable<res<responceSigned>> {
    const queryParams = new URLSearchParams();

    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.nombreFirmador)
      queryParams.append('nombreFirmador', params.nombreFirmador);
    if (params.Cifirmador) queryParams.append('Cifirmador', params.Cifirmador);
    if (params.FechaCreacion)
      queryParams.append('FechaCreacion', params.FechaCreacion);
    if (params.estadoDocumento)
      queryParams.append('estadoDocumento', params.estadoDocumento);

    const url = `${this.URL_DOCUMENTS_SIGNED}?${queryParams.toString()}`;
    return this.http.get<res<responceSigned>>(url);
  }
  signedHistory(id: string) {
    return this.http.get(this.URL_SIGNED_HISTORY + id);
  }

  getPdfBlobUrl(id: string): Observable<string> {
    return this.http.get<any>(this.URL_SIGNED_FILE_BY_ID + id).pipe(
      map((response) => {
        const binaryString = window.atob(response.data.documento_blob);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: 'application/pdf' });
        return URL.createObjectURL(blob);
      })
    );
  }
}
