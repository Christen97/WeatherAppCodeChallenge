import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LookupService {
  private key = 'icaoHistory';
  private history = new BehaviorSubject<string[]>(this.loadHistory());

  history$ = this.history.asObservable();

  addLookup(code: string) {
    code = code.toUpperCase();
    const current = this.history.getValue();

    const filtered = current.filter((c) => c !== code);

    const updated = [code, ...filtered].slice(0, 5);

    this.history.next(updated);
    localStorage.setItem(this.key, JSON.stringify(updated));
  }

  private loadHistory(): string[] {
    const raw = localStorage.getItem(this.key);
    return raw ? JSON.parse(raw) : [];
  }
}
