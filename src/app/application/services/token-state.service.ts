import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
interface TokenState {
  slot?: string;
  alias?: string;
  pin?: string;
  token_id?: string;
  documentName?: string;
  documentType?: string;
}

export interface SignedDocumentResponse {
  id: string;
  fecha: string;
  Documento: {
    id: string;
    nombre: string;
    tipo_documento: string;
    documento_blob: string;
    estado: string;
    fecha_creacion: string;
    id_historial: string | null;
  };
  User: {
    id: string;
    name: string;
    ci: string;
    tipo_user: string;
    estado_user: string;
    unidad: string;
    institucion: string;
    cargo: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class TokenStateService {
  private state = new BehaviorSubject<TokenState>({});
  private signedDocument = new BehaviorSubject<SignedDocumentResponse | null>(
    null
  );

  updateState(newState: Partial<TokenState>) {
    const currentState = this.state.value;
    const updatedState = { ...currentState, ...newState };
    this.state.next(updatedState);
    console.log(updatedState);
  }

  getState() {
    return this.state.asObservable();
  }

  getDataT(): TokenState {
    return this.state.value;
  }

  setDocumentInfo(name: string, type: string = 'pdf') {
    this.updateState({
      documentName: name,
      documentType: type,
    });
  }

  clearState() {
    this.state.next({});
  }

  getSigningData(): Partial<TokenState> | null {
    const currentState = this.state.value;

    if (currentState.slot && currentState.alias && currentState.pin) {
      return {
        slot: currentState.slot,
        alias: currentState.alias,
        pin: currentState.pin,
        token_id: currentState.token_id,
        documentName: currentState.documentName,
        documentType: currentState.documentType,
      };
    }
    return null;
  }

  // siigned docuement
  setSignedDocument(response: any) {
    this.signedDocument.next(response.data);
  }

  getSignedDocument() {
    return this.signedDocument.asObservable();
  }

  clearSignedDocument() {
    this.signedDocument.next(null);
  }
}
