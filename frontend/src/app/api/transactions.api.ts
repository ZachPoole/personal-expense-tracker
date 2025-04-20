import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Transaction } from '../store/transactions/transactions.model';

@Injectable({ providedIn: 'root' })
export class TransactionsApi {
  private http = inject(HttpClient);
  private basePath = 'http://localhost:5219/api/transactions';

  getTransactions(): Observable<Array<Transaction>> {
    return this.http.get<Transaction[]>(`${this.basePath}` + '/').pipe(
      map((transactions) => transactions || []),
      catchError(this.handleError)
    );
  }

  getTaglessTransactions(): Observable<Array<Transaction>> {
    return this.http.get<Transaction[]>(`${this.basePath}` + '/tagless').pipe(
      map((transactions) => {
        return transactions || [];
      }),
      catchError(this.handleError)
    );
  }

  updateTransactionTags(
    body: UpdateTransactionTagsRequestBody
  ): Observable<any> {
    return this.http
      .put(`${this.basePath}` + '/tags', body)
      .pipe(catchError(this.handleError));
  }

  filterTransactions(
    body: FilterTransactionsRequestBody
  ): Observable<Array<Transaction>> {
    return this.http
      .post<Transaction[]>(`${this.basePath}` + '/tagSearch', body)
      .pipe(
        map((transactions) => {
          return transactions || [];
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API error:', error);
    return throwError(() => new Error(error.error?.message || 'Server error.'));
  }
}

interface UpdateTransactionTagsRequestBody {
  TransactionId: string;
  TagsIds: string[];
}

interface FilterTransactionsRequestBody {
  TagsIds: string[];
}
