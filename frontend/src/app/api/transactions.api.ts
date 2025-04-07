import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionsApi {
  private http = inject(HttpClient);
  private basePath = 'http://localhost:5219/api';

  getTransactions(): Observable<any> {
    return this.http.get(`${this.basePath}` + '/transactions');
  }

  getTaglessTransactions(): Observable<any> {
    return this.http.get(`${this.basePath}` + '/transactions/tagless');
  }
}
