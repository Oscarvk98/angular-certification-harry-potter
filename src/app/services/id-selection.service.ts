import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdSelectionService {
  private readonly idSelection$: BehaviorSubject<string> = new BehaviorSubject<string>('')

  setIdSelection(id: string) {
    this.idSelection$.next(id);
  }

  getIdSelection(): Observable<string> {
    return this.idSelection$.asObservable();
  }
}
