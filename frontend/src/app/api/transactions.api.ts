import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Transaction } from '../store/transactions/transactions.model';

@Injectable({ providedIn: 'root' })
export class TransactionsApi {
  private http = inject(HttpClient);
  private basePath = 'http://localhost:5219/api/transactions';

  getTransactions(): Observable<Array<Transaction>> {
    return this.http
      .get<Transaction[]>(`${this.basePath}` + '/')
      .pipe(map((transactions) => transactions || []));
  }

  getTaglessTransactions(): Observable<Array<Transaction>> {
    return this.http.get<Transaction[]>(`${this.basePath}` + '/tagless').pipe(
      map((transactions) => {
        return transactions || [];
      })
    );
  }
}
