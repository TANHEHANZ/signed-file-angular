import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API, API_ROUTES } from '../models/api.enum';
import { FirmarPdfRequest } from '../models/interfaces/firmar/pdf';
import { environment } from '../config/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private URL = environment.API_BACK;
  private URL_JACUBITUS = environment.API_JACUIBITUS;

  private http = inject(HttpClient);

  getStatusJacubitus(): Observable<any> {
    return this.http.get<any[]>(
      `${this.URL_JACUBITUS}${API_ROUTES.STATUS_JACUBITUS}`
    );
  }
  // jacubitus client
  getListToken(): Observable<any> {
    return this.http.get(`${this.URL_JACUBITUS}${API_ROUTES.LIST_TOKEN}`);
  }

  dataToken(data: any): Observable<any> {
    return this.http.post(`${this.URL_JACUBITUS}${API_ROUTES.DATA_TOKEN}`, {
      slot: data.slot,
      pin: data.pin,
    });
  }

  uploadFile(
    fileData: FirmarPdfRequest,
    id_historial?: string
  ): Observable<any> {
    const url = id_historial
      ? `${this.URL}/v1/api/jacubitus/firmar/${id_historial}`
      : `${this.URL}/v1/api/jacubitus/firmar`;

    return this.http.post(url, fileData);
  }

  signedFile(datafile: any): Observable<any> {
    return this.http.post(
      this.URL_JACUBITUS + API_ROUTES.UPLOAD_FILE_PDF,
      datafile
    );
  }
}
