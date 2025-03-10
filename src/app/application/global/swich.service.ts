import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SwichService {
  $modal = new EventEmitter<string | null>();
  $data = new BehaviorSubject<any>(null);

  setData(data: any) {
    this.$data.next(data);
  }
}
