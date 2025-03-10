import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ValidateService {
  private apiUrl = 'https://localhost:9000/api/validar_pdf';

  constructor(private http: HttpClient) {}

  validateDocument(base64File: string): Observable<any> {
    return this.http.post(this.apiUrl, { pdf: base64File });
  }
}
